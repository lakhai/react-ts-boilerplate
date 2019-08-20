import * as actions from '../constants/goals';
import { GoalsReducer } from "models";

const initialState: GoalsReducer = {
  isLoading: false,
  goals: [],
};

const goals = (state: GoalsReducer = initialState, action: { type: string, data?: any }): GoalsReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_GOALS:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_GOALS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_GOALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        goals: [...data.goals || []]
      };
  }
  return state;
}
export default goals;
