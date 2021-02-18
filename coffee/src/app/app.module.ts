import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from "./components/login/login.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from "./components/dashboard/dashboard-routing.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
