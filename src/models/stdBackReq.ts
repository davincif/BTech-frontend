/**
 * Standard BackEnd Request
 */
export interface StdBackReq<T> {
  status: string;
  data?: T;
  msg?: string;
}
