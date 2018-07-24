import { Transaction } from './../models/transaction';
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";

@Injectable()
export class TransactionService {

    constructor(private storage: Storage) { }

    /**
     * get transactions from storage
     */
    public get(): Promise<Transaction[]> {
        return this.storage.get('transactions');
    }

    /**
     * create new transaction in storage
     * @param transaction new transaction
     */
    public create(transaction: Transaction): void {
        this.storage.get('transactions').then(
            (val) => {
                val.push(transaction);
                this.storage.set('transactions', val);
            }
        )
    }

    /**
     * deletes transaction
     * @param transaction transaction to delete
     */
    public delete(transaction: Transaction): void {
        this.storage.get('transactions').then(
            (val) => {
                val = val.filter(element => element !== transaction);
                this.storage.set('transactions', val);
            }
        )
    }

    /**
     * deletes all transactions
     */
    public clear(): void {
        this.storage.set('transactions', []);
    }
}
