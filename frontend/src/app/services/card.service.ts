import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CardService {
  private apiRoot: String = 'http://localhost:3001/cards';

  constructor(private httpClient: HttpClient) { }

  get(id) {
    return this.httpClient.get(`${this.apiRoot}/${id}`, httpOptions);
  }

  post(listId, card) {
    return this.httpClient.post(`${this.apiRoot} /${listId}`, card, httpOptions);
  }
}
