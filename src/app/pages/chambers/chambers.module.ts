import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChambersRoutingModule } from './chambers-routing.module';
import { ChambersComponent } from './List-Chambers/chambers.component';
import { AddChambersComponent } from './Add-Chambers/add-chambers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { EditChambersComponent } from './Edit-Chambers/edit-chambers/edit-chambers.component';


@NgModule({
  declarations: [
  
    ChambersComponent,
    AddChambersComponent,
    EditChambersComponent
  ],
  imports: [
    FormsModule, 
    CommonModule,
    ChambersRoutingModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,CommonModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class ChambersModule { }

