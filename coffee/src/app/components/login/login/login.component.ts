import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from "../../services/login-service/login-service.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService
  ) { }


  ngOnInit(): void {
    localStorage.setItem('user', 'eduanpelaezc@gmail.com');
    localStorage.setItem('password', 'admin');

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let username= this.form.get('username')?.value;
    let password = this.form.get('password')?.value;
    if(this.loginService.signIn(username, password)) {
      alert('¡Bienvenido!');
    } else {
      this.loginInvalid = true; 
    };
  }

}
