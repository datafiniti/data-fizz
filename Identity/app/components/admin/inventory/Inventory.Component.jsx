import React from 'react';
import Header from './header/Header.Container';
import Modal from './modals/Modal.Container';

import '../../../static/styles/components/users/inventory.sass';

const Inventory = () => {
    return (
        <div className='inventory-container authed-container'>
            <Header />
            <Modal />
        </div>
    );
};

export default Inventory;