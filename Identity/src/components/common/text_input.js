import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({ input, type, label, meta: { touched, error } }) => (
  <TextField
    type={type}
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    value={input.value || ''}
  />
);

TextInput.propTypes = {
  type: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default TextInput;
