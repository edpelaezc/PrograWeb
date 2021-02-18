import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service/login-service.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public _loginservice: LoginServiceService) { }

  ngOnInit(): void {
  }

}
