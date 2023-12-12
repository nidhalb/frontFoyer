import { Injectable } from '@angular/core';
import { Bloc } from '../models/Bloc';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlocService {
  private baseUrl = 'http://localhost:8081/tpFoyer/bloc'

  constructor(private http: HttpClient) { }

  getAllBlocs(): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.baseUrl}/getAll`);
  }

  addBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(`${this.baseUrl}/add`, bloc);
  }

  updateBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.put<Bloc>(`${this.baseUrl}/update`, bloc);
  }

  deleteBloc(idBloc: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${idBloc}`);
  }

}
