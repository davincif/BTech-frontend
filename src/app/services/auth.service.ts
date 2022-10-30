import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, map, Observable, of, tap, throwError } from 'rxjs';

import { StdBackReq } from '../../models/stdBackReq';
import { LoginReq, UserData } from '../../models/auth';
import { LocalStorage } from '../../utils/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Stores the user's token, therefore of it's authorication status
   */
  private _userToken;

  /**
   * Stores the user data from a logged user
   */
  private _userData;

  private localStorage = LocalStorage;

  constructor(private http: HttpClient, private router: Router) {
    // setting up inicial state of the userToken
    this._userToken = new BehaviorSubject(this.readAuthentication() || '');
    this._userData = new BehaviorSubject(this.readUserData() || undefined);

    // watch changes on the browserStorage
    window.addEventListener(
      'storage',
      () => {
        const userTokenUpdate = this.readAuthentication() || '';
        const userDataUpdate = this.readUserData() || undefined;

        this._userData.next(userDataUpdate);

        if (userTokenUpdate != this.getUserToken()) {
          this._userToken.next(userTokenUpdate);
          location.reload();
        }
      },
      false
    );

    // keep the local storage updated with the user token
    this.userToken.subscribe((token) => {
      if (token) {
        this.saveAuthentication();
      } else {
        this.removeAuthentication();
      }
    });

    // keep the local storage updated with the user's data
    this.userData.subscribe((uData) => {
      if (uData) {
        this.saveUserData();
      } else {
        this.removeUserData();
      }
    });
  }

  /**
   * Maintain the userToken BehaviorSubject encapsulates and protected against
   * unwanted changes change
   */
  public get userToken() {
    return this._userToken.asObservable();
  }

  /**
   * Get the current user token stored
   * @returns The user token
   */
  public getUserToken() {
    return this._userToken.value;
  }

  /**
   * Maintain the userData BehaviorSubject encapsulates and protected against
   * unwanted changes change
   */
  public get userData() {
    return this._userData.asObservable();
  }

  /**
   * Get the current user token stored
   * @returns The user data object
   */
  public getUserData() {
    return this._userData.value;
  }

  /**
   * Weather the user is authorized or not
   */
  public isAuth(): Observable<boolean> {
    return this.userToken.pipe(map((token) => Boolean(token)));
  }

  /**
   * Authenticate the user in the system
   * @param name User's name
   * @param password User's password
   */
  public authenticate(name: string, password: string): Observable<LoginReq> {
    // if user is already logged
    if (this._userToken.value) {
      let ret: StdBackReq<null> = {
        status: '-1',
        msg: 'USER LAREADY LOGGED',
      };
      return throwError(() => ret);
    }

    const body = { name, password };
    return this.http.post<LoginReq>(`/api/user/login`, body).pipe(
      tap((res) => {
        // update and "broadcast" informations about the just logged user
        this._userToken.next(res.data?.jwt || '');
        if (res.data?.name) {
          this._userData.next({ name: res.data.name });
        }
      })
    );
  }

  /**
   * Logs out the given user from the system
   * @param name User's name
   */
  public logout(): Observable<void> {
    const uData = this.getUserData();

    // if user is already logged
    if (!this.getUserToken() || !uData) {
      return of();
    }

    let body = { name: uData.name };
    return this.http.post<StdBackReq<void>>('/api/user/logout', body).pipe(
      map((res) => {
        if (res.status != '0') {
          throw res;
        }

        return;
      }),
      tap((res) => {
        this._userToken.next('');
        this._userData.next(undefined);
        this.router.navigate(['/login']);
      })
    );
  }

  /**
   * Saves the current user token to the local storage
   */
  private saveAuthentication() {
    this.localStorage.saveAuthentication(this.getUserToken());
  }

  /**
   * Reads the authentication data stored on localStorage
   */
  private readAuthentication() {
    return this.localStorage.readAuthentication();
  }

  /**
   * Removes the authentication data stored on localStorage
   */
  private removeAuthentication() {
    this.localStorage.removeAuthentication();
  }

  /**
   * Saves the current user data to the local storage
   */
  private saveUserData() {
    this.localStorage.saveUserData(JSON.stringify(this.getUserData()));
  }

  /**
   * Reads the user data stored on localStorage
   */
  private readUserData(): UserData | undefined {
    let data = this.localStorage.readUserData();
    if (!data) {
      return;
    }

    return JSON.parse(data) as UserData;
  }

  /**
   * Removes the user data stored on localStorage
   */
  private removeUserData() {
    this.localStorage.removeUserData();
  }
}
