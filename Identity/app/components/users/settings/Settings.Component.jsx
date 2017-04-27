import React from 'react';

class Settings extends React.Component {
    constructor(props) {
        super(props);
    } 

    componentDidMount() {
        this.props.getSettings();
    }

    render() {
        return (
            <section className='settings-container authed-container'>
                <p>{this.props.settings.length}</p>
            </section>
        );
    }
}

export default Settings;