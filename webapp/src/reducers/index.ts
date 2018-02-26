import { combineReducers, ActionReducerMap } from '@ngrx/store';
import * as auth from './auth';
import * as search from './search';

export class State {
    auth?: auth.AuthState;
    search?: search.SearchState;
}

export const reducers: ActionReducerMap<State> = {
    auth: auth.reducer,
    search: search.reducer
};
