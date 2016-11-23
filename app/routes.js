import Home from './pages/home'
import About from './pages/about'
export const initialRouteId = 'home'


export const Routes = {
  home: { component: Home, title: 'Home', id: 'home' , key : 'home', hasBackButton: false, cart : true, wishList : true},
  about: { component: About, title: 'About', id: 'about' , key : 'about' },
  //longList: { component: LongList, title: 'Long list', id: 'longList' }
}

export const getRoute = id => Routes[id];
export const getRouteList = () => Object.keys(Routes).map(key => Routes[key]);
export const getInitialRoute = () => getRoute(initialRouteId)
