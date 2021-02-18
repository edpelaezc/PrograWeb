import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _router: Router) {}

  authSubject = false;

  signIn(user: string, password: string) {
    let userAux = localStorage.getItem('user')
    let passwordAux = localStorage.getItem('password')

    if (user == userAux && password == passwordAux) {
      this.authSubject = true;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    this._router.navigate(['/login'])
  }

  isAuthenticated() {
    return this.authSubject;
  }
}
