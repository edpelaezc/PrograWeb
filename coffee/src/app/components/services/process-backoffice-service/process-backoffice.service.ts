import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessBackofficeService {

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

  getProcesses(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/process`).pipe(
      tap(res => {
        if (res) {
          return res
        } else {
          return { error: 'error' }
        }
      })
    )
  }

  createProcess(processItem: any): Observable<any> {
    return this.httpClient.post(environment.apiURL + '/process/create', JSON.stringify(processItem), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }

  putProcess(processItem: any, id: string): Observable<any> {
    return this.httpClient.put(environment.apiURL + `/process/update/${id}`, JSON.stringify(processItem), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
  }

  deleteProcess(id: string): Observable<any> {
    return this.httpClient.delete(environment.apiURL + `/process/delete/${id}`).pipe(catchError(this.handleError));
  }
}
