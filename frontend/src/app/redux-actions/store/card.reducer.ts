import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { CardActions } from '../card.actions';

export function cardReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case CardActions.CARD_GET:
            return Object.assign({}, state, { card: action.payload });
        case CardActions.CARD_POST:
            return addCard(state, action);
        case CardActions.CARD_MOVE:
            moveCard(action.payload);
            return state;
        case CardActions.CARD_ADDCARDTOLIST:
            addCardToList(state, action);
            return state;
        default: return null;
    }

    function addCard(state, action) {
        state.lists.filter(l => l._id === action.payload.parent)[0].cards.push(action.payload.card);
        return state;
    }

    function moveCard(payload) {
        removeCardFromList(payload);
        addCardToList(payload);

        function removeCardFromList(payload) {
            const index = payload.originList.cards.indexOf(payload.card);
            payload.originList.cards.splice(index, 1);
        }

        function addCardToList(payload) {
            payload.destinationList.cards.splice(payload.position, 0, payload.card);
        }
    }

    function addCardToList(state, action) {
        if (state.cards.some(c => c._id && c._id === action.payload._id)) {
            const card = state.cards.filter(c => c._id === action.payload._id)[0];
            const index = state.cards.indexOf(card);
            state.cards.splice(index, 1);
        }

        state.cards.push(action.payload);
    }

}