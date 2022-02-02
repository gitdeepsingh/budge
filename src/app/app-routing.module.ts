import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { TrendsComponent } from './reports/trends/trends.component';

const routes: Routes = [
  // { path: '', component: HomeComponent, pathMatch:'full' },
  { path: 'register', component: RegistrationComponent, pathMatch:'full' },
  // { path: 'dashboard', component: HomeComponent, pathMatch:'full' },
  { path: 'trends', component: TrendsComponent, pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
