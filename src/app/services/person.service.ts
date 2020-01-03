import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../models/person';
import environment from '/workspace/cnd/env/json-cnd-base.json';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  signup(person: Person) {
    return this.http.post(environment.backend.base + '/person/singup', person, this.httpOptions);
  }
}
