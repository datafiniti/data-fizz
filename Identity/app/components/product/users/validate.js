export default function validate(values) {
	const errors = [];
	let hasErrors = false;

	if (!values.email) {
		errors.email = 'Sorry, you need to enter your email';
		hasErrors = true;
	}

	if (!values.oldPassword) {
		errors.oldPassword = 'Sorry, you need to enter your old password';
		hasErrors = true;
	}

	if (!values.newPassword) {
		errors.newPassword = 'Sorry, you need to enter a new password';
		hasErrors = true;
	}

	if (!values.confirmNewPassword) {
		errors.confirmNewPassword = 'Sorry, you need to confirm your new password';
		hasErrors = true;
	}

	if (values.newPassword && values.confirmNewPassword 
			&& values.newPassword !== values.confirmNewPassword) {			 
		errors.confirmNewPassword = 'Sorry, your new passwords do not match';
		hasErrors = true;
	}

	return hasErrors && errors;
}