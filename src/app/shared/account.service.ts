import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Account } from '../shared/account';
import { DataformatterService } from './dataformatter.service';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  apiUrl = "https://financial-movements-api.herokuapp.com/api/account";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient, private dataFormatter:DataformatterService) {}

    openAccount(account):Observable<Account> {
      let formattedAccount = this.dataFormatter.formatAccountBalance(account);
      return this.http.post<Account>(this.apiUrl, JSON.stringify(formattedAccount), this.httpOptions)
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
      errorMessage = error.error.message;
      return throwError(errorMessage);
   }

  }