import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) { }

  login(userNick: string, passWD: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    return this.http.post(`${this.apiUrl}loginST`, {
      userNick,
      passWD
    }, options);
  }

  logout() {
    // ¡Devuelve el observable!
    return this.http.post(`${this.apiUrl}logoutST`, {}, { withCredentials: true });
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}checkSession`, {
      withCredentials: true
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}