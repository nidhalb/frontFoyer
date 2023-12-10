import { Injectable } from '@angular/core';
import { Bloc } from '../models/Bloc';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Foyer } from '../models/Foyer';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  private baseUrl = 'http://localhost:8081/tpFoyer/foyer'

  constructor(private http: HttpClient) { }

  getAllFoyer(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.baseUrl}/getAll`);
  }

  getOneFoyer(idFoyer:number): Observable<Foyer> {
    return this.http.get<Foyer>(`${this.baseUrl}/getOne/${idFoyer}`);
  }

}
