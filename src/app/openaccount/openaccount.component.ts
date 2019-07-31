import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountserviceService } from '../shared/account.service';

@Component({
  selector: 'openaccount',
  templateUrl: './openaccount.component.html',
  styleUrls: ['./openaccount.component.css']
})
export class OpenaccountComponent implements OnInit {

  @Input() account = {name: '', balance: ''}

  constructor(public accountService:AccountserviceService) { }

  ngOnInit() {
  }

  openAccount() {
    this.accountService.openAccount(this.account).subscribe((data:{})=>{})
  }

}
