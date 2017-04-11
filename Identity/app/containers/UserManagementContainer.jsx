import { connect } from 'react-redux';
import Users from '../components/product/users';

function mapStateToProps(state) {
	return {
		authenticated: state.users.status === 'authenticated' ? state.users.user.name : null,
		user: state.users.user,
	};
}

export default connect(mapStateToProps)(Users);