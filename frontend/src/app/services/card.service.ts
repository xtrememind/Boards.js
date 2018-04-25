import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CardService {
  private apiRoot: String = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) { }

  post(listId, card) {
    return null;
    // return this.httpClient.put(`${this.apiRoot}/lists/cards/${listId}`, card, httpOptions);
  }
}
