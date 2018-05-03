import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeatPage } from '../teat/teat';
import { HygienePage } from '../hygiene/hygiene';
import { AlignmentPage } from '../alignment/alignment';
import { StripPage } from '../strip/strip';
import { PostmilkPage } from '../postmilk/postmilk';
import { LactocoderPage } from '../lactocoder/lactocoder';
import * as moment from 'moment';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  teatPage = TeatPage;
  hygienePage = HygienePage;
  alignmentPage = AlignmentPage;
  stripPage = StripPage;
  postmilkPage = PostmilkPage;
  lactocoderPage = LactocoderPage;

  // teat
  public farm: string
  public myDate: string
  public observer: string
  public milker: string
  public clean: number
  public dipPresent: number
  public smallDirt: number
  public largeDirt: number
  public beforeAfter: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  goTeat() {
    this.navCtrl.push(TeatPage, {
      teatFarm: this.farm,
      teatDate: this.myDate,
      teatObserver: this.observer,
      teatMilker: this.milker,
      teatClean: this.clean,
      teatDip: this.dipPresent,
      teatSmall: this.smallDirt,
      teatLarge: this.largeDirt,
      teatBA: this.beforeAfter
    });
  }
}
