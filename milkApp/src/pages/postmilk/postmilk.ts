import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { PostmilkService } from '../../services/postmilk';
import { AuthService } from "../../services/auth";
import { DatabaseProvider } from '../../providers/database/database';
import { Http } from "@angular/http";
import { ListPage } from '../../pages/list/list';

@IonicPage()
@Component({
  selector: 'page-postmilk',
  templateUrl: 'postmilk.html',
})
export class PostmilkPage {
  public farm: string
  public myDate: string
  public observer: string

  public group: string
  public teatSkinLH: string
  public teatSkinLF: string
  public teatSkinRH: string
  public teatSkinRF: string

  public teatColorLH: string
  public teatColorLF: string
  public teatColorRH: string
  public teatColorRF: string

  public swellingLH: string
  public swellingLF: string
  public swellingRH: string
  public swellingRF: string

  public hardnessLH: string
  public hardnessLF: string
  public hardnessRH: string
  public hardnessRF: string

  public scoreLH: string
  public scoreLF: string
  public scoreRH: string
  public scoreRF: string

  private ListUser : any
  public listMap: any

  constructor(public alerCtrl: AlertController,
    private postmilkService: PostmilkService,
    private http: Http,
    private authService: AuthService,
    private database: DatabaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams ) {
      this.farm = (navParams.get('postFarm') != undefined)?navParams.get('postFarm'):""
      this.myDate = (navParams.get('postDate') != undefined)?navParams.get('postDate'):moment().format('YYYY-MM-DD')
      this.observer = (navParams.get('postObserver') != undefined)?navParams.get('postObserver'):""

      this.group = (navParams.get('postGroup') != undefined)?navParams.get('postGroup'):""

      this.teatSkinLH = (navParams.get('skinLH') != undefined)?navParams.get('skinLH'):"N"
      this.teatSkinLF = (navParams.get('skinLF') != undefined)?navParams.get('skinLF'):"N"
      this.teatSkinRH = (navParams.get('skinRH') != undefined)?navParams.get('skinRH'):"N"
      this.teatSkinRF = (navParams.get('skinRF') != undefined)?navParams.get('skinRF'):"N"

      this.teatColorLH = (navParams.get('colorLH') != undefined)?navParams.get('colorLH'):"N"
      this.teatColorLF = (navParams.get('colorLF') != undefined)?navParams.get('colorLF'):"N"
      this.teatColorRH = (navParams.get('colorRH') != undefined)?navParams.get('colorRH'):"N"
      this.teatColorRF = (navParams.get('colorRF') != undefined)?navParams.get('colorRF'):"N"

      this.swellingLH = (navParams.get('swellingLH') != undefined)?navParams.get('swellingLH'):"N"
      this.swellingLF = (navParams.get('swellingLF') != undefined)?navParams.get('swellingLF'):"N"
      this.swellingRH = (navParams.get('swellingRH') != undefined)?navParams.get('swellingRH'):"N"
      this.swellingRF = (navParams.get('swellingRF') != undefined)?navParams.get('swellingRF'):"N"

      this.hardnessLH = (navParams.get('hardnessLH') != undefined)?navParams.get('hardnessLH'):"N"
      this.hardnessLF = (navParams.get('hardnessLF') != undefined)?navParams.get('hardnessLF'):"N"
      this.hardnessRH = (navParams.get('hardnessRH') != undefined)?navParams.get('hardnessRH'):"N"
      this.hardnessRF = (navParams.get('hardnessRF') != undefined)?navParams.get('hardnessRF'):"N"

      this.scoreLH = (navParams.get('scoreLH') != undefined)?navParams.get('scoreLH'):"N"
      this.scoreLF = (navParams.get('scoreLF') != undefined)?navParams.get('scoreLF'):"N"
      this.scoreRH = (navParams.get('scoreRH') != undefined)?navParams.get('scoreRH'):"N"
      this.scoreRF = (navParams.get('scoreRF') != undefined)?navParams.get('scoreRF'):"N"
  }

  saveData(){
    let alert = this.alerCtrl.create({
      title: 'Saved!',
      message: 'Data have been saved locally!',
      buttons: ['Ok']
    });

    //add Item
    this.postmilkService.updateItems(0,
      this.farm,
      this.myDate,
      this.observer,
      this.group,
      this.teatSkinLH,
      this.teatSkinLF,
      this.teatSkinRH,
      this.teatSkinRF,
      this.teatColorLH,
      this.teatColorLF,
      this.teatColorRH,
      this.teatColorRF,
      this.swellingLH,
      this.swellingLF,
      this.swellingRH,
      this.swellingRF,
      this.hardnessLH,
      this.hardnessLF,
      this.hardnessRH,
      this.hardnessRF,
      this.scoreLH,
      this.scoreLF,
      this.scoreRH,
      this.scoreRF,
    );

      console.log("浏览器存储:")
      //console.log(Object.entries(this.teatService.getItems()));
      console.log(this.postmilkService.getItems()[0].farm)

      //pushing data to firebase database
      this.authService.getActiveUser().getIdToken()
        .then(
          (token: string) => {
            this.postmilkService.storeList(token)
              .subscribe(
                () => console.log('Success!'),
                error => {
                  console.log(error);
                }
              );
          }
        );

    //local storage
    this.pushPostmilkData();

    //this.group = ""
    this.teatSkinLH = "N"
    this.teatSkinLF = "N"
    this.teatSkinRH = "N"
    this.teatSkinRF = "N"

    this.teatColorLH = "N"
    this.teatColorLF = "N"
    this.teatColorRH = "N"
    this.teatColorRF = "N"

    this.swellingLH = "N"
    this.swellingLF = "N"
    this.swellingRH = "N"
    this.swellingRF = "N"

    this.hardnessLH = "N"
    this.hardnessLF = "N"
    this.hardnessRH = "N"
    this.hardnessRF = "N"

    this.scoreLH = "N"
    this.scoreLF = "N"
    this.scoreRH = "N"
    this.scoreRF = "N"

    alert.present()
  }

  loadPostmilkData() {
    this.database.getPostmilkData().then((data: any) => {
      console.log("数据库里的数据:")
      console.log(data)
      this.ListUser = data
    }, (error) => {
      console.log(error);
    })
  }

  pushPostmilkData() {
    this.database.addPostmilkData(this.farm,
      this.myDate,
      this.observer,
      this.group,
      this.teatSkinLH,
      this.teatSkinLF,
      this.teatSkinRH,
      this.teatSkinRF,
      this.teatColorLH,
      this.teatColorLF,
      this.teatColorRH,
      this.teatColorRF,
      this.swellingLH,
      this.swellingLF,
      this.swellingRH,
      this.swellingRF,
      this.hardnessLH,
      this.hardnessLF,
      this.hardnessRH,
      this.hardnessRF,
      this.scoreLH,
      this.scoreLF,
      this.scoreRH,
      this.scoreRF)
      .then((data) => {
        this.loadPostmilkData();
        console.log("当前传输的一条数据:")
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }

  back() {
    this.listMap = NavParams
    this.listMap['postFarm'] = this.farm
    this.listMap['postDate'] = this.myDate
    this.listMap['postObserver'] = this.observer
    this.listMap['postGroup'] = this.group

    this.listMap['skinLH'] = this.teatSkinLH
    this.listMap['skinLF'] = this.teatSkinLF
    this.listMap['skinRH'] = this.teatSkinRH
    this.listMap['skinRF'] = this.teatSkinRF

    this.listMap['colorLH'] = this.teatColorLH
    this.listMap['colorLF'] = this.teatColorLF
    this.listMap['colorRH'] = this.teatColorRH
    this.listMap['colorRF'] = this.teatColorRF

    this.listMap['swellingLH'] = this.swellingLH
    this.listMap['swellingLF'] = this.swellingLF
    this.listMap['swellingRH'] = this.swellingRH
    this.listMap['swellingRF'] = this.swellingRF

    this.listMap['hardnessLH'] = this.hardnessLH
    this.listMap['hardnessLF'] = this.hardnessLF
    this.listMap['hardnessRH'] = this.hardnessRH
    this.listMap['hardnessRF'] = this.hardnessRF

    this.listMap['scoreLH'] = this.scoreLH
    this.listMap['scoreLF'] = this.scoreLF
    this.listMap['scoreRH'] = this.scoreRH
    this.listMap['scoreRF'] = this.scoreRF

    this.navCtrl.push(ListPage, this.listMap);
  }
}
