import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

//table pages
import { TeatPage } from '../pages/teat/teat';
import { PostmilkPage } from '../pages/postmilk/postmilk';
import { HgyienePage } from '../pages/hgyiene/hgyiene';
import { AlignmentPage } from '../pages/alignment/alignment';
import { StripPage } from '../pages/strip/strip';
import { LactocoderPage } from '../pages/lactocoder/lactocoder';
import { AuthService } from "../services/auth";
import { TeatService } from "../services/teat";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    TeatPage,
    HgyienePage,
    AlignmentPage,
    StripPage,
    LactocoderPage,
    PostmilkPage,
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
    SigninPage,
    SignupPage,
    TeatPage,
    HgyienePage,
    AlignmentPage,
    StripPage,
    LactocoderPage,
    PostmilkPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    TeatService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
