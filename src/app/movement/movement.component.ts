import { Component, OnInit, Input } from '@angular/core';
import { MovementService } from '../shared/movement.service'
import { Router } from '@angular/router';

@Component({
  selector: 'movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  @Input() accountId:number = 0;
  @Input() detail: string = '';
  @Input() destAccountId:string = ''; 
  @Input() value:string = '';

  operation:string = '';

  constructor(
    public movementService: MovementService,
    public router:Router) { }

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
      this.movementService.deposit(movement).subscribe((data:{})=> {
        console.log(data)})
    } else if (this.operation == 'withdraw') {
      this.movementService.withdraw(movement).subscribe((data:{})=> {
        console.log(data)})
    } else if (this.operation == 'transfer') {
      this.movementService.transfer(movement).subscribe((data:{})=>{
        console.log(data)})
    }
    this.detail = '';
    this.value = '';
    this.operation = '';
    this.router.navigate(['account'])
  }
}
