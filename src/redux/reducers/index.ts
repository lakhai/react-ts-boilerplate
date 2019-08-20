import { combineReducers, Reducer } from 'redux';
import auth from './auth';
import goals from './goals';
import { AppStore } from 'models/store';

const appState: Reducer<AppStore> = combineReducers({
  auth,
  goals,
});
export default appState;
