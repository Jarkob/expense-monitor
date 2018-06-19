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

  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.set('name', 'Jakob');

    storage.get('name').then(
      (val) => {
        console.log('Your name is ', val);
      }
    );

    storage.set('transactions', [{time: null, value: 0}]);

    storage.get('transactions').then(
      (val) => {
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


  private createTransaction(): void {
    this.saldo += 5.5;

    this.transactions.push({
      time: new Date(),
      value: 5.5
    });

    this.storage.set('transactions', this.transactions);
  }
}
