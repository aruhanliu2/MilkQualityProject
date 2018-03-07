import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeatPage } from '../teat/teat';
import { HgyienePage } from '../hgyiene/hgyiene';
import { AlignmentPage } from '../alignment/alignment';
import { StripPage } from '../strip/strip';
import { PostmilkPage } from '../postmilk/postmilk';
import { LactocoderPage } from '../lactocoder/lactocoder';
import { Lactocoder2Page } from '../lactocoder2/lactocoder2';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  teatPage = TeatPage;
  hgyienePage = HgyienePage;
  alignmentPage = AlignmentPage;
  stripPage = StripPage;
  postmilkPage = PostmilkPage;
  lactocoderPage = LactocoderPage;
  lactocoder2Page = Lactocoder2Page;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
