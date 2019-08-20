import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Goal } from 'models';
import theme from 'constants/theme';

const GoalCard: React.FunctionComponent<{ goal: Goal }> = props => {
  const classes = theme(props);
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Word of the Day
        </Typography>
      <Typography variant="body1">
        {props.goal.description}
      </Typography>
      <Typography className={classes.pos} variant="body2">
        {props.goal.reason}
      </Typography>
      <CardActions>
        <Button color="secondary" size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};
export default GoalCard;
