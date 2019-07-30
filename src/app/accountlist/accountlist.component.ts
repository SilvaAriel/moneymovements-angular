import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountserviceService } from '../shared/account.service';

@Component({
  selector: 'accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent implements OnInit {

  Account:any = []

  accountSelectedBefore:number = null;
  accountSelected:number = 0;

  @Output() accountSelectedEvent = new EventEmitter<number>()

  constructor(public accountService:AccountserviceService) { }

  ngOnInit() {
    this.getAllAccounts();
  }

  getAllAccounts() {
    return this.accountService.getAllAccounts().subscribe((data:{})=> {
      this.Account = data;
    })
  }

  closeAccount(account) {
    if(window.confirm(`Do you want to close ${account.name} account?`)){
      this.accountService.closeAccount(account).subscribe((data:{})=>{
        this.getAllAccounts();
      })
    }
  }

  selectAccount(id) {
    if (this.accountSelected == this.accountSelectedBefore) {
      this.accountSelected = 0;
    } else {
      this.accountSelected = id;
      this.accountSelectedEvent.emit(this.accountSelected);
      this.accountSelectedBefore = this.accountSelected;
    }
  }

}
