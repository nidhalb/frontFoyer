import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambersComponent } from './List-Chambers/chambers.component';
import { EditChambersComponent } from './Edit-Chambers/edit-chambers/edit-chambers.component';

const routes: Routes = [
  { path: '',       component: ChambersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChambersRoutingModule { }
