import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserAuthGuard } from '../../services/user-auth-guard.service';
import { RoleGuardGuard } from 'src/app/services/role-guard.guard';
import { ListeUsersComponent } from 'src/app/pages/Users/liste-users.component';
import { ListeUserDetailsComponent } from 'src/app/pages/liste-user-details/liste-user-details.component';
import { UserDetailsComponent } from 'src/app/pages/user-details/user-details.component';

export const AdminLayoutRoutes: Routes = [
    {path: '', canActivate:[UserAuthGuard], children:[
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'users',         component: ListeUsersComponent,canActivate: [RoleGuardGuard] },
    { path: 'user/:id', component: UserDetailsComponent,canActivate: [RoleGuardGuard] },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    ]},
    {
        path: 'reservation',
        loadChildren: () => import('./../../pages/reservation/reservation.module').then(m => m.ReservationModule)
    }, 
];
