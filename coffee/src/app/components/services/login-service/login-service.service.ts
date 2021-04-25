import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _router: Router, private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

  authSubject = false;

  login(user: string, password: string, role: string): Observable<any> {

    return this.httpClient.post(environment.apiURL + '/users/login', { username: user, password: password, role: role }).pipe(
      tap(async (res: any) => {
        if (res) {
          localStorage.setItem("userInfo", JSON.stringify(res));
          this.authSubject = true;
          return res;
        }
      })
    );
  }

  logout() {
    this.authSubject = false;
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('userInfo');
    this._router.navigate(['/login'])
  }

  isAuthenticated() {
    return this.authSubject;
  }
}
