import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default ({ type, disabled, label, icon, onClick, ...custom }) => (
  <RaisedButton
    type={type || "submit"}
    label={label}
    primary={true}
    labelPosition="before"
    icon={icon}
    disabled={disabled}
    onClick={onClick}
  />
);
