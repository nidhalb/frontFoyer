import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { BlocListComponent } from './bloc-list/bloc-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BlocAddDialogComponent } from './bloc-add-dialog/bloc-add-dialog.component';

@NgModule({
  declarations: [
    BlocListComponent,
    BlocAddDialogComponent
  ],
  imports: [
    CommonModule,
    BlocRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  entryComponents: [BlocAddDialogComponent]
})
export class BlocModule { }
