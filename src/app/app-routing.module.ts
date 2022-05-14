import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { TrendsComponent } from './reports/trends/trends.component';
import { CreateExpenseComponent } from './expenses/createExpense/createExpense.component';
import { ManageExpenseComponent } from './expenses/manageExpenses/manageExpense.component';

import { AuthGuard } from './config/auth.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'trends', component: TrendsComponent, canActivate: [AuthGuard], },
  { path: 'create', component: CreateExpenseComponent, canActivate: [AuthGuard], },
  { path: 'manage', component: ManageExpenseComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
