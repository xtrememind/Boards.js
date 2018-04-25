import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { ListService } from '../services/list.service';

@Injectable()
export class ListActions {
    static LIST_GET = 'LIST_GET';
    static LIST_CLEAR = 'LIST_CLEAR';
    static LIST_POST = 'LIST_POST';
    static LIST_PUT = 'LIST_PUT';
    static LIST_DELETE = 'LIST_DELETE';
    static LIST_MOVE = 'LIST_MOVE';

    constructor(private ngRedux: NgRedux<IAppState>, private listService: ListService) { }

    clear() {
        this.ngRedux.dispatch({
            type: ListActions.LIST_CLEAR
        });
    }

    get(id, position) {
        this.listService.get(id).subscribe((list: any) => {
            if (list.length === 0) {
                return;
            }

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
        this.listService.post(list.parent, {
            name: list.name,
            position: list.position
        }).subscribe((result: any) => {
            console.log(result);
            this.ngRedux.dispatch({
                type: ListActions.LIST_POST,
                payload: {
                    parent: list.parent,
                    list: {
                        _id: result._id,
                        name: list.name,
                        position: list.position,
                        cards: []
                    }
                }
            });
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

    move(movingList) {
        console.log(`list ${movingList.list._id} changed to ${movingList.position}`);
        // TODO: Post

        this.ngRedux.dispatch({
            type: ListActions.LIST_MOVE,
            payload: movingList
        });
    }

    delete(list) {
        this.listService.delete(list).subscribe(r => {
            this.ngRedux.dispatch({
                type: ListActions.LIST_DELETE,
                payload: list
            });
        });
    }
}
