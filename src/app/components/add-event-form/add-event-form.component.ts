// add-event-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Universite } from '../../models/universite.model';
import { UniversiteService } from 'src/app/services/universite.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.scss'],
})
export class AddEventFormComponent implements OnInit {
  eventForm: FormGroup;
  universities: Universite[];

  constructor(private fb: FormBuilder, private eventService: EventService, private uniser: UniversiteService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUniversities();
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventDate: ['', Validators.required],
      universityId: [null, Validators.required],
    });
  }

  loadUniversities(): void {
    this.uniser.getAllUniversities().subscribe(
      (data) => {
        this.universities = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData = { ...this.eventForm.value };
      const universityId = this.eventForm.get('universityId').value;
      
      this.eventService.createEventAndAssignToUniversity(eventData, universityId).subscribe(
        (response) => {
          console.log('Event created and assigned to university successfully:', response);
          this.router.navigate(['/admin/university-event']);
        },
        (error) => {
          console.log('Error creating event and assigning to university:', error);
        }
      );
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.eventForm.get(field);
    return control.invalid && (control.touched || control.dirty);
  }
}
