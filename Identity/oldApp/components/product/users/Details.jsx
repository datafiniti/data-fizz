import React from 'react';
import Editable from '../../../libs/Editable';

const Details = (props) => {
	const onEdit = (newValue) => {
		props.onEdit(newValue);
	};

	const startEdit = () => {
		props.startEdit();
	};

	return (
		<div className='user-management-details'>
			<div className='user-details-container'>
				<div>
					<h4>Email</h4>
					<Editable
						editing={props.isEditing}
						value={props.user.email}
						onEdit={onEdit}
						onClick={startEdit}
					/>
				</div>

				<div>
					<h4>Signed up</h4>
					<p>{props.user.created}</p>
				</div>

				<div>
					<h4>Last Login</h4>
					<p>{props.user.lastUpdated} From place</p>
				</div>
			</div>
		</div>
	);
};

export default Details;