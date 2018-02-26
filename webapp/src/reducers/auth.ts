import * as auth from '../actions/auth';

export class AuthState {
    userId: String;
    isLoggedIn: Boolean;
    sessionId: String;
    lcboToken: String;
}

export const initialState: AuthState = {
    userId: null,
    isLoggedIn: false,
    sessionId: null,
    lcboToken: null
};
export function reducer(state = initialState, action: auth.Actions): AuthState {
    switch (action.type) {
        case auth.LOGIN_SUCCESS:
            return{
                ...state,
                userId: action.payload.userId,
                isLoggedIn: true,
                sessionId: action.payload.id,
                lcboToken: '',
            };
        case auth.LOGIN_ERROR:
            return{
                ...state,
                userId: null,
                isLoggedIn: false,
                sessionId: null,
                lcboToken: null
            };
        default:
            return {
                ...state
            };
    }
}
