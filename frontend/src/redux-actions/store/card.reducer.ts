import { IAppState } from '../store/store';
import { Http } from '@angular/http';
import { CardActions } from '../card.actions';

export function cardReducer(state: IAppState, action): IAppState {

    switch (action.type) {
        case CardActions.CARD_POST:
            return addCard(state, action);
        case CardActions.CARD_MOVE:
            moveCard(action.payload);
            return state;
        default: return null;
    }

    function addCard(state, action){
        state.board.lists.filter(l => l.id === action.payload.parent)[0].cards.push(action.payload.card);
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
            if (payload.position === -1) {
                payload.position = payload.destinationList.cards.length;
            }
            payload.destinationList.cards.splice(payload.position, 0, payload.card);
        }
    }


}