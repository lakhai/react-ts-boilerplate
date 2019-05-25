import { combineReducers, Reducer } from 'redux';
import auth from './auth';
import { AppStore } from 'models/store';

const appState: Reducer<AppStore> = combineReducers({
  auth,
});
export default appState;
