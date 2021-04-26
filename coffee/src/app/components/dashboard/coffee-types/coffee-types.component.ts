import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CoffeeModalComponent } from "./coffee-modal/coffee-modal.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeTypesService } from "../../services/coffeeTypes-service/coffee-types.service";


export interface CoffeeItem {
  _id: string,
  name: string,
  qty: Number,
  price: Number
}

const ELEMENT_DATA: CoffeeItem[] = []

@Component({
  selector: 'app-coffee-types',
  templateUrl: './coffee-types.component.html',
  styleUrls: ['./coffee-types.component.css']
})
export class CoffeeTypesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'qty', 'price', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  form: FormGroup;
  items: any = []

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private fb: FormBuilder, private api: CoffeeTypesService) { 
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(CoffeeModalComponent, {
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
      qty: row_obj.qty,
      price: row_obj.price
    }

    this.api.createCoffeeType(item).subscribe(res => {
      if (res.status == 200) {
        this.getCoffeeTypes();
        this.table.renderRows();
      }
    })
  }

  updateRowData(row_obj: any) {
    let subscription = {
      _id: row_obj._id,
      name: row_obj.name,
      qty: row_obj.qty,
      price: row_obj.price
    }

    this.api.putCoffeeType(subscription, subscription._id).subscribe(res => {
      if (res.status != 200) {
        this.openSnackBar('Error al actualizar proceso')
      } else {
        this.getCoffeeTypes();
        this.table.renderRows();
      }
    }
    )
  }

  deleteRowData(row_obj: any) {
    this.api.deleteCoffeeType(row_obj._id).subscribe(res => {
      if (res.status == 200) {
        this.openSnackBar('Proceso eliminada')
        this.getCoffeeTypes()
        this.table.renderRows()
      }
    })
  }

  ngOnInit(): void {
    this.getCoffeeTypes()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }

  getCoffeeTypes() {
    this.api.getCoffeeTypes().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
      } else {
        this.dataSource = [];
        for (let index = 0; index < res.length; index++) {
          this.dataSource.push(res[index] as CoffeeItem)
        }
      }
    })
  }

}
