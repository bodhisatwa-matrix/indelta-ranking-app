import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrls: ['./spider-chart.component.scss']
})
export class SpiderChartComponent implements OnInit {

  subAreaPercent: number[] = []
  loading = true
  project: any


  public radarChartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
    scales : {
      yAxes: [{
         ticks: {
            steps : 100,
            stepValue : 100,
            max : 100,
            min: 100
          }
      }],
      xAxes: [{
        ticks: {
           steps : 100,
           stepValue : 100,
           max : 100,
           min: 100
         }
     }]
    }
  };
  public radarChartLabels: any[] = [
    'O Avanço (1 a 4) ',
    'Propriedade Intelectual (5 e 6) ',
    'Status (7)',
    'Capacidade (8 a 11)',
    'Validação (12)',
    'Plano Mkt (13 e 14)',
    'Equipe (15 a 17)',
    'Oferta de Invest. (18 e 19)',
    'Tamanho de Mercado (20 a 22)',
    'Particip de Mercado (23 a 25)',
    'Concorrência (26 a 28)',
    'Taxa de Retorno (29 a 32) '
  ];
  
  public radarChartData: any[] = [];

  public radarChartType: ChartType = 'radar';

  constructor(
    private requestServ: RequestService,
    private route:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params.subscribe( (x:any ) =>{

      this.requestServ.getProject(x.id).subscribe((res: any)=>{
        
        this.project = res

        console.log(res);
        

        res.valorDeSubAreas.flat().map((percent: any)=>{
          this.subAreaPercent.push(percent.symbol)
        })
        

      }).add(()=>{
        
        this.radarChartData = [
          { data: this.subAreaPercent, label: ['Results']},
          { data: [,,,,, 100], label: ['Results']}
        ]

        this.loading = false

      })
    })

    console.log("Radar chart data", this.radarChartData);
    
  }

  public doughnutChartType: ChartType = 'doughnut';

}
