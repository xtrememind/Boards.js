import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { Http } from '@angular/http';

@Injectable()
export class CardActions {
    static CARD_CREATE = 'CARD_CREATE';
    static CARD_POST = 'CARD_POST';
    static CARD_UPDATE = 'CARD_UPDATE';
    static CARD_PUT = 'CARD_PUT';

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) { }

    create() {
        this.ngRedux.dispatch({
            type: CardActions.CARD_CREATE
        });
    }

    post(card) {
        this.ngRedux.dispatch({
            type: CardActions.CARD_POST,
            payload: card
        });
    }

    update() {
        this.ngRedux.dispatch({
            type: CardActions.CARD_UPDATE
        });
    }

    put(card) {
        this.ngRedux.dispatch({
            type: CardActions.CARD_PUT,
            payload: card
        });
    }
}
