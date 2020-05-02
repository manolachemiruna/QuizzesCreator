import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { LoginComponent } from './auth/login/login.component';
import { ServicesComponent } from './services/services.component';
import { FirebaseComponent } from './services/firebase/firebase.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import{AngularFireAuthModule} from '@angular/fire/auth';
import { HomePageComponent } from './homepage/homepage.component';
import { SharedComponent } from './shared/shared.component';
import{ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator-directive';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { StarttestComponent } from './starttest/starttest.component';
import { ResetPasswordRequestComponent } from './auth/reset-password-request/reset-password-request.component';
import { ConfirmPasswordResetComponent } from './auth/confirm-password-reset/confirm-password-reset.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ModelComponent } from './model/model.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    LoginComponent,
    ServicesComponent,
    FirebaseComponent,
    HomePageComponent,
    ConfirmEqualValidatorDirective,
    ProfilepageComponent,
    CreatetestComponent,
    StarttestComponent,
    ResetPasswordRequestComponent,
    ConfirmPasswordResetComponent,
    ResultpageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSnackBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
