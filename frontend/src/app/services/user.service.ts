import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

declare const require: any;
const config = require('../../../config.json');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  private apiRoot: String = config.api;

  //http://localhost:3000/users/register

  constructor(private httpClient: HttpClient) { }

  ResigterUser(user) {
    let body = JSON.stringify(user);
    return this.httpClient.post(`${this.apiRoot}/users/register`, body, httpOptions);
  }

  CheckAuthentication(user) {
    let body = JSON.stringify(user);
    return this.httpClient.post(`${this.apiRoot}/users/auth`, body, httpOptions);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getAll() {
    return this.httpClient.get(`${this.apiRoot}/users`, httpOptions);
  }
}
