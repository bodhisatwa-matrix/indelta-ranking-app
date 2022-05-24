import { localObject, Project } from '../interfaces/localObject.interface';

export class project {
  private today = new Date();
  date: any =
    this.today.getDate() +
    '/' +
    (this.today.getMonth() + 1) +
    '/' +
    this.today.getFullYear() +
    ' - ' +
    this.today.toLocaleTimeString();

  public data: localObject;
  public name: any;
  public baseObject: Project = {
    id: 1,
    company: '',
    dateCreated: this.date,
    dateUpdate: this.date,
    resultado: null,
    testId: 0,
    areas_result: [],
  };

  constructor() {
    this.data = JSON.parse(localStorage.getItem('blue')!);
    this.genId();
    this.genAreaResult();
  }

  create(name: string, testId: number) {
    this.name = name;
    this.baseObject.company = name;
    this.baseObject.testId = testId;
    return this.baseObject;
  }

  genId() {
    this.baseObject.id =
      Math.max(...this.data.projects.map((x: any) => x.id)) + 1;
  }

  genAreaResult() {
    //console.log(this.data);
    this.baseObject.areas_result = this.data.test.area_test.map((x) => ({
      area_id: x.id,
      result_area: 0,
      compliance_percent: 0.9,
      answer: x.questions.map((y) => ({
        id_question: y.id,
        id_options: '',
        date_answer: this.date,
      })),
    }));
  }
}
