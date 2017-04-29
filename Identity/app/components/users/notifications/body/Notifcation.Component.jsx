import React from 'react';

const Notifications = ({ notification }) => {
    return (
        <div className='single-notification'>
            <div>
                <div className='single-notification-left'>
                    <p>Type: {notification.notificationType} </p>
                </div>

                <div className='single-notification-center'>
                    <p>{notification.body}</p>
                </div>

                <div className='single-notification-right'>
                    <p>{notification.created}</p>
                </div>
            </div>
        </div>
    );
};

export default Notifications;