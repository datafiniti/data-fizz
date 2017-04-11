import React from 'react';
import { Dropdown, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Header from './users/Header';
import ChangePassword from './users/ChangePassword';


class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isMenuOpen: false,
			changePasswordOpen: false,
		};
	}

	handleOpen = () => this.setState({
		changePasswordOpen: true,
	});

	handleClose = () => this.setState({
		changePasswordOpen: false,
	});

	renderModal = () => {
		if (this.props.isChanging) {
			return (
				<div>Is Changing</div>
			);
		}

		if (this.props.didChange) {
			return (
				<div>Success!</div>
			);
		}

		if (this.props.badChange) {
			return (
				<div>Oh No :(</div>
			);
		}

		return (
			<ChangePassword />
		);
	};

	render() {
		return (
			<div className='user-management'>
				<div>
					<div className='user-management-left'>
						<h2>User Management</h2>
					</div>

					<div className='user-management-right'>
						<Dropdown text='actions' className='user-management-options'>
							<Dropdown.Menu>
								<Dropdown.Item onClick={this.handleOpen}>Change Password</Dropdown.Item>
								<Dropdown.Item>Edit Profile</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>

				<Modal
					open={this.state.changePasswordOpen}
					onClose={this.handleClose}
					dimmer={'blurring'}
					closeIcon='close'
					size='small'
				>
					<Modal.Content>
						<div>
							{this.renderModal()}
						</div>
					</Modal.Content>
				</Modal>

				<Header user={this.props.user} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isChanging: state.password.status === 'is-changing' || null,
		didChange: state.password.status === 'did-change' || null,
		badChange: state.password.status === 'bad-change' || null,
	};	
};

export default connect(mapStateToProps)(Users);