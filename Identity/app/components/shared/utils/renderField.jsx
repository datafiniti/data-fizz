import React from 'react';

const renderField = ({ 
	input, 
	id, 
	label,
	value,
	inputClass,
	wrapperClass, 
	type, 
	meta: { touched, error, invalid, warning, valid, onFocus }, 
	}) => (
	<div className={`form-wrapper ${wrapperClass || ''} ${touched && invalid ? 'has-error' : ''} ${touched && valid ? 'is-valid' : ''} ${onFocus ? 'has-focus' : ''}`}>
		<input {...input} className={`form-input ${inputClass || ''}`} type={type} id={id} value={value} />
		<label htmlFor={id}>{label}</label>
		<div className='form-error-container'>
			{ touched && ((error && <span>{ error }</span>) || (warning && <span>{warning}</span>))}
		</div>
	</div>
);


export default renderField; 