import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class TeamActions {
    static TEAM_GETALL = 'TEAM_GETALL';
    private apiRoot: string = 'http://localhost:3000';

    constructor(private ngRedux: NgRedux<IAppState>, private httpClient: HttpClient) { }

    getAll() {
        let team = JSON.parse(localStorage.getItem('team'));

        if (!team) {
            team = {
                id: 1,
                name: 'MyTestTeam',
                boards: [
                    {
                        id: 2,
                        name: 'List1',
                        position: 0
                    },
                    {
                        id: 6,
                        name: 'List2',
                        position: 1
                    }
                ]
            };

            localStorage.setItem('board', JSON.stringify(team));
            // this.httpClient.get(`${this.apiRoot}/teams`).
            //     subscribe(data => team = data, err => console.log(err))

            this.ngRedux.dispatch({
                type: TeamActions.TEAM_GETALL,
                payload: team
            });
        }
    }
}

