import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
    this.userService.setAuthToken(null);
  }
  ngOnDestroy() {
  }

  email: string = "";
  password: string = "";
  
  onSubmitLogin(): void {
    const loginData={
      email:this.email,
      motDePasse: this.password,
    };
   
    this.userService.request('POST', 'login', loginData).subscribe(
      (response: any) => {
        this.userService.setAuthToken(response.token);
        
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
