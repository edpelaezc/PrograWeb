import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Subscriptions {
  id: number;
  categoria: string;
  cantidad: number;
  frecuencia: number;
}

@Component({
  selector: 'app-methods-backoffice-modal',
  templateUrl: './methods-backoffice-modal.component.html',
  styleUrls: ['./methods-backoffice-modal.component.css']
})
export class MethodsBackofficeModalComponent implements OnInit {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<MethodsBackofficeModalComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Subscriptions) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit(): void {
  }

}
