import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  
  user: any;
  constructor() { }  


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo') || '')
  }

}
