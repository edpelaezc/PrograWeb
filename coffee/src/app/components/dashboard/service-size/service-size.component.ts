import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ModalComponentService } from "./modal/modal.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SizeService } from "../../services/size/size.service";


export interface ServiceItem {
  _id: string,
  name: string,
  price: number,
  description: string
}

const ELEMENT_DATA: ServiceItem[] = []

@Component({
  selector: 'app-service-size',
  templateUrl: './service-size.component.html',
  styleUrls: ['./service-size.component.css']
})
export class ServiceSizeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  form: FormGroup;
  items: any = []

  constructor(private api: SizeService, public dialog: MatDialog, private _snackBar: MatSnackBar, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getServices()
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ModalComponentService, {
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
      price: row_obj.price,
      description: row_obj.description
    }

    this.api.createService(item).subscribe(res => {
      if (res.status == 200) {
        this.getServices();
        this.table.renderRows();
      }
    })
  }

  updateRowData(row_obj: any) {
    let subscription = {
      _id: row_obj._id,    
      name: row_obj.name,
      price: row_obj.price,
      description: row_obj.description
    }

    this.api.putService(subscription, subscription._id).subscribe(res => {
      if (res.status != 200) {
        this.openSnackBar('Error al actualizar proceso')
      } else {
        this.getServices();
        this.table.renderRows();
      }
    }
    )
  }

  deleteRowData(row_obj: any) {
    this.api.deleteService(row_obj._id).subscribe(res => {
      if (res.status == 200) {
        this.openSnackBar('Proceso eliminada')
        this.getServices()
        this.table.renderRows()
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }

  getServices() {
    this.api.getServices().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
      } else {
        this.dataSource = [];
        for (let index = 0; index < res.length; index++) {
          this.dataSource.push(res[index] as ServiceItem)
        }
      }
    })
  }

}
