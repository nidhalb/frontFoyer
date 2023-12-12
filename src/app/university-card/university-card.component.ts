// university-card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Universite } from '../models/universite.model';
import { UniversityDetailsDialogComponent } from '../university-details-dialog/university-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-university-card',
  templateUrl: './university-card.component.html',
  styleUrls: ['./university-card.component.css'],
})

export class UniversityCardComponent {
  "styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.css"
  ]  
  @Input() university: Universite;
  @Output() viewClick: EventEmitter<Universite> = new EventEmitter<Universite>();

  constructor(public dialog: MatDialog) {}



  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(UniversityDetailsDialogComponent, {
      width: '400px',
      data: { university: this.university },
    });
  }

}
