import { IAppState } from './store';
import { BoardActions } from '../board.actions';
import { CardActions } from '../card.actions';
import { ListActions } from '../list.actions';

import { boardReducer } from './board.reducer';
import { cardReducer } from './card.reducer';
import { listReducer } from './list.reducer';

export function reducer(state: IAppState, action) {

  const reducers = [
    boardReducer,
    listReducer,
    cardReducer
  ];

  for (const reducerFunction of reducers) {
    const result = reducerFunction(state, action);
    if (result != null) {
      return result;
    }
  }

  return state;
}
