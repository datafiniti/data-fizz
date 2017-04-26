import { connect } from 'react-redux';
import { closeAddProduct, closeEditProduct } from '../redux/products/actions';
import Modal from './Modal.Component';

const mapStateToProps = (state) => {
    return {
        createProductOpen: state.products.createProductOpen,
        editProductOpen: state.products.editProductOpen,
        loading: state.products.loading,
        error: state.products.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeAddModal: () => {
            dispatch(closeAddProduct());
        },

        closeEditModal: () => {
            dispatch(closeEditProduct());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);