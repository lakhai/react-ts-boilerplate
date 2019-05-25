import React from 'react';
import { Provider } from 'react-redux';
import configStore from 'redux/store/configStore';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import LoginPage from 'containers/LoginPage';
import App from 'containers/App';

library.add(fas);
const { store, persistor } = configStore();

const MainRouter: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route component={LoginPage} path="/login" />
            <Route component={App} path="/" />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default MainRouter;
