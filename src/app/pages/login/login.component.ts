import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginReq } from '../../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public formLogin: FormGroup = new FormGroup({
    name: new FormControl(),
    password: new FormControl(),
  });

  /**
   * Warns everyone when the component is being destroyed
   */
  private ngUnsubscribe = new Subject<void>();

  /**
   * Errro message to be shown to the user
   */
  public errmsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        if (params['name']) {
          this.formLogin.controls['name'].setValue(params['name']);
        }
        if (params['password']) {
          this.formLogin.controls['password'].setValue(params['name']);
        }
      });

    this.createFormLogin();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Logs the user in the system
   */
  public login() {
    this.errmsg = '';
    if (!this.formLogin.valid) {
      this.errmsg = 'missing info! please, double check';
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
    this.router.navigate(['register'], {
      queryParams: {
        name: this.formLogin.controls['name'].value || undefined,
        password: this.formLogin.controls['password'].value || undefined,
      },
    });
  }

  private createFormLogin() {
    this.formLogin = this.formBuilder.group({
      name: [
        this.formLogin?.controls['name'].value || '',
        Validators.compose([Validators.required]),
      ],
      password: [
        this.formLogin?.controls['password'].value || '',
        Validators.compose([Validators.required]),
      ],
    });
    this.formLogin.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.errmsg = '';
      });
  }
}
