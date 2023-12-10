import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { ConfirmDeleteDirective } from './confirm-delete.directive';
import { StarRatingModule } from 'angular-star-rating';

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
    StarRatingModule.forRoot(),

  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, ConfirmDeleteDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
