import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public saldo: number = 0;
  public transactions = [];

  public description: string;
  public amount: number;

  /**
   * create a new instance of the home site
   * @param navCtrl for navigation
   * @param storage for storing transactions
   */
  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.get('transactions').then(
      (val) => {
        if(!val) {
          storage.set('transactions', []);
        }
        for(let transaction of val) {
          this.saldo += +transaction.value;
        }
        this.transactions = val;
      },
      (err) => {
        console.log('error: ', err);
      }
    );
  }

  /**
   * create a new transaction
   */
  createTransaction(): void {
    const newTransaction = {
      description: this.description,
      time: new Date(),
      value: this.amount
    };

    this.saldo += newTransaction.value;

    this.transactions.push(newTransaction);

    this.storage.set('transactions', this.transactions);
  }

  /**
   * workaround
   * helper method to convert value from an input field to a number
   * @param event the event that contains the value
   */
  transform(event): void {
    this.amount = event.value * 1;
  }

  /**
   * edit a transaction
   * @param transaction the transaction to be edited
   */
  edit(transaction): void {
    console.log('coming soon...');
  }

  /**
   * delete a transaction
   * @param transaction the transaction to be deleted
   */
  delete(transaction): void {
    this.saldo -= transaction.value;
    this.transactions = this.transactions.filter(element => element !== transaction);
    this.storage.set('transactions', this.transactions);
  }
}
