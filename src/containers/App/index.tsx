import * as React from 'react';
import { RouteComponentProps, withRouter, Route } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserInfo, AppStore } from 'models';
import { signInByToken, signOut } from 'redux/actions';
import routes from 'constants/routes';
import Dashboard from 'containers/Dashboard';


const App: React.FunctionComponent<Props> = props => {
  React.useEffect(() => {
    if (!props.isAuthenticated) {
      props.signOut();
      props.history.push('/login');
    }
  }, [props.isAuthenticated])
  return (
    <Dashboard />
  );
};

interface Props extends RouteComponentProps {
  userInfo: UserInfo;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => void;
  refreshToken: () => void;
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.userInfo,
});
const mapDispatchToProps = dispatch => ({
  refreshToken: () => dispatch(signInByToken()),
  signOut: () => dispatch(signOut()),
});
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)
export default enhance(App);
