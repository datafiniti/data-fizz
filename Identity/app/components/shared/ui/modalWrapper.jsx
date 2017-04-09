import React from 'react';

const ModalWrapper = props => {
	const handleBackgroundClick = e => {
		if (e.target === e.currentTarget) props.hideModal();
	};

	return (
		<div onClcik={handleBackgroundClick}>
			<header>
				<h2>Modal Header</h2>

				<button>Close</buttom>
			</header>

			{props.children}
		</div>
	);
};

export default ModalWrapper;