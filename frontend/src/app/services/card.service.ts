import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

declare const require: any;
const config = require('../../../config.json');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CardService {
  private apiRoot: String = `${config.api}/cards`;

  constructor(private httpClient: HttpClient) { }

  get(id) {
    return this.httpClient.get(`${this.apiRoot}/${id}`, httpOptions);
  }

  post(listId, card) {
    return this.httpClient.post(`${this.apiRoot}/${listId}`, card, httpOptions);
  }

  changeName(card) {
    return this.httpClient.put(`${this.apiRoot}/name/${card._id}`, card);
  }

  changeDescription(card) {
    return this.httpClient.put(`${this.apiRoot}/description/${card._id}`, card);
  }

  changeDueDate(card) {
    return this.httpClient.put(`${this.apiRoot}/duedate/${card._id}`, card);
  }

  addMember(card, user) {
    return this.httpClient.put(`${this.apiRoot}/members/${card._id}`, user, httpOptions);
  }

  removeMember(card, user) {
    return this.httpClient.delete(`${this.apiRoot}/${card._id}/members/${user._id}`, httpOptions);
  }

  move(card) {
    return this.httpClient.put(`${config.api}/lists/cards/position`, {
      card: card.card._id,
      originList: card.originList._id,
      destinationList: card.destinationList._id,
      position: card.position
    }, httpOptions);
  }

  delete(card) {
    return this.httpClient.delete(`${this.apiRoot}/${card._id}`, httpOptions);
  }
}
