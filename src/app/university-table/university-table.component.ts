import { Component } from "@angular/core";
import { UniversiteService } from "../services/universite.service";
import { Universite } from "../models/universite.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-university-table",
  templateUrl: "./university-table.component.html",
  styleUrls: ["./university-table.component.css"],
})
export class UniversityTableComponent {
  universities: Universite[] = [];
  filteredUniversities: Universite[] = [];
  searchTerm: string = "";

  constructor(
    private universiteService: UniversiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUniversities();
  }

  liveSearch(): void {
    this.filteredUniversities = this.universities.filter(
      (university) =>
        university.nomUniversite
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        university.adresseUniversite
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        (university.foyer?.nomFoyer || "")
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }

  search(term: string): void {
    this.searchTerm = term;
    if (this.searchTerm.trim() !== "") {
      this.filteredUniversities = this.universities.filter(
        (university) =>
          university.nomUniversite
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          university.adresseUniversite
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          (university.foyer?.nomFoyer || "")
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUniversities = this.universities;
    }
  }

  loadUniversities(): void {
    this.universiteService.getAllUniversities().subscribe(
      (data) => {
        this.universities = data;
        this.filteredUniversities = data;
        console.log("Universities:", this.universities);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteUniversity(id: number): void {
    this.universiteService.deleteUniversity(id).subscribe(() => {
      this.loadUniversities();
    });
  }
  editUniversity(id: number): void {
    this.router.navigate(["admin/edit-university", id]);
  }
  addNewUniversity(): void {
    this.router.navigate(["/admin/add-university"]);
  }
}
