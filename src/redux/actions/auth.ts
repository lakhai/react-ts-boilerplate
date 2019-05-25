import { ApiInstance } from 'api';
import { User } from 'models/store';
import * as actions from '../constants';

export const signIn = (email: string, password: string) => dispatch => {
	dispatch({ type: actions.GET_AUTH_TOKEN });
	return ApiInstance.post<{ token: string; user: User}>('/users/login', { email, password })
		.then(payload => {
			ApiInstance.setHeaders('Authorization', `Bearer ${payload.token}`);
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