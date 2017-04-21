import React from 'react';
import PropTypes from 'prop-types';

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