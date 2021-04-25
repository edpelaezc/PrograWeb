import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ModalCreateComponent } from "./modal-create/modal-create.component";
import { SubscriptionService } from "../../../services/subscription-service/subscription.service";
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Subscriptions {
  _id: string;
  userId: string;
  categoria: string;
  cantidad: number;
  frecuencia: number;
}

const ELEMENT_DATA: Subscriptions[] = []

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'categoria', 'cantidad', 'frecuencia', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private api: SubscriptionService, private _snackBar: MatSnackBar) { }
  user: any;

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ModalCreateComponent, {
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

  addRowData(row_obj: any) {
    let subscription = {
      userId: this.user._id,
      categoria: row_obj.categoria,
      cantidad: row_obj.cantidad,
      frecuencia: row_obj.frecuencia
    }

    this.api.createSubscription(subscription).subscribe(res => {
      if (res.status == 200) {
        this.getSubscriptions();
        this.table.renderRows();
      }
    })
  }

  updateRowData(row_obj: any) {
    let subscription = {
      _id: row_obj._id,
      userId: this.user._id,
      categoria: row_obj.categoria,
      cantidad: row_obj.cantidad,
      frecuencia: row_obj.frecuencia
    }

    this.api.putSubscription(subscription, subscription._id).subscribe(res => {
      if (res.status != 200) {
        this.openSnackBar('Error al actualizar suscripción')
      } else {
        this.getSubscriptions();
        this.table.renderRows();
      }
    }
    )
  }

  deleteRowData(row_obj: any) {
    this.api.deleteSubscription(row_obj._id).subscribe(res => {
      if (res.status == 200) {
        this.openSnackBar('Suscripción eliminada')
        this.getSubscriptions()
        this.table.renderRows()
      }
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    console.log(this.user);
    this.getSubscriptions();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }

  getSubscriptions() {
    this.api.getSubscriptions(this.user._id).subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
      } else {
        this.dataSource = [];
        for (let index = 0; index < res.length; index++) {
          this.dataSource.push(res[index] as Subscriptions)
        }
      }
    })
  }
}
