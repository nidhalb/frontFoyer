import { Injectable } from '@angular/core';
import { Universite } from '../models/universite.model';
import { Observable } from 'rxjs';
import { Foyer } from '../models/foyer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  private baseUrl = 'http://localhost:8089/foyerProject/universite'
  private baseUrl2 = 'http://localhost:8089/foyerProject/foyer'


  constructor(private htpp: HttpClient) { }


  getAllUniversities(): Observable<Universite[]> {
    return this.htpp.get<Universite[]>(`${this.baseUrl}/get`);
  }
  deleteUniversity(id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.htpp.delete<void>(url);
  }
  updateUniversity(university: Universite): Observable<Universite> {
    const url = `${this.baseUrl}/edit`;
    return this.htpp.put<Universite>(url, university);
  }
  getUniversityById(id: number): Observable<Universite> {
    const url = `${this.baseUrl}/get/${id}`;
    return this.htpp.get<Universite>(url);
  }
  getAllFoyers(): Observable<Foyer[]> {
    const url = `${this.baseUrl2}/get`;
    return this.htpp.get<Foyer[]>(url);
  }
  getAllFoyersNotAssigned(): Observable<Foyer[]> {
    const url = `${this.baseUrl}/not-assigned`;
    return this.htpp.get<Foyer[]>(url);
  }
  addUniversity(universite: Universite): Observable<Universite> {
    return this.htpp.post<Universite>(`${this.baseUrl}/add`, universite);
  }
  addUniversityAndAssignToFoyer(universite: Universite, foyerId: number): Observable<Universite> {
    const requestBody = {
      universite,
      foyerId
    };
    return this.htpp.post<Universite>(`${this.baseUrl}/addUniversityAndAssignToFoyer/${foyerId}`, requestBody);  
  }
  searchByName(name: string): Observable<Universite[]> {
    return this.htpp.get<Universite[]>(`${this.baseUrl}/searchByName?name=${name}`);
  }

  searchByAddress(address: string): Observable<Universite[]> {
    return this.htpp.get<Universite[]>(`${this.baseUrl}/searchByAddress?address=${address}`);
  }

  searchByFoyer(idF: number): Observable<Universite[]> {
    return this.htpp.get<Universite[]>(`${this.baseUrl}/searchByFoyer?idF=${idF}`);
  }

  calculateAverageBlocCapacity(universityId: number): Observable<number> {
    const url = `${this.baseUrl}/${universityId}/average-bloc-capacity`;
    return this.htpp.get<number>(url);
  }

}

