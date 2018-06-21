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

  transform(event): void {
    this.amount = event.value * 1;
  }

  edit(transaction): void {
    console.log('coming soon...');
  }

  delete(transaction): void {
    this.saldo -= transaction.value;
    this.transactions = this.transactions.filter(element => element !== transaction);
    this.storage.set('transactions', this.transactions);
  }
}
