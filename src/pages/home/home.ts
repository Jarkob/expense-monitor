import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';

import { SettingsPage } from './../settings/settings';

const FIXER_API_KEY = '1e7927b44bfbfe5480e1f751595f4f3e';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public saldo: number = 0;
  public transactions = [];

  public exchangeRates: any[];
  public currency: string = 'EUR';
  public description: string;
  public amount: number;

  /**
   * create a new instance of the home site
   * @param navCtrl for navigation
   * @param storage for storing transactions
   */
  constructor(public navCtrl: NavController, private storage: Storage, private http: HTTP) {
    // works somehow
    this.navCtrl.viewDidEnter.subscribe(
      (val) => {
        this.getTransactions();
      }
    );

    this.getExchangeRates();
  }

  /**
   * gets the exchange rates from the fixer api
   */
  getExchangeRates(): void {
    console.log('key: ', FIXER_API_KEY);
    this.http.get('http://data.fixer.io/api/latest?access_key=' + FIXER_API_KEY + '&symbols=USD,GBP,JPY,CHF', {}, {})
      .then(data => {
        console.log(data.data);
        this.exchangeRates = data.data.rates;
      })
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

    console.log('debug: ', this.currency);

    // adjust currency
    if (this.currency !== 'EUR') {
      console.log('adjusting to: ', this.exchangeRates[this.currency]);
      this.amount /= this.exchangeRates[this.currency];
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
