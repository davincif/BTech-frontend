import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { LoginReq } from 'src/models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formRegister: FormGroup = new FormGroup({
    name: new FormControl(),
    birthdate: new FormControl(),
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
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        if (params['name']) {
          this.formRegister.controls['name'].setValue(params['name']);
        }
        if (params['password']) {
          this.formRegister.controls['password'].setValue(params['name']);
        }
      });

    this.createFormRegister();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Signs up the user in the back-end
   */
  public register() {
    this.errmsg = '';
    if (!this.formRegister.valid) {
      this.errmsg = 'missing info! please, double check';
      return;
    }

    this.userService
      .signUp(
        this.formRegister.controls['name'].value,
        this.formRegister.controls['birthdate'].value,
        this.formRegister.controls['password'].value
      )
      .subscribe({
        next: (_) => {
          this.router.navigate(['login'], {
            queryParams: {
              name: this.formRegister.controls['name'].value || undefined,
              password:
                this.formRegister.controls['password'].value || undefined,
            },
          });
        },
        error: (err: HttpErrorResponse) => {
          // TODO: THERE SHOULD BE AN ERROR TRANSLATION, BUT WE HAVE NO TIME FOR THAT ^^"
          let error: LoginReq | undefined = err.error;

          this.errmsg = error?.msg || 'sorry, an unkown error happened =/';
        },
      });
  }

  private createFormRegister() {
    this.formRegister = this.fb.group({
      name: [
        this.formRegister?.controls['name'].value || '',
        Validators.compose([Validators.required]),
      ],
      birthdate: ['', Validators.compose([Validators.required])],
      password: [
        this.formRegister?.controls['password'].value || '',
        Validators.compose([Validators.required]),
      ],
    });
    this.formRegister.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.errmsg = '';
      });
  }
}
