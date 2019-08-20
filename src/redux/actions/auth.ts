import { Hub } from 'api';
import * as actions from '../constants';
import { UserInfo, AppStore } from 'models';


export const signInByToken = () => (dispatch, getState) => {
	dispatch({ type: actions.REFRESH_TOKEN })
	Hub.post<{ token: string; userInfo: UserInfo }>('/auth/signInByToken')
		.then(payload => dispatch({ type: actions.REFRESH_TOKEN_SUCCESS, data: { payload } }))
		.catch(error => dispatch({ type: actions.REFRESH_TOKEN_FAILED, data: { error } }));
}

export const signIn = (email: string, password: string) => dispatch => {
	dispatch({ type: actions.GET_AUTH_TOKEN });
	return Hub.post<{ token: string; userInfo: UserInfo }>('/auth/login', { email, password })
		.then(payload => {
			dispatch({ type: actions.GET_AUTH_TOKEN_SUCCESS, data: { payload } });
		})
		.catch(error => {
			dispatch({ type: actions.GET_AUTH_TOKEN_FAILED, data: { error } });
		})
};

export const signOut = () => dispatch => {
	Hub.setHeaders('Authorization', undefined);
	dispatch({ type: actions.DESTROY_AUTH_TOKEN });
};