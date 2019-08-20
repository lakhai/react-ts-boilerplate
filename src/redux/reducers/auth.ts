import Cookies from 'js-cookie';
import { REHYDRATE } from 'redux-persist';
import { AuthReducer } from "../../models/store";
import * as actions from '../constants/auth';
import { Hub } from 'api';

const initialState: AuthReducer = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  userInfo: null,
};

const auth = (state: AuthReducer = initialState, action: { type: string, payload?: any, data?: _.Dictionary<any> }): AuthReducer => {
  const { type, data } = action;
  switch (type) {
    case REHYDRATE: {
      const token = Cookies.get('token');
      if (!token) {
        return {
          ...state,
          token: null,
          userInfo: null,
          isAuthenticated: false,
        }
      }
      Hub.setHeaders('Authorization', `Bearer ${token}`);
      return {
        ...state,
        token,
        userInfo: null,
        isAuthenticated: true,
      }
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
      const { token, userInfo } = data.payload;
      Hub.setHeaders('Authorization', `Bearer ${token}`);
      Cookies.set('token', token);
      return {
        ...state,
        token,
        userInfo,
        isLoading: false,
        isAuthenticated: true,
      };
    }
    case actions.REFRESH_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case actions.REFRESH_TOKEN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.REFRESH_TOKEN_SUCCESS: {
      const { userInfo } = data.payload;
      return {
        ...state,
        userInfo,
        isLoading: false,
        isAuthenticated: true,
      };
    }
    case actions.DESTROY_AUTH_TOKEN:
      Cookies.remove('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        userInfo: null,
      }
    default:
      return state;
  }
}
export default auth;
