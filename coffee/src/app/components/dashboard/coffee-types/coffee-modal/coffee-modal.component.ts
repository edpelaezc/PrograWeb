import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CoffeeItem {
  _id: string,
  name: string,
  qty: Number,
  price: Number
}

@Component({
  selector: 'app-coffee-modal',
  templateUrl: './coffee-modal.component.html',
  styleUrls: ['./coffee-modal.component.css']
})
export class CoffeeModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CoffeeModalComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CoffeeItem) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  action: string;
  local_data: any;

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit(): void {
  }

}
