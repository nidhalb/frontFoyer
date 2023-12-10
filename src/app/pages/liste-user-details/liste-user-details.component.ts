import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, User } from 'src/app/models/user.model';


@Component({
  selector: 'app-liste-user-details',
  templateUrl: './liste-user-details.component.html',
  styleUrls: ['./liste-user-details.component.scss']
})
export class ListeUserDetailsComponent  {
  @Input() users: User[] = [];
  @Output() updateRole = new EventEmitter<{ index: number, newRole: String }>();

  constructor(private router: Router) {}


  

  // Method to update the user role and emit the update
  updateUserRole(index: number, newRole: String): void {
    
    this.updateRole.emit({ index, newRole });

  }
  goToUserDetails(userId: number) {
    console.log(userId);
    
    
      
      this.router.navigate(['/user', userId]);
    
  }
  

  


}
