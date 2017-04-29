import { connect } from 'react-redux';
import { openChangePassword, openEditUser } from '../redux/actions/users';
import Details from './Details.Component';


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPasswordModal: () => {
            dispatch(openChangePassword());
        },

        openEditModal: () => {
            dispatch(openEditUser());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

