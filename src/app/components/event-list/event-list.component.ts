// event-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { UniversityEvent } from '../../models/univesity-event.model';
import { UniversiteService } from 'src/app/services/universite.service';
import { Universite } from 'src/app/models/universite.model';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: UniversityEvent[] = [];
  universities: Universite[] = [];
  selectedUniversity: number;
  selected:number;
  universityId: number; startDate: string; endDate: string;
  displayedColumns: string[] = ['number', 'eventName', 'eventDescription', 'eventDate', 'universityName', 'action'];
  messages: string[] = [];

  constructor(private eventService: EventService, private universiteService: UniversiteService, private router: Router, private snackBar: MatSnackBar) {}

  dataSource = new MatTableDataSource<UniversityEvent>(this.events);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadEvents();
    this.loadUniversities();
    this.dataSource.paginator = this.paginator;
    this.fetchMessages();
  }
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.events.slice(startIndex, endIndex);
  } 
  
  fetchMessages() {
    this.eventService.getUpcomingEventMessages().subscribe(
      (data) => {
        const newMessages = data.filter(message => !this.messages.includes(message));
        if (newMessages.length > 0) {
          this.messages = data;
          this.showSnackBar(newMessages);
        }
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }
  showSnackBar(messages: string[]) {
    const alertMessage = messages.join('\n');
    this.snackBar.open(alertMessage, 'Close', {
      duration: 5000, // Adjust the duration as needed
      panelClass: 'custom-snackbar', // Add a custom CSS class for styling (optional)
    });
  }
  
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data;
        this.dataSource.data = this.events;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;  
          console.log('Events:', this.events, this.paginator);
        }, 0);
      },
      (error) => {
        console.log(error);
      }
    );
  }
   

  loadUniversities(): void {
    this.universiteService.getAllUniversities().subscribe(
      (data) => {
        this.universities = data;
        console.log('Universities:', this.universities);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUniversityChange(): void {
    console.log('Selected University:', this.selectedUniversity);
  }

  onChange(): void {
    console.log('Selected University:', this.selected);
  }

  fetchData(selectedUniversity: number, startDate: string, endDate: string): void {
    if (startDate && endDate) {
      this.eventService
      .getEventsInDateRange(selectedUniversity, startDate, endDate)
      .subscribe((events) => {
        this.events = events;
        this.dataSource.paginator = this.paginator;
        console.log('Fetched events:', events);
      });
    } else {
      this.eventService.getLatestEventsForUniversity(selectedUniversity).subscribe(
        (events) => {
          this.events = events;
          this.dataSource.paginator = this.paginator;
          console.log('Latest Events:', this.events);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.paginator.firstPage();
  }
  

  fetchEventsByUniversity(): void {
    if (this.selected) {
      this.eventService.getEventsByUniversity(this.selected).subscribe(
        (events) => {
          this.events = events;
          this.dataSource.paginator = this.paginator;
          console.log('Events By University:', this.events);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.paginator.firstPage();
  }
  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }
  editEvent(id: number): void {
    this.router.navigate(["admin/edit-event", id]);
  }
  addNewEvent(): void {
    this.router.navigate(["/admin/add-event"]);
  }

}
