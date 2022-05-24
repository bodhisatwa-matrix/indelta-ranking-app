import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePublicStarupComponent } from './create-public-starup/create-public-starup.component';
import { SendStartupRequestComponent } from './send-startup-request/send-startup-request.component';

const routes: Routes = [
  {path:"new-startup", component:  SendStartupRequestComponent},
  {path:"startup/:id", component:  CreatePublicStarupComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule { }