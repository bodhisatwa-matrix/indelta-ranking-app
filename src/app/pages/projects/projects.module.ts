import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestResultsComponent } from './test-results/test-results.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalComponent } from './components/modal/modal.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PoperComponent } from './components/poper/poper.component';
import { FusionChartsModule } from "angular-fusioncharts";
import { AlertComponent } from './components/alert/alert.component';
import { SpiderChartComponent } from './spider-chart/spider-chart.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ReportComponent } from './report/report.component';
import { CreateConfigComponent } from './create-config/create-config.component';

@NgModule({
  declarations: [
    CreateFormComponent,
    ProjectListComponent,
    HeaderComponent,
    CreateProjectComponent,
    TestResultsComponent,
    ModalComponent,
    PoperComponent,
    AlertComponent,
    SpiderChartComponent,
    ReportComponent,
    CreateConfigComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgbPaginationModule,
    NgbAlertModule,
    FusionChartsModule
  ]
})
export class ProjectsModule { }
