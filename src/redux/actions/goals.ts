import * as actions from '../constants/goals';
import { Hub } from 'api';
import { Goal } from 'models';

export const getGoals = () => dispatch => {
  dispatch({ type: actions.GET_GOALS })
  Hub.get<Goal[]>('/goals')
    .then(goals => dispatch({ type: actions.GET_GOALS_SUCCESS, data: { goals } }))
    .catch(error => dispatch({ type: actions.GET_GOALS_FAILED }))
}