import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from "../services/login-service/auth/auth.guard";

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
  ], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
