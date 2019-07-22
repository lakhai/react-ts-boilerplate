import { ApiInstance } from 'api';
import * as actions from '../constants';
import { UserInfo, AppStore } from 'models';

export const signInByToken = () => (dispatch, getState: () => AppStore) => {
	dispatch({ type: actions.REFRESH_TOKEN });
	const token = getState().auth.token;
	return ApiInstance.post<UserInfo>('/auth/signInByToken', { token })
		.then(userInfo => dispatch({ type: actions.GET_AUTH_TOKEN_SUCCESS, data: { payload: {token, userInfo} } }))
		.catch(err => dispatch({ type: actions.REFRESH_TOKEN_FAILED }));
}

export const signIn = (email: string, password: string) => dispatch => {
	dispatch({ type: actions.GET_AUTH_TOKEN });
	return ApiInstance.post<{ token: string; userInfo: UserInfo }>('/auth/signIn', { email, password })
		.then(payload => {
			dispatch({ type: actions.GET_AUTH_TOKEN_SUCCESS, data: { payload } });
		})
		.catch(error => {
			dispatch({ type: actions.GET_AUTH_TOKEN_FAILED, data: { error } });
		})
};

export const signOut = () => dispatch => {
	ApiInstance.setHeaders('Authorization', '');
	dispatch({ type: actions.DESTROY_AUTH_TOKEN });
};