import React from 'react';
import { Modal } from 'semantic-ui-react';
import Forgot from './Forgot.Password';

const ModalComponent = (props) => {
    if (props.forgotPasswordOpen) {
        return (
            <Modal
                open={props.forgotPasswordOpen}
                onClose={props.closePasswordModal}
                dimmer={'blurring'}
                closeIcon='close'
                size='small'
            >  
                <Modal.Content>
                    <Forgot 
                        loading={props.loading}
                        status={props.status}
                        error={props.error}
                        sendResetToken={props.sendResetToken}
                        resetPassword={props.resetPassword}
                     />
                </Modal.Content>
            </Modal>
        );
    }

    return null;
};

export default ModalComponent;