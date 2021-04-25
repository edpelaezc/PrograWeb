import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ModalComponent } from "./modal/modal.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessBackofficeService } from "../../services/process-backoffice-service/process-backoffice.service";

export interface ProccessItem {
  _id: string,
  name: string,
  description: string
}

const ELEMENT_DATA: ProccessItem[] = []

@Component({
  selector: 'app-process-backoffice',
  templateUrl: './process-backoffice.component.html',
  styleUrls: ['./process-backoffice.component.css']
})
export class ProcessBackofficeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  form: FormGroup;
  items: any = []

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private fb: FormBuilder, private api: ProcessBackofficeService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ModalComponent, {
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

    this.api.createProcess(item).subscribe(res => {
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

    this.api.putProcess(subscription, subscription._id).subscribe(res => {
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
    this.api.deleteProcess(row_obj._id).subscribe(res => {
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
    this.api.getProcesses().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
      } else {
        this.dataSource = [];
        for (let index = 0; index < res.length; index++) {
          this.dataSource.push(res[index] as ProccessItem)
        }
      }
    })
  }
}
