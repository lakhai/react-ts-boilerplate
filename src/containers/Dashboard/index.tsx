import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppDrawer from './AppDrawer';
import theme from 'constants/theme';
import routes from 'constants/routes';
import { Route, withRouter, RouteComponentProps } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppStore, UserInfo } from 'models';
import { signOut } from 'redux/actions';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps<{}> {
  isLoading: boolean;
  isAuthenticated: boolean;
  userInfo: UserInfo;
}

const Dashboard: React.FunctionComponent<Props> = props => {
  const classes = theme(props);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <Router>
              {routes.map(route => (
                <Route
                  key={`heading-route-${route.id}`}
                  exact={route.exact || false}
                  path={route.path}
                  render={() => route.label}
                />
              ))}
            </Router>
          </Typography>
          <IconButton color="inherit">
            {`${props.userInfo.firstName} ${props.userInfo.lastName}`}
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppDrawer
        isOpen={open}
        handleClose={handleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Router>
                {routes.map(route => (
                  <Route
                    key={`container-route-${route.id}`}
                    exact={route.exact || false}
                    path={route.path}
                    component={route.container}
                  />
                ))}
              </Router>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.userInfo,
});
const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
