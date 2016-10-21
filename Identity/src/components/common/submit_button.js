import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/* eslint react/jsx-boolean-value: 0 */
const SubmitButton = ({ type, disabled, label, icon, onClick }) => (
  <RaisedButton
    type={type || 'submit'}
    label={label}
    primary={true}
    labelPosition="before"
    icon={icon}
    disabled={disabled}
    onClick={onClick}
  />
);

/* eslint react/prop-types: 0 */
SubmitButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default SubmitButton;
