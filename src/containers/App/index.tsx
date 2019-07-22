import * as React from 'react';
import styled from 'helpers/styled';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppStore, User } from 'models/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { UserInfo } from 'models/core';
import { signOut, signInByToken } from 'redux/actions';

const Container = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

interface Props extends RouteComponentProps {
  refreshToken: () => void;
  signOut: () => void;
  userInfo: UserInfo;
  isLoading: boolean;
  isAuthenticated: boolean;
}
const App: React.FunctionComponent<Props> = React.memo(props => {
  if (!props.isAuthenticated) {
    props.history.push('/login');
  }
  const signOut = () => {
    props.signOut();
    props.history.push('/login');
  };
  return props.isLoading ? <p>Loading...</p> : (
    <Container>
      <h1>{props.userInfo.name}</h1>
      <button onClick={signOut}>Log Out</button>
    </Container>
  );
})

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
