import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from "../../services/login-service/login-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  date = new Date().getFullYear();
  form: FormGroup;
  loginInvalid: boolean;

  ngOnInit(): void {
  }

  onSubmit() {}

}
