import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Foyer } from "src/app/models/foyer.model";
import { FoyerManagementService } from "src/app/services/foyer-management.service";

@Component({
  selector: "app-etudiant-add-rating",
  templateUrl: "./etudiant-add-rating.component.html",
  styleUrls: ["./etudiant-add-rating.component.scss"],
})
export class EtudiantAddRatingComponent implements OnInit, AfterViewInit {
  constructor(private foyerService: FoyerManagementService) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getAllFoyers();
    this.formList();
  }
  foyers: Foyer[] = [];
  page = 0;
  size = 5;
  data: any;

  governoratelist = [
    "Filter By governates: All",
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
  getAllFoyers(): void {
    this.foyerService.getAllFoyers(this.page, this.size).subscribe({
      next: (data: any) => {
        this.data = data;
        this.foyers = data.content;
      },
      error: (error) => console.log("error getting list", error),
    });
  }
  onPageChanged(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAllFoyers();
  }
  filterForm: FormGroup;
  foyerLocation: { lat: number; lng: number };
  ratingForm: FormGroup;

  formList() {
    this.filterForm = new FormGroup({
      regionFilter: new FormControl("Filter By governates: All"),
      nameFilter: new FormControl(),
    });
    this.ratingForm = new FormGroup({
      ratingControl: new FormControl(""),
    });
  }
  get filteredFoyers() {
    let filteredDataByRegionOrNameOrRate = this.foyers;
    if (
      this.filterForm.get("regionFilter").value != "Filter By governates: All"
    ) {
      filteredDataByRegionOrNameOrRate =
        filteredDataByRegionOrNameOrRate.filter(
          (foyer) =>
            foyer.region.toLowerCase() ===
            this.filterForm.get("regionFilter").value.toLowerCase()
        );
    }
    if (this.filterForm.get("nameFilter").value) {
      filteredDataByRegionOrNameOrRate =
        filteredDataByRegionOrNameOrRate.filter((foyer) =>
          foyer.nomFoyer
            .toLowerCase()
            .includes(this.filterForm.get("nameFilter").value.toLowerCase())
        );
    }
    return filteredDataByRegionOrNameOrRate;
  }
}
