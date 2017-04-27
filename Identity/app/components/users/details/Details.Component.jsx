import React from 'react';
import 'styles/components/users/details.sass';
import Header from './header/Header.Component';
import Modals from './modals/Modal.Container';
import Body from './body/Body.Component';


class Details extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='user-details-component authed-container'>
                <Header 
                    user={this.props.user}
                    openPasswordModal={this.props.openPasswordModal}
                    openEditModal={this.props.openEditModal} 
                />
                <Modals user={this.props.user} />
                <Body user={this.props.user} />
            </div>
        );
    }
}

export default Details;