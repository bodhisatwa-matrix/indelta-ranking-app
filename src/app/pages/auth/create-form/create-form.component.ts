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
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
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
  
  projectForm: FormGroup = this.fb.group({
    nombre_startup: new FormControl("", [Validators.required]),
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
    private router: Router,
    private fb: FormBuilder,
    public breakpointObserver: BreakpointObserver,
    private requestServ: RequestService,
    private route: ActivatedRoute
  ) {
    this.requestServ.getTestInfo().subscribe((test: any)=>{
      this.test = test;
      this.loadInitialValues();
      this.ProjectsForm = this.addFormArea;
    })
  }

  ngOnInit(): void {
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
      console.log("El proyecto abierto: ", res)
      this.actualProject = res

      this.projectForm = this.fb.group({
        nombre_startup: new FormControl(res.company?res.company:"", [Validators.required]),
        razon_social: new FormControl(res?.basic_info?.razon_social?res?.basic_info?.razon_social:"", [Validators.required]),
        email: new FormControl(res?.basic_info?.email?res?.basic_info?.email:"", [Validators.required]),
        endereco: new FormControl(res?.basic_info?.endereco?res?.basic_info?.endereco:"", [Validators.required]),
        relaciones: new FormControl(res?.basic_info?.relaciones?res?.basic_info?.relaciones:"", [Validators.required]),
        //colaboradores: new FormControl('', [Validators.required]),
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

  getEditedAreas(){

    var areaRes = 0
    var areasAnswer: any = []
    
    this.ProjectsForm.value.areas.map((res: any, i: number)=>{
      let ress = this.ProjectsForm.controls.areas.controls[i].value;
      areaRes = ress
    
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
      

      localStorage.setItem('actualTest', JSON.stringify(this.respuestaTest))
    })
  }

  saveBasic(){
    console.log(this.projectForm.value.razon_social.value);
  }

  create(): void {

    this.loading = true

    this.router.navigate([`/create`])
    
  }

}

