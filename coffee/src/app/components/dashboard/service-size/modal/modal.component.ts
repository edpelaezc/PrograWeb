import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ServiceItem {
  _id: string,
  name: string,
  price: number,
  description: string
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponentService implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponentService>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ServiceItem) {
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
