import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { StdBackReq } from 'src/models/stdBackReq';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public signUp(
    name: string,
    birth: string,
    password: string
  ): Observable<void> {
    const body = { name, birth, password };
    return this.http.post<StdBackReq<void>>('/api/user/register', body).pipe(
      map((res) => {
        return;
      })
    );
  }
}
