import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routes';



@NgModule({
  declarations: [],
  imports: [
    LoginComponent,
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ]
})
export class LoginModule { }
