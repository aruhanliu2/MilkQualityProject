import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-lactocoder',
  templateUrl: 'lactocoder.html',
})
export class LactocoderPage {
  myDate: String = moment().format();
  private todo : FormGroup;
  private todo2: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.todo = this.formBuilder.group({
      farm:[''],
      parlor:[''],
      pre_milking:[''],
      herd_size:[''],
      size:[''],
      procedures:[''],
      frequency:[''],
      operators:[''],
      prep:[''],
      routine:[''],
    });
    this.todo2 = this.formBuilder.group({
      cow: ['', Validators.required],
      attach: [''],
      remove: [''],
      dip: [''],
      lag: [''],
      unit: [''],
      total: [''],
      remarks: [''],
    });
  }
  logForm(){
    this.todo2.reset()
  }

}
