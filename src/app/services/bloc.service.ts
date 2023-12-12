import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Bloc } from '../models/bloc.model';

@Injectable({
  providedIn: 'root'
})
export class BlocService {
  private baseUrl = 'http://localhost:8089/foyerProject/bloc'

  constructor(private http: HttpClient) { }

  getAllBlocs(): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.baseUrl}/get`);
  }

  addBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(`${this.baseUrl}/add`, bloc);
  }

  updateBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.put<Bloc>(`${this.baseUrl}/edit`, bloc);
  }

  deleteBloc(idBloc: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${idBloc}`);
  }

}
