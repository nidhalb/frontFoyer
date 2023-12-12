import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { FoyerRoutingModule } from "./foyer-routing.module";
import { FoyerComponent } from "./foyer.component";
import { FoyerAddComponent } from "./foyer-add/foyer-add.component";
import { FoyerListComponent } from "./foyer-list/foyer-list.component";
import { FoyerEditComponent } from "./foyer-edit/foyer-edit.component";
import { ComponentsModule } from "../components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FoyerMapComponent } from "./foyer-map/foyer-map.component";
import { LatLngToAddressPipe } from "./LatLngToAddressPipe";
import { FoyerDeleteConfirmationComponent } from "./foyer-delete-confirmation/foyer-delete-confirmation.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StarRatingModule } from "angular-star-rating";
import { FoyerRatingComponent } from "./foyer-rating/foyer-rating.component";
import { ToastrModule } from "ngx-toastr";
import { EtudiantAddRatingComponent } from "./etudiant-add-rating/etudiant-add-rating.component";
import { AlertDirective } from "../alert.directive";
import { AddFoyerRatingComponent } from "./add-foyer-rating/add-foyer-rating.component";
@NgModule({
  declarations: [
    FoyerComponent,
    FoyerAddComponent,
    FoyerListComponent,
    FoyerEditComponent,
    FoyerMapComponent,
    LatLngToAddressPipe,
    FoyerDeleteConfirmationComponent,
    FoyerRatingComponent,
    AlertDirective,
    EtudiantAddRatingComponent,
    AddFoyerRatingComponent
    
  ],
  imports: [
    CommonModule,
    FoyerRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    
    NgbModule,
    StarRatingModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
})
export class FoyerModule {}
