import React from 'react';
import { Checkbox } from 'semantic-ui-react';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textAuthentication: null,
            twoFactorAuth: null,
        };

        this.toggleTwoFactor = this.toggleTwoFactor.bind(this);
        this.toggleText = this.toggleText.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
    } 

    componentDidMount() {
        this.props.getSettings();
    }

    componentWillReceiveProps(nextProps) {
        let twoCheck;
        let textCheck;

        if (nextProps.settings.twoFactorAuth === true) {
            twoCheck = true;
        }

        if (nextProps.settings.textAuthentication === true) {
            textCheck = true;
        }

        this.setState({
            textAuthChecked: textCheck,
            twoFactorAuth: twoCheck,
        }); 
    }

    toggleTwoFactor() {
        this.setState({
            twoFactorChecked: !this.state.twoFactorChecked,
        });
    }

    toggleText() {
        this.setState({
            textAuthChecked: !this.state.textAuthChecked,
        });
    }

    updateSettings(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.changeSettings(this.state);
    }

    render() {
        return (
            <section className='settings-container authed-container'>
                <header className='settings-header'>
                    <h2>Settings</h2>
                </header>

                <div className='settings-body'>
                    <div className='single-setting'>
                        <h4>{this.props.settings.twoFactorAuth}</h4>
                        <Checkbox 
                            label="Turn on two factor Auth" 
                            checked={this.state.twoFactorAuth}
                            onChange={this.toggleTwoFactor}
                        />
                    </div>

                    <div className='single-setting'>
                        <h4>{this.props.settings.textAuthentication}</h4>
                        <Checkbox 
                            label='Turn on text codes for Two Factor' 
                            checked={this.state.textAuthentication}
                            onChange={this.toggleText} 
                        />
                    </div>
                </div>

                <div className='settings-footer'>
                    <button type='button' onClick={this.updateSettings}>
                        Update Settings
                    </button>
                </div>
            </section>
        );
    }
}

export default Settings;