import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Account } from '../shared/account';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  apiUrl = "http://localhost:8080/api/account";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) {}

    openAccount(account):Observable<Account> {
      return this.http.post<Account>(this.apiUrl, JSON.stringify(account), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
    }

    getAllAccounts():Observable<Account[]>{
      return this.http.get<Account[]>(this.apiUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    closeAccount(account):Observable<Account>{
      return this.http.patch<Account>(this.apiUrl, JSON.stringify(account), this.httpOptions)
      .pipe (
        retry(1),
        catchError(this.handleError)
      );
    }

    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }

  }