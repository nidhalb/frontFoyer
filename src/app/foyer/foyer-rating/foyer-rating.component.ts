import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Foyer } from "src/app/models/foyer.model";
import { Rate } from "src/app/models/rate.model";
import { FoyerManagementService } from "src/app/services/foyer-management.service";

@Component({
  selector: "app-foyer-rating",
  templateUrl: "./foyer-rating.component.html",
  styleUrls: ["./foyer-rating.component.scss"],
})
export class FoyerRatingComponent implements OnInit {
  constructor(
    private service: FoyerManagementService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  ratings: Rate[] = [];
  foyer = new Foyer();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.service.getRatingsByFoyer(Number(id)).subscribe((ratings) => {
        this.ratings = ratings;
      });
      this.service.getFoyerById(Number(id)).subscribe((foyer) => {
        this.foyer = foyer;
      });
    });
  }
}
