import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Modal } from 'semantic-ui-react';
import { editEmail } from '../../actions/users';
// import { loginUserSuccess } from '../../actions/auth';
import Tabs from '../shared/ui/Tabs';
import Pane from '../shared/ui/Pane';
import Header from './users/Header';
import ChangePassword from './users/ChangePassword';
import Details from './users/Details';


class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isMenuOpen: false,
			changePasswordOpen: false,
			editing: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.user !== nextProps.user) {
			this.props.user = nextProps.user;
		}
	}

	handleEdit = (newValue, dispatch) => {
		return dispatch(editEmail(newValue))
			.then(() => {
				this.setState({
					editing: false,
				});
		});
	};

	startEdit = () => {
		this.setState({
			editing: true,
		});
	};

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

				<div className='user-management-tabs'>
					<Tabs>
						<Pane label='Details'>
							<Details 
								user={this.props.user} 
								onEdit={this.handleEdit} 
								startEdit={this.startEdit} 
								isEditing={this.state.editing}
							/>
						</Pane>

						<Pane label='Notifications'>
							<p>Notifications</p>
						</Pane>

						<Pane label='Messages'>
							<p>Messages</p>
						</Pane>

						<Pane label='Security/Settings'>
							<p>Security</p>
						</Pane>
					</Tabs>
				</div>
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