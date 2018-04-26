import { IAppState } from './store';
import { BoardActions } from '../board.actions';
import { CardActions } from '../card.actions';
import { ListActions } from '../list.actions';

import { boardReducer } from './board.reducer';
import { cardReducer } from './card.reducer';
import { listReducer } from './list.reducer';
import { teamReducer } from './team.reducer';
import { userReducer } from './user.reducer';

const initial: IAppState = {
  board: {
    name: '',
    lists: []
  },
  lists: [],
  team: [],
  users: [],
  card: {},
  cards: []
};

export function reducer(state: IAppState = initial, action) {

  const reducers = [
    boardReducer,
    listReducer,
    cardReducer,
    teamReducer,
    userReducer
  ];

  for (const reducerFunction of reducers) {
    const result = reducerFunction(state, action);
    if (result != null) {
      return result;
    }
  }

  return state;
}
