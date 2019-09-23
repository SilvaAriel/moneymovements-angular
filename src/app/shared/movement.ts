import { Account } from 'src/app/shared/account';

export interface Movement {
    movementId?:number;
    date?:string;
    detail:string;
    destAccountId?:number;
    value:string;
    account?:Account
}