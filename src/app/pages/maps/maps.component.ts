import { Component, OnInit } from "@angular/core";
import { makeArray } from "jquery";
import * as L from "leaflet";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"],
})
export class MapsComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  map!: L.Map;
  marker: L.Marker;
  streetName: string;
  private apiUrl = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&";

  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      iconUrl: "assets/assets/img/iconF.png",
      shadowUrl: "assets/assets/img/marker-shadow.png",
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
        console.log(data.address.state);
      },
      error: (error) => console.log("error fetching localisation"),
    });
    const marker = this.generateMarker($event);
    this.marker = marker!;
    this.markerAdded = true;
  }
}
