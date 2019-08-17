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

  @ViewChild (AccountlistComponent) accountListComponent:AccountlistComponent;

  openAccountFormGroup: FormGroup;
  openAccountFormData = {name: '', balance: ''};
  accountselected:number = 0;

  constructor(public accountService:AccountserviceService) {
    this.openAccountFormGroup = this.createOpenAccountFormGroup();
   }

  ngOnInit() { }

  openAccount() {
    this.accountService.openAccount(this.openAccountFormData).subscribe(
      (data:{})=>{
        console.log(data);
        this.accountListComponent.getAllAccounts();
      },
      (error:{})=>{
        console.error(error)})
  }

  accountSelected(id:number) {
    this.accountselected = id;
  }

  updateOpenAccountFormData(form: FormGroup) {
    this.openAccountFormData.name = form.controls.accountName.value;
    this.openAccountFormData.balance = form.controls.balance.value;
    this.openAccount();
  }

  createOpenAccountFormGroup(){
    return new FormGroup({
      accountName: new FormControl(),
      balance: new FormControl()
    })
  }

}
