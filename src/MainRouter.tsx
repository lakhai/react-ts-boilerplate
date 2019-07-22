import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AppStore, UserInfo } from 'models';
import { signInByToken } from 'redux/actions';
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';

interface Props {
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfo: UserInfo | null;
  refreshToken: () => void;
};
class MainRouter extends React.Component<Props> {
  componentDidMount() {
    if (this.props.isAuthenticated && !this.props.userInfo) {
      this.props.refreshToken();
    }
  }
  renderApp = () => {
    if (this.props.userInfo && !this.props.isLoading) {
      return <App />
    }
    return <p>Loading...</p>
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route component={LoginPage} path="/login" />
          <Route render={this.renderApp} path="/" />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.userInfo,
});
const mapDispatchToProps = dispatch => ({
  refreshToken: () => dispatch(signInByToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);
