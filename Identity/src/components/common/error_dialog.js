import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* eslint react/jsx-boolean-value: 0 */
const ErrorDialog = ({ errorMessage, clearAuthError }) => {
  const buttons = [
    <FlatButton
      label="Got it"
      primary={true}
      keyboardFocused={true}
      onTouchTap={clearAuthError}
    />,
  ];
  return (
    <Dialog
      title="NOTICE:"
      actions={buttons}
      modal={false}
      open={errorMessage.length > 0}
      onRequestClose={clearAuthError}
    >
      {errorMessage}
    </Dialog>
  );
};

ErrorDialog.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  clearAuthError: PropTypes.func.isRequired,
};

export default ErrorDialog;
