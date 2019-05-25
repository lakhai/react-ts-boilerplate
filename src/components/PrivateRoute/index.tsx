import React, { FunctionComponent } from 'react';
import {
  Route, 
  Redirect,
  RouteProps, 
  RouteComponentProps
} from 'react-router-dom';
import { AppStore } from 'models/store';
import { connect } from 'react-redux';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? ( //put your authenticate logic here
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: AppStore) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps)(PrivateRoute);