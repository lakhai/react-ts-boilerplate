import * as React from 'react';
import * as _ from 'lodash';
import { FormControl, TextField, Typography, ButtonGroup, Button } from '@material-ui/core';
import theme from 'constants/theme';
import { Goal } from 'models';
import styled from 'helpers/styled';

const Form = styled.form`
display: flex;
flex-direction: column;
`;

export interface GoalFormTransaction {
  reason: string;
  description: string;
}

type GoalFormProps = {
  goal?: Goal | null;
  onSubmit: (goal: GoalFormTransaction) => void;
};

const GoalForm: React.FunctionComponent<GoalFormProps> = props => {
  const [goal, setGoal] = React.useState({
    reason: _.get(props.goal, 'reason', ''),
    description: _.get(props.goal, 'description', ''),
  } as GoalFormTransaction)
  const handleChange = (key: 'reason' | 'description') => (e: React.ChangeEvent<HTMLInputElement>) => setGoal({ ...goal, [key]: e.currentTarget.value });
  const submitHandler = e => {
    e.preventDefault();
    props.onSubmit(goal);
  }
  const classes = theme(props);
  return (
    <Form onSubmit={submitHandler}>
      <Typography variant="subtitle1">{_.get(props.goal, 'description', 'Create Goal')}</Typography>
      <FormControl>
        <TextField
          multiline
          id="outlined-name"
          label="Description"
          className={classes.textField}
          value={goal.description}
          onChange={handleChange('description')}
          margin="normal"
          variant="outlined"
        />
      </FormControl>
      <FormControl>
        <TextField
          multiline
          id="outlined-name"
          label="Reason"
          className={classes.textField}
          value={goal.reason}
          onChange={handleChange('reason')}
          margin="normal"
          variant="outlined"
        />
      </FormControl>
      <ButtonGroup>
        <Button>Submit</Button>
      </ButtonGroup>
    </Form>
  );
}
export default GoalForm;
