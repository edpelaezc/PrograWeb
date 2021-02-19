import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  
  user: UserInfo;
  constructor() { }  


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo') || '')
  }

}

export class UserInfo {
  Name:string; 
  Phone:number;
  Email:string;
  Address:string;
};
