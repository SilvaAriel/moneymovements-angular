import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AccountserviceService } from '../shared/account.service';

@Component({
  selector: 'accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent implements OnInit {

  @Input() accountList: any = [];
  @Input() accountOneSelectedIndex: number = null;
  @Input() accountTwoSelectedIndex: number = null;
  @Input() notSelectedAccounts: number[] = [];

  @Output() accountSelectedEvent = new EventEmitter<number[]>();
  @Output() closeAccountEvent = new EventEmitter<Account>();

  constructor(public accountService: AccountserviceService) { }

  ngOnInit() {}

  closeAccount(account) {
    this.closeAccountEvent.emit(account);
  }

  selectAccount(index, accountId) {
    this.accountSelectedEvent.emit([index, accountId]);
  }
}
