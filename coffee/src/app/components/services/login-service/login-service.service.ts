import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  authSubject = new BehaviorSubject(false);

  signIn(user: string, password: string) {
    let userAux = localStorage.getItem('user')
    let passwordAux = localStorage.getItem('password')

    if (user == userAux && password == passwordAux) {
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }
}
