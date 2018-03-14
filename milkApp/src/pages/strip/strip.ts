import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StripService } from "../../services/strip";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-strip',
  templateUrl: 'strip.html',
})
export class StripPage {
  public farm: String = "";
  public myDate: String = moment().format();
  public stall: String = "";
  public ml: String = "";
  public balance: String = "balanced";

  constructor(public alerCtrl: AlertController) {
  }

  saveData() {
    this.stall = ""
    this.ml = ""
    this.balance = "balanced"
  }

  submitData() {
    let alert = this.alerCtrl.create({
      title: 'Submitted!',
      message: 'Data have been submitted!',
      buttons: ['Ok']
    });
    alert.present()
    this.saveData()
    this.farm = ""
    this.myDate = moment().format()
  }

}
