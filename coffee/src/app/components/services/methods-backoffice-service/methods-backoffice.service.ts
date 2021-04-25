import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MethodsBackofficeService {

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
    return this.httpClient.get(`${environment.apiURL}/method`).pipe(
      tap(res => {
        if (res) {
          return res
        } else {
          return { error: 'error' }
        }
      })
    )
  }

  createMethod(subscription: any): Observable<any> {
    return this.httpClient.post(environment.apiURL + '/method/create', JSON.stringify(subscription), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }

  putMethod(subscription: any, id: string): Observable<any> {
    return this.httpClient.put(environment.apiURL + `/method/update/${id}`, JSON.stringify(subscription), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }

  deleteMethod(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiURL + `/method/delete/${id}`).pipe(catchError(this.handleError));
  }
}
