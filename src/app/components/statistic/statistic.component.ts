// statistic.component.ts
import { Component, OnInit } from '@angular/core';
import { UniversiteService } from '../../services/universite.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  universities: any[] = []; 
  selectedUniversityId: number;
  averageBlocCapacity: number;

  constructor(private universityService: UniversiteService) {}

  ngOnInit(): void {
    this.loadUniversities();
  }

  loadUniversities() {
    // Assuming you have a service method to fetch the list of universities
    this.universityService.getAllUniversities().subscribe(
      (data) => {
        this.universities = data;
        this.selectedUniversityId = this.universities.length > 0 ? this.universities[0].id : null;
        this.calculateAverageBlocCapacity();
      },
      (error) => {
        console.error('Error fetching universities:', error);
      }
    );
  }

  calculateAverageBlocCapacity() {
    if (this.selectedUniversityId) {
      this.universityService.calculateAverageBlocCapacity(this.selectedUniversityId).subscribe(
        (result) => {
          this.averageBlocCapacity = result;
        },
        (error) => {
          console.error('Error calculating average bloc capacity:', error);
        }
      );
    }
  }

  onUniversityChange() {
    this.calculateAverageBlocCapacity();
  }
}

