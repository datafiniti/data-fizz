export default function validate(values) {
	const errors = [];
	let hasErrors = false;

	if (!values.name || values.name.trim() === '') {
		errors.name = 'Please enter a name';
		hasErrors = true;
	}

	if (!values.username || values.username.trim() === '') {
		errors.username = 'Please enter a username';
		hasErrors = true;
	}

	if (!values.email || values.email.trim() === '') {
		errors.email = 'Please enter an email';
		hasErrors = true;
	}

	if (!values.password || values.password.trim() === '') {
		errors.password = 'Please enter a password';
		hasErrors = true;
	}

	if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
		errors.confirmPassword = 'Your passwords do not match';
		hasErrors = true;
	}

	return hasErrors && errors;
}