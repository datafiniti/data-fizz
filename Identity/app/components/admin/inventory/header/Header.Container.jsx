import { connect } from 'react-redux';
import { openAddProduct, openEditProduct } from '../redux/products/actions';
import Header from './Header.Component';


const mapStateToProps = (state) => {
    return {
        createProductOpen: state.products.createProductOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openAddModal: () => {
            dispatch(openAddProduct());
        },

        openEditModal: () => {
            dispatch(openEditProduct());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);