import { Component } from '@angular/core';
import { Universite } from '../../models/universite.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversiteService } from '../../services/universite.service';
import { Foyer } from '../../models/foyer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.css']
})
export class EditUniversityComponent {
  universityId!: number;
  universityForm: FormGroup;
  idFoyer : number;

  university: Universite;
  foysers: Foyer[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private universiteService: UniversiteService, private router:Router
  ) { this.universityForm = this.formBuilder.group({
    nomUniversite: ['', Validators.required],
    adresseUniversite: ['', Validators.required],
    foyer: ['', Validators.required] ,
  });
 }

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.universityId = +params['id'];

    this.universiteService.getUniversityById(this.universityId).subscribe(
      data => {
        this.university = data;

        this.universityForm.patchValue({
          nomUniversite: this.university.nomUniversite,
          adresseUniversite: this.university.adresseUniversite,
          foyer: this.university.foyer?.nomFoyer 
        });
      },
      error => {
        console.error('Error fetching university details:', error);
      }
    );
  });

  this.universiteService.getAllFoyersNotAssigned().subscribe(
    data => {
      this.foysers = data;
    },
    error => {
      console.error('Error fetching foyers:', error);
    }
  );
}

updateUniversity(): void {
  const formValue = this.universityForm.value;

  // Ensure that the 'foyer' field is an object with the 'idFoyer' property
  const updatedUniversity: Universite = {
    idUniversite: this.university.idUniversite,
    nomUniversite: formValue.nomUniversite,
    adresseUniversite: formValue.adresseUniversite,
    foyer: { idFoyer: Number(formValue.foyer) } ,
  };

  this.universiteService.updateUniversity(updatedUniversity).subscribe(
    data => {
      console.log('University updated successfully!');
      this.router.navigate(['/admin/university-table']);
    },
    error => {
      console.log(error);
    }
  );
}



}