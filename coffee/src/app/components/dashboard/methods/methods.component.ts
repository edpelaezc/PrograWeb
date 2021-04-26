import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MethodsService } from "../../services/methods/methods.service";


export interface MethodItem {
  _id: string,
  name: string  
}

export interface CoffeeTypeItem {
  _id: string,
  name: string  
}

export interface SizeItem {
  _id: string,
  name: string  
}


@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.css']
})
export class MethodsComponent implements OnInit {

  form: FormGroup;
  methods: MethodItem[] = []
  services: SizeItem[] = []
  variedades: CoffeeTypeItem[] = []
  user: any

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private api: MethodsService
  ) {
    this.form = this.fb.group({
      metodo: ['', Validators.required],
      tamaño: ['', Validators.required],
      variedad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo') || '')
    this.getCoffeeTypes()
    this.getMethods()
    this.getServices()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }

  getMethods() {
    this.api.getMethods().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
      } else {
        this.methods = [];
        for (let index = 0; index < res.length; index++) {
          this.methods.push(res[index] as MethodItem)
        }
      }
    })
  }

  getServices() {
    this.api.getServices().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
      } else {
        this.services = [];
        for (let index = 0; index < res.length; index++) {
          this.services.push(res[index] as SizeItem)
        }
      }
    })
  }

  getCoffeeTypes() {
    this.api.getCoffeeTypes().subscribe(res => {
      if (res.status == 500) {
        this.openSnackBar('Error')
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
      let purchase = {
        correo: this.user.username,
        metodo: this.form.controls.metodo.value, 
        tamaño: this.form.controls.tamaño.value, 
        variedad: this.form.controls.variedad.value
      }

      this.api.createPurchase(purchase).subscribe(res => {
        if (res.status == 200) {
          this.openSnackBar('¡Compra realizada con éxito!')
          this.form.reset({
            metodo: [this.methods, Validators.required],
            tamaño: [this.services, Validators.required],
            variedad: [this.variedades, Validators.required]            
          })
        }
      })
      
    } else {
      
    }
  }

}
