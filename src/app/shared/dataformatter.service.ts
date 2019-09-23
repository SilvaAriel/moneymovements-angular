import { Injectable } from '@angular/core';
import { Account } from './account';
import { Movement } from './movement';

@Injectable({
  providedIn: 'root'
})
export class DataformatterService {

  constructor() { }

  formatAccountBalance(account:Account):Account {
    const formattedBalance = account.balance.toString().replace(",",".")
    account.balance = +formattedBalance;
    return account;
  }

  formatMovementValue(movement:Movement):Movement {
    const formattedValue = movement.value.replace(",",".");
    movement.value = formattedValue;
    return movement;
  }
}
