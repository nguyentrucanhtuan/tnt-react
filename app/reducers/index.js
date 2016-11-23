import {combineReducers} from 'redux';
import Category from './Category';
import Cart from './Cart';
import WishList from './WishList';
import currentRoute from './Route';
import isMenuOpen from './Menu'

// ... other reducers


export default combineReducers({
    Category,
    //Product,
    Cart,
    WishList,
    //Customer,
    // ... other reducers
    currentRoute,
    isMenuOpen
});
