import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MapsComponent } from "./pages/maps/maps.component";
import { ConfirmDeleteDirective } from "./confirm-delete.directive";
import { StarRatingModule } from "angular-star-rating";
import { ToastrModule } from "ngx-toastr";
import { AlertDirective } from "./alert.directive";
import { UniversiteComponent } from './universite/universite.component';
import { UniversiteListComponent } from './universite-list/universite-list.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { UniversityCardComponent } from './university-card/university-card.component';
import { UniversityTableComponent } from './university-table/university-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UniversityDetailsDialogComponent } from './university-details-dialog/university-details-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    LeafletModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    StarRatingModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    MatIconModule,
    MatDialogModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UniversiteComponent,
    UniversiteListComponent,
    UniversityCardComponent,
    UniversityTableComponent,
    SearchBarComponent,
    UniversityDetailsDialogComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
