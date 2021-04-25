import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user/user.component';
import { ProcessComponent } from './process/process.component';
import { MethodsComponent } from './methods/methods.component';
import { HistoryComponent } from './history/history.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from "../../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonalInfoComponent } from './user/personal-info/personal-info.component';
import { SubscriptionComponent } from './user/subscription/subscription.component';
import { ModalCreateComponent } from './user/subscription/modal-create/modal-create.component';
import { MethodsBackofficeComponent } from './methods-backoffice/methods-backoffice.component';
import { ProcessBackofficeComponent } from './process-backoffice/process-backoffice.component';
import { MethodsBackofficeModalComponent } from './methods-backoffice/methods-backoffice-modal/methods-backoffice-modal.component';

@NgModule({
  declarations: [HomeComponent, UserComponent, ProcessComponent, MethodsComponent, HistoryComponent, LayoutComponent, PersonalInfoComponent, SubscriptionComponent, ModalCreateComponent, MethodsBackofficeComponent, ProcessBackofficeComponent, MethodsBackofficeModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
