import { connect } from 'react-redux';
import Notifications from './Notifications.Component';
import { getNotifications } from '../redux/actions/notifications';

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications.notifications,
        error: state.notifications.error,
        loading: state.notifications.loading,
        status: state.notifications.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserNotifications: () => {
            dispatch(getNotifications());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);