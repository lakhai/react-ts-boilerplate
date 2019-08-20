import * as React from 'react';
import GoalForm, { GoalFormTransaction } from 'components/Forms/GoalForm';
import { AppStore, Goal } from 'models';
import { getGoals } from 'redux/actions/goals';
import { connect } from 'react-redux';
import GoalCard from 'components/GoalCard';
import { Hub } from 'api';

export interface GoalsContainerProps {
  isLoading: boolean;
  goals: Goal[];
  getGoals: () => void;
}
class GoalsContainer extends React.Component<GoalsContainerProps> {
  componentDidMount() {
    this.props.getGoals();
  }
  addGoal = async (body: GoalFormTransaction) => {
    await Hub.post<Goal>('/goals', body);
    this.props.getGoals();
  }
  render() {
    const { goals } = this.props;
    return (
      <>
        {
          goals.length ?
            goals.map(goal => <GoalCard goal={goal} />) : <p>No available goals</p>
        }
        <GoalForm onSubmit={this.addGoal} />
      </>
    )
  }
}
const mapStateToProps = (state: AppStore) => ({
  isLoading: state.goals.isLoading,
  goals: state.goals.goals,
})
const mapDispatchToProps = dispatch => ({
  getGoals: () => dispatch(getGoals()),
});
export default connect(mapStateToProps, mapDispatchToProps)(GoalsContainer);

