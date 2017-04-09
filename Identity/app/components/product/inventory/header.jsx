import React from 'react';

const Header = () => {
	return (
		<div className='product-header'>
			<h2>Inventory Management</h2>

			<div className='product-header-options'>
				<button>
					Add Product
				</button>

				<button>
					Add Category
				</button>

				<button>
					Publish
				</button>

				<button>
					Edit
				</button>

				<button>
					Copy
				</button>

				<button>
					Delete
				</button>
			</div>
		</div>
	);
};


export default Header;