import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'

import { AccountserviceService } from '../shared/account.service';
import { AccountlistComponent } from '../accountlist/accountlist.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: any = []

  accountId: number;
  accountselectedindex: number = null;
  
  openAccountFormGroup: FormGroup;
  openAccountFormData = {name: '', balance: ''};

  constructor(public accountService:AccountserviceService) {
    this.openAccountFormGroup = this.createOpenAccountFormGroup();
   }

  ngOnInit() {
    this.getAllAccounts();
  }

  openAccount() {
    this.accountService.openAccount(this.openAccountFormData).subscribe(
      (data:{})=>{
        this.getAllAccounts();
      },
      (error:{})=>{
        console.error(error)})
  }

  getAllAccounts() {
    return this.accountService.getAllAccounts().subscribe(
      (data: {}) => {
        this.accounts = data;
    })
  }

  closeAccount(account) {
    if (window.confirm(`Do you really want to close the account ${account.name} ?`)) {
      this.accountService.closeAccount(account).subscribe((data: {}) => {
        this.getAllAccounts();
      })
    }
  }

  accountSelected(id:number) {
    this.accountselectedindex = id;
  }

  updateOpenAccountFormData(form: FormGroup) {
    this.openAccountFormData.name = form.controls.accountName.value;
    this.openAccountFormData.balance = form.controls.balance.value;
    this.openAccount();
  }

  selectAccount(numbers:number[]) {
    let index = numbers[0]
    let accountId = numbers[1]
    this.accountId = accountId;
    if (this.accountselectedindex == index) {
      this.accountselectedindex = null;
      this.accountId = null;
    } else {
      this.accountselectedindex = index;
    }
  }

  createOpenAccountFormGroup(){
    return new FormGroup({
      accountName: new FormControl(),
      balance: new FormControl()
    })
  }

}
