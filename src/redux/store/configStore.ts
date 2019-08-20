import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import appState from '../reducers';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig: PersistConfig = {
  key: 'react-boilerplate-state',
  storage,
  whitelist: [],
}
const persistedReducer = persistReducer(persistConfig, appState);
export default function () {
  const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(thunk),
  ));
  const persistor = persistStore(store);
  return { store, persistor };
};
