import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { BoardActions } from '../board.actions';

export function boardReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case BoardActions.BOARD_GET:
            return Object.assign({}, state, { board: action.payload });
        default: return null;
    }
}
