
import { connect } from 'react-redux';
import Inventory from '../components/product/inventory';


function mapStateToProps(state) {
	return {
		authenticated: state.users.status === 'authenticated' ? state.users.user.name : null,
	};
}

export default connect(mapStateToProps)(Inventory);