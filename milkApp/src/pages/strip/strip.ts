import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StripService } from '../../services/strip';
import { AuthService } from "../../services/auth";
import { DatabaseProvider } from '../../providers/database/database';
import { Http } from "@angular/http";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-strip',
  templateUrl: 'strip.html',
})
export class StripPage {
  public farm: string = ""
  public myDate: string = moment().format()
  public observer: string = ""
  public stall: string = ""
  public ml: string = ""
  public balance: string = "balanced"

  constructor(public alerCtrl: AlertController,
    private stripService: StripService,
    private http: Http,
    private authService: AuthService,
    private database: DatabaseProvider) {
  }

  saveData() {
    let alert = this.alerCtrl.create({
      title: 'Saved!',
      message: 'Data have been saved locally!',
      buttons: ['Ok']
    });

    //add Item
    this.stripService.addItem(this.farm,
      this.myDate,
      this.observer,
      this.stall,
      this.ml,
      this.balance);

    console.log(this.stripService.getItems());

    this.stall = "";
    this.ml = "";
    this.balance = "balanced";
  }

}
