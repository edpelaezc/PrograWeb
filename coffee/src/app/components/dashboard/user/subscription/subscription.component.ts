import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ModalCreateComponent } from "./modal-create/modal-create.component";

export interface Subscriptions {
  id: number;
  categoria: string;
  cantidad: number;
  frecuencia: number;
}

const ELEMENT_DATA: Subscriptions[] = [];

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'categoria', 'cantidad', 'frecuencia', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ModalCreateComponent, {      
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
    var d = new Date();
    this.dataSource.push({
      id: this.dataSource.length + 1,
      categoria: row_obj.categoria,
      cantidad: row_obj.cantidad,
      frecuencia: row_obj.frecuencia
    });
    this.table.renderRows();
  }

  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.categoria = row_obj.categoria,
        value.cantidad = row_obj.cantidad,
        value.frecuencia = row_obj.frecuencia
      }
      return true;
    });
  }

  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

  ngOnInit(): void {
  }

}
