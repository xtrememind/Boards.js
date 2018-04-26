import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { UserService } from '../services/user.service';

@Injectable()
export class UserActions {
    static USER_GETALL = 'USER_GETALL';
    static USER_POST = 'USER_POST';

    constructor(private ngRedux: NgRedux<IAppState>, private userService: UserService) { }

    getAll() {
        this.userService.getAll().subscribe((data: any) => {
            if (data.length === 0) {
                return;
            }

            this.ngRedux.dispatch({
                type: UserActions.USER_GETALL,
                payload: data
            });
        });
    }
}
