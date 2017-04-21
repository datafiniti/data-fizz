import React, { PropTypes } from 'react';

const Pane = ({ children }) => {
	return (
		<div>
			{children}
		</div>
	);
};


Pane.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};


export default Pane;