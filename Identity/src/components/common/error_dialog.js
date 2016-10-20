import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as actions from '../../actions/';

class ErrorDialog extends Component {

  render() {
    const actions = [
      <FlatButton
        label="Got it"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.clearAuthError}
      />,
    ];

    return (
        <Dialog
          title="Oh no!"
          actions={actions}
          modal={false}
          open={this.props.errorMessage.length > 0}
          onRequestClose={this.props.clearAuthError}
        >
          { this.props.errorMessage }
        </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(ErrorDialog);
