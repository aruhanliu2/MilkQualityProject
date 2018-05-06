import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LactocoderService } from '../../services/lactocoder';
import { AuthService } from "../../services/auth";
import { DatabaseProvider } from '../../providers/database/database';
import { Http } from "@angular/http";
import * as moment from 'moment';
import { ListPage } from '../../pages/list/list';

@IonicPage()
@Component({
  selector: 'page-lactocoder',
  templateUrl: 'lactocoder.html',
})
export class LactocoderPage {
  public farm: string
  public myDate: string
  public parlor: string
  public pre_milking: string
  public herd_size: string
  public size: string
  public procedures: string
  public frequency: string
  public operators: string
  public prep: string
  public routine: string

  public cowName: string[]
  public milk: string[]
  public remark: string[]
  public cowList: number[][]
  public DLU: number[][]
  public buttons: boolean[][]

  public ListUser : any
  public listMap: any

  constructor(public alerCtrl: AlertController,
    private lactocoderService: LactocoderService,
    private http: Http,
    private authService: AuthService,
    private database: DatabaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.farm = (navParams.get('lactoFarm') != undefined)?navParams.get('lactoFarm'):""
      this.myDate = (navParams.get('lactoDate') != undefined)?navParams.get('lactoDate'):moment().format('YYYY-MM-DD')
      this.parlor = (navParams.get('lactoParlor') != undefined)?navParams.get('lactoParlor'):""
      this.pre_milking = (navParams.get('lactoPre_Milking') != undefined)?navParams.get('lactoPre_Milking'):""
      this.herd_size = (navParams.get('lactoHerd') != undefined)?navParams.get('lactoHerd'):""
      this.size = (navParams.get('lactoSize') != undefined)?navParams.get('lactoSize'):""
      this.procedures = (navParams.get('lactoProcedures') != undefined)?navParams.get('lactoProcedures'):""
      this.frequency = (navParams.get('lactoFreq') != undefined)?navParams.get('lactoFreq'):"frequency2X"
      this.operators = (navParams.get('lactoOp') != undefined)?navParams.get('lactoOp'):""
      this.prep = (navParams.get('lactoPrep') != undefined)?navParams.get('lactoPrep'):""
      this.routine = (navParams.get('lactoRoutine') != undefined)?navParams.get('lactoRoutine'):""

      this.cowName = (navParams.get('cowName') != undefined)?navParams.get('cowName'):["","",""]
      this.milk = (navParams.get('milk') != undefined)?navParams.get('milk'):["","",""]
      this.remark = (navParams.get('remark') != undefined)?navParams.get('remark'):["","",""]
      this.cowList = (navParams.get('cowList') != undefined)?navParams.get('cowList'):[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
      this.DLU = (navParams.get('DLU') != undefined)?navParams.get('DLU'):[[0,0,0],[0,0,0],[0,0,0]]
      this.buttons = (navParams.get('buttons') != undefined)?navParams.get('buttons'):[[false,false,true,true,true],[false,false,true,true,true],[false,false,true,true,true]]
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

    let alert = this.alerCtrl.create({
      title: 'Saved!',
      message: 'Data have been saved locally!',
      buttons: ['Ok']
    });

    while(this.lactocoderService.getItems().length>0){
        this.lactocoderService.removeItem(this.lactocoderService.getItems().length-1);
    }

    if(!(this.cowName[0]==="")){
      console.log("store1")
      this.lactocoderService.addItem(
        this.farm,
        this.myDate,
        this.parlor,
        this.pre_milking,
        this.herd_size,
        this.size,
        this.procedures,
        this.frequency,
        this.operators,
        this.prep,
        this.routine,
        this.cowName[0],
        this.milk[0],
        this.remark[0],
        this.DLU[0][0],
        this.DLU[0][1],
        this.DLU[0][2]
      );
    }

    if(!(this.cowName[1]==="")){
      console.log("store2")
      this.lactocoderService.addItem(
        this.farm,
        this.myDate,
        this.parlor,
        this.pre_milking,
        this.herd_size,
        this.size,
        this.procedures,
        this.frequency,
        this.operators,
        this.prep,
        this.routine,
        this.cowName[1],
        this.milk[1],
        this.remark[1],
        this.DLU[1][0],
        this.DLU[1][1],
        this.DLU[1][2]
      );
    }

    if(!(this.cowName[2]==="")){
      console.log("store3")
      this.lactocoderService.addItem(
        this.farm,
        this.myDate,
        this.parlor,
        this.pre_milking,
        this.herd_size,
        this.size,
        this.procedures,
        this.frequency,
        this.operators,
        this.prep,
        this.routine,
        this.cowName[2],
        this.milk[2],
        this.remark[2],
        this.DLU[2][0],
        this.DLU[2][1],
        this.DLU[2][2]
      );
    }

    this.authService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.lactocoderService.storeList(token)
            .subscribe(
              () => console.log('Success!'),
              error => {
                console.log(error);
              }
            );
        }
      );

    console.log("浏览器存储:")
    //console.log(Object.entries(this.teatService.getItems()));
    console.log(this.lactocoderService.getItems()[0]);

    //pushing data to firebase database
    this.pushLactocoderData();



    this.cowList= [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    this.DLU = [[0,0,0],[0,0,0],[0,0,0]]
    this.buttons= [[false,false,true,true,true],[false,false,true,true,true],[false,false,true,true,true]]

    this.cowName = ["","",""]
    this.milk = ["","",""]
    this.remark = ["","",""]

    alert.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LactocoderPage');
  }

  loadLactocoderData() {
    this.database.getLactocoderData().then((data: any) => {
      console.log("数据库里的数据:")
      this.ListUser = data
    }, (error) => {
      console.log(error);
    })
  }

  pushLactocoderData() {
    if(!(this.cowName[0]==="")) {
      console.log("push1")
      this.database.addLactocoderData(this.farm,
        this.myDate,
        this.parlor,
        this.pre_milking,
        this.herd_size,
        this.size,
        this.procedures,
        this.frequency,
        this.operators,
        this.prep,
        this.routine,
        this.cowName[0],
        this.milk[0],
        this.remark[0],
        this.DLU[0][0],
        this.DLU[0][1],
        this.DLU[0][2])
        .then((data) => {
          this.loadLactocoderData();
          console.log("当前传输的一条数据:")
          console.log(data);
        }, (error) => {
          console.log(error);
        });
    }

    if(!(this.cowName[1]==="")) {
      console.log("push2")
      this.database.addLactocoderData(this.farm,
        this.myDate,
        this.parlor,
        this.pre_milking,
        this.herd_size,
        this.size,
        this.procedures,
        this.frequency,
        this.operators,
        this.prep,
        this.routine,
        this.cowName[1],
        this.milk[1],
        this.remark[1],
        this.DLU[1][0],
        this.DLU[1][1],
        this.DLU[1][2])
        .then((data) => {
          this.loadLactocoderData();
          console.log("当前传输的一条数据:")
          console.log(data);
        }, (error) => {
          console.log(error);
      });
    }

    if(!(this.cowName[2]==="")) {
      console.log("push3")
      this.database.addLactocoderData(this.farm,
        this.myDate,
        this.parlor,
        this.pre_milking,
        this.herd_size,
        this.size,
        this.procedures,
        this.frequency,
        this.operators,
        this.prep,
        this.routine,
        this.cowName[2],
        this.milk[2],
        this.remark[2],
        this.DLU[2][0],
        this.DLU[2][1],
        this.DLU[2][2])
        .then((data) => {
          this.loadLactocoderData();
          console.log("当前传输的一条数据:")
          console.log(data);
        }, (error) => {
          console.log(error);
      });
    }
  }

  back() {
    this.listMap = NavParams
    this.listMap['lactoFarm'] = this.farm
    this.listMap['lactoDate'] = this.myDate
    this.listMap['lactoParlor'] = this.parlor
    this.listMap['lactoPre_Milking'] = this.pre_milking
    this.listMap['lactoHerd'] = this.herd_size
    this.listMap['lactoSize'] = this.size
    this.listMap['lactoProcedures'] = this.procedures
    this.listMap['lactoFreq'] = this.frequency
    this.listMap['lactoOp'] = this.operators
    this.listMap['lactoPrep'] = this.prep
    this.listMap['lactoRoutine'] = this.routine

    console.log(this.cowName)
    console.log(this.milk)
    console.log(this.remark)
    console.log(this.cowList)
    console.log(this.DLU)
    console.log(this.buttons)

    this.listMap['cowName'] = this.cowName
    this.listMap['milk'] = this.milk
    this.listMap['remark'] = this.remark
    this.listMap['cowList'] = this.cowList
    this.listMap['DLU'] = this.DLU
    this.listMap['buttons'] = this.buttons

    this.navCtrl.pop();
    //this.navCtrl.push(ListPage, this.listMap);
  }

}
