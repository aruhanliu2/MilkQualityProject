import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { PostmilkService } from '../../services/postmilk';
import { AuthService } from "../../services/auth";
import { DatabaseProvider } from '../../providers/database/database';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-postmilk',
  templateUrl: 'postmilk.html',
})
export class PostmilkPage {
  public farm: string = ""
  public myDate: string = moment().format('DD-MM-YYYY')
  public observer: string = ""

  public group: string = ""
  public teatSkinLH: string = "N"
  public teatSkinLF: string = "N"
  public teatSkinRH: string = "N"
  public teatSkinRF: string = "N"

  public teatColorLH: string = "N"
  public teatColorLF: string = "N"
  public teatColorRH: string = "N"
  public teatColorRF: string = "N"

  public swellingLH: string = "N"
  public swellingLF: string = "N"
  public swellingRH: string = "N"
  public swellingRF: string = "N"

  public hardnessLH: string = "N"
  public hardnessLF: string = "N"
  public hardnessRH: string = "N"
  public hardnessRF: string = "N"

  public scoreLH: string = "N"
  public scoreLF: string = "N"
  public scoreRH: string = "N"
  public scoreRF: string = "N"

  private ListUser : any

  constructor(public alerCtrl: AlertController,
    private postmilkService: PostmilkService,
    private http: Http,
    private authService: AuthService,
    private database: DatabaseProvider ) {
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
}
