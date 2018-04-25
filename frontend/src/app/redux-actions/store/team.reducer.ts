import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import {TeamActions} from '../team.actions';

export function teamReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case TeamActions.TEAM_GETALL:
            return Object.assign({}, state, { team: action.payload });
        default: return null;
    }
}
