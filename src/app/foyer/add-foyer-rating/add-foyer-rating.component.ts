import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Foyer } from "src/app/models/foyer.model";
import { Rate } from "src/app/models/rate.model";
import { FoyerManagementService } from "src/app/services/foyer-management.service";

@Component({
  selector: "app-add-foyer-rating",
  templateUrl: "./add-foyer-rating.component.html",
  styleUrls: ["./add-foyer-rating.component.scss"],
})
export class AddFoyerRatingComponent implements OnInit {
  constructor(
    private service: FoyerManagementService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastrService: ToastrService
  ) {}
  foyer = new Foyer();
  rate = new Rate();
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.service.getFoyerById(Number(id)).subscribe((foyer) => {
        this.foyer = foyer;
        this.formList();
      });
    });
  }
  ratingForm: FormGroup;

  formList() {
    this.ratingForm = new FormGroup({
      ratingControl: new FormControl(this.ratingForm, Validators.required),
      description: new FormControl(this.ratingForm),
    });
  }
  onClick(event: any) {
    this.rate.rateNumber = event.rating;
    this.ratingForm.controls["ratingControl"].setValue(event.rating);
  }
  public showSuccess(): void {
    this.toastrService.success("Residence Rated Successfully!");
  }
  onSubmit() {
    if (this.ratingForm.valid) {
      this.rate.content = this.ratingForm.controls["description"].value;
      this.service.addRatingForFoyer(this.rate, this.foyer.idFoyer).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error),
      });
      this.showSuccess();
    }

    console.log(this.ratingForm.value);
  }
}
