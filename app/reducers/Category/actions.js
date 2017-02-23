
import WooWorker from "../../services/WooWorker";

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';

export function selectCategory(selectedCategoryId, selectedCategoryName) {
    return {
        type: SELECT_CATEGORY,
        selectedCategoryId: selectedCategoryId,
        selectedCategoryName: selectedCategoryName,
    }
}

export function requestCategories() {
    return {
        type: REQUEST_CATEGORIES,
    }
}

export function receiveCategories(json) {
    return {
        type: RECEIVE_CATEGORIES,
        categories: json,
    }
}

export function categoriesFailure(error) {
    return {
        type: CATEGORIES_FAILURE,
        error: error,
    }
}

export function fetchAllCategories() {
    return (dispatch) => {
        dispatch(requestCategories());
        return WooWorker.categories((json) => dispatch(receiveCategories(json)),
            (message) => dispatch(categoriesFailure(message))
        );
    }
}

export function fetchCategoryById(categoryId, _callback){
    return (dispatch) => {
        //dispatch(requestProduct());
        const callback = (json) => {
          //  dispatch(receiveProduct(json));
            dispatch(selectCategory(json.id,json.name));
            _callback();

        };
        const error = (error) => dispatch(categoriesFailure(error));
        return WooWorker.categoryById(callback, error, categoryId);
    }
}
