import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  requiresAuth?: boolean;
  requiresRole?: string; // Add requiresRole property for role-based authentication
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', requiresAuth: true },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '', requiresAuth: true },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '', requiresAuth: true },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '', requiresAuth: true },
  { path: '/users', title: 'users', icon: 'ni-bullet-list-67 text-red', class: '', requiresAuth: true, requiresRole: 'ADMIN' } 
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => this.showMenuItem(menuItem));
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  private showMenuItem(menuItem: RouteInfo): boolean {
    // Check if the menu item requires authentication
    if (menuItem.requiresAuth !== undefined && menuItem.requiresAuth !== this.userService.authguard()) {
      return false;
    }

    // Check if the user has the required role
    if (menuItem.requiresRole !== undefined && menuItem.requiresRole !== this.userService.getDecodedToken(this.userService.getAuthToken()).role) {
      return false;
    }

    return true;
  }
}
