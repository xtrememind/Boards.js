import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';

@Injectable()
export class ListActions {
    static LIST_POST = 'LIST_POST';
    static LIST_PUT = 'LIST_PUT';
    static LIST_DELETE = 'LIST_DELETE';

    constructor(private ngRedux: NgRedux<IAppState>) { }

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

    delete(list) {
        // delete...
        this.ngRedux.dispatch({
            type: ListActions.LIST_DELETE,
            payload: list
        });
    }
}
