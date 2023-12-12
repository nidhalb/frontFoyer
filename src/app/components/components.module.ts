import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUniversityFormComponent } from './add-university-form/add-university-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { EventListComponent } from './event-list/event-list.component';
import { AddEventFormComponent } from './add-event-form/add-event-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StatisticComponent } from './statistic/statistic.component';
import { UniversityCardComponent } from '../university-card/university-card.component';
import { EditUniversityComponent } from './edit-university/edit-university.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AddUniversityFormComponent,
    EventListComponent,
    AddEventFormComponent,
    StatisticComponent,
    EditUniversityComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AddUniversityFormComponent,
    EventListComponent,
    EditUniversityComponent
  ]
})
export class ComponentsModule { }
