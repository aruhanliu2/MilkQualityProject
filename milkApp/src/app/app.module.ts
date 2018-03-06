import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

//table pages
import { TeatPage } from '../pages/teat/teat';
import { HgyienePage } from '../pages/hgyiene/hgyiene';
import { AlignmentPage } from '../pages/alignment/alignment';
import { StripPage } from '../pages/strip/strip';
//import { PostmilkPage } from '../pages/postmilk/postmilk;
import { LactocoderPage } from '../pages/lactocoder/lactocoder'; 


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TeatPage,
    HgyienePage,
    AlignmentPage,
    StripPage,
    LactocoderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TeatPage,
    HgyienePage,
    AlignmentPage,
    StripPage,
    LactocoderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
