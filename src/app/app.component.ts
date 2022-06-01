import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { areas, data, options, questions, subAreas } from './model';
import { RequestService } from './request.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatExpansionPanel } from '@angular/material/expansion';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface areaDropDown {
  id: number,
  title_area: string
}
interface areaDrop {
  id: number,
  title_area: string,
  subAreas: subAreaDropDown[]
}
interface subAreaDropDown {
  sub_id: number,
  sub_area_title: string
  questions: questionsDropDown[]
}
interface questionsDropDown {
  id: number,
  title: string,
  options: optionsDropDown[]
}
interface optionsDropDown {
  id: number,
  label: string
}


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
  areaListDrop: areaDrop[] = [];
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
      id: ['', Validators.required],
      name_test: ['', Validators.required],
      description: ['', Validators.required],
      text_result: [''],
      area_test: this.builder.array([
        this.builder.group({
          id: ['', Validators.required],
          title_area: ['', Validators.required],
          factor: ['', Validators.required],
          subAreas: this.builder.array([])
        }),
        this.builder.group({
          id: ['', Validators.required],
          title_area: ['', Validators.required],
          factor: ['', Validators.required],
          subAreas: this.builder.array([])
        }),
        this.builder.group({
          id: ['', Validators.required],
          title_area: ['', Validators.required],
          factor: ['', Validators.required],
          subAreas: this.builder.array([])
        })
      ]),
    });
    this.service.getConfig().subscribe(res => {
      this.configData = res;
      this.areaList = res.area_test.map((data) => ({"id":data.id, "title_area":data.title_area}));
      this.areaListDrop = res.area_test.map((data) => ({"id":data.id, "title_area":data.title_area, "subAreas": data.subAreas}));
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
      sub_area_title: ['', Validators.required],
      sub_id: [control.length, Validators.required],
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
      id: [control.length ? control.at(control.length -1).get('id').value + 1 : 0, Validators.required],
      title: [],
      label: [],
      options: this.builder.array([])
    });
    control.push(question);
  }
  removeQuestions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    (((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).removeAt(qusIndex);
  }
  /** Add Options **/
  addOptions(areaIndex: number, subAreaIndex: number, qusIndex: number) {
    const control = (((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).at(qusIndex).get('options') as FormArray;
    const options = this.builder.group({
      id: [control.length ? control.at(control.length -1).get('id').value + 1 : 0, Validators.required],
      label: [],
      value: [],
      result_text: []
    });
    control.push(options);
  }
  removeOptions(areaIndex: number, subAreaIndex: number, qusIndex: number, optionIndex:number) {
    ((((<FormArray> this.configForm.controls['area_test']).at(areaIndex).get('subAreas') as FormArray).at(subAreaIndex).get('questions') as FormArray).at(qusIndex).get('options') as FormArray).removeAt(optionIndex);
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
  moveQuestion(areaIndex, subIndex, question) {
    let data = this.configForm.value.area_test[question.i]['subAreas'][question.j]['questions'][question.k];
    this.configForm.value["area_test"][areaIndex]['subAreas'][subIndex]['questions'].push(data);
    this.configForm.value.area_test[question.i]['subAreas'][question.j]['questions'].splice(question.k, 1);
    this.patchConfigForm(this.configForm.value);
    this.areaListDrop = this.configForm.value.area_test.map((data) => ({"id":data.id, "title_area":data.title_area, "subAreas": data.subAreas}));
  }
  str = "";
  tab = 0;
  i = 0;
  generateData(data, t, j) {
      Object.keys(data).forEach(key => {
          if (Array.isArray(data[key])) {
            this.tab += 30;
              this.i++;
              this.str += `<h${this.i} style="padding-left: ${t}px">${this.camelize(key)} :</h${this.i}>`;
              for (const d of data[key]) {
                  this.generateData(d, this.tab, this.i);
              }
              this.tab = t;
              this.i = j;
          } else {
              this.str += `<div style="padding-left: ${this.tab}px;"><div>${this.camelize(key)} : <span>${data[key]}</span></div></div>`;
          }
      });
  }
  camelize(text) {
      text = text.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
      return text.substr(0, 1).toUpperCase() + text.substr(1);
  }
  printJson() {
    this.generateData(this.configForm.value, this.tab, this.i);
    let x=window.open();
    x.document.open();
    x.document.write(this.str);
    x.print();
    x.document.close();
    x.close();
  }
  content: Array<any> = [];arr = [];
  pdfContent: Object = {content: this.content};
  generatePDF() {
    let pdfContent: Object = {content: this.generatePdf1(this.configForm.value)};
    pdfMake.createPdf(pdfContent).download();
  }


  /*generatePdfContent(data, hasArray=false) {
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        if(this.arr.length) {
          this.content.push({key: key, value: ""});
        } else {
          this.arr.push({key: key, value: ""});
        }
        //content.push({ul: arr});
        for (const d of data[key]) {
          this.generatePdfContent(d, true);
        }
      } else {
        if(hasArray) {
          if(!this.arr.length){
            this.arr.push({key: key, value: data[key]});
          } else {
            let _index = this.arr.reverse().findIndex(a => a.hasOwnProperty('ul'));
            let pul = this.arr[_index] || [];
            if(_index >= 0) {
              this.arr.push({ul: [...pul['ul'], {key: key, value: data[key]}]})
            } else {
              this.arr.push({key: key, value: data[key]})
            }
          }
        } else {
          this.content.push({key: key, value: data[key]});
        }
      }
    });
  }*/

  generatePdf1(data) {
    let content = [];
    Object.keys(data).forEach(key => {
      if(Array.isArray(data[key])) {
        let ul = [];
        for (const d of data[key]) {
          Object.keys(d).forEach(key1 => {
            if(Array.isArray(d[key1])) {
              let level2 = [];
              for (const d1 of d[key1]) {
                Object.keys(d1).forEach(key2 => {
                  if(Array.isArray(d1[key2])) {
                    let level3 = [];
                    for (const d2 of d1[key2]) {
                      Object.keys(d2).forEach(key3 => {
                        if(Array.isArray(d2[key3])) {
                          let level4 = [];
                          for (const d3 of d2[key3]) {
                            Object.keys(d3).forEach(key4 => {
                              level4.push({text: `${this.camelize(key4)} : ${d3[key4]}`, listType: 'none'});
                            });
                          }
                          level3.push({text: `${this.camelize(key3)} :`, listType: 'none'}) ;
                          level3.push({ul: level4});
                        } else {
                          level3.push({text: `${this.camelize(key3)} : ${d2[key3]}`, listType: 'none'});
                        }
                      });
                    }
                    level2.push({text: `${this.camelize(key2)} :`, listType: 'none'}) ;
                    level2.push({ul: level3});
                  } else {
                    level2.push({text: `${this.camelize(key2)} : ${d1[key2]}`, listType: 'none'});
                  }
                });
              }
              ul.push({text: `${this.camelize(key1)} :`, listType: 'none'}) ;
              ul.push({ul: level2});
            } else {
              ul.push({text: `${this.camelize(key1)} : ${d[key1]}`, listType: 'none'});
            }
          });
        }
        content.push({text: `${this.camelize(key)} :`, listType: 'none'});
        content.push({ul: ul});
      } else {
        content.push({text: `${this.camelize(key)} : ${data[key]}`, listType: 'none'});
      }
    });
    return content;
  }
}
