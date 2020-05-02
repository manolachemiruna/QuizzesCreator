import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {TestService} from './test.service';
import { Test } from './model/test';
import {map,filter} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  delay_millis = 24*60*60*1000;//runs once a day
  title = 'TestCreatorPlatform';
  test:Test[];
  timeout = new Date().getTime();//data curenta;
  state:String="login";

  constructor( private testService:TestService) { }

  repeatHandle = window.setInterval(()=> {

    this.testService.getTests().pipe
    (
      map(v=>
       v.filter(i=>i.state==this.state && i.time+7*24*3600*1000>this.timeout)//le caut pe cele la care le-a expirat timpul si nu exista un user logat cand au fost create
      )
    )
    .subscribe
    (tests=>tests.forEach(i=>this.testService.deleteTest(i)));

    console.log("yas");

  }, this.delay_millis);

 

 

}
 
  

