import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { RequestService } from 'src/app/services/request.service';

export interface PeriodicElement {
  name: number;
  position: string;
  weight: number;
  symbol: number;
  index: number
  chart: {
    percent: number,
    percentRest: number,
    value: number
  }
}

const ELEMENT_DATA: PeriodicElement[][] = [
  [
    {
      position: 'O Avanço (1 a 4)',
      name: 0,
      weight: 10, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Propriedade Intelectual (5 e 6)',
      name: 0,
      weight: 4, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Status (7)',
      name: 0,
      weight: 9, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Capacidade (8 a 11)',
      name: 0,
      weight: 10, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    }
  ],
  [
    {
      position: 'Validação (12) (29 a 32)',
      name: 0,
      weight: 6, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Plano Mkt (13 e 14)',
      name: 0,
      weight: 9, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Equipe (15 a 17)',
      name: 0,
      weight: 11, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Oferta de Invest. (18 e 19)',
      name: 0,
      weight: 8, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    }
  ],
  [
    {
      position: 'Tamanho de Mercado (20 a 22)',
      name: 0,
      weight: 8, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Particip de Mercado (23 a 25)',
      name: 0,
      weight: 6, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Concorrência (26 a 28)',
      name: 0,
      weight: 6, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    },
    {
      position: 'Taxa de Retorno (29 a 32)',
      name: 0,
      weight: 13, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 10,
        percentRest: 20,
        value: 0
      }
    }
  ]
];

@Component({
  selector: 'app-start-up-results',
  templateUrl: './start-up-results.component.html',
  styleUrls: ['./start-up-results.component.scss']
})
export class StartUpResultsComponent implements OnInit {

  public projects: any
  resul: any = []
  areas: any = 0
  areasVal: any[] = []
  subAreasVal: any[] = []
  AllQuestionResult: any[] = []
  QuestionsIndexList: any[] = []
  loading = true
  project: any
  test: any
  textRes: any
  maximoPorArea: any[] = []
  maximoPorSubArea: any= []
  maximoPercentSubArea: any= []
  restPercentSubArea: any= []
  public text_results_list: any[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'index'];
  dataSource = ELEMENT_DATA;

  public radarChartOptions: any = {
    responsive: true,
  };


  public radarChartType: ChartType = 'doughnut';

  public barChartType: string = 'horizontalBar';

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 100
      }
    }
  }

  public barChartOption: ChartOptions = {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false,
        }
      }
  };

  constructor( private requestServ: RequestService,private route:ActivatedRoute) {
    
  }

  ngOnInit(): void {

    this.route.params.subscribe( (x:any ) =>{

      this.requestServ.getProject(x.id).subscribe((res: any)=>{

        res.areas_result.map((res: any)=>{
          var valuex = 0

          res.areas_result.map((x: any)=>{
            if(typeof x.option_value === 'number'){
              valuex += parseInt(x.option_value)
              this.AllQuestionResult.push(x.option_value)
            }
          })
          this.resul.push(valuex)
        })

        this.requestServ.getTestInfo().subscribe((TestInfoRes: any)=>{

          this.textRes = TestInfoRes.text_result
          
          TestInfoRes.area_test.map((AreaTestRes: any, AreaIndex: any)=>{

            var maxValueByArea: any = 0
            var maxValuesub: any = []
            var maxPercentValue: any = []
            var restPercentValue: any = []

            AreaTestRes.subAreas.map((SubAreaRes: any, SubAreaIndex: number)=>{
            
              var valorDeSubArea = 0
              var questionsList: any[] = []
              var maximo: any = 0
              var maxValue: any = 0
              
              SubAreaRes.questions.map((SubAreaQuestionRes: any, i: number)=>{
                
                valorDeSubArea += this.AllQuestionResult[SubAreaQuestionRes.id - 1]
                questionsList.push(SubAreaQuestionRes.id)

                SubAreaQuestionRes.options.map((valuex: any, i: number)=>{
                  maxValue < valuex.value
                  ?
                    maxValue = valuex.value
                  :
                    maxValue = maxValue
                })

                maximo += maxValue                

                ELEMENT_DATA[AreaIndex][SubAreaIndex] = {
                  ...ELEMENT_DATA[AreaIndex][SubAreaIndex],
                  position: SubAreaRes.sub_area_title,
                  name: valorDeSubArea,
                  weight: maximo, 
                  symbol: (valorDeSubArea * 100) / maximo,
                  index: SubAreaRes.sub_id,
                  chart: {
                    percent: (valorDeSubArea * 100) / maximo,
                    percentRest: 100 - ((valorDeSubArea * 100) / maximo),
                    value: valorDeSubArea
                  }
                }

                maxValuesub[SubAreaIndex] = valorDeSubArea
                //maxPercentValue[SubAreaIndex] = Math.round(maximo - valorDeSubArea)
                maxPercentValue[SubAreaIndex] = (valorDeSubArea * 100) / maximo
                restPercentValue[SubAreaIndex] = 100 - ((valorDeSubArea * 100) / maximo)

                this.QuestionsIndexList[SubAreaRes.sub_id] = questionsList.join()
                this.subAreasVal[SubAreaRes.sub_id] = valorDeSubArea
              })

              maxValueByArea += maximo

            })

            this.maximoPorSubArea.push(maxValuesub)
            this.maximoPercentSubArea.push(maxPercentValue)
            this.restPercentSubArea.push(restPercentValue)
            this.maximoPorArea.push(maxValueByArea)
            
            
            var valor_de_area = this.resul[AreaIndex]

            this.areasVal.push({
              val: valor_de_area,
              name: AreaTestRes.title_area,
              textResult: AreaTestRes.text_result,
            })
            this.areas += valor_de_area

          })

        }).add(()=>{
          this.requestServ.updateProjects(
              {
                ...res,
                resultado: this.areas,
                valorDeSubAreas: this.dataSource
              }
          ).subscribe((res)=>{
            this.loading = false
            console.log("this.maximoPorSubArea: ", this.maximoPorSubArea);
            console.log("this.maximoPercentSubArea: ", this.maximoPercentSubArea);
            console.log("this.restPercentSubArea: ", this.restPercentSubArea);
            
          })
        })

      })

      this.requestServ.getProject(x.id).subscribe((res: any)=>{

        this.project = res
        
        res.areas_result.map((res: any)=>{
          res.areas_result.map((ineres: any)=>{
            ineres.result_text &&
              this.text_results_list.push(ineres.result_text)
          })
        })
      })
    })

  }

  public doughnutChartType: ChartType = 'doughnut';

}