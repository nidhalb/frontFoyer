import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlocListComponent } from "./bloc-list/bloc-list.component";

const routes: Routes = [
  {
    path: "",
    component: BlocListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlocRoutingModule {}
