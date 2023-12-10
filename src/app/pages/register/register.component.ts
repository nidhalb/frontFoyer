import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data: User[] = [];
  user: User = new User();

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    
  }
  register(): void {

    this.userService.request('POST', 'register', this.user).subscribe(
      (response: any) => {
        this.data.push(response);
        this.router.navigate(['/user-profile']);
      },
      (error: any) => {
        if (error.status === 401) {
          this.userService.setAuthToken(null);
        } else {
          console.error('Error:', error.status, error.statusText);
        }
      }
    );
  }
}
