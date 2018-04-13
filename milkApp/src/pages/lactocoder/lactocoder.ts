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
  cowList1: number[] = [0,0,0,0,0]
  DLU1: number[] = [0,0,0]

  cowName2: string = ""
  milk2: string = ""
  remark2: string = ""
  cowList2: number[] = [0,0,0,0,0]
  DLU2: number[] = [0,0,0]

  cowName3: string = ""
  milk3: string = ""
  remark3: string = ""
  cowList3: number[] = [0,0,0,0,0]
  DLU3: number[] = [0,0,0]

  constructor( public alerCtrl: AlertController) {
  }

  timer(e,param: number,timer: string){
    let map = {"Dip":0,"Strip":1,"Wipe":2,"Attach":3,"Remove":4}

    if(timer!="Finished"){
      if(param==1){
        this.cowList1[map[timer]] = +moment().format("X")
        if(map[timer]==2){
          this.DLU1[0] = (this.cowList1[2]-this.cowList1[0])
        } else if(map[timer]==3){
          this.DLU1[1] = (+this.cowList1[3]-this.cowList1[1])
        } else if(map[timer]==4){
          this.DLU1[2] = (+this.cowList1[4]-this.cowList1[3])
        }
        console.log(this.cowList1)
        console.log(this.DLU1)
      } else if(param==2){
        this.cowList2[map[timer]] = +moment().format("X")
        if(map[timer]==2){
          this.DLU2[0] = (this.cowList2[2]-this.cowList2[0])
        } else if(map[timer]==3){
          this.DLU2[1] = (+this.cowList2[3]-this.cowList2[1])
        } else if(map[timer]==4){
          this.DLU2[2] = (+this.cowList2[4]-this.cowList2[3])
        }
        console.log(this.cowList2)
        console.log(this.DLU2)
      } else if(param==3){
        this.cowList3[map[timer]] = +moment().format("X")
        if(map[timer]==2){
          this.DLU3[0] = (this.cowList3[2]-this.cowList3[0])
        } else if(map[timer]==3){
          this.DLU3[1] = (+this.cowList3[3]-this.cowList3[1])
        } else if(map[timer]==4){
          this.DLU3[2] = (+this.cowList3[4]-this.cowList3[3])
        }
        console.log(this.cowList3)
        console.log(this.DLU3)
      }
    }
  }

  saveData() {
    this.cowName1 = ""
    this.milk1 = ""
    this.remark1 = ""
    this.cowList1 = []


    this.cowName2 = ""
    this.milk2 = ""
    this.remark2 = ""
    this.cowList2 = []

    this.cowName3 = ""
    this.milk3 = ""
    this.remark3 = ""
    this.cowList3 = []
  }

}
