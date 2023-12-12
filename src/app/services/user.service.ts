import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8089/foyerProject';
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  private getHeaders(): HttpHeaders {
    const authToken = this.getAuthToken();
    let headers = new HttpHeaders();
    if (authToken !== null) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  getAuthToken(): string | null {
    return window.sessionStorage.getItem('auth_token');
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.sessionStorage.setItem('auth_token', token);
    } else {
      window.sessionStorage.removeItem('auth_token');
    }
  }

  request(method: string, url: string, data?: any): Observable<any> {
    const headers = this.getHeaders();

    switch (method.toLowerCase()) {
      case 'get':
        return this.httpClient.get(`${this.apiUrl}/${url}`, { headers });
      case 'post':
        return this.httpClient.post(`${this.apiUrl}/${url}`, data, { headers });
      case 'put':
        return this.httpClient.put(`${this.apiUrl}/${url}`, data, { headers });
      case 'delete':
        return this.httpClient.delete(`${this.apiUrl}/${url}`, { headers });
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
  getDecodedToken(token: string): any | null {
    try {
      const decodedToken = jwtDecode(token);
      // Check if the 'userId' field exists in the decoded token
      if (decodedToken ) {
        return decodedToken;
      } else {
        console.error('Token does not contain userId field');
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  logout(): void {
    this.setAuthToken(null);
  }
  authguard(): boolean {
    const token = this.getDecodedToken(this.getAuthToken());
    if (token) {
      token.exp
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime < token.exp;
    } 
    else {
      return false;
    }
  }

}
