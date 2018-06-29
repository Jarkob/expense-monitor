import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Transaction } from './../../models/transaction';
import { CurrencyService } from './../../services/currency.service';
import { SettingsPage } from './../settings/settings';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public saldo: number = 0;
  public transactions: Transaction[] = [];

  public exchangeRates: any[] = [];
  public currency: string = 'EUR';
  public description: string;
  public amount: number;

  /**
   * create a new instance of the home site
   * @param navCtrl for navigation
   * @param storage for storing transactions
   */
  constructor(
    public navCtrl: NavController,
    private transactionService: TransactionService,
    private currencyService: CurrencyService
  ) {
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
    this.currencyService.get().subscribe(
      data => {
        this.exchangeRates = data.rates;
      }
    );
  }

  /**
   * get transactions
   */
  getTransactions(): void {
    this.transactionService.get().then(
      (val) => {
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
  createTransaction(): void {
    // adjust currency
    if (this.currency !== 'EUR') {
      this.amount /= this.exchangeRates[this.currency];
    }

    const transaction: Transaction = {
      description: this.description,
      time: new Date(),
      value: this.amount,
      currency: this.currency
    };

    this.description = null;
    this.amount = null;

    this.saldo += transaction.value;

    this.transactionService.create(transaction);
    this.transactions.push(transaction);
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
  deleteTransaction(transaction): void {
    this.saldo -= transaction.value;
    this.transactionService.delete(transaction);
    this.transactions = this.transactions.filter(element => element !== transaction);
  }
}
