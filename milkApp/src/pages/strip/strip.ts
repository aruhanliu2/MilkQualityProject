import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StripService } from '../../services/strip';
import { AuthService } from "../../services/auth";
import { DatabaseProvider } from '../../providers/database/database';
import { Http } from "@angular/http";
import * as moment from 'moment';
import { ListPage } from '../../pages/list/list';

@IonicPage()
@Component({
  selector: 'page-strip',
  templateUrl: 'strip.html',
})
export class StripPage {
  public farm: string
  public myDate: string
  public observer: string
  public stall: string
  public ml: string
  public balance: string
  private ListUser : any
  public listMap: any

  constructor(public alerCtrl: AlertController,
    private stripService: StripService,
    private http: Http,
    private authService: AuthService,
    private database: DatabaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.farm = (navParams.get('stripFarm') != undefined)?navParams.get('stripFarm'):""
      this.myDate = (navParams.get('stripDate') != undefined)?navParams.get('stripDate'):moment().format('YYYY-MM-DD')
      this.observer = (navParams.get('stripObserver') != undefined)?navParams.get('stripObserver'):""
      this.stall = (navParams.get('stripStall') != undefined)?navParams.get('stripStall'):""
      this.ml = (navParams.get('stripML') != undefined)?navParams.get('stripML'):""
      this.balance = (navParams.get('stripBalance') != undefined)?navParams.get('stripBalance'):"balanced"
  }

  saveData() {
    let alert = this.alerCtrl.create({
      title: 'Saved!',
      message: 'Data have been saved locally!',
      buttons: ['Ok']
    });

    //add Item
    this.stripService.updateItems(0,
      this.farm,
      this.myDate,
      this.observer,
      this.stall,
      this.ml,
      this.balance);

      console.log("浏览器存储:")
      //console.log(Object.entries(this.teatService.getItems()));
      console.log(this.stripService.getItems()[0].farm)

    //pushing data to firebase database
    this.authService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.stripService.storeList(token)
            .subscribe(
              () => console.log('Success!'),
              error => {
                console.log(error);
              }
            );
        }
      );

    this.pushStripData();

    this.stall = "";
    this.ml = "";
    this.balance = "balanced";

    alert.present()
  }

  loadStripData() {
    this.database.getStripData().then((data: any) => {
      console.log("数据库里的数据:")
      console.log(data)
      this.ListUser = data
    }, (error) => {
      console.log(error);
    })
  }

  pushStripData() {
    this.database.addStripData(this.farm,
      this.myDate,
      this.observer,
      this.stall,
      this.ml,
      this.balance)
      .then((data) => {
        this.loadStripData();
        console.log("当前传输的一条数据:")
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }

  back() {
    this.listMap = NavParams
    this.listMap['stripFarm'] = this.farm
    this.listMap['stripDate'] = this.myDate
    this.listMap['stripObserver'] = this.observer
    this.listMap['stripStall'] = this.stall
    this.listMap['stripML'] = this.ml
    this.listMap['stripBalance'] = this.balance
    this.navCtrl.pop();
    //this.navCtrl.push(ListPage, this.listMap);
  }
}
