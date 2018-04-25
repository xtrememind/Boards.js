import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';

@Injectable()
export class CardActions {

    static CARD_POST = 'CARD_POST';
    static CARD_PUT = 'CARD_PUT';
    static CARD_MOVE = 'CARD_MOVE';

    constructor(private ngRedux: NgRedux<IAppState>) { }

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
        const data = {
            card: card.card.id,
            originList: card.originList.id,
            destinationList: card.destinationList.id,
            position: card.position
        };

        this.ngRedux.dispatch({
            type: CardActions.CARD_MOVE,
            payload: card
        });
    }
}
