import { connect } from 'react-redux';
import Users from '../components/product/users';

function mapStateToProps(state) {
	return {
		authenticated: state.auth.status === 'authenticated' || state.auth.status === 'authenticated',
		user: state.auth.user,
	};
}

export default connect(mapStateToProps)(Users);