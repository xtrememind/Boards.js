import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { Http } from '@angular/http';

@Injectable()
export class ListActions {
    static LIST_CREATE = 'LIST_CREATE';
    static LIST_POST = 'LIST_POST';
    static LIST_PUT = 'LIST_PUT';

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) { }

    create() {
        this.ngRedux.dispatch({
            type: ListActions.LIST_CREATE
        });
    }

    post(list) {
        // post
        const result = {
            id: 1,
            name: list.name,
            cards: []
        };

        this.ngRedux.dispatch({
            type: ListActions.LIST_POST,
            payload: {
                list: result,
                parent: list.parent
            }
        });
    }

    put(list) {
        // put....
        this.ngRedux.dispatch({
            type: ListActions.LIST_PUT,
            payload: list
        });
    }
}
