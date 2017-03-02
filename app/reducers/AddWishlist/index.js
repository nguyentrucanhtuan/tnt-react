import {
    REQUEST_PRODUCTS_WISHLIST,
    RECEIVE_PRODUCT_WISHLIST,
    PRODUCT_FAILURE_WISHLIST,
    CLEAR_PRODUCT_WISHLIST,
} from './actions';

export default function productReducer(state = {isFetching: false, product: undefined}, action) {
    switch (action.type) {
        case REQUEST_PRODUCTS_WISHLIST:
            return state;
        case RECEIVE_PRODUCT_WISHLIST:
            return Object.assign({}, state, {product: action.product})
        case PRODUCT_FAILURE_WISHLIST:
            return Object.assign({}, state, {error: action.error})
        case CLEAR_PRODUCT_WISHLIST:
            return Object.assign({}, state, {product: undefined})
        default:
            return state
    }
}
