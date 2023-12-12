import { Injectable } from '@angular/core';
import { Bloc } from '../models/bloc';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Foyer } from '../models/foyer.model';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  private baseUrl = 'http://localhost:8089/foyerProject/foyer'

  constructor(private http: HttpClient) { }

  getAllFoyer(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.baseUrl}/get`);
  }

  getOneFoyer(idFoyer:number): Observable<Foyer> {
    return this.http.get<Foyer>(`${this.baseUrl}/get/${idFoyer}`);
  }

}
