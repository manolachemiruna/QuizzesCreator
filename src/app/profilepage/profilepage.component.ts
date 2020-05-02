import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {TestService} from '../test.service';
import {map,filter} from 'rxjs/operators'
import { Test } from '../model/test';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  user: firebase.User;
  tests:Test[];
  editState: boolean = false;
  testToEdit:Test;
  
  constructor(private auth: AuthService, 
    private db:AngularFirestore,
    private snackBar:MatSnackBar,
    private testService:TestService) { }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
    this.testService.getTests().pipe
    (
      map(v=>
       v.filter(i=>this.user.email==i.email)
      )
    )
    .subscribe
    (tests=>this.tests=tests)
  }

  editTest(event, test:Test){

    this.editState = true;
    this.testToEdit = test;
  }

  updateTest(test:Test){
    
    this.testService.updateTest(test);
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.testToEdit = null;
  }

  deleteTest(event, test:Test){
    this.clearState();
    this.openSnackBar('You are about to delete a test,are you sure?','Yes',test);
  }

  openSnackBar(message,action,test:Test)
  {
    let snackBarRef=this.snackBar.open(message,action,{duration:3000});
    snackBarRef.afterDismissed().subscribe(
      ()=>console.log('The snackbar was dismissed')
    )

    snackBarRef.onAction().subscribe(
      ()=>this.testService.deleteTest(test)
    )
  }

  startTest(code:string)
  {
    this.testService.verifyCode(code);
  }
  openSnackBarCode(message,action)
  {
    this.snackBar.open(message,action,{duration:3000});

  }

  logout() {
    this.auth.logout();
  }
  }
