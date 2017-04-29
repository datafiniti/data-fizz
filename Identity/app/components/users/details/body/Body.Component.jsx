import React from 'react';
import moment from 'moment';

const Body = ({ user }) => {
    const created = moment(user.created).format('MMMM Do YYYY, h:mm');
    const lastLogin = moment(user.lastLogin).format('MMMM Do YYYY, h:mm');
    return (
        <section className='user-details-body'>
            <div>
                <div className='user-detail'>
                    <h4>Name</h4>
                    <p>{user.name}</p>
                </div>

                <div className='user-detail'>
                    <h4>Username</h4>
                    <p>{user.username}</p>
                </div>

                <div className='user-detail'>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>

                <div className='user-detail'>
                    <h4>Created At</h4>
                    <p>{created}</p>
                </div>

                <div className='user-detail'>
                    <h4>Last Logged In</h4>
                    <p>{lastLogin}</p>
                </div>
            </div>
        </section>                                                
    );
};

export default Body;