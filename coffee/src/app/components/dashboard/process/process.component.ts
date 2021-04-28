import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProcessService } from "../../services/process-service/process.service";

export interface ProccessItem {
  _id: string,
  name: string
}

export interface CoffeeTypeItem {
  _id: string,
  name: string
}

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  user: any
  form: FormGroup;
  processes: ProccessItem[] = []
  variedades: CoffeeTypeItem[] = []

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private api: ProcessService
  ) {
    this.form = this.fb.group({
      proceso: ['', Validators.required],
      cantidad: ['', Validators.required],
      variedad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo') || '')
    this.getProcesses()
    this.getCoffeeTypes()
  }

  openSnackBar(message: string, time: number) {
    this._snackBar.open(message, '', {
      duration: time,
    });
  }

  getProcesses() {
    this.api.getProcesses().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error', 100)
      } else {
        this.processes = [];
        for (let index = 0; index < res.length; index++) {
          this.processes.push(res[index] as ProccessItem)
        }
      }
    })
  }

  getCoffeeTypes() {
    this.api.getCoffeeTypes().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error', 1000)
      } else {
        this.variedades = [];
        for (let index = 0; index < res.length; index++) {
          this.variedades.push(res[index] as CoffeeTypeItem)
        }
      }
    })
  }

  submit() {
    if (this.form.status == "VALID") {
      if (this.form.controls.cantidad.value >= 10) {
        let cotizacion = {
          correo: this.user.username,
          proceso: this.form.controls.proceso.value,
          cantidad: this.form.controls.cantidad.value,
          variedad: this.form.controls.variedad.value
        }

        this.api.createQuotePrice(cotizacion).subscribe(res => {
          if (res.status == 200) {
            this.openSnackBar('¡Cotización enviada correctamente!', 1000)
            this.form.reset({
              proceso: [this.processes, Validators.required],
              cantidad: ['', Validators.required],
              variedad: [this.variedades, Validators.required]
            })
          }
        })
      } else {
        this.openSnackBar('Para realizar una cotización necesita mínimo 10 libras.', 2000)
      }
    } else {      
      this.openSnackBar('Faltan valores requeridos', 1000)
    }
  }
}
