import { Action } from '@ngrx/store';

export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_ERROR = '[Auth] Login Error';

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) { }
}
export class LoginError implements Action {
    readonly type = LOGIN_ERROR;
    constructor(public payload: any) { }
}

export type Actions = LoginSuccess | LoginError;
