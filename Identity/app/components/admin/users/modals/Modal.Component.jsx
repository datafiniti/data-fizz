import React from 'react';
import { Modal } from 'semantic-ui-react';
import Edit from './edit/Edit.Component';

const ModalComponent = (props) => {
	if (props.changePasswordOpen) {
		return (
			<Modal
				open={props.changePasswordOpen}
				onClose={props.closePasswordModal}
				dimmer={'blurring'}
				closeIcon='close'
				size='small'
			>
				<Modal.Content>
					<p>Change Password</p>
				</Modal.Content>
			</Modal>
		);
	}

	if (props.editUserOpen) {
		return (
			<Modal
				open={props.editUserOpen}
				onClose={props.closeEditModal}
				dimmer={'blurring'}
				closeIcon='close'
				size='small'
			>
				<Modal.Content>
					<Edit user={props.user} attemptEditUser={props.attemptEditUser} />
				</Modal.Content>
			</Modal>
		);
	}

	return null;
};

export default ModalComponent;
