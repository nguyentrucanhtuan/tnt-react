import Home from './pages/home'
import About from './pages/about'
import Category from './pages/category'
import Product from './pages/product'
import Wishlist from './pages/wishlist'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import MyOrders from './pages/myorders'
import Order from './pages/order'
export const initialRouteId = 'home'





export const Routes = {
  home: { component: Home, title: 'TNT Drink', id: 'home' , key : 'home', swipeable : true ,hasBackButton: false, cart : true, wishList : true},
  about: { component: About, title: 'About', id: 'about' , key : 'about' , swipeable : true},
  category: { component: Category, title: 'Category', id: 'category' , key : 'category' , swipeable : true},
  product: { component: Product, title: 'Product', id: 'product' , key : 'product', swipeable : false},
  wishlist: { component: Wishlist, title: 'Wishlist', id: 'wishlist' , key : 'wishlist', swipeable : false},
  cart: { component: Cart, title: 'Cart', id: 'cart' , key : 'cart', swipeable : false},
  checkout: { component: Checkout, title: 'Checkout', id: 'checkout' , key : 'checkout', swipeable : false},
  myorders: { component: MyOrders, title: 'My Orders', id: 'myorders' , key : 'myorders', swipeable : false},
  order: {component: Order, title: 'Buy something', id: 'order' , key : 'order', swipeable : false,hasBackButton: false, cart : true, wishList : true,initCategoryId: 0}
  //longList: { component: LongList, title: 'Long list', id: 'longList' }
}

export const getRoute = id => Routes[id];
export const getRouteList = () => Object.keys(Routes).map(key => Routes[key]);
export const getInitialRoute = () => getRoute(initialRouteId)
//export const navigate = route => routerManager.navigate(route)
