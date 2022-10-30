import { StdBackReq } from './stdBackReq';

export interface UserData {
  name: string;
}

export interface LoginData extends UserData {
  jwt: string;
}

export type LoginReq = StdBackReq<LoginData>;
