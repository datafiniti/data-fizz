import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ input, type, label, meta: { touched, error }, ...custom }) => (
  <TextField
    type={type}
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    value={input.value || ''}
    {...custom}
  />
);
