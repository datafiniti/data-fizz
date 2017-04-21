import { connect } from 'react-redux';
import Users from './Users.Component';

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Users);