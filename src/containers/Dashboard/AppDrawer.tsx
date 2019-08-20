import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Drawer, IconButton, Divider, List } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import theme from 'constants/theme';
import clsx from 'clsx';
import routes from 'constants/routes';
import { withRouter, RouteComponentProps } from 'react-router';

export interface AppDrawerProps extends RouteComponentProps {
  isOpen: boolean;
  handleClose: () => void;
}
const AppDrawer = withRouter<any, React.FunctionComponent<AppDrawerProps>>(props => {
  const classes = theme(props);
  return (
    <Drawer
      // variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !props.isOpen && classes.drawerPaperClose),
      }}
      open={props.isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={props.handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {routes.map(route => {
          const navigate = e => {
            e.preventDefault();
            props.history.push(route.path);
          }
          return (
            <ListItem onClick={navigate} button key={`drawer-item-${route.id}`}>
              {route.icon && (
                <ListItemIcon>
                  <route.icon />
                </ListItemIcon>
              )}
              <ListItemText primary={route.label} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
});
export default AppDrawer;
