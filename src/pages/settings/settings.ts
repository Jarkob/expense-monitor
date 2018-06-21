import { Storage } from '@ionic/storage';
import { Component } from "@angular/core";
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'settings-page',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    constructor(private alertController: AlertController, private storage: Storage) { }

    private clear(): void {
        this.storage.set('transactions', []);
    }

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
