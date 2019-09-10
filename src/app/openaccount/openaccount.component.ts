import { Component, OnInit, Input, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'openaccount',
  templateUrl: './openaccount.component.html',
  styleUrls: ['./openaccount.component.css']
})
export class OpenaccountComponent implements OnInit {

  @Input() openAccountFormFields: FormGroup;

  @Output() sendFormData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openAccount() {
      this.sendFormData.emit(this.openAccountFormFields);
    }

}
