import React, { PropTypes } from 'react';

class Checkbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isChecked: false,
		};
	}

	toggleCheckboxChange() {
		if (!this.state.isChecked) {
			this.setState({
				isChecked: true,
			});
		} else {
			this.setState({
				isChecked: false,
			});
		}

		this.props.handleCheckboxChange(this.props.label);
	}

	render() {
		return (
			<div className='checkbox'>
				<label htmlFor={'remember'}>
					<input
						type="checkbox"
						value={this.props.label}
						id={'remember'}
						checked={this.state.isChecked}
						onChange={this.toggleCheckboxChange}
					/>
					{this.props.label}
				</label>
			</div>
		);
	}
}

Checkbox.propTypes = {
	label: PropTypes.string.isRequired,
	handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;