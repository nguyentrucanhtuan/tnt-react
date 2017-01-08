import {combineReducers} from 'redux';
import Category from './Category';
import Product from './Product';
import Cart from './Cart';
import WishList from './WishList';
import Customer  from './Customer/index';
import currentRoute from './Route';
import isMenuOpen from './Menu'
import authorize from './Auth'
import isSwipeable from './Swipeable'

// ... other reducers


export default combineReducers({
    Category,
    Product,
    Cart,
    WishList,
    Customer,
    // ... other reducers
    currentRoute,
    isMenuOpen,
    authorize,
    isSwipeable
});
