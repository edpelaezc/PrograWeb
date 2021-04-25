import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from "../../services/account-service/account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: AccountService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]      
    });
  }

  date = new Date().getFullYear();
  form: FormGroup;
  loginInvalid: boolean;

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1500,
    });
  }

  onSubmit() {
    if (this.form.status == "VALID") {
      let user = {
        username: this.form.controls.username.value, 
        password: this.form.controls.password.value, 
        address: this.form.controls.address.value, 
        phone: this.form.controls.phone.value, 
        role: 'user', 
      }

      this.api.createAccount(user).subscribe( res => {
        if (res.status == 500) {
          this.openSnackBar('Error')
        } else {
          if (res.status == 202) {
            this.openSnackBar('Ya existe un usuario con ese nombre de usuario')
          } else {
            this.openSnackBar('¡Usuario creado exitosamente!')
            this.router.navigate(['/login'])
          }
        }
      })
      
    }
  }

}
