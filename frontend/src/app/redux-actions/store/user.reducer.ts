import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { UserActions } from '../user.actions';

export function userReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case UserActions.USER_GETALL:
            return Object.assign({}, state, { users: action.payload });
        default: return null;
    }
}
