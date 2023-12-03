import { Component, Input, OnInit } from "@angular/core";
import * as L from "leaflet";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-foyer-map",
  templateUrl: "./foyer-map.component.html",
  styleUrls: ["./foyer-map.component.scss"],
})
export class FoyerMapComponent implements OnInit {
  @Input() foyerLocation: { lat: number; lng: number };
  map!: L.Map;
  marker: L.Marker;
  streetName: string = "";
  sMarkersLayer: L.LayerGroup;
  markersLayer = new L.LayerGroup();
  private apiUrl = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAddress(this.foyerLocation.lat, this.foyerLocation.lng).subscribe({
      next: (data) => {
        this.streetName = data.display_name;
        console.log(this.streetName);
      },
      error: (error) => console.log("error fetching localisation", error),
    });
    console.log(this.foyerLocation);
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
  getAddress(lat: number, lng: number): Observable<any> {
    const url = `${this.apiUrl}lat=${lat}&lon=${lng}`;
    return this.http.get(url);
  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      const marker = this.addMarkerToMap(
        this.foyerLocation.lat,
        this.foyerLocation.lng
      );
      map.addLayer(this.markersLayer);
    }, 200);
  }
  addMarkerToMap(lat: any, long: any) {
    console.log(lat, long);
    return L.marker([lat, long], this.icon)
      .addTo(this.map);
  }
}
