
import { connect } from 'react-redux';
import { meFromToken, meFromTokenSuccess, meFromTokenFailure } from '../actions/auth';
import App from '../components/App';
import '../static/styles/shared/shared.sass';

const mapDispatchToProps = (dispatch) => {
	return {
		loadUserFromToken: () => {
			const token = window.localStorage.getItem('token');

			if (!token || token === '' || typeof token === 'undefined') {
				return;
			}

			dispatch(meFromToken(token))
			.then((result) => {
				if (!result.error) {
					window.localStorage.setItem('token', result.payload.data.res.token);
					dispatch(meFromTokenSuccess(result.payload.data.res.record));
				} else {
					window.localStorage.removeItem('token');
					
					dispatch(meFromTokenFailure(result.payload));
				}
			});
		},
	};
};


export default connect(null, mapDispatchToProps)(App);