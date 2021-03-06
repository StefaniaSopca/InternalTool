import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  err: string = ""
  errFlag: boolean  = false;
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenService) { }

  account_validation_messages = {
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 7 characters long' }

    ]
  }
  ngOnInit(): void {
    this.err = "";
    this.errFlag = false;
    this.loginForm = this.createFormGroup();
  }

  createFormGroup() : FormGroup
  {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    });
  }

  login(): void {
    console.log(this.loginForm.value);

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(data =>
          {
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data.username);
            this.tokenStorage.saveEmail(data.email);

            this.router.navigate(['/room']),
            console.log('logged!!!!', data.username)
          },

          err =>{ this.err = err; this.errFlag = true;})

    this.router.navigate(['/room']);
  }

}

