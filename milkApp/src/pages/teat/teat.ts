import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the TeatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  myDate: String = new Date().toISOString();
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeatPage');
  }

}
