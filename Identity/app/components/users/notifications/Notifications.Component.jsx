import React from 'react';
import 'styles/components/users/notifications.sass';
import Body from './body/Notifications.Body';

class UserNotifications extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserNotifications();
    }

    render() {
        return (
            <section className='user-notifications-container authed-container'>
                <Body notifications={this.props.notifications} />
            </section>
        );
    }
}

export default UserNotifications;