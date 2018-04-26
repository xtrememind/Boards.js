import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

declare const require: any;
const config = require('../../../config.json');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {
  private apiRoot: String = config.api;

  constructor(private httpClient: HttpClient) { }

  getAllTeam() {
    return this.httpClient.get(`${this.apiRoot}/teams`);
  }


  post(team) {
    return this.httpClient.post(`${this.apiRoot}/teams`, team);
  }

  addMember(team, member) {
    return this.httpClient.put(`${this.apiRoot}/teams/members/${team._id}`, member);
  }
}
