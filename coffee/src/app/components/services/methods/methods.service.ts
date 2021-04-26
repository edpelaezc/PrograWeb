import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {

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

  getMethods(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/method/list`).pipe(
      tap(res => {
        if (res) {
          return res
        } else {
          return { error: 'error' }
        }
      })
    )
  }

  getServices(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/service/list`).pipe(
      tap(res => {
        if (res) {
          return res
        } else {
          return { error: 'error' }
        }
      })
    )
  }

  getCoffeeTypes(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/coffee/list`).pipe(
      tap(res => {
        if (res) {
          return res
        } else {
          return { error: 'error' }
        }
      })
    )
  }

  createPurchase(purchase: any): Observable<any> {
    return this.httpClient.post(environment.apiURL + '/purchase/create', JSON.stringify(purchase), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }
}
