import { IAppState } from './store';
import { BoardActions } from '../board.actions';
import { CardActions } from '../card.actions';
import { ListActions } from '../list.actions';

const initialState: IAppState = null;

export function reducer(state: IAppState = initialState, action) {
  switch (action.type) {
    case BoardActions.BOARD_GETALL:
      return Object.assign({}, state, { board: action.payload });
    case CardActions.CARD_POST:
      return Object.assign({}, state, { cards: action.payload });
    case ListActions.LIST_POST:
      return Object.assign({}, state, { lists: action.payload });
    default: return state;
  }
}
