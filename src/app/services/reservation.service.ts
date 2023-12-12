import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { chamber } from '../models/chambre';
import { universite } from '../models/universite';
import { Foyer } from '../models/Foyer';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8089/foyerProject/reservation'

  constructor(private http: HttpClient) { }

  addReservation(reservation: Reservation, idChambre: number): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/addReservationAndAssignToChambre/${idChambre}`, reservation);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/get`);
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/get/${id}`);
  }

  getReservationsByUser(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/getReservationByetudiant/${id}`);
  }

  deleteReservation(id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }

  getChambre(idReservaion: number): Observable<chamber> {
    return this.http.get<chamber>(`${this.baseUrl}/findByReservation/${idReservaion}`);
  }

  updateState(reservation: Reservation, state: string): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/updateState/${state}`, reservation);
  }

  getNumberEtudiantForChambrebyRes(idReservaion: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/findNumberEtudiantInCHambre/${idReservaion}`);
  }

  getAlluniversities(): Observable<universite[]> {
    return this.http.get<universite[]>("http://localhost:8089/foyerProject/universite/get");
  }

  getfoyerbyuniversite(idUniversite: number): Observable<Foyer> {
    return this.http.get<Foyer>("http://localhost:8089/foyerProject/foyer/getbyUniversite/"+idUniversite);
  }

  getAllEtudiants(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8089/foyerProject/etudiant/getEd");
  }

  getNumberEtudiantForChambrebyChambre(idChambre: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/findNumberEtudiantInCHambreByChambre/${idChambre}`);
  }

}
