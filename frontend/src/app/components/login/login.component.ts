import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) { }
  isLoggedIn = false;
  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
    }
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
         // this.isLoginFailed = false;
          this.isLoggedIn = true;
          //this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/room']),
          console.log('logged!!!!', data.username)}
        )
    this.router.navigate(['/room']);
    }
  }
  function msg(msg: any) {
    throw new Error('Function not implemented.');
  }

