import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-lactocoder',
  templateUrl: 'lactocoder.html',
})
export class LactocoderPage {
  farm: string = ""
  myDate: string = moment().format()
  parlor: string = ""
  pre_milking: string = ""
  herd_size: string = ""
  size: string = ""
  procedures: string = ""
  frequency: string = "frequency2X"
  operators: string = ""
  prep: string = ""
  routine: string = ""

  cowName1: string = ""
  milk1: string = ""
  remark1: string = ""

  cowName2: string = ""
  milk2: string = ""
  remark2: string = ""

  cowName3: string = ""
  milk3: string = ""
  remark3: string = ""

  cowList: number[][] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
  DLU: number[][] = [[0,0,0],[0,0,0],[0,0,0]]
  buttons: boolean[][] = [[false,false,true,true,true],[false,false,true,true,true],[false,false,true,true,true]]

  constructor( public alerCtrl: AlertController) {
  }

  buttonControl(cow: number, step: number){
    this.cowList[cow][step] = +moment().format("X")
    this.buttons[cow][step] = true

    if(step==0){
      this.buttons[cow][2] = false
    } else if(step==1){
      if(this.cowList[cow][2]==0){
        this.buttons[cow][3] = false
      }
    } else if(step==2){
      this.DLU[cow][0] = (this.cowList[cow][2]-this.cowList[cow][0])
      if(this.cowList[cow][1]==0){
        this.buttons[cow][3] = false
      }
    } else if(step==3){
      if(this.cowList[cow][1]==0){
        this.DLU[cow][1] = (+this.cowList[cow][3]-this.cowList[cow][2])
      } else{
        this.DLU[cow][1] = (+this.cowList[cow][3]-this.cowList[cow][1])
      }
      this.buttons[cow][4] = false
    } else if(step==4){
      this.DLU[cow][2] = (+this.cowList[cow][4]-this.cowList[cow][3])
    }
    console.log(this.cowList[cow])
    console.log(this.DLU[cow])
  }

  saveData() {

    this.cowList= [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    this.DLU = [[0,0,0],[0,0,0],[0,0,0]]
    this.buttons= [[false,false,true,true,true],[false,false,true,true,true],[false,false,true,true,true]]

    this.cowName1 = ""
    this.milk1 = ""
    this.remark1 = ""



    this.cowName2 = ""
    this.milk2 = ""
    this.remark2 = ""

    this.cowName3 = ""
    this.milk3 = ""
    this.remark3 = ""
  }

}
