import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service/login-service.service";

export interface userInfo{
  Name: string;
  Phone: string;
  role: string; 
  Email: string; 
  Address: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public _loginservice: LoginServiceService) { }
  user:userInfo;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}') as userInfo;    
  }

}
