import * as search from '../actions/search';

export class SearchState {
    recentSearches: String[];
    searchResults: any[];
}

export const initialState: SearchState = {
    recentSearches: [],
    searchResults: []
};

export function reducer(state = initialState, action: search.Actions): SearchState {
    switch (action.type) {
        case search.SEARCH:
            return {
                ...state,
                recentSearches: [action.payload.query, ...state.recentSearches],
                searchResults: action.payload.result
            };

        case search.RECENT_SEARCHES_FETCHED:
            return {
                ...state
            };
        case search.SEARCH_RESET:
            return initialState;
        default:
            return {
                ...state
            };
    }
}
