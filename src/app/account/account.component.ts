import { Component, OnInit, Input } from '@angular/core';

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
