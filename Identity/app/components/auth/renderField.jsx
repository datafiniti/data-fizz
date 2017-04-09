import React from 'react';

const renderField = ({ 
	input, 
	id, 
	label, 
	type, 
	meta: { touched, error, invalid, warning, valid, onFocus }, 
	}) => (
	<div className={`form-wrapper ${touched && invalid ? 'has-error' : ''} ${touched && valid ? 'is-valid' : ''} ${onFocus ? 'has-focus' : ''}`}>
		<div>
			<input {...input} className="form-input" type={type} id={id} placeholder={label} />
			<div className='form-error-container'>
				{ touched && ((error && <span>{ error }</span>) || (warning && <span>{warning}</span>))}
			</div>
		</div>
	</div>
);

export default renderField; 