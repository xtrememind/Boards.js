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
        default: return null;
    }
}
