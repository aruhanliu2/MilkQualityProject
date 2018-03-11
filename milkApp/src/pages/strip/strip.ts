import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-strip',
  templateUrl: 'strip.html',
})
export class StripPage {
  private todo : FormGroup;
    myDate: String = moment().format();

  constructor( private formBuilder: FormBuilder ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      ml: [''],
      balanced:[false],
      unbalanced:[false],
    });
  }
  logForm(){
    console.log(this.todo.value)
    this.todo.reset()
  }

}
