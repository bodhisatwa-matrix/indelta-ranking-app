import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthHeaderComponent } from 'src/app/components/auth-header/auth-header.component';
import { CreateFormComponent } from './create-form/create-form.component';
@NgModule({
  declarations: [
    LoginComponent,
    AuthHeaderComponent,
    CreateFormComponent
  ],
  imports: [
    //KeycloakAngularModule,
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
