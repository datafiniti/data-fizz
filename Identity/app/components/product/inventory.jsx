import React from 'react';
import '../../static/styles/shared/components/product/inventory.sass';

import Header from './inventory/header';
import Filter from './inventory/filter';

class Inventory extends React.Component {

	render() {
		return (
			<div className='inventory-page-container'>
				<Header />
				<Filter />
			</div>
		);
	}	
}

export default Inventory;