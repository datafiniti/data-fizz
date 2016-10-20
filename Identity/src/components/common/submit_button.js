import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default ({ label, icon, ...custom }) => (
  <RaisedButton
    type="submit"
    label={label}
    labelPosition="before"
    primary={true}
    icon={icon}
  />
);
