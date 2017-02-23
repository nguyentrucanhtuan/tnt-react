
import WooWorker from "../../services/WooWorker";

export const SELECT_CATEGORY_ORDER = 'SELECT_CATEGORY_ORDER';
export const REQUEST_CATEGORIES_ORDER = 'REQUEST_CATEGORIES_ORDER';
export const RECEIVE_CATEGORIES_ORDER = 'RECEIVE_CATEGORIES_ORDER';
export const CATEGORIES_FAILURE_ORDER = 'CATEGORIES_FAILURE_ORDER';

export function selectCategoryOrder(selectedCategoryId, selectedCategoryName) {
    return {
        type: SELECT_CATEGORY_ORDER,
        selectedCategoryId: selectedCategoryId,
        selectedCategoryName: selectedCategoryName,
    }
}


export function requestCategoriesOrder() {
    return {
        type: REQUEST_CATEGORIES_ORDER,
    }
}

export function receiveCategoriesOrder(json) {
    return {
        type: RECEIVE_CATEGORIES_ORDER,
        categories: json,
    }
}

export function categoriesFailureOrder(error) {
    return {
        type: CATEGORIES_FAILURE_ORDER,
        error: error,
    }
}

export function fetchAllCategoriesOrder() {
    return (dispatch) => {
        dispatch(requestCategoriesOrder());
        return WooWorker.categories((json) => dispatch(receiveCategoriesOrder(json)),
            (message) => dispatch(categoriesFailureOrder(message))
        );
    }
}
