import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] AuthenticateSuccess';
export const AUTHENTICATE_FAIL = '[Auth] AuthenticateFail';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export type AuthActionsType =
  AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignUpStart
  | ClearError
  | AutoLogin;

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date, redirect: boolean }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string, pass: string }) { }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) { }
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string, pass: string }) { }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
