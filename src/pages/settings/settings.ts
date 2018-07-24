import { Component } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { TransactionService } from '../../services/transaction.service';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    constructor(private alertController: AlertController, private transactionService: TransactionService) { }

    /**
     * removes all transactions from storage and clears account
     */
    private clear(): void {
        this.transactionService.clear();
    }

    /**
     * shows a confirm dialog for deleting transactions
     */
    presentConfirm(): void {
        let alert = this.alertController.create({
            title: 'Are you sure?',
            message: 'This will delete all data.',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Confirm',
                handler: () => {
                  this.clear();
                  let message = this.alertController.create({
                    title: 'Account has been resetted',
                    subTitle: 'All data was deleted',
                    buttons: ['Ok']
                  });
                  message.present();
                }
              }
            ]
        });
        alert.present();
    }
}
