import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountserviceService } from '../shared/account.service';

@Component({
  selector: 'accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent implements OnInit {

  Account: any = []

  accountSelected: number = 0;

  @Output() accountSelectedEvent = new EventEmitter<number>()

  constructor(public accountService: AccountserviceService) { }

  ngOnInit() {
    this.getAllAccounts();
    this.accountSelected = null;
  }

  getAllAccounts() {
    return this.accountService.getAllAccounts().subscribe((data: {}) => {
      this.Account = data;
    })
  }

  closeAccount(account) {
    if (window.confirm(`Do you want to close ${account.name} account?`)) {
      this.accountService.closeAccount(account).subscribe((data: {}) => {
        this.getAllAccounts();
      })
    }
  }

  selectAccount(index, accountId) {
    if (this.accountSelected == index) {
      this.accountSelected = null;
      this.accountSelectedEvent.emit(0);
    } else {
      this.accountSelected = index;
      this.accountSelectedEvent.emit(accountId);
    }
  }
}
