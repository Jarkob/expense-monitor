import { Transaction } from './../models/transaction';
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";

@Injectable()
export class TransactionService {

    constructor(private storage: Storage) { }

    public get(): Promise<Transaction[]> {
        return this.storage.get('transactions');
    }

    public create(transaction: Transaction): void {
        this.storage.get('transactions').then(
            (val) => {
                val.push(transaction);
                this.storage.set('transactions', val);
            }
        )
    }

    public delete(transaction: Transaction): void {
        this.storage.get('transactions').then(
            (val) => {
                val = val.filter(element => element !== transaction);
                this.storage.set('transactions', val);
            }
        )
    }

    public clear(): void {
        this.storage.set('transactions', []);
    }
}
