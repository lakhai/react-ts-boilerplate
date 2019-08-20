import * as React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'helpers/styled';
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

const StyledInput = styled.input<{ hasError?: boolean }>`
width: 100%;
box-sizing: border-box;
padding: 8px 10px;
border: 2px solid ${props => props.hasError ? '#EF6749' : '#EDEAE4'};
border-radius: 3px;
line-height: 24px;
font-size: 14px;
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

const StyledLabel = styled.label<{ hasError?: boolean }>`
display: inline-block;
text-align: left;
font-size: 12px;
line-height: 16px;
color: ${props => props.hasError ? '#EF6749' : '#3A3333'};
font-weight: 600;
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

const Oval = styled.div<{ isBottom?: boolean }>`
height: 882px;
width: 882px;
border-radius: 50%;
position: absolute;
${props => {
    return props.isBottom ? css`
bottom: 54%;
right: 57%;
` : css`
top: 80%;
left: 50%;
`
  }}
z-index: 5;
background-color: #3B3B3B;
`;

const Input: React.FunctionComponent<any> = React.memo(props => {
  const { label, ...inputProps } = props;
  return (
    <>
      <StyledLabel htmlFor={props.name || ''} hasError={props.hasError}>{props.label}</StyledLabel>
      <StyledInput {...inputProps} id={props.name} />
    </>
  )
});

const Form: React.FunctionComponent<any> = React.memo(props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(email.length === 0);
    setPasswordError(password.length === 0);
    if (!email.length || !password.length) {
      return;
    }
    props.onSubmit({ email, password });
  }
  return (
    <StyledForm onSubmit={onSubmit}>
      <Input
        disabled={props.isLoading}
        label="Email"
        type="email"
        name="email"
        hasError={emailError}
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        placeholder="john@doe.com"
      />
      <Input
        disabled={props.isLoading}
        label="Password"
        hasError={passwordError}
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
  error?: string;
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
        <Form
          error={this.props.error}
          onSubmit={this.login}
          isLoading={this.props.isLoading}
          onClickForgotPassword={this.forgotPassword}
        />
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
