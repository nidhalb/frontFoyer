import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Foyer } from "src/app/models/foyer.model";
import { FoyerManagementService } from "src/app/services/foyer-management.service";
import { FoyerMapComponent } from "../foyer-map/foyer-map.component";

@Component({
  selector: "app-foyer-list",
  templateUrl: "./foyer-list.component.html",
  styleUrls: ["./foyer-list.component.scss"],
})
export class FoyerListComponent implements OnInit {
  foyers: Foyer[] = [];
  page = 0;
  size = 5;
  data: any;
  governoratelist = [
    "All",
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
  filterForm: FormGroup;

  constructor(
    private foyerService: FoyerManagementService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllFoyers();
    this.formList();
  }
  foyerLocation: { lat: number; lng: number };

  openMapPopup(foyer: Foyer) {
    console.log(foyer);
    const modalRef = this.modalService.open(FoyerMapComponent);
    this.foyerLocation = { lat: foyer.lattitude, lng: foyer.longitude };
    modalRef.componentInstance.foyerLocation = this.foyerLocation;
  }
  formList() {
    this.filterForm = new FormGroup({
      regionFilter: new FormControl("All"),
      nameFilter: new FormControl(),
    });
  }
  getAllFoyers(): void {
    this.foyerService.getAllFoyers(this.page, this.size).subscribe({
      next: (data: any) => {
        this.data = data;
        this.foyers = data.content;
      },
      error: (error) => console.log("error getting list", error),
    });
  }
  get filteredFoyers() {
    let filteredDataByRegionOrName = this.foyers;
    if (this.filterForm.get("regionFilter").value != "All") {
      console.log("true");
      filteredDataByRegionOrName = filteredDataByRegionOrName.filter(
        (foyer) =>
          foyer.region.toLowerCase() ===
          this.filterForm.get("regionFilter").value.toLowerCase()
      );
    }
    if (this.filterForm.get("nameFilter").value) {
      filteredDataByRegionOrName = filteredDataByRegionOrName.filter((foyer) =>
        foyer.nomFoyer
          .toLowerCase()
          .includes(this.filterForm.get("nameFilter").value.toLowerCase())
      );
    }
    return filteredDataByRegionOrName;
  }
  onPageChanged(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAllFoyers();
  }
}
