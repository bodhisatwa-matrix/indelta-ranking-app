import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { areas, data, options, questions, subAreas } from './model';
import { RequestService } from './request.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatExpansionPanel } from '@angular/material/expansion';

interface areaDropDown {
  id: number,
  title_area: string
}
interface subAreaDropDown {}
interface questionsDropDown {}
interface optionsDropDown {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatExpansionPanel]
})

export class AppComponent implements OnInit{
  title = 'config-edit';
  configData?: data;
  configForm: FormGroup = new FormGroup({});
  areaList: areaDropDown[] = [];
  subAreaList: subAreaDropDown[] = [];
  questionList: questionsDropDown[] = [];
  optionsList: optionsDropDown[] = [];
  loading: boolean = false;
  loadingText: string = "Please wait!";
  panelOpenState = false;

  constructor(
    private builder: FormBuilder,
    private service: RequestService
  ) {}

  ngOnInit(): void {
    // this.loading = true;
    this.configForm = this.builder.group({
      id: [''],
      name_test: [''],
      description: [''],
      text_result: [''],
      area_test: this.builder.array([
        this.builder.group({
          id: [''],
          title_area: [''],
          factor: [''],
          subAreas: this.builder.array([])
        }),
        this.builder.group({
          id: [''],
          title_area: [''],
          factor: [''],
          subAreas: this.builder.array([])
        }),
        this.builder.group({
          id: [''],
          title_area: [''],
          factor: [''],
          subAreas: this.builder.array([])
        })
      ]),
    });
    this.service.getConfig().subscribe(res => {
      this.configData = res;
      this.areaList = res.area_test.map((data) => ({"id":data.id, "title_area":data.title_area}));
      this.patchConfigForm(this.configData);
    });
    
  }
  /** Getters **/
  get id() {
    return this.configForm.get('id');
  }
  get name_test() {
    return this.configForm.get('name_test');
  }
  get description() {
    return this.configForm.get('description');
  }
  get test_result() {
    return this.configForm.get('test_result');
  }
  get area_test() {
    return this.configForm.get('area_test') as FormArray;
  }
  getSubAreas(index: number) {
    return (<FormArray> this.configForm.controls['area_test']).at(index).get('subAreas') as FormArray;
  }
  getQuestions(areaIndex: number, subAreaIndex: number) {
    return ((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray;
  }
  getOptions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    return (((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).at(qusIndex).get('options') as FormArray;
  }

  /** Add sub areas **/
  addSubArea(index: number) {
    const control = (<FormArray> this.configForm.controls['area_test']).at(index).get('subAreas') as FormArray;
    const subArea = this.builder.group({
      sub_area_title: [],
      sub_id: [],
      questions: this.builder.array([])
    });
    control.push(subArea);
  }
  /** remove sub areas **/
  removeSubArea(areaIndex: number, index: number) {
    ((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).removeAt(index);
  }
  /** Add questions **/
  addQuestions(areaIndex: number, subAreaIndex: number) {
    const control = ((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray;
    const question = this.builder.group({
      id: [],
      title: [],
      label: [],
      options: this.builder.array([])
    });
    control.push(question);
  }
  removeQuestions(areaIndex: number, subAreaIndex: number) {
    ((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).removeAt(subAreaIndex);
  }
  /** Add Options **/
  addOptions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    const control = (((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).at(qusIndex).get('options') as FormArray;
    const options = this.builder.group({
      id: [],
      label: [],
      value: [],
      result_text: []
    });
    control.push(options);
  }
  removeOptions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    (((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).removeAt(qusIndex);
  }
  setAreas(areas: areas[]): FormArray {
    const formArray = new FormArray([]);
    if(areas.length) {
      areas.forEach(e => {
        formArray.push(
          this.builder.group({
            id: e.id,
            title_area: e.title_area,
            factor: e.factor,
            subAreas: this.setSubAreas(e.subAreas)
          })
        )
      });
    }
    return formArray;
  }
  setSubAreas(subAreas: subAreas[]): FormArray{
    const formArray = new FormArray([]);
    if(subAreas.length) {
      subAreas.forEach(e => {
        formArray.push(
          this.builder.group({
            sub_id: e.sub_id,
            sub_area_title: e.sub_area_title,
            questions: this.setQuestions(e.questions)
          })
        );
      });
    }
    return formArray;
  }
  setQuestions(questions: questions[]): FormArray {
    const formArray = new FormArray([]);
    if(questions.length) {
      questions.forEach(e => {
        formArray.push(
          this.builder.group({
            id: e.id,
            title: e.title,
            label: e.label,
            options: this.setOptions(e.options)
          })
        );
      });
    }
    return formArray;
  }
  setOptions(options: options[]): FormArray {
    const formArray = new FormArray([]);
    if(options.length) {
      options.forEach(e => {
        formArray.push(
          this.builder.group({
            id: e.id,
            label: e.label,
            value: e.value,
            result_text: e.result_text
          })
        )
      });
    }
    return formArray;
  }
  onSubmit() {
    let data = JSON.stringify(this.configForm.value);
    // let url = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(data));
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(data));
    element.setAttribute('download', "config.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
  moveSubArea(event: any, currentIndex) {
    console.log("hi", event.value)
    let areaId = event.value;
    if(areaId != currentIndex) {
      let fromSubArea = this.configForm.value.area_test[currentIndex];
      this.configForm.value["area_test"][areaId]['subAreas'].push(...fromSubArea['subAreas']);
      this.configForm.value["area_test"][currentIndex]['subAreas'] = [];
      this.patchConfigForm(this.configForm.value);
    }
  }
  patchConfigForm(data: data) {
    this.loading = true;
    this.configForm.patchValue({
      id: data.id,
      name_test: data.name_test,
      description: data.description,
      text_result: data.text_result,
    });
    this.configForm.setControl('area_test', this.setAreas(data.area_test));
    setTimeout(() => {
      this.loadingText = "Restructuring json, Please Wait!";
      this.loading = false;
    }, 10);
  }
  
}
