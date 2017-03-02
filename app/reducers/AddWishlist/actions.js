/**
 * Created by Luan on 10/21/2016.
 */

import WooWorker from "./../../services/WooWorker";

export const REQUEST_PRODUCT_WISHLIST = 'REQUEST_PRODUCT_WISHLIST';
export const RECEIVE_PRODUCT_WISHLIST = 'RECEIVE_PRODUCT_WISHLIST';
export const PRODUCT_FAILURE_WISHLIST = 'PRODUCT_FAILURE_WISHLIST';
export const CLEAR_PRODUCT_WISHLIST = 'CLEAR_PRODUCT_WISHLIST';


export function requestProductWishlist() {
    return {
        type: REQUEST_PRODUCT_WISHLIST,
    }
}

export function receiveProductWishlist(json) {
    return {
        type: RECEIVE_PRODUCT_WISHLIST,
        product: json,
    }
}

export function productFailureWishlist(error) {
    return {
        type: PRODUCT_FAILURE_WISHLIST,
        error: error,
    }
}

export function clearProductWishlist() {
    return {type: CLEAR_PRODUCT_WISHLIST}
}

export function fetchProductById(productId, _callback) {
    return (dispatch) => {
        dispatch(requestProductWishlist());
        const callback = (json) => {
            dispatch(receiveProductWishlist(json));
            _callback()
        };
        const error = (error) => dispatch(productFailureWishlist(error));
        return WooWorker.productById(callback, error, productId);
    }
}
