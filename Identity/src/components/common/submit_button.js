import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionInput from 'material-ui/svg-icons/action/input';

export default ({ label, ...custom }) => (
  <RaisedButton
    type="submit"
    label={label}
    labelPosition="before"
    primary={true}
    icon={<ActionInput />}
  />
);
