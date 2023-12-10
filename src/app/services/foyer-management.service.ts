import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Foyer } from "src/app/models/foyer.model";
import { Rate } from "../models/rate.model";

@Injectable({
  providedIn: "root",
})
export class FoyerManagementService {
  apiUrl = "http://localhost:8089/foyerProject/foyer";

  constructor(private http: HttpClient) {}
  getAll(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/get`).pipe(
      catchError((error: any) => {
        console.error("Error fetching", error);
        return throwError(() => error);
      })
    );
  }
  addFoyer(foyer: any): Observable<Foyer[]> {
    return this.http.post<Foyer[]>(`${this.apiUrl}/add`, foyer).pipe(
      catchError((error: any) => {
        console.error("Error adding", error);
        return throwError(() => error);
      })
    );
  }
  deleteFoyer(foyerId: number): Observable<Foyer[]> {
    return this.http.delete<Foyer[]>(`${this.apiUrl}/delete/${foyerId}`).pipe(
      catchError((error: any) => {
        console.error("Error deleting", error);
        return throwError(() => error);
      })
    );
  }
  getFoyerById(foyerId: number): Observable<Foyer> {
    return this.http.get<Foyer>(`${this.apiUrl}/get/${foyerId}`).pipe(
      catchError((error: any) => {
        console.error("Error fetching", error);
        return throwError(() => error);
      })
    );
  }
  getFoyerByNom(nomf: string): Observable<any> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/getbynom/${nomf}`).pipe(
      catchError((error: any) => {
        console.error("Error fetching", error);
        return throwError(() => error);
      })
    );
  }

  updateFoyer(foyer: Foyer): Observable<any> {
    return this.http.put<Foyer>(`${this.apiUrl}/edit`, foyer).pipe(
      catchError((error: any) => {
        console.error("Error updating", error);
        return throwError(() => error);
      })
    );
  }
  getFoyersByRegion(region: string): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}?region=${region}`);
  }
  getAllFoyers(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());

    return this.http.get(`${this.apiUrl}/get`, { params });
  }
  addRatingForFoyer(rating: Rate, foyerId: number): Observable<Rate> {
    const url = `${this.apiUrl}/addRatingForFoyer/${foyerId}`;
    return this.http.post<Rate>(url, rating);
  }
  calculateAverageRate(foyerId: number): Observable<number> {
    const url = `${this.apiUrl}/getRating/${foyerId}`;
    return this.http.get<number>(url);
  }
}
