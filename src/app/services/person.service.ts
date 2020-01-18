import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../models/person';
import environment from '/workspace/cnd/env/ENV-CND-BASE/json-cnd-base.json';
import { BaseService } from './base.service';
import { HttpUtil } from '../utils/http-util';

@Injectable({
  providedIn: 'root'
})
export class PersonService {


  constructor(private http: HttpClient) { }

  signup(person: Person) {
    return this.http.post(environment.backend.base + '/person/signup', person, HttpUtil.httpOptionsJson);
  }
}
