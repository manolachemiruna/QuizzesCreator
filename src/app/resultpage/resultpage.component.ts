import { Component, OnInit } from '@angular/core';
import {TestService} from '../test.service';
import { Test } from '../model/test';
import {map,filter} from 'rxjs/operators';
import { ModelComponent } from '../model/model.component';
import { AngularFireAction } from '@angular/fire/database';
@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css']
})
export class ResultpageComponent implements OnInit {

  tests:Test[];
  code:string;
  WrongQuestions:Map<ModelComponent,String>=new Map<ModelComponent,String>();//sa retin intrebarea si raspunsul gresit
  Values:Array<String>=new Array<String>();
  Keys:Array<String>=new Array<String>();

  constructor(private testService:TestService,) { }

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
      tests=>this.tests=tests
    );

    this.WrongQuestions=this.testService.getWrongQuestions();
    Array.from(this.WrongQuestions.values()).forEach(value =>this.Values.push(value));
    Array.from(this.WrongQuestions.keys()).forEach(key =>this.Keys.push(key.question));
    console.log(this.Values);
    console.log(this.Keys);
  }

  findValue(value:String,key:ModelComponent)
  {
    return this.Values.find(val=>val==value);
  }

  findKey(key)
  {
    return this.Keys.find(val=>val==key);
  }

  getIndex(value:String,key:String)
  {
    if(this.Values.indexOf(value)==this.Keys.indexOf(key))return true;
    else return false;
  }



}
