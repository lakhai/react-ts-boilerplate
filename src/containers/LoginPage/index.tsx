import * as React from 'react';
import { connect } from 'react-redux';
import ReactLogo from '../../logo.svg';
import styled from 'helpers/styled';
import { AppStore } from 'models/store';
import { signIn } from 'redux/actions';
import { withRouter, RouteComponentProps } from 'react-router';
import { compose } from 'redux';
import Button from 'components/Button';

const MainContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
position: relative;
padding: 20px 0;
align-items: center;
justify-content: center;
overflow: hidden;
`;

const StyledInput = styled.input`
width: 100%;
box-sizing: border-box;
padding: 10px;
border: 3px solid #EDEAE4;
border-radius: 3px;
line-height: 24px;
font-size: 16px;
font-weight: 500;
color: #3A3333;
margin-bottom: 19px;
:disabled,
::placeholder,
::-webkit-input-placeholder,
:-ms-input-placeholder {
  opacity: .4;
}
`;
const StyledLabel = styled.label`
display: inline-block;
text-align: left;
font-size: 18px;
line-height: 25px;
color: #3A3333;
font-weight: 500;
margin-bottom: 4px;
`;

const StyledForm = styled.form`
z-index: 10;
min-width: 320px;
max-width: 360px;
width: 100%;
box-sizing: border-box;
padding: 0 10px;
display: flex;
flex-direction: column;
justify-content: stretch;
img {
  width: 203px;
  height: 111px;
  margin-bottom: 29px;
  align-self: center;
}
button.forgot {
  display: none;
  color: #3A3333;
  font-size: 14px;
  line-height: 19px;
  background: transparent;
  border: none;
}
`;

const Input: React.FunctionComponent<any> = React.memo(props => {
  const { label, ...inputProps } = props;
  return (
    <>
      <StyledLabel htmlFor={props.name || ''}>{props.label}</StyledLabel>
      <StyledInput {...inputProps} id={props.name} />
    </>
  )
});

const Form: React.FunctionComponent<any> = React.memo(props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit({ email, password });
  }
  return (
    <StyledForm onSubmit={onSubmit}>
      <img src={ReactLogo} alt="React Boilerplate" />
      <Input
        disabled={props.isLoading}
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        placeholder="john@doe.com"
      />
      <Input
        disabled={props.isLoading}
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
        placeholder="Insert your password"
      />
      <Button disabled={props.isLoading} type="submit">{
        props.isLoading ? 'Loading...' : 'Log In'
      }</Button>
      <button className="forgot" onClick={props.onClickForgotPassword}>Forgot your password?</button>
    </StyledForm>
  );
});

interface Props extends RouteComponentProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn(data): void;
}

interface State {
}
class LoginContainer extends React.Component<Props, State> {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  login = (data: { email: string, password: string }) => {
    this.props.signIn(data);
  }

  forgotPassword = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <MainContainer>
        <Form isLoading={this.props.isLoading} onSubmit={this.login} onClickForgotPassword={this.forgotPassword} />
      </MainContainer>
    )
  }
}

const mapStateToProps = (state: AppStore) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = dispatch => ({
  signIn: (data: { email: string, password: string }) => dispatch(signIn(data.email, data.password)),
});
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)
export default enhance(LoginContainer);
