import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-teat',
  templateUrl: 'teat.html',
})
export class TeatPage {
  public clean: number = 0;
  public deepPresent: number = 0;
  public smallDirt: number = 0;
  public largeDirt: number = 0;
  public farm: String = "";
  public myDate: String = moment().format();
  public observer: String = "";
  public milker: String = "";
  constructor(public alerCtrl: AlertController) {

  }
  tapDecrease(e,param:number){
    if(param==1){
      this.clean = Math.max(this.clean-1,0)
    } else if(param==2){
      this.deepPresent = Math.max(this.deepPresent-1,0)
    } else if(param==3){
      this.smallDirt = Math.max(this.smallDirt-1,0)
    } else if(param==4){
      this.largeDirt = Math.max(this.largeDirt-1,0)
    }

  }
  tapIncrease(e,param:number) {
    if(param==1){
      this.clean++
    } else if(param==2){
      this.deepPresent++
    } else if(param==3){
      this.smallDirt++
    } else if(param==4){
      this.largeDirt++
    }
  }
  saveData() {
    let alert = this.alerCtrl.create({
      title: 'Saved!',
      message: 'Data have been saved locally!',
      buttons: ['Ok']
    });
    alert.present()
  }
  submitData() {
    let alert = this.alerCtrl.create({
      title: 'Submitted!',
      message: 'Data have been submitted!',
      buttons: ['Ok']
    });
    alert.present()

    this.clean = 0
    this.deepPresent = 0
    this.smallDirt = 0
    this.largeDirt = 0
    this.farm = ""
    this.myDate = moment().format()
    this.observer = ""
    this.milker = ""
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeatPage');
  }

}
