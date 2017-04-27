import { connect } from 'react-redux';
import Users from './Users.Component';
import { getUserNotifications } from './redux/actions';

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNotifications: () => {
            dispatch(getUserNotifications());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);