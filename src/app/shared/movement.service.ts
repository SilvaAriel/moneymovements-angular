import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Movement } from './movement';
import { DataformatterService } from './dataformatter.service';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  depositUrl = "https://financial-movements-api.herokuapp.com/api/deposit";
  withdrawUrl= "https://financial-movements-api.herokuapp.com/api/withdraw";
  transferUrl = "https://financial-movements-api.herokuapp.com/api/transfer";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient, private dataFormatter:DataformatterService) {}

  deposit(deposit):Observable<Movement>{
    const formattedMovement = this.dataFormatter.formatMovementValue(deposit);
    return this.http.post<Movement>(this.depositUrl, JSON.stringify(formattedMovement), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  withdraw(withdraw):Observable<Movement>{
    const formattedMovement = this.dataFormatter.formatMovementValue(withdraw);
    return this.http.post<Movement>(this.withdrawUrl, JSON.stringify(withdraw), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  transfer(transfer):Observable<Movement>{
    const formattedMovement = this.dataFormatter.formatMovementValue(transfer);
    return this.http.post<Movement>(this.transferUrl, JSON.stringify(transfer), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    errorMessage = error.error.errors[0];
    return throwError(errorMessage);
 }

}
