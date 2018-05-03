import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TeatService } from '../../services/teat';
import { AuthService } from "../../services/auth";
import { DatabaseProvider } from '../../providers/database/database';
import { Http, Response, Headers } from "@angular/http";
import * as moment from 'moment';
import { ListPage } from '../../pages/list/list';

@IonicPage()
@Component({
  selector: 'page-teat',
  templateUrl: 'teat.html'
})
export class TeatPage {
  public farm: string
  public myDate: string
  public observer: string
  public milker: string
  public clean: number
  public dipPresent: number
  public smallDirt: number
  public largeDirt: number
  public beforeAfter: string
  private ListUser : any
  public listMap: any


  constructor(public alerCtrl: AlertController,
    private teatService: TeatService,
    private http: Http,
    private authService: AuthService,
    private database: DatabaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.farm = (navParams.get('teatFarm') != undefined)?navParams.get('teatFarm'):""
      this.myDate = (navParams.get('teatDate') != undefined)?navParams.get('teatDate'):moment().format('YYYY-MM-DD')
      this.observer = (navParams.get('teatObserver') != undefined)?navParams.get('teatObserver'):""
      this.milker = (navParams.get('teatMilker') != undefined)?navParams.get('teatMilker'):""
      this.clean = (navParams.get('teatClean') != undefined)?navParams.get('teatClean'):0
      this.dipPresent = (navParams.get('teatDip') != undefined)?navParams.get('teatDip'):0
      this.smallDirt = (navParams.get('teatSmall') != undefined)?navParams.get('teatSmall'):0
      this.largeDirt = (navParams.get('teatLarge') != undefined)?navParams.get('teatLarge'):0
      this.beforeAfter = (navParams.get('teatBA') != undefined)?navParams.get('teatBA'):"b"
  }
  tapDecrease(e,param:number){
    if(param==1){
      this.clean = Math.max(this.clean-1,0)
    } else if(param==2){
      this.dipPresent = Math.max(this.dipPresent-1,0)
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
      this.dipPresent++
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
    //add new item
    this.teatService.updateItems(0,
      this.farm,
      this.myDate,
      this.observer,
      this.milker,
      this.clean,
      this.dipPresent,
      this.smallDirt,
      this.largeDirt,
      this.beforeAfter
    );

    console.log("浏览器存储:")
    //console.log(Object.entries(this.teatService.getItems()));
    console.log(this.teatService.getItems()[0].farm)

    //pushing data to firebase database
    this.authService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.teatService.storeList(token)
            .subscribe(
              () => console.log('Success!'),
              error => {
                console.log(error);
              }
            );
        }
      );

    //local storage to sqlite
    this.pushTeatData();

    this.clean = 0
    this.dipPresent = 0
    this.smallDirt = 0
    this.largeDirt = 0
    this.beforeAfter = "b"

    alert.present()
  }

  submitData() {
    this.database.getTeatData().then((data: any) => {
      this.ListUser = data;
      /*
      var headers = new Headers();

      headers.append('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/mobile/teat', JSON.stringify(data), {headers:headers})
      .map((response:Response) => {
         console.log(response);
         // response.json();
      }).subscribe();*/
      // console.log(data);
      console.log("I'm here");
      var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/teat', JSON.stringify(data), {headers:headers}).map((response:Response) => {
                console.log("I'm here");
                console.log(response);
                // response.json();
            }).subscribe();



    }, (error) => {
      console.log("I'm here");
      console.log(error);
    })

    this.database.cleanTeatData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeatPage')
  }

  loadTeatData() {
    this.database.getTeatData().then((data: any) => {
      console.log("数据库里的数据:")
      console.log(data)
      this.ListUser = data
    }, (error) => {
      console.log(error);
    })
  }

  pushTeatData() {
    this.database.addTeatData(this.farm, this.myDate, this.observer, this.milker, this.clean, this.dipPresent, this.smallDirt, this.largeDirt, this.beforeAfter)
      .then((data) => {
        this.loadTeatData();
        console.log("当前传输的一条数据:")
        console.log(data);
      }, (error) => {
        console.log(error);
      });
  }

  back() {
    this.listMap = NavParams
    this.listMap['teatFarm'] = this.farm
    this.listMap['teatDate'] = this.myDate
    this.listMap['teatObserver'] = this.observer
    this.listMap['teatMilker'] = this.milker
    this.listMap['teatClean'] = this.clean
    this.listMap['teatDip'] = this.dipPresent
    this.listMap['teatSmall'] = this.smallDirt
    this.listMap['teatLarge'] = this.largeDirt
    this.listMap['teatBA'] = this.beforeAfter
    this.navCtrl.push(ListPage, this.listMap);
  }

}
