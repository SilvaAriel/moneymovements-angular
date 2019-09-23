import { Movement } from 'src/app/shared/movement';

export interface Account {
    accountId?: number;
    name?: string;
    balance?: number;
    movements?: Movement[];
    status?: boolean;
}