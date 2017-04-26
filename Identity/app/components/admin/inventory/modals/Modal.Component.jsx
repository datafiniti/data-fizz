import React from 'react';
import { Modal } from 'semantic-ui-react';
import Add from './addProduct/Add.Product';

const ModalComponent = (props) => {
    if (props.createProductOpen) {
        return (
            <Modal
                open={props.createProductOpen}
                onClose={props.closeAddModal}
                dimmer={'blurring'}
                closeIcon='close'
                size='small'
            >
                <Modal.Content>
                    <Add />
                </Modal.Content>
            </Modal>
        );
    }

    if (props.editProductOpen) {
        return (
            <Modal
                open={props.editProductOpen}
                onClose={props.closeEditModal}
                dimmer={'blurring'}
                closeIcon='close'
                size='small'
            >  
                <Modal.Content>
                    <p>Edit</p>
                </Modal.Content>
            </Modal>
        );
    }

    return null;
};

export default ModalComponent;