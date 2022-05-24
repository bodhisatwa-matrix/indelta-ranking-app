import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { areas, data, options, questions, subAreas } from './model';
import { RequestService } from './request.service';

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
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'config-edit';
  configData?: data;
  configForm: FormGroup = new FormGroup({});
  areaList: areaDropDown[] = [];
  subAreaList: subAreaDropDown[] = [];
  questionList: questionsDropDown[] = [];
  optionsList: optionsDropDown[] = [];

  constructor(
    private builder: FormBuilder,
    private service: RequestService
  ) {}

  ngOnInit(): void {
    this.configForm = this.builder.group({
      id: [''],
      name_test: [''],
      description: [''],
      text_result: [''],
      areas: this.builder.array([
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
    setTimeout(() => {
      this.service.getConfig().subscribe(res => {
        this.configData = res;
        this.areaList = res.area_test.map((data) => ({"id":data.id, "title_area":data.title_area}));

        this.configForm.patchValue({
          id: this.configData.id,
          name_test: this.configData.name_test,
          description: this.configData.description,
          text_result: this.configData.text_result,
        });
        this.configForm.setControl('areas', this.setAreas(this.configData.area_test))
      });
    }, 1000);
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
  get areas() {
    return this.configForm.get('areas') as FormArray;
  }
  getSubAreas(index: number) {
    return (<FormArray> this.configForm.controls['areas']).at(index).get('subAreas') as FormArray;
  }
  getQuestions(areaIndex: number, subAreaIndex: number) {
    return ((<FormArray> this.configForm.controls['areas']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray;
  }
  getOptions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    return (((<FormArray> this.configForm.controls['areas']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).at(qusIndex).get('options') as FormArray;
  }

  /** Add sub areas **/
  addSubArea(index: number) {
    const control = (<FormArray> this.configForm.controls['areas']).at(index).get('subAreas') as FormArray;
    const subArea = this.builder.group({
      sub_area_title: [],
      sub_id: [],
      questions: this.builder.array([])
    });
    control.push(subArea);
  }
  /** remove sub areas **/
  removeSubArea(areaIndex: number, index: number) {
    ((<FormArray> this.configForm.controls['areas']).at(areaIndex).get('subAreas') as FormArray).removeAt(index);
  }
  /** Add questions **/
  addQuestions(areaIndex: number, subAreaIndex: number) {
    const control = ((<FormArray> this.configForm.controls['areas']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray;
    const question = this.builder.group({
      id: [],
      title: [],
      label: [],
      options: this.builder.array([])
    });
    control.push(question);
  }
  removeQuestions(areaIndex: number, subAreaIndex: number) {
    ((<FormArray> this.configForm.controls['areas']).at(areaIndex).get('subAreas') as FormArray).removeAt(subAreaIndex);
  }
  /** Add Options **/
  addOptions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    const control = (((<FormArray> this.configForm.controls['areas']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).at(qusIndex).get('options') as FormArray;
    const options = this.builder.group({
      id: [],
      label: [],
      value: [],
      result_text: []
    });
    control.push(options);
  }
  removeOptions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    (((<FormArray> this.configForm.controls['areas']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).removeAt(qusIndex);
  }
  setAreas(areas: areas[]): FormArray {
    const formArray = new FormArray([]);
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
    return formArray;
  }
  setSubAreas(subAreas: subAreas[]): FormArray{
    const formArray = new FormArray([]);
    subAreas.forEach(e => {
      formArray.push(
        this.builder.group({
          sub_id: e.sub_id,
          sub_area_title: e.sub_area_title,
          questions: this.setQuestions(e.questions)
        })
      );
    });
    return formArray;
  }
  setQuestions(questions: questions[]): FormArray {
    const formArray = new FormArray([]);
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
    return formArray;
  }
  setOptions(options: options[]): FormArray {
    const formArray = new FormArray([]);
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
}
