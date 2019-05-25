import * as React from 'react';
import styled from 'helpers/styled';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppStore, User } from 'models/store';
import { compose } from 'redux';
import { connect } from 'react-redux';

const Container = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

interface Props extends RouteComponentProps {
  isAuthenticated: boolean;
  currentUser: User;
}
const App: React.FunctionComponent<Props> = React.memo(props => {
  if (!props.isAuthenticated) {
    props.history.push('/login');
  }
  return (
    <Container>
      <h1>React Boilderplate</h1>
    </Container>
  );
})

const mapStateToProps = (state: AppStore) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.currentUser,
});
const enhance = compose(
  withRouter,
  connect(mapStateToProps),
)
export default enhance(App);
