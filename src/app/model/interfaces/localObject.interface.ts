export interface localObject {
  security: Security;
  projects: Project[];
  test: Test;
}

export interface Project {
  id: number;
  company: string;
  dateCreated: string;
  dateUpdate: string;
  resultado: null;
  testId: number;
  areas_result: AreasResult[];
}

export interface AreasResult {
  area_id: number;
  result_area: number;
  compliance_percent: number;
  answer: Answer[];
}

export interface Answer {
  id_question: number;
  id_options: string;
  date_answer: string;
}

export interface Security {
  user: string;
  pass: string;
}

export interface Test {
  id: number;
  name_test: string;
  description: string;
  text_result: string;
  area_test: AreaTest[];
}

export interface AreaTest {
  id: number;
  title_area: string;
  factor: number;
  questions: Question[];
  subAreas: any[] | any
}

export interface Question {
  title: string;
  id: number;
  label: string;
  options: Option[];
}

export interface Option {
  id: number;
  label: string;
  value: number;
  result_text: string;
}
