import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SettingsPage } from './../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public saldo: number = 0;
  public transactions = [];

  public currency: string = 'EUR';
  public description: string;
  public amount: number;

  /**
   * create a new instance of the home site
   * @param navCtrl for navigation
   * @param storage for storing transactions
   */
  constructor(public navCtrl: NavController, private storage: Storage) {
    // works somehow
    this.navCtrl.viewDidEnter.subscribe(
      (val) => {
        this.getTransactions();
      }
    );
  }

  /**
   * get transactions
   */
  getTransactions(): void {
    this.storage.get('transactions').then(
      (val) => {
        if(!val) {
          this.storage.set('transactions', []);
        }
        this.saldo = 0;
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
   * navigate to settings page
   */
  goToSettings(): void {
    this.navCtrl.push(SettingsPage);
  }

  /**
   * create a new transaction
   * @param positive if amount is positive
   */
  createTransaction(positive: boolean): void {
    if (!positive) {
      this.amount *= -1;
    }

    const newTransaction = {
      description: this.description,
      time: new Date(),
      value: this.amount
    };

    this.description = null;
    this.amount = null;

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
   * delete a transaction
   * @param transaction the transaction to be deleted
   */
  delete(transaction): void {
    this.saldo -= transaction.value;
    this.transactions = this.transactions.filter(element => element !== transaction);
    this.storage.set('transactions', this.transactions);
  }
}
