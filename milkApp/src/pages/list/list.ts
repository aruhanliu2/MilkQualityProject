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

  public listMap: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listMap = (navParams != undefined)?NavParams:{}
  }

  goTeat() {
    this.navCtrl.push(TeatPage, this.listMap);
  }

  goHygiene() {
    this.navCtrl.push(HygienePage, this.listMap);
  }

  goAlignment(){
    this.navCtrl.push(AlignmentPage, this.listMap);
  }

  goStrip(){
    this.navCtrl.push(StripPage, this.listMap);
  }

  goPostmilk(){
    this.navCtrl.push(PostmilkPage, this.listMap);
  }

  goLactocoder(){
    this.navCtrl.push(LactocoderPage, this.listMap);
  }
}
