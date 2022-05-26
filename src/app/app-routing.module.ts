import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { isActiveGuard } from './guards/is-active.guard';
import { CreateConfigComponent } from './pages/projects/create-config/create-config.component';
import { CreatePublicStarupComponent } from './pages/public-pages/create-public-starup/create-public-starup.component';

const routes: Routes = [
  {
    path: "",
    loadChildren:() => import("./pages/auth/auth.module").then(m=> m.AuthModule),
    canActivate: [ isActiveGuard ]
  },
  {
    path: "projects",
    loadChildren:() => import("./pages/projects/projects.module").then(m=> m.ProjectsModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: "startups",
    loadChildren:() => import("./pages/public-pages/public-pages.module").then(m=> m.PublicPagesModule),
  },
  {
    path: "**",
    redirectTo: 'projects'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
