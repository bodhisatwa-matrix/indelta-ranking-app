import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Test } from 'src/app/model/interfaces/test.interface';
import {
  Answer,
  AreaTest,
} from 'src/app/model/interfaces/localObject.interface';
import { PeriodicElement } from '../test-results/test-results.component';

const ELEMENT_DATA: PeriodicElement[][] = [
  [
    {
      position: 'O Avanço (1 a 4)',
      name: 0,
      weight: 10, 
      symbol: 0,
      index: 0,
      chart: {
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
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
        percent: 0,
        percentRest: 0,
        value: 0
      }
    }
  ]
];


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  public isLinear = true;
  public projName: any = '';
  public loading = true;
  public projDates: any = [];
  private projectId: any
  private today = new Date();
  public ProjectsForm: any;
  public date: any;
  public test!: Test;
  resul: any = []
  Mareas: any = 0
  editable: any = []
  respuestaTest: any = []
  testResult: any = 0
  public projectData: any
  areasValue = 0
  public testAdapter:any = []
  public actualProject: any = ''
  
  /*  */
  public maximoByPregunta: any[] = []
  areasx: any = 0
  dataSource = ELEMENT_DATA;
  areasVal: any[] = []
  subAreasVal: any[] = []
  AllQuestionResult: any[] = []
  QuestionsIndexList: any[] = []
  project: any
  textRes: any
  maximoPorArea: any[] = []
  maximoPorSubArea: any= []
  public text_results_list: any[] = []
  /*  */
  
  projectForm: FormGroup = this.fb.group({
    razon_social: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    endereco: new FormControl("", [Validators.required]),
    relaciones: new FormControl("", [Validators.required]),
    //colaboradores: new FormControl('', [Validators.required]),
    link: new FormControl("", [Validators.required]),
    segmento: new FormControl("", [Validators.required]),
    principal: new FormControl("", [Validators.required]),
    descreva: new FormControl("", [Validators.required]),
    pitch: new FormControl("", [Validators.required]),
    video: new FormControl("", [Validators.required]),
    modelo: new FormControl("", [Validators.required]),
    menetizacao: new FormControl("", [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    public breakpointObserver: BreakpointObserver,
    private requestServ: RequestService,
    private route: ActivatedRoute
  ) {
    this.requestServ.getTestInfo().subscribe((test: any)=>{
      this.test = test;

      console.log("El objeto de test sin procesar: ", test.area_test);
      
      this.loadInitialValues();
      this.ProjectsForm = this.addFormArea;
    })
  }

  ngOnInit(): void {
    this.getPojectSubAreas()
    setTimeout(()=>{
      this.getEditedAreas()
    }, 3000)
  }

  get stepperOrientation(): Observable<StepperOrientation> {
    return this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  get formatDate() {
    return (
      this.today.getDate() +
      '/' +
      (this.today.getMonth() + 1) +
      '/' +
      this.today.getFullYear() +
      ' - ' +
      this.today.toLocaleTimeString()
    );
  }

  getLetter(index: number) {
    return String.fromCharCode(97 + index);
  }

  get areas() {
    return this.ProjectsForm.controls['areas'] as FormArray;
  }

  get addFormArea() {

    let areas = this.fb.array([]);
    this.testAdapter = this.requestServ.AdapterAreas(this.test.area_test)
    
    this.testAdapter.map((x: any, i: number) => {
      setTimeout(() => {
        areas.push(this.addControlOnAreas(x))
        this.loading = false;
      }, 1300);
    });

    let form = this.fb.group({
      areas: areas,
    });

    console.log("La foma el la que llega el formulario:", this.testAdapter);
    
    return form;
  }

  loadInitialValues() {
    this.route.params.subscribe((x: any) => {
      this.getProjectInfo(x.id);
      this.projectId = x.id;
    });
    this.date = this.formatDate;
  }

  getProjectInfo(id: number) {
    this.requestServ.getProject(id).subscribe((res: any) => {
      console.log("La startup abierto: ", res)
      this.actualProject = res

      this.projectForm = this.fb.group({
        razon_social: new FormControl(res?.basic_info?.razon_social?res?.basic_info?.razon_social:"", [Validators.required]),
        email: new FormControl(res?.basic_info?.email?res?.basic_info?.email:"", [Validators.required]),
        endereco: new FormControl(res?.basic_info?.endereco?res?.basic_info?.endereco:"", [Validators.required]),
        relaciones: new FormControl(res?.basic_info?.relaciones?res?.basic_info?.relaciones:"", [Validators.required]),
        link: new FormControl(res?.basic_info?.link?res?.basic_info?.link:"", [Validators.required]),
        segmento: new FormControl(res?.basic_info?.segmento?res?.basic_info?.segmento:"", [Validators.required]),
        principal: new FormControl(res?.basic_info?.principal?res?.basic_info?.principal:"", [Validators.required]),
        descreva: new FormControl(res?.basic_info?.descreva?res?.basic_info?.descreva:"", [Validators.required]),
        pitch: new FormControl(res?.basic_info?.pitch?res?.basic_info?.pitch:"", [Validators.required]),
        video: new FormControl(res?.basic_info?.video?res?.basic_info?.video:"", [Validators.required]),
        modelo: new FormControl(res?.basic_info?.modelo?res?.basic_info?.modelo:"", [Validators.required]),
        menetizacao: new FormControl(res?.basic_info?.menetizacao?res?.basic_info?.menetizacao:"", [Validators.required]),
      });
      res.areas_result &&
        res.areas_result.map((res: any)=>{
          for(var formKey in res.result_area){
            this.editable.push(res.result_area[formKey])
          }
        })
      this.projName = res.company
      this.projDates = [
        res.dateCreated,
        res.dateUpdate
      ]
    })
  }

  addControlOnAreas(x: AreaTest) {

    let FormGroups = this.fb.group({});
    x.questions.map((question: any, i: any) => {
      
      FormGroups.addControl(
        question.id,
        new FormControl( 
          parseFloat(this.editable[question.id - 1])?parseFloat(this.editable[question.id - 1]):""
        , [Validators.required]) 
      );

    });
    return FormGroups;
  }

  getObjectArray(x: any) {
    return Object.keys(x);
  }

  getPojectSubAreas(){
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

            AreaTestRes.subAreas.map((SubAreaRes: any, SubAreaIndex: number)=>{
            
              var valorDeSubArea = 0
              var questionsList: any[] = []
              var maximo: any = 0
              var maxValue: any = 0
              
              SubAreaRes.questions.map((SubAreaQuestionRes: any, i: number)=>{
                
                valorDeSubArea += this.AllQuestionResult[SubAreaQuestionRes.id - 1]
                questionsList.push(SubAreaQuestionRes.id)

                maxValue = 0

                SubAreaQuestionRes.options.map((valuex: any, i: number)=>{
                  maxValue < valuex.value
                  ?
                    maxValue = valuex.value
                  :
                    maxValue = maxValue
                })

                this.maximoByPregunta.push(maxValue)
                
                maximo += maxValue                

                ELEMENT_DATA[AreaIndex][SubAreaIndex] = {
                  ...ELEMENT_DATA[AreaIndex][SubAreaIndex],
                  position: SubAreaRes.sub_area_title,
                  name: valorDeSubArea,
                  weight: maximo, 
                  symbol: (valorDeSubArea * 100) / maximo,
                  index: SubAreaRes.sub_id
                }

                maxValuesub[SubAreaIndex] = maximo

                this.QuestionsIndexList[SubAreaRes.sub_id] = questionsList.join()
                this.subAreasVal[SubAreaRes.sub_id] = valorDeSubArea
              })


              maxValueByArea += maximo

            })

            this.maximoPorSubArea.push(maxValuesub)
            this.maximoPorArea.push(maxValueByArea)
            
            
            var valor_de_area = this.resul[AreaIndex]

            this.areasVal.push({
              val: valor_de_area,
              name: AreaTestRes.title_area,
              textResult: AreaTestRes.text_result,
            })
            this.areasx += valor_de_area

          })

        }).add(()=>{
          this.requestServ.updateProjects(
              {
                ...res,
                resultado: this.areasx,
                valorDeSubAreas: this.dataSource
              }
          ).subscribe((res)=>{
            this.loading = false
            console.log("this.maximoPorSubArea: ", this.maximoPorSubArea);
            console.log("this.maximoPorArea: ", this.maximoPorArea);
            console.log("areasVal: ", this.areasVal);
            console.log("maximoByPregunta: ", this.maximoByPregunta);
            console.log("Valor de cada pregunta: ", this.AllQuestionResult);
            
            
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

  getEditedAreas(){

    var areaRes = 0
    var areasAnswer: any = []
    
    this.ProjectsForm.value.areas.map((res: any, i: number)=>{
      let ress = this.ProjectsForm.controls.areas.controls[i].value;
      areaRes = ress
    
      console.log("this.ProjectsForm.value", this.ProjectsForm.value);
      

      for(var formKey in this.ProjectsForm.value.areas[i]){

        areasAnswer.push(
          {
            date_answer: this.date,
            id_options: this.ProjectsForm.value.areas[i][parseInt(formKey)],
            id_question: parseInt(formKey),
          }
        )

        this.respuestaTest[i] = {
          area_id: i + 1,
          result_area: areaRes,
          compliance_percent: 0.9,
          areas_result: areasAnswer
        }        
      }
      

      //localStorage.setItem('actualTest', JSON.stringify(this.respuestaTest))
    })
  }

}