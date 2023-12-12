import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UniversiteListComponent } from './universite-list/universite-list.component';
import { UniversityTableComponent } from './university-table/university-table.component';
import { AddUniversityFormComponent } from './components/add-university-form/add-university-form.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventFormComponent } from './components/add-event-form/add-event-form.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { EditUniversityComponent } from './components/edit-university/edit-university.component';

const routes: Routes =[
  { path: 'un',
  component: AuthLayoutComponent,
    children: [
      { path: 'universities', component: UniversiteListComponent,
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)}
    ]
  },  
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'university-table', component: UniversityTableComponent,
       loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      },
      { path: 'edit-university/:id', component: EditUniversityComponent },
      { path: 'add-university', component: AddUniversityFormComponent },
      { path: 'university-event', component: EventListComponent },
      { path: 'add-event', component: AddEventFormComponent },
      { path: 'stat', component: StatisticComponent },

    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  { path: 'un',
  component: AuthLayoutComponent,
    children: [
      { path: 'universities', component: UniversiteListComponent,
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)}
    ]
  },  
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'university-table', component: UniversityTableComponent,
       loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      },
      { path: 'edit-university/:id', component: EditUniversityComponent },
      { path: 'add-university', component: AddUniversityFormComponent },
      { path: 'university-event', component: EventListComponent },
      { path: 'add-event', component: AddEventFormComponent },
      { path: 'stat', component: StatisticComponent },

    ]
  },
  { path: 'foyer', loadChildren: () => import('./foyer/foyer.module').then(m => m.FoyerModule) }
  ,{
    path: '**',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
