import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { Http } from '@angular/http';

@Injectable()
export class CardActions {

    static CARD_POST = 'CARD_POST';
    static CARD_PUT = 'CARD_PUT';
    static CARD_MOVE = 'CARD_MOVE';

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) { }

    post(card) {
        // post
        const result = {
            id: 1,
            name: card.name
        };

        this.ngRedux.dispatch({
            type: CardActions.CARD_POST,
            payload: {
                card: result,
                parent: card.parent
            }
        });
    }

    put(card) {
        this.ngRedux.dispatch({
            type: CardActions.CARD_PUT,
            payload: card
        });
    }

    move(card) {
        // put

        this.ngRedux.dispatch({
            type: CardActions.CARD_MOVE,
            payload: card
        });
    }
}
