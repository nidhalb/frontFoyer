import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Foyer } from "src/app/models/foyer.model";
import { FoyerManagementService } from "src/app/services/foyer-management.service";
import { FoyerMapComponent } from "../foyer-map/foyer-map.component";
import { FoyerDeleteConfirmationComponent } from "../foyer-delete-confirmation/foyer-delete-confirmation.component";
import { ActivatedRoute, Router } from "@angular/router";

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
  filterForm: FormGroup;

  constructor(
    private foyerService: FoyerManagementService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
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
      regionFilter: new FormControl("Filter By governates: All"),
      nameFilter: new FormControl(),
      ratingFilter: new FormControl("All"),
    });
  }
  getAllFoyers(): void {
    this.foyerService.getAllFoyers(this.page, this.size).subscribe({
      next: (data: any) => {
        this.data = data;
        this.foyers = data.content;
        this.calculateAverageRating();
      },
      error: (error) => console.log("error getting list", error),
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
    const ratingFilterValue = this.filterForm.get("ratingFilter").value;

    // if (ratingFilterValue != "All") {
    //   if (ratingFilterValue.toLowerCase() === "highest") {
    //     filteredDataByRegionOrNameOrRate =
    //       filteredDataByRegionOrNameOrRate.filter(
    //         (foyer) =>
    //           foyer.rating === Math.max(...this.foyers.map((f) => f.rating))
    //       );
    //   } else if (ratingFilterValue.toLowerCase() === "least") {
    //     filteredDataByRegionOrNameOrRate =
    //       filteredDataByRegionOrNameOrRate.filter(
    //         (foyer) =>
    //           foyer.rating === Math.min(...this.foyers.map((f) => f.rating))
    //       );
    //   }
    // }
    if (ratingFilterValue != "All") {
      if (ratingFilterValue.toLowerCase() === "highest") {
        filteredDataByRegionOrNameOrRate.sort((a, b) => b.rating - a.rating);
      } else if (ratingFilterValue.toLowerCase() === "least") {
        filteredDataByRegionOrNameOrRate.sort((a, b) => a.rating - b.rating);
      }
    }

    return filteredDataByRegionOrNameOrRate;
  }
  onPageChanged(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAllFoyers();
  }
  openConfirmationModal(foyerId: number): void {
    const modalRef = this.modalService.open(
      FoyerDeleteConfirmationComponent,
      {}
    );
    modalRef.componentInstance.confirmed.subscribe(() => {
      this.foyerService.deleteFoyer(foyerId).subscribe({
        next: (response) => this.router.navigate(["/foyer"]),
        error: (error) => console.log("error"),
      });
      this.router.navigate([""], { relativeTo: this.route.parent });
    });

    modalRef.componentInstance.canceled.subscribe(() => {});
  }
  calculateAverageRating() {
    for (const foyer of this.foyers) {
      this.foyerService.calculateAverageRate(foyer.idFoyer).subscribe({
        next: (rating: number) => {
          foyer.rating = rating;
        },
        error: (error) =>
          console.error(
            `Error calculating average rate for Foyer ${foyer.idFoyer}`,
            error
          ),
      });
    }
  }
}
