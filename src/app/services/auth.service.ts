import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Maintain the status of the user's token,  therefore of it's authorication
   */
  private _userToken = new BehaviorSubject('');

  constructor() {}

  /**
   * Maintain the userToken behavior subject encapsulates and protected against
   * unwanted changes change
   */
  public get userToken() {
    return this._userToken.asObservable();
  }

  /**
   * Weather the user is authorized or not
   */
  public isAuth(): Observable<boolean> {
    return this.userToken.pipe(map((token) => Boolean(token)));
  }
}
