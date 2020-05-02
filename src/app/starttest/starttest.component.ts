import { Component, OnInit } from '@angular/core';
import { Test } from '../model/test';
import { AngularFirestore } from '@angular/fire/firestore';
import { TestService } from '../test.service';
import {map,filter} from 'rxjs/operators';
import { ModelComponent } from '../model/model.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Key } from 'protractor';
@Component({
  selector: 'app-starttest',
  templateUrl: './starttest.component.html',
  styleUrls: ['./starttest.component.css']
})
export class StarttestComponent implements OnInit {

  code:string;
  tests:Test[];
  val:number;
  value:number=0;
  ArrayValue:Array<string>=new Array<string>();
 

  constructor(private db:AngularFirestore,
    private snackBar:MatSnackBar,
    private router:Router,
    private testService:TestService) { }

  ngOnInit(): void {
    
    this.code=this.testService.getCode();

    this.testService.getTests().pipe
    (
      map(v=>
       v.filter(i=>this.code==i.code)
      )
    )
    .subscribe
    (
      tests=>{
        this.tests=tests;this.val=tests[0].array.length;
        for(let i=0;i<this.val;i++)
        this.ArrayValue[i]=i.toString();
      }
    );

  }

  verifyAnswer(ans,questions:ModelComponent,i)
  {

    return this.testService.verifyAnswer(ans,questions,i);
  }


  setButtons(id:string)
  {
    
    let button1=document.getElementById(id);
    let j=Number(button1);
    j+=4;
    button1.id=j.toString();  
  }

openSnackBar(message,action)
{
  let snackBarRef=this.snackBar.open(message,action,{duration:3000});
  snackBarRef.afterDismissed().subscribe(
    ()=>console.log('The snackbar was dismissed')
  )

  snackBarRef.onAction().subscribe(
    ()=>this.router.navigate(['/resultpage'])
  )
}

myFunction(id:string) {

  let elem=document.getElementById(id) as HTMLInputElement;
  if(elem!=null)elem.disabled = true;
}

getScore()
{
  let totalScore=0;
  let WrongQuestions=this.testService.getWrongQuestions();
  let RightQuestions=this.testService.getRightQuestions();
  let Points:Array<number>=new Array<number>();
  Array.from(RightQuestions.keys()).forEach(key =>Points.push(key.points));//fac un vector cu punctele pe care le-am adunat

   for(let point of Points)
   {
      totalScore+=point;
   }

   return totalScore;
}

storeToDataBase(name:string)
{
  let totalScore=this.getScore();
  let email=this.tests[0].email;
  let nameOfTest=this.tests[0].name;
  const score=
  {
     'email':email,
     'name':name,
     'score':totalScore,
     'nameOfTest':nameOfTest,

  }

  this.db.collection('Scores').add(score);
}


}
