import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the AlignmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alignment',
  templateUrl: 'alignment.html',
})
export class AlignmentPage {
  public farm: String = "";
  public myDate: String = moment().format();
  public good: number = 0;
  public bad: number = 0;


  constructor(public alerCtrl: AlertController,
    private navParams: NavParams) {
  }


  tapDecrease(e,param:number){
    if(param==1){
      this.good = Math.max(this.good-1,0)
    } else if(param==2){
      this.bad = Math.max(this.bad-1,0)
    }

  }
  tapIncrease(e,param:number) {
    if(param==1){
      this.good++
    } else if(param==2){
      this.bad++
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

    this.good = 0
    this.bad = 0
    this.farm = ""
    this.myDate = moment().format()

    console.log()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlignmentPage');
  }

}
