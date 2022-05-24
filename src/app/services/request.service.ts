import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Answer,
  localObject,
} from '../model/interfaces/localObject.interface';
import { project } from '../model/classes/Project';
import { Test } from '../model/interfaces/test.interface';

import json from '../shared/object.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  private data: localObject;
  private today = new Date();
  date: any = this.today.getDate()+'/'+(this.today.getMonth()+1)+'/'+this.today.getFullYear() + ' - ' + this.today.toLocaleTimeString()

  constructor(private http: HttpClient) {
    this.data = this.DataLocal;
    if (!this.data) {
      this.saveData(json);
    }
  }

  private fakeRequest(value: any): Observable<{ data: any }> {
    return new Observable((x) => {
      setTimeout(() => {
        x.next({ data: value });
      }, 100);
    });
  }

  private get DataLocal(): localObject {
    return JSON.parse(localStorage.getItem('blue')!);
  }

  private saveData(data: any) {
    localStorage.setItem('blue', JSON.stringify(data));
    this.data = this.DataLocal;
  }

  createProyect(name: string, testId = 1) {
    const newProyect = new project().create(name, testId);
    this.data.projects.push(newProyect);
    this.saveData(this.data);
    return this.fakeRequest(newProyect.id);
  }

  getTest(id?: any): Observable<{ data: Test }> {
    return this.fakeRequest(this.data.test);
  }

  getProyects() {
    return this.fakeRequest(this.data.projects);
  }

  getProyect(id: any) {
    return this.fakeRequest(this.data.projects.filter((x: any) => x.id == id));
  }

  saveArea(idProyect: number, areaId: number, answers: Answer[]) {
    this.data.projects
      .filter((x) => x.id == idProyect)[0]
      .areas_result.filter((area) => area.area_id == areaId)[0].answer =
      answers;
    this.data.projects[0].dateUpdate = this.date
    this.saveData(this.data);
    return this.fakeRequest('update');
  }

  deleteProject(idProyect: number){
    var id = idProyect - 1
    this.data.projects.splice(id,1)
    this.saveData(this.data);
    return this.fakeRequest('update');
  }

  getAnswer(idProyect: number) {
    const res = this.data.projects.filter(
      (project) => project.id == idProyect
    )[0].areas_result;
    return this.fakeRequest(res);
  }

  saveResult(idProyect: number, value: any) {
    this.data.projects.filter((x: any) => x.id == idProyect)[0].resultado =
      value;
    this.saveData(this.data);
    return this.fakeRequest('update');
  }

  getResults(id: number) {
    return this.fakeRequest(
      this.data.projects.filter((project) => project.id == id)[0].areas_result
    );
  }

  getUSer() {
    return this.fakeRequest(this.data.security.user);
  }
    
  
   AdapterAreas(area_test:any[]) {
    let value:any =  area_test.map(areaParent => ({
      id: areaParent.id,
      factor: areaParent.factor,
      title_area: areaParent.title_area,
      questions:areaParent.subAreas
      .map( (subArea:any) => subArea.questions
          .map ((quest:any) => (
            {...quest,
            sub_area_title: subArea.sub_area_title,
            sub_id:subArea.sub_id
          }))).flat()
     }))
     return value
 }
  

 getSubAreaData(){
   console.log();
 }
  
  getApiData(){
    return this.http.get("https://indelta-api.ubiquotechs.com/account/list")
  }
  getAccountList(){
    return this.http.get("https://indelta-api.ubiquotechs.com/account/list")
  }
  getTestInfo(){
    return this.http.get("https://indelta-api.ubiquotechs.com/test-info")
  }
  getSecInfo(){
    return this.http.get("https://indelta-api.ubiquotechs.com/sec-info")
  }
  getProjects(){
    return this.http.get("https://indelta-api.ubiquotechs.com/projects")
  }
  deleteAProject(id: any){
    return this.http.delete(`https://indelta-api.ubiquotechs.com/projects/${id}`)
  }
  getProject(id: any){
    return this.http.get(`https://indelta-api.ubiquotechs.com/projects/${id}`)
  }

  postProjects(projData: any){
    return this.http.post("https://indelta-api.ubiquotechs.com/projects", {
      company: "",
      basic_info: {
        email: projData
      },
      dateCreated: this.date,
      dateUpdate: this.date,
      resultado: null,
      testId: 1,
      areas_result: []
    })
  }

  updateProjects(projData: any){
    return this.http.put("https://indelta-api.ubiquotechs.com/projects", projData)
  }
  
  completeTestProyect() {}
}

// model
