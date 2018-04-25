import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { ListActions } from '../list.actions';

export function listReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case ListActions.LIST_GET:
            insertList(state, action.payload);
            return state;
        case ListActions.LIST_POST:
            state.lists.push(action.payload.list);
            return state;
        case ListActions.LIST_PUT:
            // nothing to do
            return state;
        case ListActions.LIST_DELETE:
            deleteList(state, action.payload);
            return state;
        case ListActions.LIST_MOVE:
            moveList(state, action.payload);
            return state;
        default: return null;
    }

    function insertList(state, payload) {
        if (state.lists.some(l => l.id && l.id === payload.id)) {
            deleteList(state, payload.list);
        }

        payload.list.position = payload.position;
        state.lists.push(payload.list);

        state.lists = state.lists.sort(function (a, b) {
            const x = a.position;
            const y = b.position;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function deleteList(state, list) {
        const index = state.lists.indexOf(list);
        state.lists.splice(index, 1);
    }

    function moveList(state, payload) {
        const oldList = state.lists.filter(l => l._id === payload.list._id)[0];
        deleteList(state, oldList);

        // can't use insertList because it will resort everything
        state.lists.splice(payload.position, 0, payload.list);
    }
}
