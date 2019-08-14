import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Movement } from './movement';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  depositUrl = "http://localhost:8080/api/deposit";
  withdrawUrl= "http://localhost:8080/api/withdraw";
  transferUrl = "http://localhost:8080/api/transfer";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) {}

  deposit(deposit):Observable<Movement>{
    return this.http.post<Movement>(this.depositUrl, JSON.stringify(deposit), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  withdraw(withdraw):Observable<Movement>{
    return this.http.post<Movement>(this.withdrawUrl, JSON.stringify(withdraw), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  transfer(transfer):Observable<Movement>{
    return this.http.post<Movement>(this.transferUrl, JSON.stringify(transfer), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.errors[0];
    } else {
      errorMessage = error.error.errors[0];
    }
    return throwError(errorMessage);
 }

}
