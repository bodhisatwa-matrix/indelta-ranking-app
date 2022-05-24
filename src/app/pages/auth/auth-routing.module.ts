import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { isActiveGuard } from 'src/app/guards/is-active.guard';
import { UnActiveGuard } from 'src/app/guards/un-active.guard';
import { CreateFormComponent } from './create-form/create-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:"", component:  LoginComponent,
    canActivate: [ isActiveGuard ]
    //canActivate: [ UnActiveGuard ]
  },
  {path:"test-no-auth", component:  CreateFormComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
