import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AccountserviceService } from '../shared/account.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [NotificationService]
})
export class AccountComponent implements OnInit {

  accounts: any[] = [];

  accountOneId: number;
  accountTwoId: number;
  accountOneIndex: number = null;
  accountTwoIndex: number = null;

  transferOperation: boolean = false;
  notSelectedAccounts: number[] = [];

  selectDestinationMessage: boolean = false;

  openAccountFormGroup: FormGroup;
  openAccountFormData = {name: '', balance: ''};

  constructor(
    public accountService: AccountserviceService,
    private notificationService: NotificationService) {
    this.openAccountFormGroup = this.createOpenAccountFormGroup();
   }

  ngOnInit() {
    this.getAllAccounts();
  }

  openAccount() {
    this.accountService.openAccount(this.openAccountFormData).subscribe(
      (data: {}) => {
        this.getAllAccounts();
        this.notificationService.showSuccess('Account oppened');
        this.openAccountFormGroup.reset();
      },
      (error: string) => {
        this.notificationService.showError(error);
      });
  }

  getAllAccounts() {
    return this.accountService.getAllAccounts().subscribe(
      (data: Account[]) => {
        this.accounts = data;
    });
  }

  closeAccount(account) {
    if (window.confirm(`Do you really want to close the account ${account.name}?`)) {
      this.accountService.closeAccount(account).subscribe((data: {}) => {
        this.getAllAccounts();
        this.accountOneId = null;
      });
    }
  }

  updateOpenAccountFormData(form: FormGroup) {
    this.openAccountFormData.name = form.controls.accountName.value;
    this.openAccountFormData.balance = form.controls.balance.value;
    this.openAccount();
  }

  setTransferOperation(isTransfer: boolean) {
    this.transferOperation = isTransfer;
    if (this.transferOperation == true && this.selectDestinationMessage == false) {
      if (this.accountTwoId == null) {
        this.selectDestinationMessage = true;
      }
    } else {
      this.selectDestinationMessage = false;
      this.accountTwoId = null;
      this.transferOperation = false;
      this.accountTwoIndex = null;
      this.notSelectedAccounts = [];
    }
  }

  selectAccount(numbers: number[]) {
    const index = numbers[0];
    const accountId = numbers[1];

    if (this.accountTwoIndex == null && (this.accountOneIndex == null || this.accountOneIndex != index)) {
      if (this.accountOneIndex != index && this.accountOneIndex != null && this.transferOperation) {
        this.accountTwoIndex = index;
        this.accountTwoId = accountId;
        this.disableAccountsNotSelected();
        this.selectDestinationMessage = false;
      } else {
        this.accountOneIndex = index;
        this.accountOneId = accountId;
      }
    } else if (this.accountOneIndex == index || this.accountTwoIndex == index) {
      if (this.accountOneIndex == index) {
        this.accountOneIndex = null;
        this.accountTwoIndex = null;
        this.accountOneId = null;
        this.accountTwoId = null;
        this.notSelectedAccounts = [];
        this.transferOperation = false;
        this.selectDestinationMessage = false;
      } else if (this.accountTwoIndex == index) {
        this.accountTwoIndex = null;
        this.notSelectedAccounts = [];
        this.selectDestinationMessage = true;
      }
    }
  }

  disableAccountsNotSelected() {
    const selectedAccounts: number[] = [this.accountOneIndex, this.accountTwoIndex];
    let accountsIndexes: number[] = [];
    for (let i = 0; i < this.accounts.length; i ++) {
      accountsIndexes.push(i);
    }
    this.notSelectedAccounts = accountsIndexes.filter(a => !selectedAccounts.includes(a));
  }

  resetSelectedAccounts() {
    this.accountOneIndex = null;
    this.accountTwoIndex = null;
    this.accountOneId = null;
    this.accountTwoId = null;
    this.transferOperation = false;
    this.notSelectedAccounts = [];
  }

  createOpenAccountFormGroup(){
    return new FormGroup({
      accountName: new FormControl(),
      balance: new FormControl()
    })
  }

}
