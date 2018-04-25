import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

declare const require: any;
const config = require('../../../config.json');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ActivityService {
  private apiRoot: String = `${config.api}/activites`;

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(`${this.apiRoot}/`, httpOptions);
  }

  getByObjectId(id) {
    return this.httpClient.get(`${this.apiRoot}/${id}`, httpOptions);
  }

}
