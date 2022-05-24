import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data, options, questions, subAreas } from './model';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<data>('https://indelta-api.ubiquotechs.com/test-info');
  }
}
