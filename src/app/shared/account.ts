import { Movement } from 'src/app/shared/Movement';

export interface Account {
    accountId?: number;
    name?: string;
    balance?: number;
    movements?: Movement[];
    status?: boolean;
}