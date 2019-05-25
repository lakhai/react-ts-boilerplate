import { REHYDRATE } from 'redux-persist';
import { AuthReducer } from "../../models/store";
import * as actions from '../constants/auth';
import { ApiInstance } from 'api';

const initialState: AuthReducer = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  currentUser: null,
};

const auth = (state: AuthReducer = initialState, action: { type: string, payload?: any, data?: _.Dictionary<any> }): AuthReducer => {
  const { type, data } = action;
  switch (type) {
    case REHYDRATE: {
      if (state.token) { // TODO - Move token management to cookies
        ApiInstance.setHeaders('Authorization', `Bearer ${action.payload.token}`);
      }
      return {
        ...state,
        isLoading: false,
      };
    }
    case actions.GET_AUTH_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_AUTH_TOKEN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_AUTH_TOKEN_SUCCESS: {
      const { token } = data.payload;
      return {
        ...state,
        token,
        isLoading: false,
        isAuthenticated: true,
      };
    }
    case actions.DESTROY_AUTH_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        currentUser: null,
      }
    default:
      return state;
  }
}
export default auth;
