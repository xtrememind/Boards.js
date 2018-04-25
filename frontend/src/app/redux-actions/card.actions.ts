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
    static CARD_CHANGE_NAME = 'CARD_CHANGE_NAME';
    static CARD_CHANGE_DESCRIPTION = 'CARD_CHANGE_DESCRIPTION';

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

    changeName(card) {
        this.cardService.changeName(card).subscribe((r: any) => {
            this.ngRedux.dispatch({
                type: CardActions.CARD_CHANGE_NAME,
                payload: card
            });
        });
    }

    changeDescription(card) {
        this.cardService.changeDescription(card).subscribe((r: any) => {
            this.ngRedux.dispatch({
                type: CardActions.CARD_CHANGE_DESCRIPTION,
                payload: card
            });
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
