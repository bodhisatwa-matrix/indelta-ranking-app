export interface Tests {
  test: Test[];
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
