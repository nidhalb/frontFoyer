import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService,private router: Router,private fb: FormBuilder) { }
  updateForm: FormGroup;
  data: any;
  id=this.userService.getDecodedToken(this.userService.getAuthToken()).userId;
  ngOnInit() {
    if(this.userService.authguard()==false){
      this.userService.logout();
      this.router.navigate(['/login']);

    }
    this.userService.request('GET', `etudiant/getEt/${this.id}`).subscribe((response: any) => {
      this.data = response;
      this.initializeForm();
      console.log(this.data);
    },
    (error: any) => {
      if (error.status === 401) {
        this.userService.setAuthToken(null);
      } else {
        console.error('Error:', error.status, error.statusText);
      }
    });

    

  }
  initializeForm() {
    // Use FormBuilder to create a form with initial values from the fetched data
    this.updateForm = this.fb.group({
      idUser: [this.data.idUser],
      nom: [this.data.nom, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      prenom: [this.data.prenom, Validators.required],
      cin: [this.data.cin],
      // Add more form controls for other attributes
    });
  }
  onSubmit() {
    if (this.updateForm.valid) {
      
      console.log(this.updateForm.value);
      // Update the data using the form values
      const updatedData = this.updateForm.value;
      // Call your service method to update the data
      this.userService.request('PUT',"etudiant/editEt", updatedData).subscribe(
        (response: any) => {
          this.data = response;
          console.log(this.data);
        },
        (error: any) => {
          if (error.status === 401) {
            console.log(this.data);
          } else {
            console.error('Error:', error.status, error.statusText);
          }
        });}
  }


}
