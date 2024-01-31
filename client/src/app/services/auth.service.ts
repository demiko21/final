// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44330/api/User';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  register(username: any, email: any, password: any): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  login(username: any, password: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,
      {
        username, password
      }, {
        responseType: 'text',
        headers: {
          'Content-type': 'application/json'
        }
      }
    )
  }
}
