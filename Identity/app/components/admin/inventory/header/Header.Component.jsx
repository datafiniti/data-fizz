import React from 'react';

const Header = ({ openAddModal, openEditModal }) => {
    return (
        <header className='inventory-header'>
            <h2>Inventory</h2>
            <div className='inventory-header-actions'>
                <button type='button' onClick={openAddModal} >
                    Add Product
                </button>

                <button type='button' onClick={openEditModal} >
                    Add Category
                </button>
            </div>
        </header>
    );
};

export default Header;