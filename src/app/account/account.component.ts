import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountlistComponent } from '../accountlist/accountlist.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountselected:number = 0;

  constructor() { }

  ngOnInit() {
  }

  accountSelected(id:number) {
    this.accountselected = id;
  }

}
