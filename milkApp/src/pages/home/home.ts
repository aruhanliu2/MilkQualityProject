import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeatService } from '../../services/teat';
import { HygieneService } from '../../services/hygiene';
import { AlignmentService } from '../../services/alignment';
import { PostmilkService } from '../../services/postmilk';
import { StripService } from '../../services/strip';
import { LactocoderService } from '../../services/lactocoder';
import { DatabaseProvider } from '../../providers/database/database';
import { Http, Response, Headers } from "@angular/http";
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public ListUser: any;
  public success:String = "false";
  constructor(public navCtrl: NavController,
    private database: DatabaseProvider,
    private teatService: TeatService,
    private hygieneService: TeatService,
    private alignmentService: TeatService,
    private postmilkService: TeatService,
    private http: Http,
    private stripService: TeatService,
    private lactocoderService: TeatService,
    private authService: AuthService) {
  }
  
  public items = this.teatService.getItems();
  public email: string;
  public password: string;
  
  getInfo() {
      this.email = this.authService.email;
      this.password = this.authService.password;
      this.loadUserData();
      if (this.email != null && this.password != null) {
       this.pushUserData();
      }
      console.log("用户数据: " + this.ListUser)
  }

  submitData() {
    //push teat
    this.database.getTeatData().then((data: any) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/teat', JSON.stringify(data), {headers:headers}).subscribe(response => this.success = response.text());
    }, (error) => {
      console.log(error);
    })
    if (this.success=="true"){
    this.database.cleanTeatData();
    }
    //push align
    this.database.getAlignmentData().then((data: any) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/unit', JSON.stringify(data), {headers:headers}).subscribe(response => this.success = response.text());
    }, (error) => {
      console.log(error);
    })
    if (this.success=="true"){
    this.database.cleanAlignmentData();
    }
    //push udder
    this.database.getHygieneData().then((data: any) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/udder', JSON.stringify(data), {headers:headers}).subscribe(response => this.success = response.text());
    }, (error) => {
      console.log(error);
    })
    if (this.success=="true"){
    this.database.cleanHygieneData();
    }
    //push strip
    this.database.getStripData().then((data: any) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/strip', JSON.stringify(data), {headers:headers}).subscribe(response => this.success = response.text());
    }, (error) => {
      console.log(error);
    })
    if (this.success=="true"){
    this.database.cleanStripData();
    }
    //push post
    this.database.getPostmilkData().then((data: any) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/post', JSON.stringify(data), {headers:headers}).subscribe(response => this.success = response.text());
    }, (error) => {
      console.log(error);
    })
    if (this.success=="true"){
    this.database.cleanPostmilkData();
    }
    //push latco
    this.database.getLactocoderData().then((data: any) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/latco', JSON.stringify(data), {headers:headers}).subscribe(response => this.success = response.text());
    }, (error) => {
      console.log(error);
    })
    console.log(this.success);
    if (this.success=="true"){
    this.database.cleanLactocoderData();
    }
  }

  loadUserData() {
    console.log("enter")
    this.database.getUserInfo().then((data: any) => {
      console.log("数据库里的数据:")
      console.log(data)
      this.ListUser = data
    }, (error) => {
      console.log(error);
    })
  }

  pushUserData() {
      this.database.addUserInfo(this.email, this.password)
          .then((data) => {
          this.loadUserData();
          console.log("当前传输的一条数据:")
          console.log(data);
          }, (error) => {
          console.log(error);
      });
  }
}
