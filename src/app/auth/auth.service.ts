import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  user:any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {}
  


  getUserState() {
 
    return this.afAuth.authState;
  }

  login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/profilepage']);
        }
      });
  }

  createUser(user) {

    console.log(user);

    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/homepage']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName
    })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/homepage']);
    
  }

  frmPasswordReset: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });
  
 sendPasswordResetRequest(mail:string)
 {

    const email =mail;
    console.log(email);
    return this.afAuth.auth.sendPasswordResetEmail(email).then(
      () => {
        console.log("Email sent");
        this.router.navigate(['/homepage']);
      },
       error => {
          this.eventAuthError.next(error);
      }
    );
 }

 frmSetNewPassword = this.fb.group({
  password: [null, [Validators.required]],
  confirmPassword: [null, [Validators.required]]
});

setPassword(pass:string)
{

const password = pass;
console.log(password);
const code = this.route.snapshot.queryParams['oobCode'];

this.afAuth.auth.confirmPasswordReset(code, password)
  .then(
    () => {
      console.log("Password Changed");
      this.router.navigate(['/homepage']);
    },
  error => {
    this.eventAuthError.next(error);
  }
  );

}

}