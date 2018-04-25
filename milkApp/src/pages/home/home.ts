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
  
  public items = this.teatService.getItems();

  submitData() {
  }

  // loadTeatData() {
  //   this.database.getTeatData().then((data: any) => {
  //     console.log("数据库里的数据:")
  //     console.log(data)
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }

  // pushTeatData() {
  //   this.database.addTeatData(this.items[0].farm, this.items[0].date, this.items[0].observer, this.items[0].milker, this.items[0].clean, this.items[0].dip_present, this.items[0].small_dirt, this.items[0].large_dirt, this.items[0].before_after)
  //     .then((data) => {
  //       this.loadTeatData();
  //       console.log("当前传输的一条数据:")
  //       console.log(data);
  //     }, (error) => {
  //       console.log(error);
  //     });
  // }



}
