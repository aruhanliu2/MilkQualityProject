import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  template: `
    <form [formGroup]="todo" (ngSubmit)="logForm()">
      <ion-item>
        <ion-label>Stall No:</ion-label>
        <ion-input type="text" formControlName="title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>ML</ion-label>
        <ion-input type="text" formControlName="ml"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Balanced</ion-label>
        <ion-checkbox formControlName="balanced" ></ion-checkbox>
      </ion-item>
      <ion-item>
        <ion-label>Not Balanced</ion-label>
        <ion-checkbox formControlName="unbalanced" ></ion-checkbox>
      </ion-item>
      <button ion-button type="submit" [disabled]="!todo.valid">Save</button>
      <button ion-button type="submit" >Submit</button>
    </form>
  `
})
export class StripPage {
  private todo : FormGroup;

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
