import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from "../services/login-service/auth/auth.guard";
import { UserComponent } from './user/user.component';
import { HistoryComponent } from './history/history.component';
import { MethodsComponent } from './methods/methods.component';
import { ProcessComponent } from './process/process.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'MiCuenta', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'Historia', component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'Metodos', component: MethodsComponent, canActivate: [AuthGuard] },
    { path: 'Proceso', component: ProcessComponent, canActivate: [AuthGuard] }
  ], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
