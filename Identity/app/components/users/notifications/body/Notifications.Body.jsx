import React from 'react';
import Notifcation from './Notifcation.Component';

const Body = ({ notifications }) => {
    const renderNotifications = () => {
        if (notifications.length) {
            return notifications.map((notification) => {
                return (
                    <div className='notifications-list'>
                        <Notifcation notification={notification} />
                    </div>
                );
            });
        }

        return (
            <p>You do not have any notifications yet!</p>
        );
    };

    return (
        <div className='notifications-body'>
            {renderNotifications()}
        </div>
    );
};

export default Body;