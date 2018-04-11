import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AlignmentService } from '../../services/alignment';
import * as moment from 'moment';

@Component({
  selector: 'page-alignment',
  templateUrl: 'alignment.html',
})
export class AlignmentPage {
  public farm: string = ""
  public myDate: string = moment().format()
  public observer: string = ""
  public good: number = 0;
  public bad: number = 0;

  constructor(public alerCtrl: AlertController,
    private navParams: NavParams,
    private alignmentService: AlignmentService) {}


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

    this.alignmentService.updateItems(0,
      this.farm,
      this.myDate,
      this.observer,
      this.good,
      this.bad);

    console.log(this.alignmentService.getItems());

    this.farm = ""
    this.myDate = moment().format()
    this.observer = ""
    this.good = 0
    this.bad = 0

    alert.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlignmentPage');
  }

}
