import React from 'react';

const renderField = ({ input, id, label, type, meta: { touched, error, invalid, warning } }) => (
	<div className={`form-wrapper ${touched && invalid ? 'has-error' : ''}`}>
		<label htmlFor={id}>{ label }</label>
		<div>
			<input {...input} className="form-input" type={type} id={id} />
			<div className='form-error-container'>
				{ touched && ((error && <span>{ error }</span>) || (warning && <span>{warning}</span>))}
			</div>
		</div>
	</div>
);

export default renderField; 