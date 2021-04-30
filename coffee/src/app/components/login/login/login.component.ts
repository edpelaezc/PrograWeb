import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from "../../services/login-service/login-service.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  public date = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    localStorage.setItem('user', 'eduanpelaezc@gmail.com');
    localStorage.setItem('password', 'admin');

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  openSnackBar() {
    this._snackBar.open('¡Bienvenido!', '', {
      duration: 1000,
    });
  }

  callPassport() {
    window.open(`${environment.apiURL}/session/auth/microsoft`,"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {                              
      
      let user = {
        _id: message.data.user._json.id,
        username: message.data.user._json.userPrincipalName,
        role: 'user',
        phone: message.data.user._json.mobilePhone,
        address: message.data.user._json.officeLocation,
        token: message.data.user.token
      }          
      
      localStorage.setItem("userInfo", JSON.stringify(user));  

      this.openSnackBar();
      this.loginService.confirmSession()      
      this.router.navigate(['Dashboard/home']);     
    });
  }

  onSubmit() {
    let username = this.form.get('username')?.value;
    let password = this.form.get('password')?.value;    
    
    this.loginService.login(username, password).subscribe( res => {
      if (res.status != 401) {
        this.openSnackBar();
        this.loginInvalid = false;
        this.router.navigate(['Dashboard/home']);
      } else {
        this.loginInvalid = true
      }
    }
    );  
  }

}
