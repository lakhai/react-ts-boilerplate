import AssignmentIcon from '@material-ui/icons/Assignment';
import GoalsContainer from 'containers/Goals';

export default [
  {
    id: 'root/goals',
    exact: true,
    path: '/goals',
    label: 'Goals',
    icon: AssignmentIcon,
    container: GoalsContainer,
  },
];
