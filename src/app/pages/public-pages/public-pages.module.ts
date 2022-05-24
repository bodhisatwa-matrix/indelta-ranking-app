import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendStartupRequestComponent } from './send-startup-request/send-startup-request.component';
import { CreatePublicStarupComponent } from './create-public-starup/create-public-starup.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { PublicPagesRoutingModule } from './public-pages.routing.module';
import { FusionChartsModule } from 'angular-fusioncharts';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { StartUpResultsComponent } from 'src/app/components/start-up-results/start-up-results.component';



@NgModule({
  declarations: [
    CreatePublicStarupComponent,
    SendStartupRequestComponent,
    StartUpResultsComponent
  ],
  imports: [
    NgChartsModule,
    NgbPaginationModule,
    NgbAlertModule,
    FusionChartsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PublicPagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgHcaptchaModule.forRoot({
      siteKey: '0e91b2aa-dbfc-48b6-9c61-07b51f40b277',
      // 0x820615C1Df7759BcB1015D55863a5a8F050646Df
      languageCode: 'en' // optional, will default to browser language
    })
  ]
})
export class PublicPagesModule { }
