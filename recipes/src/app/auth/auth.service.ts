import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  user = new Subject<User>();

  signInLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgBPTGC2TLUQQtMp9fuxt2m68a-rSQjzA';
  signUpLink = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgBPTGC2TLUQQtMp9fuxt2m68a-rSQjzA';

  signup(mail: string, pass: string) {
    return this.http.post<AuthResponseData>(this.signUpLink,
      {
        email: mail,
        password: pass,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  login(mail: string, pass: string) {
    return this.http.post<AuthResponseData>(this.signInLink,
      {
        email: mail,
        password: pass,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  private handleAuthentication(email: string, id, _token: string, _tokenExpirationDate: string) {
    const expirationDate = new Date(new Date().getTime() + +_tokenExpirationDate * 1000);
    const user = new User(email, id, _token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is incorrect';
    }
    return throwError(errorMessage);
  }
}
