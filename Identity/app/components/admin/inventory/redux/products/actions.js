export const OPEN_ADD_PRODUCT = 'OPEN_ADD_PRODUCT';
export const CLOSE_ADD_PRODUCT = 'CLOSE_ADD_PRODUCT';

export const OPEN_EDIT_PRODUCT = 'OPEN_EDIT_PRODUCT';
export const CLOSE_EDIT_PRODUCT = 'CLOSE_EDIT_PRODUCT';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const PRODUCT_SEARCH = 'PRODUCT_SEARCH';
export const PRODUCT_SEARCH_SUCCESS = 'PRODUCT_SEARCH_SUCCESS';
export const PRODUCT_SEARCH_FAILURE = 'PRODUCT_SEARCH_FAILURE';

export const PRODUCT_SORT = 'PRODUCT_SORT';

export function openAddProduct() {
	return {
		type: OPEN_ADD_PRODUCT,
	};
}

export function closeAddProduct() {
	return {
		type: CLOSE_ADD_PRODUCT,
	};
}

export function openEditProduct() {
	return {
		type: OPEN_EDIT_PRODUCT,
	};
}

export function closeEditProduct() {
	return {
		type: CLOSE_EDIT_PRODUCT,
	};
}

export function addProductStart() {
	return {
		type: ADD_PRODUCT,
	};
}

export function addProductSuccess(product) {
	return {
		type: ADD_PRODUCT_SUCCESS,
		payload: product,
	};
}

export function addProductFailure(error) {
	return {
		type: ADD_PRODUCT_FAILURE,
		payload: error,
	};
}

export function editProductStart() {
	return {
		type: EDIT_PRODUCT,
	};
}

export function editProductSuccess(product) {
	return {
		type: EDIT_PRODUCT_SUCCESS,
		payload: product,
	};
}

export function editProductFailure(error) {
	return {
		type: EDIT_PRODUCT_FAILURE,
		payload: error,
	};
}

export function deleteProductStart() {
	return {
		type: DELETE_PRODUCT,
	};
}

export function deleteProductSuccess() {
	return {
		type: DELETE_PRODUCT_SUCCESS,
	};
}

export function deleteProductFailure(error) {
	return {
		type: DELETE_PRODUCT_FAILURE,
		payload: error,
	};
}

export function searchProductStart() {
	return {
		type: PRODUCT_SEARCH,
	};
}

export function searchProductSuccess(products) {
	return {
		type: PRODUCT_SEARCH_SUCCESS,
		payload: products,
	};
}

export function searchProductFailure(error) {
	return {
		type: PRODUCT_SEARCH_FAILURE,
		payload: error,
	};
}

export function productSortStart() {
	return {
		type: PRODUCT_SORT,
	};
}