import { Action } from '@ngrx/store';

export const SEARCH = '[Search] New Search';
export const RECENT_SEARCHES_FETCHED = '[Search] Recent Searches Fetched';
export const SEARCH_RESET = '[Search] Reset';


export class NewSearch implements Action {
    readonly type = SEARCH;
    constructor(public payload: any) { }
}
export class FetchedRecentlySearched implements Action {
    readonly type = RECENT_SEARCHES_FETCHED;
    constructor(public payload: any) { }
}
export class ResetSearch implements Action {
    readonly type = SEARCH_RESET;
    constructor(public payload: any) { }
}

export type Actions = NewSearch | FetchedRecentlySearched | ResetSearch ;
