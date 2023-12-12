import { Component, Inject, OnInit } from '@angular/core';
import { Universite } from '../models/universite.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-university-details-dialog',
  templateUrl: './university-details-dialog.component.html',
  styleUrls: ['./university-details-dialog.component.css']
})
export class UniversityDetailsDialogComponent implements OnInit {

  university: Universite;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.university = data.university;
  }

  ngOnInit(): void {
  }


  

}
