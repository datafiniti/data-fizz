import React from 'react';
import Notification from 'shared/ui/notifications/Notification';

const NotificationContainer = (props) => {
    const success = () => {
        return (
            <div className='notification-content'>
                <span>Icon</span>
                <div className='notification-right'>
                    <h2 className='notification-title'>
                        Welcome back, {props.user.name}!
                    </h2>
                    <p className='notification-text'>
                        It is good to see you again!
                    </p>
                </div>
            </div>
        );
    };

    const failure = () => {
        return (
            <div className='notification-content'>
                <span>Icon</span>
                <div className='notification-right'>
                    <h2 className='notification-title'>
            s            Uh, Oh
                    </h2>
                    <p className='notification-text'>
                        {props.error}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <Notification
            isOpen={props.showNotification}
            type={props.notificationType}
            
        >
            {props.notificationType === 'success' ? success() : failure()}
        </Notification>
    );
};

export default NotificationContainer;