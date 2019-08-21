import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovementService } from '../shared/movement.service'
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  @Input() accountId: number = null;
  detail: string = '';
  destAccountId: string = ''; 
  value: string = '';
  operation:string = '';

  @Output() updateAccountList = new EventEmitter();

  constructor(
    public movementService: MovementService,
    private notificationService: NotificationService) { }

  ngOnInit() { }

  setOperation(op) {
    this.operation = op.id;
  }

  finalizarOperacao() {
    let movement = {
      account: {
        accountId: this.accountId
      },
      detail: this.detail,
      value: this.value,
      destAccountId: this.destAccountId
    }
    if (this.operation == 'deposit') {
      this.movementService.deposit(movement).subscribe(
        (data:{})=> {
          this.notificationService.showSuccess("Done");
        },
        (error:any)=> {
          throw new Error(error);
        })
      } else if (this.operation == 'withdraw') {
        this.movementService.withdraw(movement).subscribe(
          (data:{})=> {
            this.notificationService.showSuccess("Done");
          },
          (error:any)=> {
            throw new Error(error);
        })
    } else if (this.operation == 'transfer') {
      this.movementService.transfer(movement).subscribe(
        (data:{})=> {
          this.notificationService.showSuccess("Done");
        },
        (error:any)=> {
          throw new Error(error);
        }
      )
    }
    this.detail = '';
    this.value = '';
    this.operation = '';
    this.updateAccountList.emit(null);
  }
}
