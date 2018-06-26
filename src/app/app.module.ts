import { HTTP } from '@ionic-native/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import localeDe from '@angular/common/locales/de';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { registerLocaleData } from '@angular/common';
import { SettingsPage } from '../pages/settings/settings';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'de'}
  ]
})
export class AppModule {}
