import { Universite } from "./universite.model";

export interface UniversityEvent {
    id: number;
    eventName: string;
    eventDescription: string;
    eventDate: Date;
    university: Universite; // Assuming you have a Universite model
  }