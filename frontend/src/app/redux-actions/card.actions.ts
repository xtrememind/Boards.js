import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { CardService } from '../services/card.service';

@Injectable()
export class CardActions {
    static CARD_GET = 'CARD_GET';
    static CARD_POST = 'CARD_POST';
    static CARD_PUT = 'CARD_PUT';
    static CARD_MOVE = 'CARD_MOVE';

    constructor(private ngRedux: NgRedux<IAppState>, private cardService: CardService) { }

    get(id) {
        this.cardService.get(id).subscribe((result: any) => {
            this.ngRedux.dispatch({
                type: CardActions.CARD_GET,
                payload: result[0]
            });
        });
    }

    post(card) {
        this.cardService.post(card.parent, {
            name: card.name,
            position: card.position
        }).subscribe((result: any) => {
            this.ngRedux.dispatch({
                type: CardActions.CARD_POST,
                payload: {
                    parent: card.parent,
                    card: {
                        _id: result._id,
                        name: card.name,
                        position: card.position
                    }
                }
            });
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
