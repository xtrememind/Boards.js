import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { ListActions } from '../list.actions';

export function listReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case ListActions.LIST_GET:
            insertList(state, action);
            return state;
        case ListActions.LIST_POST:
            state.board.lists.push(action.payload.list);
            return state;
        case ListActions.LIST_PUT:
            // nothing to do
            return state;
        case ListActions.LIST_DELETE:
            deleteList(state, action);
            return state;
        default: return null;
    }

    function insertList(state, action) {
        if (state.lists.some(l => l.id && l.id === action.payload.id)) {
            deleteList(state, action);
        }

        action.payload.list.position = action.payload.position;
        state.lists.push(action.payload.list);
        state.lists = state.lists.sort(function (a, b) {
            const x = a.position;
            const y = b.position;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function deleteList(state, action) {
        const index = state.lists.indexOf(action.payload.list);
        state.lists.splice(index, 1);
    }
}
