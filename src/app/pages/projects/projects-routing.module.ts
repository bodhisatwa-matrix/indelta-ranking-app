import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateConfigComponent } from './create-config/create-config.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReportComponent } from './report/report.component';
import { SpiderChartComponent } from './spider-chart/spider-chart.component';
import { TestResultsComponent } from './test-results/test-results.component';

const routes: Routes = [
  {path:"", component: ProjectListComponent},
  {path:"new", component: CreateProjectComponent},
  {path:"edit/:id", component: CreateProjectComponent},
  {path:"resultados/:id", component: TestResultsComponent},
  {path:"report/:id", component: ReportComponent},
  {path:"charts/:id", component: SpiderChartComponent},
  {path:"config", component: CreateConfigComponent},
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {

}
