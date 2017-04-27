import React from 'react';
import { Modal } from 'semantic-ui-react';
import Edit from './edit/Edit.Component';
import Change from './change/Change.Component';

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
                    <Change 
                        attemptChangePassword={props.attemptChangePassword}
                        loading={props.loading}
                        status={props.status}
                    />
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
                    <Edit 
                        user={props.user} 
                        attemptEditUser={props.attemptEditUser} 
                        loading={props.loading} 
                        status={props.status} />
                </Modal.Content>
            </Modal>
        );
    }

    return null;
};

export default ModalComponent;
