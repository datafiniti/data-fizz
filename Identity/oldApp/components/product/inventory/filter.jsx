import React from 'react';

const Filter = () => {
	return (
		<div className='inventory-filter'>
			<div className='filter-left'>
				<input placeholder="Product Name, Category" />
			</div>

			<div className='filter-right'>
				<button>
					Status
				</button>

				<button>
					Stock
				</button>

				<button>
					Sort By Price
				</button>

				<button>
					10
				</button>
			</div>
		</div>
	);
};

export default Filter;