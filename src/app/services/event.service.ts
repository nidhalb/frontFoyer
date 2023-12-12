// event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniversityEvent } from '../models/univesity-event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8089/foyerProject/event';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<UniversityEvent[]> {
    return this.http.get<UniversityEvent[]>(`${this.baseUrl}`);
  }

  getEventsByUniversity(universityId: number): Observable<UniversityEvent[]> {
    return this.http.get<UniversityEvent[]>(`${this.baseUrl}/by-university/${universityId}`);
  }

  getEventsInDateRange(universityId: number, startDate: string, endDate: string): Observable<UniversityEvent[]> {
    return this.http.get<UniversityEvent[]>(`${this.baseUrl}/date-range/${universityId}?startDate=${startDate}&endDate=${endDate}`);
  }

  getLatestEventsForUniversity(universityId: number): Observable<UniversityEvent[]> {
    return this.http.get<UniversityEvent[]>(`${this.baseUrl}/latest/${universityId}`);
  }

  createEvent(event: UniversityEvent): Observable<UniversityEvent> {
    return this.http.post<UniversityEvent>(`${this.baseUrl}`, event);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${eventId}`);
  }
  

  getUpcomingEventMessages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/upcoming-events/messages`);
  }

  createEventAndAssignToUniversity(event: UniversityEvent, universityId: number): Observable<UniversityEvent> {
    const url = `${this.baseUrl}/addEventAndAssignToUn/${universityId}`;
    return this.http.post<UniversityEvent>(url, event);
  }
}
