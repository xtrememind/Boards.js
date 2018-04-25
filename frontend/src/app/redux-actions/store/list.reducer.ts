import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { ListActions } from '../list.actions';

export function listReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case ListActions.LIST_POST:
            state.board.lists.push(action.payload.list);
            return state;
        case ListActions.LIST_PUT:
            // nothing to do
            return state;
        case ListActions.LIST_DELETE:
            deleteList(state.board, action.payload);
            return state;
        default: return null;
    }

    function deleteList(board, list) {
        const index = board.lists.indexOf(list);
        board.lists.splice(index, 1);
    }
}
