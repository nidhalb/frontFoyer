import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FoyerComponent } from "./foyer.component";
import { FoyerListComponent } from "./foyer-list/foyer-list.component";
import { FoyerAddComponent } from "./foyer-add/foyer-add.component";
import { FoyerEditComponent } from "./foyer-edit/foyer-edit.component";

const routes: Routes = [
  { path: "", component: FoyerListComponent },
  { path: "add", component: FoyerAddComponent },
  { path: "edit/:id", component: FoyerEditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoyerRoutingModule {}
