import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TestService} from '../test.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent {

 
  constructor(
    private testService:TestService,
    private db:AngularFirestore,
    private snackBar:MatSnackBar,
    private router: Router) { }


  verifyCode(code:string)
  {
    this.testService.verifyCode(code);
  }

  openSnackBar(message,action)
  {
    this.snackBar.open(message,action,{duration:3000});

  }

 
}