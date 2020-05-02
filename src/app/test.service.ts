import { Injectable } from '@angular/core';
import{AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import{Observable} from 'rxjs';
import {Test} from './model/test';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelComponent } from './model/model.component';
import { newArray } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  testCollection:AngularFirestoreCollection<Test>;
  tests:Observable<Test[]>;
  testDoc: AngularFirestoreDocument<Test>;
  code:string;
  WrongQuestions:Map<ModelComponent,String>=new Map<ModelComponent,String>();//sa retin intrebarea si raspunsul gresit
  RightQuestions:Map<ModelComponent,String>=new Map<ModelComponent,String>();//sa retin intrebarea si raspunsul corect pentru a calcula punctajul

  constructor(private db:AngularFirestore,
    private router:Router,
    private snackBar:MatSnackBar
    ) {
    this.testCollection=this.db.collection<Test>('Tests');
    this.tests=this.testCollection.snapshotChanges().pipe(
      map(changes=>
     {
      return changes.map(a => {
        const data = a.payload.doc.data() as Test;
         const id = a.payload.doc.id;
        return {id,...data}; 
      });
    })
    )

   }

   getTests():Observable<Test[]>
   {
     return this.tests;
   }

   updateTest(test){

    this.testDoc = this.db.doc(`Tests/${test.id}`);
    this.testDoc.update(test);
  }

  deleteTest(test){
    this.testDoc = this.db.doc(`Tests/${test.id}`);
    this.testDoc.delete();
  }

  verifyCode(code:string)
  {

    const refCollection=this.db.collection('Tests').ref;

    refCollection
    .where('code','==',code)
    .get()
    .then(
      reg=>reg.forEach(
      i=>
      {
        this.code=code;
        this.router.navigate(['/starttest']);
        this.snackBar.open('Your Code is correct!','Close',{duration: 3000});
      })
    )
  }

  getCode()
  {
    return this.code;
  }


  verifyAnswer(ans:string,questions:ModelComponent,i:number)
  {
     if(ans==questions.correct){this.RightQuestions.set(questions,ans);return true;}
     else {this.WrongQuestions.set(questions,ans);return false;}
  }

  getWrongQuestions()
  {
    return this.WrongQuestions;
  }

  getRightQuestions()
  {
    return this.RightQuestions;
  }


  

}
