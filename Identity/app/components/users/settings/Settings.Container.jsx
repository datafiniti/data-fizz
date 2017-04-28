import { connect } from 'react-redux';
import { loadSettings, updateSettings } from '../redux/actions/settings';
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

        changeSettings: (data) => {
            dispatch(updateSettings(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);