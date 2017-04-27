import React from 'react';
import Notifcation from './Notifcation.Component';

const Body = ({ notifications }) => {
    const renderNotifications = () => {
        return notifications.map((notification) => {
            return (
                <div className='notifications-list'>
                    <Notifcation notification={notification} />
                </div>
            );
        });
    };

    return (
        <div className='notifications-body'>
            {renderNotifications()}
        </div>
    );
};

export default Body;