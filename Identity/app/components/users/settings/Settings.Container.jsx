import { connect } from 'react-redux';
import { loadSettings } from '../redux/actions/settings';
import Settings from './Settings.Component';

const mapStateToProps = state => {
    return {
        loading: state.settings.loading,
        settings: state.settings.settings,
        error: state.settings.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSettings: () => {
            dispatch(loadSettings());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);