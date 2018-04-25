import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { ListService } from '../services/list.service';

@Injectable()
export class ListActions {
    static LIST_GET = 'LIST_GET';
    static LIST_POST = 'LIST_POST';
    static LIST_PUT = 'LIST_PUT';
    static LIST_DELETE = 'LIST_DELETE';

    constructor(private ngRedux: NgRedux<IAppState>, private listService: ListService) { }

    get(id, position) {
        this.listService.get(id).subscribe(list => {
            this.ngRedux.dispatch({
                type: ListActions.LIST_GET,
                payload: {
                    list: list[0],
                    position: position
                }
            });
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
        this.listService.put(list).subscribe(r => {
            this.ngRedux.dispatch({
                type: ListActions.LIST_PUT,
                payload: list
            });
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
