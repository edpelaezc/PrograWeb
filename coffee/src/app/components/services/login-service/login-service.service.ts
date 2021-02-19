import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _router: Router) {}

  authSubject = false;
  userInfo = { 'Name': 'Eduardo Pelaez', 'Phone': 42721382, 'Email': 'eduanpelaezc@gmail.com', 'Address': 'Casa'};

  signIn(user: string, password: string) {
    let userAux = localStorage.getItem('user')
    let passwordAux = localStorage.getItem('password')

    if (user == userAux && password == passwordAux) {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      this.authSubject = true;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authSubject = false;
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    this._router.navigate(['/login'])
  }

  isAuthenticated() {
    return this.authSubject;
  }
}
