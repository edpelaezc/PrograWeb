import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from "../services/login-service/auth/auth.guard";
import { UserComponent } from './user/user/user.component';
import { MethodsComponent } from './methods/methods.component';
import { ProcessComponent } from './process/process.component';
import { ProcessBackofficeComponent } from "./process-backoffice/process-backoffice.component";
import { MethodsBackofficeComponent } from "./methods-backoffice/methods-backoffice.component";

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'MiCuenta', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'Metodos', component: MethodsComponent, canActivate: [AuthGuard] },
    { path: 'MetodosAdmin', component: MethodsBackofficeComponent, canActivate: [AuthGuard] },
    { path: 'Proceso', component: ProcessComponent, canActivate: [AuthGuard] },
    { path: 'ProcesoAdmin', component: ProcessBackofficeComponent, canActivate: [AuthGuard] }
  ], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
