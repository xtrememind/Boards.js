import { createStore } from 'redux';
import { reducer } from './reducer';

export const store = createStore(reducer);

export interface IAppState {
    board: any;
    lists: any;
    cards: any;
}
