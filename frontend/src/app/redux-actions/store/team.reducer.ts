import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { TeamAction } from '../team.actions';

export function teamReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case TeamAction.TEAM_GET:
        console.log(action.payload);
            return Object.assign({}, state, { team: action.payload });
        default: return null;
    }
}
