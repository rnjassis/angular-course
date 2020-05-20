import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  /*Subjects are used for cross component communication
  through services*/
  activatedEmitter = new Subject<boolean>();
}
