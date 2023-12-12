// edit-chambers-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChamberService } from 'src/app/services/chamber.service';

@Component({
  selector: 'app-edit-chambers',
  templateUrl: './edit-chambers.component.html',
  styleUrls: ['./edit-chambers.component.scss']
})
export class EditChambersComponent implements OnInit {
  @Input() selectedBlocId: string = '';
  @Input() chamberId: number;
  @Output() chamberEdited: EventEmitter<void> = new EventEmitter<void>;
  editChamberForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chamberService: ChamberService
  ) { }

  ngOnInit(): void {
    this.editChamberForm = this.formBuilder.group({
      numeroChambre: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      typeC: ['SIMPLE', Validators.required],
    });

    // Fetch chamber data based on the chamberId and populate the form
    this.chamberService.getChamberbyId(this.chamberId).subscribe(
      (chamberData) => {
        // Populate form fields with the fetched data
        this.editChamberForm.patchValue({
          numeroChambre: chamberData.numeroChambre,
          typeC: chamberData.typeC,
        });
      },
      (error) => {
        console.error('Error fetching chamber data', error);
      }
    );
  }

  get formControls() {
    return this.editChamberForm.controls;
  }
numeroChamber:number;
Type
  saveChanges(): void {
    if (this.editChamberForm.valid) {
      // Perform the logic to update only the specified fields of the chamber
      
      this.chamberService.updateChamberData(this.editChamberForm.value, this.chamberId).subscribe(
        (response) => {
          console.log('Chamber updated successfully', response);
  
          // Fetch the updated current bloc capacity
          this.chamberService.getBlocCurrentCapacity(this.selectedBlocId).subscribe(
            (currentCapacity) => {
              this.currentBlocCapacity = currentCapacity;
              console.log('Current bloc capacity', this.currentBlocCapacity);
            },
            (error) => {
              console.error('Error fetching current bloc capacity', error);
            }
          );
  
          // Reset the form and emit the event
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
          this.editChamberForm.reset();
          this.chamberEdited.emit();
        },
        (error) => {
          console.error('Error updating chamber', error);
        }
      );
    } else {
      console.log('Invalid Form');
    }
  }
  showSuccessMessage=false;

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }
  calculateChamberCount(chamberType: string): number {
    if (chamberType === 'SIMPLE') {
      return 1;
    } else if (chamberType === 'DOUBLE') {
      return 2;
    } else if (chamberType === 'TRIPLE') {
      return 3;
    }
    return 0; 
  }
  capacityErrorMessage: string = '';
  maxBlocCapacity: number = 0;
  currentBlocCapacity: number = 0;

  isCapacityExceeded(): boolean {
    const chamberData = this.editChamberForm.value;
    const chamberCount = this.calculateChamberCount(chamberData.typeC);
    return this.currentBlocCapacity + chamberCount > this.maxBlocCapacity;
  }
}