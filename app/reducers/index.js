import {combineReducers} from 'redux';
import Category from './Category';
import Product from './Product';
import Cart from './Cart';
import WishList from './WishList';
import Customer  from './Customer/index';
import currentRoute from './Route';
import isMenuOpen from './Menu'
import isSearchOpen from './Search'
import authorize from './Auth'
import isSwipeable from './Swipeable';
import CategoryOrder from './Order';
import Country from './Country'
import currentWishlist from './AddWishlist'

// ... other reducers


export default combineReducers({
    Category,
    Product,
    Cart,
    WishList,
    Customer,
    Country,
    // ... other reducers
    currentRoute,
    isMenuOpen,
    isSearchOpen,
    authorize,
    isSwipeable,
    CategoryOrder,
    currentWishlist
});
