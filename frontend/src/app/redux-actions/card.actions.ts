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
    static CARD_CHANGE_DUEDATE = 'CARD_CHANGE_DUEDATE';
    static CARD_DELETE = 'CARD_DELETE';
    static CARD_ADDMEMBER = 'CARD_ADDMEMBER';
    static CARD_REMOVEMEMBER = 'CARD_REMOVEMEMBER';
    static CARD_ADDCARDTOLIST = 'CARD_ADDCARDTOLIST';

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

    changeDueDate(card) {
        this.cardService.changeDueDate(card).subscribe((r: any) => {
            this.ngRedux.dispatch({
                type: CardActions.CARD_CHANGE_DUEDATE,
                payload: card
            });
        });
    }

    move(card) {
        this.cardService.move(card).subscribe((r: any) => {
            console.log(r);
            this.ngRedux.dispatch({
                type: CardActions.CARD_MOVE,
                payload: card
            });
        }, err => console.log(err));
    }

    addMember(card, user) {
        this.cardService.addMember(card, user).subscribe((r: any) => {
            this.get(card._id);
        });
    }

    removeMember(card, user) {
        this.cardService.removeMember(card, user).subscribe((r: any) => {
            this.get(card._id);
        });
    }

    delete(card) {
        this.cardService.delete(card).subscribe((r: any) => {
            this.ngRedux.dispatch({
                type: CardActions.CARD_DELETE,
                payload: card
            });
        });
    }

    addCardToList(card) {
        this.cardService.get(card._id).subscribe((result: any) => {
            this.ngRedux.dispatch({
                type: CardActions.CARD_ADDCARDTOLIST,
                payload: result[0]
            });
        });
    }
}
