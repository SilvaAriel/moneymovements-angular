import { Account } from 'src/app/shared/Account';

export interface Movement {
    movementId?:number;
    date?:string;
    detail:string;
    destAccountId?:number;
    value:string;
    account?:Account
}