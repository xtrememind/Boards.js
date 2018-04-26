import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {

  private apiRoot: String = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) { }

  getAllTeam() {
    return this.httpClient.get(`${this.apiRoot}/teams`);
  }


  post(team) {
    return this.httpClient.post(`${this.apiRoot}/teams`, team);
  }

}
