import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.scss']
})
export class ListeUsersComponent implements OnInit {

  data: User[] = [];

  constructor(private userService: UserService,private router: Router,private modalService: NgbModal) {}

  ngOnInit() {
    this.userService.request('GET', 'etudiant/getEt').subscribe(
      (response: any) => {
        this.data = response;
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
  role: Role;
  handleRoleUpdate(event: { index: number, newRole: String }): void {
    const { index, newRole } = event;
    const user = this.data[index];
    const isConfirmed = confirm(`Update ${user.nom}'s role to ${newRole}?`);
    if (isConfirmed) {
      if (newRole == "ADMIN"){
        this.role = Role.ADMIN;}
        else{
          this.role = Role.ETUDIANT;}
      user.role = this.role;
      this.userService.request('PUT',"etudiant/editEt", user).subscribe(
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
      // Perform additional actions if needed, e.g., update on the server
      // ...

      // Show a confirmation message in the console
      console.log(`${user.nom}'s role has been updated to ${newRole}.`);
    }
  

}
