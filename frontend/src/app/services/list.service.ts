import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ListService {
  private apiRoot: String = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) { }

  get(id) {
    return this.httpClient.get(`${this.apiRoot}/lists/${id}`, httpOptions);
  }
  put(list) {
    console.log(list);
    return this.httpClient.put(`${this.apiRoot}/lists/${list._id}`, httpOptions, list);
  }

}
