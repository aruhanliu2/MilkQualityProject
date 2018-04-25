import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeatService } from '../../services/teat';
import { HygieneService } from '../../services/hygiene';
import { AlignmentService } from '../../services/alignment';
import { PostmilkService } from '../../services/postmilk';
import { StripService } from '../../services/strip';
import { LactocoderService } from '../../services/lactocoder';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
    private database: DatabaseProvider,
    private teatService: TeatService,
  private hygieneService: TeatService,
private alignmentService: TeatService,
private postmilkService: TeatService,
private stripService: TeatService,
private lactocoderService: TeatService) {

  }

}
