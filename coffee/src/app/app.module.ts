import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from "./components/login/login.module";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from "./components/dashboard/dashboard-routing.module";
import { LoginServiceService } from "./components/services/login-service/login-service.service";
import { AuthGuard } from "./components/services/login-service/auth/auth.guard";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule
  ],
  providers: [ LoginServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
