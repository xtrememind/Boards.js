import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { Http } from '@angular/http';

@Injectable()
export class BoardActions {
    static BOARD_GETALL = 'BOARD_GETALL';

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) { }

    getAll() {
        let board = JSON.parse(localStorage.getItem('board'));

        if (!board) {
            board = { // board
                id: 1,
                name: 'MyTestBoard',
                lists: [
                    {
                        id: 2,
                        name: 'List1',
                        position: 0,
                        cards: [
                            { id: 3, name: 'Card 1' },
                            { id: 4, name: 'Card 2' },
                            { id: 5, name: 'Card 3' }
                        ]
                    },
                    {
                        id: 6,
                        name: 'List2',
                        position: 1,
                        cards: [
                            { id: 7, name: 'Card 4' },
                            { id: 8, name: 'Card 5' }
                        ]
                    }
                ]
            };

            localStorage.setItem('board', JSON.stringify(board));
        }

        this.ngRedux.dispatch({
            type: BoardActions.BOARD_GETALL,
            payload: board
        });
    }
}
