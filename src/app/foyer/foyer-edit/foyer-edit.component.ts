import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Foyer } from "src/app/models/foyer.model";
import { ActivatedRoute } from "@angular/router";
import { FoyerManagementService } from "src/app/services/foyer-management.service";
import * as L from "leaflet";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-foyer-edit",
  templateUrl: "./foyer-edit.component.html",
  styleUrls: ["./foyer-edit.component.scss"],
})
export class FoyerEditComponent implements OnInit, AfterViewInit {
  constructor(
    private service: FoyerManagementService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngAfterViewInit(): void {}
  residenceForm: FormGroup;
  foyer = new Foyer();
  submitted = false;
  map!: L.Map;
  marker: L.Marker;
  streetName: string = "";
  sMarkersLayer: L.LayerGroup;

  governoratelist = [
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];
  private apiUrl = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&";

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.service.getFoyerById(Number(id)).subscribe((foyer) => {
        this.foyer = foyer;
        this.formList();
        this.getAddress(this.foyer.lattitude, this.foyer.longitude).subscribe({
          next: (data) => {
            this.streetName = data.display_name;
            console.log(this.streetName);
          },
          error: (error) => console.log("error fetching localisation", error),
        });
      });
    });

    console.log(this.foyer);
    // this.sMarkersLayer.addLayer(marker);
    // this.markersLayer.addLayer(this.sMarkersLayer);
    // this.map.panTo([this.foyer.lattitude, this.foyer.longitude]);
  }
  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      iconUrl: "assets/img/iconF.png",
      shadowUrl: "assets/img/marker-shadow.png",
    }),
  };

  options: L.MapOptions = {
    zoom: 12,
    center: L.latLng(36.8065, 10.1815),
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
  };

  markersLayer = new L.LayerGroup();
  markerAdded = false;

  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      const marker = this.addMarkerToMap(
        this.foyer.lattitude,
        this.foyer.longitude
      );
      map.addLayer(this.markersLayer);
    }, 200);
  }

  getAddress(lat: number, lng: number): Observable<any> {
    const url = `${this.apiUrl}lat=${lat}&lon=${lng}`;
    return this.http.get(url);
  }

  generateMarker(data: any) {
    return !this.markerAdded
      ? L.marker([data.latlng.lat, data.latlng.lng], this.icon)
          .addTo(this.map)
          .on("click", (event) => this.markerClicked(event))
          .on("dragend", (event) => this.markerDragEnd(event))
      : null;
  }
  addMarkerToMap(lat: any, long: any) {
    console.log(lat, long);
    return L.marker([lat, long], this.icon)
      .addTo(this.map)
      .on("click", (event) => this.markerClicked(event))
      .on("dragend", (event) => this.markerDragEnd(event));
  }

  markerClicked($event: any) {
    this.map.removeLayer(this.marker);
    this.markerAdded = false;
  }

  markerDragEnd($event: any) {
    console.log($event.target.getLatLng());
  }

  async mapClicked($event: any) {
    this.getAddress($event.latlng.lat, $event.latlng.lng).subscribe({
      next: (data) => {
        this.streetName = data.display_name;
        this.foyer.lattitude = $event.latlng.lat;
        this.foyer.longitude = $event.latlng.lng;
        console.log(this.streetName);
      },
      error: (error) => console.log("error fetching localisation", error),
    });
    const marker = this.generateMarker($event);
    this.marker = marker!;
    this.markerAdded = true;
  }

  get form() {
    return this.residenceForm.controls;
  }
  formList() {
    this.residenceForm = new FormGroup({
      nomFoyer: new FormControl(this.foyer.nomFoyer, [
        Validators.required,
        Validators.minLength(3),
      ]),
      capacityFoyer: new FormControl(this.foyer.capacityFoyer, [
        Validators.required,
      ]),
      region: new FormControl(this.foyer.region, [Validators.required]),
    });
  }

  editFoyer() {
    this.service.updateFoyer(this.foyer).subscribe({
      next: (data) => console.log("added"),
      error: (error) => console.log(error),
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.foyer);
    this.editFoyer();
  }
}
