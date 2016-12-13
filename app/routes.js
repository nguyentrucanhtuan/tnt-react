import Home from './pages/home'
import About from './pages/about'
import Category from './pages/category'
import Product from './pages/product'
export const initialRouteId = 'home'


export const Routes = {
  home: { component: Home, title: 'TNT Drink', id: 'home' , key : 'home', swipeable : true ,hasBackButton: false, cart : true, wishList : true},
  about: { component: About, title: 'About', id: 'about' , key : 'about' , swipeable : true},
  category: { component: Category, title: 'Category', id: 'category' , key : 'category' , swipeable : true},
  product: { component: Product, title: 'Product', id: 'product' , key : 'product', swipeable : false},
  //longList: { component: LongList, title: 'Long list', id: 'longList' }
}

export const getRoute = id => Routes[id];
export const getRouteList = () => Object.keys(Routes).map(key => Routes[key]);
export const getInitialRoute = () => getRoute(initialRouteId)
