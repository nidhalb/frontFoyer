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
import { FoyerMapComponent } from './foyer-map/foyer-map.component';
@NgModule({
  declarations: [
    FoyerComponent,
    FoyerAddComponent,
    FoyerListComponent,
    FoyerEditComponent,
    FoyerMapComponent,
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
    MatSelectModule
  ],
})
export class FoyerModule {}
