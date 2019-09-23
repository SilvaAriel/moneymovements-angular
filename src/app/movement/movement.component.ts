import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovementService } from '../shared/movement.service'
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  @Input() accountOneId: number = null;
  @Input() accountTwoId: number = null;
  @Input() selectDestinationMessage: boolean;
  detail: string = '';
  destAccountId: string = '';
  value: string = '';
  operation: string = '';

  @Output() updateAccountList = new EventEmitter();
  @Output() transferSelectedEvent = new EventEmitter<boolean>();
  @Output() resetSelectedAccountsEvent = new EventEmitter();

  constructor(
    public movementService: MovementService,
    private notificationService: NotificationService) { }

  ngOnInit() { }

  setOperation(op) {
    this.operation = op.id;
    if (op.id == 'transfer') {
      this.transferSelectedEvent.emit(true);
    } else {
      this.transferSelectedEvent.emit(false);
    }
  }

  finalizarOperacao() {

    let movement = {
      account: {
        accountId: this.accountOneId
      },
      detail: this.detail,
      value: this.value,
      destAccountId: this.accountTwoId
    }

    if (this.operation === "") {
      this.notificationService.showError("Please select an operation");
    } else if (this.operation !== "" && this.detail === "" || this.value === "") {
      this.notificationService.showError("Please write the value and the detail");
    } else {
      if (this.operation == 'deposit') {
        this.movementService.deposit(movement).subscribe(
          (data: {}) => {
            this.notificationService.showSuccess('Done');
            this.updateAccountList.emit(null);
          },
          (error: any) => {
            throw new Error(error);
          })
      } else if (this.operation == 'withdraw') {
        this.movementService.withdraw(movement).subscribe(
          (data: {}) => {
            this.notificationService.showSuccess('Done');
            this.updateAccountList.emit(null);
          },
          (error: any) => {
            throw new Error(error);
          })
      } else if (this.operation == 'transfer') {
        this.movementService.transfer(movement).subscribe(
          (data: {}) => {
            this.notificationService.showSuccess('Done');
            this.updateAccountList.emit(null);
          },
          (error: any) => {
            throw new Error(error);
          }
        )
      }
      this.detail = '';
      this.value = '';
      this.operation = '';
      this.accountOneId = null;
      this.resetSelectedAccountsEvent.emit();
    }
  }
}
