import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AlignmentService } from '../../services/alignment';
import { AuthService } from "../../services/auth";
import { DatabaseProvider } from '../../providers/database/database';
import { Http } from "@angular/http";
import * as moment from 'moment';
import { ListPage } from '../../pages/list/list';

@IonicPage()
@Component({
  selector: 'page-alignment',
  templateUrl: 'alignment.html',
})
export class AlignmentPage {
  public farm: string
  public myDate: string
  public observer: string
  public good: number
  public bad: number
  private ListUser : any
  public listMap: any

  constructor(public alerCtrl: AlertController,
    private http: Http,
    private navParams: NavParams,
    private alignmentService: AlignmentService,
    private authService: AuthService,
    private database: DatabaseProvider,
    public navCtrl: NavController) {
      this.farm = (navParams.get('alignmentFarm') != undefined)?navParams.get('alignmentFarm'):""
      this.myDate = (navParams.get('alignmentDate') != undefined)?navParams.get('alignmentDate'):moment().format('YYYY-MM-DD')
      this.observer = (navParams.get('alignmentObserver') != undefined)?navParams.get('alignmentObserver'):""
      this.good = (navParams.get('alignmentGood') != undefined)?navParams.get('alignmentGood'):0
      this.bad = (navParams.get('alignmentBad') != undefined)?navParams.get('alignmentBad'):0
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

    this.alignmentService.updateItems(0,
      this.farm,
      this.myDate,
      this.observer,
      this.good,
      this.bad);

      console.log("浏览器存储:")
      //console.log(Object.entries(this.teatService.getItems()));
      console.log(this.alignmentService.getItems()[0].farm);

      //pushing data to firebase database
      this.authService.getActiveUser().getIdToken()
        .then(
          (token: string) => {
            this.alignmentService.storeList(token)
              .subscribe(
                () => console.log('Success!'),
                error => {
                  console.log(error);
                }
              );
          }
        );

      //local storage
      this.pushAlignmentData();

    this.good = 0
    this.bad = 0

    alert.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlignmentPage');
  }

  loadAlignmentData() {
    this.database.getAlignmentData().then((data: any) => {
      console.log("数据库里的数据:")
      console.log(data)
      this.ListUser = data
    }, (error) => {
      console.log(error);
    })
  }

  pushAlignmentData() {
    this.database.addAlignmentData(this.farm,
      this.myDate,
      this.observer,
      this.good,
      this.bad)
      .then((data) => {
        this.loadAlignmentData();
        console.log("当前传输的一条数据:")
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }

  back() {
    this.listMap = NavParams
    this.listMap['alignmentFarm'] = this.farm
    this.listMap['alignmentDate'] = this.myDate
    this.listMap['alignmentObserver'] = this.observer
    this.listMap['alignmentGood'] = this.good
    this.listMap['alignmentBad'] = this.bad
    this.navCtrl.push(ListPage, this.listMap);
  }

}
