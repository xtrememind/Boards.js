import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { BoardService } from '../services/board.service';
import { ListActions } from './list.actions';
import { TeamAction } from './team.actions';

@Injectable()
export class BoardActions {
    static BOARD_GET = 'BOARD_GET';

    constructor(private ngRedux: NgRedux<IAppState>, private boardService: BoardService,
        private listActions: ListActions, private teamActions: TeamAction) { }

    get(id) {
        this.listActions.clear();

        this.boardService.get(id).subscribe((board: any) => {
            this.ngRedux.dispatch({
                type: BoardActions.BOARD_GET,
                payload: board[0]
            });

            this.listActions.clear();

            for (const list of board[0].lists) {
                this.listActions.get(list._id, list.position);
            }
        });
    }

    post(board) {
        this.boardService.post(board).subscribe((r: any) => {
            this.teamActions.get();
        });
    }

}
