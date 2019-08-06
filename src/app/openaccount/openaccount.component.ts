import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountserviceService } from '../shared/account.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'openaccount',
  templateUrl: './openaccount.component.html',
  styleUrls: ['./openaccount.component.css']
})
export class OpenaccountComponent implements OnInit {

  @Input() account = {name: '', balance: ''}

  @Output() updateAccountListEvent = new EventEmitter();

  constructor(public accountService:AccountserviceService) { }

  ngOnInit() {
  }

  openAccount() {
    this.accountService.openAccount(this.account).subscribe((data:{})=>{
      this.updateAccountListEvent.emit(null)
    })
  }

}
