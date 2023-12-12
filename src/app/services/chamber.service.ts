import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { chamber } from '../models/chamber';
import { Bloc } from '../models/bloc.model';
@Injectable({
  providedIn: 'root'
})
export class ChamberService {
  private BlocUrl = 'http://localhost:8089/foyerProject/bloc';
  private baseUrl = 'http://localhost:8089/foyerProject/chambre';
  constructor(private http: HttpClient) { }
  

  getAllChambers(): Observable<chamber[]> {
    return this.http.get<chamber[]>(`${this.baseUrl}/get`);
  }
    CreateChambers(blocID: string, chamberData: any): Observable<any> {
    // You need to adjust the API endpoint and HTTP method according to your backend API
    return this.http.post(`${this.baseUrl}/CreateRoom/${blocID}`, chamberData);
  }

getChamberbyId(idChambre: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/get/${idChambre}`);
}
updateChamberData(chamber :any ,idChambre: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/update/${idChambre}`,chamber);
}

  bulkCreateChambers(chambers: chamber[]): Observable<any> {
    const url = `${this.baseUrl}/bulk-create`;
    return this.http.post(url, chambers);
} 

  DeleteChamber(idChambre: number): Observable<any> {
  const url = `${this.baseUrl}/delete/${idChambre}`;  
  return this.http.delete(url);
}

getChambersByBloc(blocId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/getchaambre/${blocId}`);
}
getAllBlocs(): Observable<Bloc[]> {
  return this.http.get<Bloc[]>(`${this.BlocUrl}/get`);
}

getBlocMaxCapacity(blocId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/getBlocMaxCapacity/${blocId}`);
}
getBlocCurrentCapacity(blocId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/getBlocCapacityActive/${blocId}`);


}
}