import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MethodsBackofficeService } from "../../services/methods-backoffice-service/methods-backoffice.service";
import { MethodsBackofficeModalComponent } from "./methods-backoffice-modal/methods-backoffice-modal.component";

export interface MethodItem {
  _id: string,
  name: string,
  description: string
}

const ELEMENT_DATA: MethodItem[] = []

@Component({
  selector: 'app-methods-backoffice',
  templateUrl: './methods-backoffice.component.html',
  styleUrls: ['./methods-backoffice.component.css']
})
export class MethodsBackofficeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  form: FormGroup;
  items: any = []

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private fb: FormBuilder, private api: MethodsBackofficeService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(MethodsBackofficeModalComponent, {
      // width: '240px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Agregar') {
        this.addRowData(result.data);
      } else if (result.event == 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event == 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    let item = {
      name: row_obj.name,
      description: row_obj.description
    }

    this.api.createMethod(item).subscribe(res => {
      if (res.status == 200) {
        this.getProcesses();
        this.table.renderRows();
      }
    })
  }

  updateRowData(row_obj: any) {
    let subscription = {
      _id: row_obj._id,
      name: row_obj.name,
      description: row_obj.description
    }

    this.api.putMethod(subscription, subscription._id).subscribe(res => {
      if (res.status != 200) {
        this.openSnackBar('Error al actualizar proceso')
      } else {
        this.getProcesses();
        this.table.renderRows();
      }
    }
    )
  }

  deleteRowData(row_obj: any) {
    this.api.deleteMethod(row_obj._id).subscribe(res => {
      if (res.status == 200) {
        this.openSnackBar('Proceso eliminada')
        this.getProcesses()
        this.table.renderRows()
      }
    })
  }

  ngOnInit(): void {
    this.getProcesses()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }

  getProcesses() {
    this.api.getMethods().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
      } else {
        this.dataSource = [];
        for (let index = 0; index < res.length; index++) {
          this.dataSource.push(res[index] as MethodItem)
        }
      }
    })
  }

}
