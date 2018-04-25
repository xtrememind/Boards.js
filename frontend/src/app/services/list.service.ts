import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ListService {
  private apiRoot: String = 'http://localhost:3001/lists';

  constructor(private httpClient: HttpClient) { }

  get(id) {
    return this.httpClient.get(`${this.apiRoot}/${id}`, httpOptions);
  }

  post(boardId, list) {
    return this.httpClient.post(`${this.apiRoot}/${boardId}`, list, httpOptions);
  }

  put(list) {
    return this.httpClient.put(`${this.apiRoot}/${list._id}`, list, httpOptions);
  }

  delete(list) {
    return this.httpClient.delete(`${this.apiRoot}/${list._id}`, httpOptions);
  }
}
