import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { StarttestComponent } from './starttest/starttest.component';
import { ResetPasswordRequestComponent } from './auth/reset-password-request/reset-password-request.component';
import { ConfirmPasswordResetComponent } from './auth/confirm-password-reset/confirm-password-reset.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
const routes: Routes = [
  {
    path:'profilepage',
    component:ProfilepageComponent
  },
  {
    path:'homepage',
    component:HomePageComponent
  },

  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'createtest',
    component:CreatetestComponent
  },
  {
    path:'starttest',
    component:StarttestComponent
  },

  {
    path:'reset-password-request',
    component:ResetPasswordRequestComponent
  },

  {
    path:'confirm-password-reset',
    component:ConfirmPasswordResetComponent
  },

  {
    path:'resultpage',
    component:ResultpageComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
