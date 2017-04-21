import React from 'react';

export default ({ editing, value, onEdit, ...props }) => {
	let currentValue = value;

	const finishEdit = (e) => {
		const newValue = e.target.value;

		if (onEdit) {
			onEdit(newValue);

			currentValue = newValue;
		}
	};

	const checkEnter = (e) => {
		if (e.key === 'Enter') {
			finishEdit(e);
		}
	};

	if (editing) {
		return (
			<input
				type="text"
				defaultValue={currentValue}
				onBlur={finishEdit}
				onKeyPress={checkEnter}
			/>
		);
	}

	return <p {...props}>{value}</p>;
};
