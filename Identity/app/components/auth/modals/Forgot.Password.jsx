import React from 'react';

class Forgot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            token: '',
            password: '',
            confirm: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.tryReset = this.tryReset.bind(this);
        this.finishReset = this.finishReset.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    tryReset(e) {
        e.preventDefault();
        this.props.sendResetToken(this.state.email);
    }

    finishReset(e) {
        e.preventDefault();
        this.props.resetPassword(this.state);
    }

    render() {
        const { status, loading, error } = this.props;

        if (loading) {
            return (
                <div className='form-loading-container'>
                    <p>Loading</p>
                </div>
            );
        }

        if (status === 'token-sent') {
            return (
                <div className='modal-container'>
                    <header className='forgot-password-header modal-header'>
                        <h2>Reset your Password</h2>
                    </header>

                    <p>Please check your email. We have sent you a code to copy and paste below</p>

                    <div className='modal-form-container'>
                        <form name='reset-password'>
                            <div className='form-wrapper modal-form-wrapper'>
                                <input type='text' name='token' id='reset-token' onChange={this.handleInputChange} />
                                <label htmlFor='reset-token'>Code</label>
                            </div>

                            <div className='form-wrapper modal-form-wrapper'>
                                <input type='password' name='password' id='reset-password' onChange={this.handleInputChange} />
                                <label htmlFor='reset-password'>New Password</label>
                            </div>

                            <div className='form-wrapper modal-form-wrapper'>
                                <input type='password' name='confirm' id='confirm-reset' onChange={this.handleInputChange} />
                                <label htmlFor='confirm-reset'>Confirm New Password</label>
                            </div>

                            <div className='modal-form-submit'>
                                <button type='button' onClick={this.finishReset}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        if (status === 'password-reset-success') {
            return (
                <div>
                    You have reset your password!
                </div>
            );
        }

        if (error) {
            return (
                <div>{error}</div>
            );
        }

        return (
            <div className='modal-container'>
                <header className='forgot-password-header modal-header'>
                    <h2>Forgot your password?</h2>
                </header>

                <p>Hey, no worries. It happens to the best of us</p>
                <p>Just enter your email below and we will send some reset
                information to you</p>

                <div className='modal-form-container forgot-password-form'>
                    <form name='forgot-password'>
                        <div className='form-wrapper modal-form-wrapper'>
                            <input type='email' name='email' id='forgot-email' onChange={this.handleInputChange} />
                            <label htmlFor='forgot-email'>Email</label>
                        </div>

                        <div className='modal-form-submit'>
                            <button type='button' onClick={this.tryReset}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>         
        );
    }
}

export default Forgot;