import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ErrorDialog from '../common/error_dialog';
import UserShow from './user_show';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }
  renderUserShow() {
    const { user } = this.props;
    if (user.email) {
      return (
        <UserShow user={user} />
      );
    }
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <ErrorDialog />
      );
    }
  }
  render() {
    return (
      <div>
        <h1>My Profile</h1>
        {this.renderUserShow()}
        {this.renderAlert()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    users: state.auth.users,
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps, actions)(Feature);
