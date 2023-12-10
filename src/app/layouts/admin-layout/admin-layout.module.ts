import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListeUsersComponent } from 'src/app/pages/Users/liste-users.component';
import { ListeUserDetailsComponent} from 'src/app/pages/liste-user-details/liste-user-details.component';
import { UserDetailsComponent } from 'src/app/pages/user-details/user-details.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ListeUsersComponent,
    ListeUserDetailsComponent,
    UserDetailsComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
