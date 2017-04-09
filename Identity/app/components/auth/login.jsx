import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			isRemembered: false,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	login(e) {
		e.preventDefault();

		this.props.actions.loginUser(this.state)
		.then((result) => {
			if (result.payload.data.res.errors) {
				this.props.actions.loginFailure(result.payload.data.res.errors);
			}

			if (result.payload.data.res.token !== 'undefined') {
				window.localStorage.setItem('token', result.payload.data.res.token);
				this.props.actions.loginComplete(result.payload.data.res.record);
			}
		});
	}

	render() {
		return (
			<div className='auth-form-container'>
				<form name='login-form'>
					<div className='form-wrapper'>
						<input
							name='email'
							type='email'
							id='login-email'
							onChange={this.handleInputChange}
						/>
						<label htmlFor='login-email'>Email</label>
					</div>

					<div className='form-wrapper'>
						<input
							name='password'
							type='password'
							id='login-password'
							onChange={this.handleInputChange}
						/>
						<label htmlFor='login-password'>Password</label>
					</div>

					<div className='login-options'>
						<div>
							<button>Forgot Password</button>
						</div>

						<div>
							<button>Remember Me</button>
						</div>
					</div>

					<div className='form-submit'>
						<button type='button' onClick={this.login.bind(this)}>Login</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	error: state.auth.error,
});

const mapDistpatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDistpatchToProps)(Login);