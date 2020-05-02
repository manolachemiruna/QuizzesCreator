import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../model/model.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.css']
})
export class CreatetestComponent implements OnInit {

  authError: any;
  user: firebase.User;
  model=new ModelComponent();
  arrayOfQuestion=new Array<ModelComponent>();

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private snackBar:MatSnackBar,
   
  ) { }

  ngOnInit() {

    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
    this.model=new ModelComponent();
    this.arrayOfQuestion.push(this.model);
  }


storeToDataBase(email:string,name:string)
{
  
 const code=this.generateCode();
 const date=new Date().getTime();//timp in miliseconds
 let state:String;
 if(this.user.email==email) state="login";
 else state="out";

  const obj =
{
  "name":name,
  "email":email,
  "array":this.arrayOfQuestion.map((object=>{return Object.assign({}, object)})),
  "code":code,
  "time":date,
  "state":state,

}
  const Code=
  {
    "code":code,
  }
  this.db.collection('Tests').add(obj);
  this.db.collection('Codes').add(Code);
  
}

generateCode()
{
  return '_' + Math.random().toString(36).substr(2, 9);
}

addQuestion(points:number)
{

  this.model=new ModelComponent();
  this.model.points=points;
  this.arrayOfQuestion.push(this.model);
  
}

openSnackBar(message,action)
{
  this.snackBar.open(message,action,{
    duration:3000,
    panelClass: ['snackbar'],
  });

}

}
