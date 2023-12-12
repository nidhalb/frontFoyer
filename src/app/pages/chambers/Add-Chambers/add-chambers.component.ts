import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChamberService } from '../../../services/chamber.service';
import { bloc } from 'src/app/models/bloc';

@Component({
  selector: 'app-add-chambers',
  templateUrl: './add-chambers.component.html',
  styleUrls: ['./add-chambers.component.scss']
})
export class AddChambersComponent implements OnInit {
  @Input() selectedBlocId: string = '';
  @Output() chamberAdded: EventEmitter<void> = new EventEmitter<void>();
  addChamberForm: FormGroup;
  capacityErrorMessage: string = '';
  maxBlocCapacity: number = 0;
  currentBlocCapacity: number = 0;
  showSuccessMessage=false;
  constructor(
    private formBuilder: FormBuilder,
    private chamberService: ChamberService
  ) { }

  ngOnInit(): void {
    console.log(this.selectedBlocId);
    this.addChamberForm = this.formBuilder.group({
      numeroChambre: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      typeC: ['SIMPLE', Validators.required],
    });
    this.chamberService.getBlocMaxCapacity(this.selectedBlocId).subscribe(
      (maxCapacity) => {
        this.maxBlocCapacity = maxCapacity;
      },
      (error) => {
        console.error('Error fetching max bloc capacity', error);
      }
    );
    this.chamberService.getBlocCurrentCapacity(this.selectedBlocId).subscribe(
      (currentCapacity) => {
        this.currentBlocCapacity = currentCapacity;
        console.log('Current bloc capacity', this.currentBlocCapacity); 
      },
      (error) => {
        console.error('Error fetching current bloc capacity', error);
      }
    );

  }
  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }


  get formControls() {
    return this.addChamberForm.controls;
  }

  addChamber() {
    console.log(this.selectedBlocId);
    if (this.addChamberForm.valid) {
      const chamberData = this.addChamberForm.value;

      // Check if adding the chamber exceeds the bloc capacity
      const chamberCount = this.calculateChamberCount(chamberData.typeC);
      if (this.currentBlocCapacity + chamberCount <= this.maxBlocCapacity) {
        // Perform the logic to add the chamber to the bloc
        this.chamberService.CreateChambers(this.selectedBlocId, chamberData).subscribe(
          (response) => {
            console.log('Chamber added successfully', response);
            
            
            this.chamberService.getBlocCurrentCapacity(this.selectedBlocId).subscribe(
              (currentCapacity) => {
                this.currentBlocCapacity = currentCapacity;
                console.log('Current bloc capacity', this.currentBlocCapacity);
               
              },
              (error) => {
                console.error('Error fetching current bloc capacity', error);
              }
            );
            this.showSuccessMessage = true;
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 5000);
            this.addChamberForm.reset();
            this.chamberAdded.emit();
          },
          (error) => {
            console.error('Error adding chamber', error);
          }
        );
      } else {
        console.log('Adding this chamber would exceed the bloc capacity.');
      }
    } else {
      console.log('Invalid Form');
    }
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


  isCapacityExceeded(): boolean {
    const chamberData = this.addChamberForm.value;
    const chamberCount = this.calculateChamberCount(chamberData.typeC);
    return this.currentBlocCapacity + chamberCount > this.maxBlocCapacity;
  }
  
}
