import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HgyienePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hgyiene',
  templateUrl: 'hgyiene.html',
})
export class HgyienePage {
  public clean: number = 0;
  public slightlyDirt: number = 0;
  public moderatelyDirt: number = 0;
  public cakedOnDirt: number = 0;
  myDate: String = new Date().toISOString();
  constructor(public alerCtrl: AlertController) {

  }
  tapDecrease(e,param:number){
    if(param==1){
      this.clean = Math.max(this.clean-1,0)
    } else if(param==2){
      this.slightlyDirt = Math.max(this.deepPresent-1,0)
    } else if(param==3){
      this.moderatelyDirt = Math.max(this.smallDirt-1,0)
    } else if(param==4){
      this.cakedOnDirt = Math.max(this.largeDirt-1,0)
    }

  }
  tapIncrease(e,param:number) {
    if(param==1){
      this.clean++
    } else if(param==2){
      this.slightlyDirt++
    } else if(param==3){
      this.moderatelyDirt++
    } else if(param==4){
      this.cakedOnDirt++
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
    this.slightlyDirt = 0
    this.moderatelyDirt = 0
    this.cakedOnDirt = 0
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HgyienePage');
  }

}
