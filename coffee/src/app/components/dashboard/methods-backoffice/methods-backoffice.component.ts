import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MethodsBackofficeModalComponent } from "./methods-backoffice-modal/methods-backoffice-modal.component";

export interface Subscriptions {
  id: number;
  categoria: string;
  cantidad: number;
  frecuencia: number;
}

const ELEMENT_DATA: Subscriptions[] = JSON.parse(localStorage.getItem('suscripciones') || '{}');

@Component({
  selector: 'app-methods-backoffice',
  templateUrl: './methods-backoffice.component.html',
  styleUrls: ['./methods-backoffice.component.css']
})
export class MethodsBackofficeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'categoria', 'cantidad', 'frecuencia', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(MethodsBackofficeModalComponent, {
      width: '240px',
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

  addRowData(row_obj: { id: any; categoria: any; cantidad: any; frecuencia: any; }) {
    var d = new Date();
    this.dataSource.push({
      id: this.dataSource.length + 1,
      categoria: row_obj.categoria,
      cantidad: row_obj.cantidad,
      frecuencia: row_obj.frecuencia
    });
    localStorage.setItem("suscripciones", JSON.stringify(this.dataSource));
    this.table.renderRows();
  }

  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.categoria = row_obj.categoria,
          value.cantidad = row_obj.cantidad,
          value.frecuencia = row_obj.frecuencia
        localStorage.setItem("suscripciones", JSON.stringify(this.dataSource));
      }
      return true;
    });
  }

  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
    localStorage.setItem("suscripciones", JSON.stringify(this.dataSource));
  }

  ngOnInit(): void {
  }

}
