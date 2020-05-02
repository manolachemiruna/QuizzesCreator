import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthService,
    private snackBar:MatSnackBar,) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  sendPasswordResetRequest(frm)
  {
    this.auth.sendPasswordResetRequest(frm.value.email);
  }

  openSnackBar(message,action)
  {
    this.snackBar.open(message,action,{duration:5000});

  }
}
