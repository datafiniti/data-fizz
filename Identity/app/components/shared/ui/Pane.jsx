import React, { PropTypes } from 'react';

class Pane extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

Pane.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};


export default Pane;