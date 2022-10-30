import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginReq } from '../../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = new FormGroup({
    name: new FormControl(),
    password: new FormControl(),
  });

  /**
   * Errro message to be shown to the user
   */
  public errmsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFormLogin();
  }

  /**
   * Logs the user in the system
   */
  public login() {
    if (!this.formLogin.valid) {
      return;
    }

    this.authService
      .authenticate(
        this.formLogin.controls['name'].value,
        this.formLogin.controls['password'].value
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          // TODO: THERE SHOULD BE AN ERROR TRANSLATION, BUT WE HAVE NO TIME FOR THAT ^^"
          let error: LoginReq | undefined = err.error;
          console.log('err', err);

          this.errmsg = error?.msg || 'sorry, an unkown error happened =/';
        },
      });
  }

  /**
   * Sign a new user up in the system
   */
  public singup() {
    console.log('singup', this.formLogin);
  }

  private createFormLogin() {
    this.formLogin = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
}
