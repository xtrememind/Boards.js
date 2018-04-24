import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { Http } from '@angular/http';

@Injectable()
export class ListActions {

    static LIST_CREATE = 'LIST_CREATE';
    static LIST_POST = 'LIST_POST';

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) { }

    create() {
        this.ngRedux.dispatch({
            type: ListActions.LIST_CREATE
        });
    }

    post(list) {
        this.ngRedux.dispatch({
            type: ListActions.LIST_POST,
            payload: list
        });
    }
}
