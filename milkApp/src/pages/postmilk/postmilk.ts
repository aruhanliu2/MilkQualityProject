import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the PostmilkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postmilk',
  templateUrl: 'postmilk.html',
})
export class PostmilkPage {
  public farm: String = "";
  public myDate: String = moment().format();
  public observer: String = "";
  private todo : FormGroup;


  constructor( private formBuilder: FormBuilder, public alerCtrl: AlertController ) {
    this.todo = this.formBuilder.group({
      group:[''],
      lh1: [false],
      lf1: [false],
      rh1: [false],
      rf1: [false],
      lh2: [false],
      lf2: [false],
      rh2: [false],
      rf2: [false],
      lh3: [false],
      lf3: [false],
      rh3: [false],
      rf3: [false],
      lh4: [false],
      lf4: [false],
      rh4: [false],
      rf4: [false],
      lh5: [false],
      lf5: [false],
      rh5: [false],
      rf5: [false],
    });
  }

  saveForm(){
    console.log(this.todo.value)
    this.todo.reset()
  }
  submitForm(){
    let alert = this.alerCtrl.create({
      title: 'Submitted!',
      message: 'Data have been submitted!',
      buttons: ['Ok']
    });
    this.saveForm()
    this.farm = ""
    this.myDate = moment().format()
    this.observer = ""
  }

}
