import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, User } from 'src/app/models/user.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId: number;
  user:User;

  constructor(private route: ActivatedRoute,private userService:UserService) {}

  ngOnInit(): void {
    // Use snapshot to get the initial route parameters
    const id = this.route.snapshot.paramMap.get('id');
    console.log("afte"+id);

    // Convert the id to a number if needed
    this.userId = id ? +id : null;
    this.userService.request('GET', `etudiant/getEt/${id}`).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: any) => {
        if (error.status === 401) {
          this.userService.setAuthToken(null);
        } else {
          console.error('Error:', error.status, error.statusText);
        }
      }
    );
  

    console.log('User ID:', this.userId);
  }
}
