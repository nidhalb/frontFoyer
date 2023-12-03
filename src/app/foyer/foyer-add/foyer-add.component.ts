import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Foyer } from "src/app/models/foyer.model";
import { FoyerManagementService } from "src/app/services/foyer-management.service";
import * as L from "leaflet";
import { Observable } from "rxjs";

@Component({
  selector: "app-foyer-add",
  templateUrl: "./foyer-add.component.html",
  styleUrls: ["./foyer-add.component.scss"],
})
export class FoyerAddComponent implements OnInit {
  constructor(
    private service: FoyerManagementService,
    private formbuilder: FormBuilder,
    private http: HttpClient
  ) {}

  residenceForm: FormGroup;
  submitted = false;
  foyer = new Foyer();
  map!: L.Map;
  marker: L.Marker;
  streetName: string = "";
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

  ngOnInit(): void {
    this.formList();
  }
  formList() {
    this.residenceForm = new FormGroup({
      nomFoyer: new FormControl(this.residenceForm, [
        Validators.required,
        Validators.minLength(3),
      ]),
      capacityFoyer: new FormControl(this.residenceForm, [Validators.required]),
      region: new FormControl(this.residenceForm, [Validators.required]),
    });
  }
  addFoyer() {
    this.service.addFoyer(this.foyer).subscribe({
      next: (data) => console.log("added"),
      error: (error) => console.log("error"),
    });
  }
  get form() {
    return this.residenceForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.foyer);

    this.addFoyer();
  }

  private apiUrl = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&";

  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      iconUrl: "assets/img/iconF.png",
      shadowUrl: "assets/img/marker-shadow.png",
    }),
  };

  options: L.MapOptions = {
    zoom: 8,
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
      error: (error) => console.log("error fetching localisation",error),
    });
    const marker = this.generateMarker($event);
    this.marker = marker!;
    this.markerAdded = true;
  }
}
