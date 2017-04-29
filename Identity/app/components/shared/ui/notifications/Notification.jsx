import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import 'styles/components/ui/notifications.sass';

const Notification = (props) => {
    if (props.isOpen) {
        return (
            <CSSTransitionGroup
                transitionName={props.transitionName}
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeaveTimeout={props.leaveTimeout}
                >
                <div className='notification-container'>
                    <div className={`notification ${props.type}`}>
                        {props.children}
                    </div>
                </div>
            </CSSTransitionGroup>
        );       
    }

    return null;
};

Notification.propTypes = {
    isOpen: PropTypes.bool,
    transitionName: PropTypes.string,
    leaveTimeout: PropTypes.number,
    containerClass: PropTypes.string,
    componentClass: PropTypes.string,
    children: PropTypes.element,
    type: PropTypes.string,
    containerStyles: PropTypes.object,    
};

Notification.defaultProps = {
    transitionName: 'slide-in-from-right',
    enterTimeout: 2000,
    leaveTimeout: 500,
    type: 'success',
};

export default Notification;