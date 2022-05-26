export interface options {
  id: number,
  label: string,
  value: number,
  result_text: string
}
export interface questions {
  id: number,
  title: string,
  label: string,
  options: options[]
}
export interface subAreas {
  sub_id: number,
  sub_area_title: string,
  questions: questions[]
}
export interface areas {
  id: number,
  title_area: string,
  factor: number,
  subAreas: subAreas[]
}
export interface data {
  id: number,
  name_test: string,
  description: string,
  text_result: string,
  area_test: areas[]
}
