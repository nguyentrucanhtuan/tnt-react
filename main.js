/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ons from 'onsenui';
import { platfrom, notification } from 'onsenui';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider, connect } from 'react-redux';
import getStore from './app/store';
import {getRoute} from './app/routes'
import routerManager from './app/RouterManager'
//import {setRoute} from './app/actions/routes'
import reducers from './app/reducers';
import localForage from 'localforage';
import Constants from './app/Constants'
import WooWorker from "./app/services/WooWorker";
import {addCartItem} from './app/reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from './app/reducers/WishList/actions'
import {fetchCategoryById} from './app/reducers/Category/actions'
//import RootRouter from './app/RootRouter';
import Navigator from './app/components/Navigator'
import Navigo from 'navigo'
require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');
require('onsenui/css/onsen-css-components.css');
require('./app/style.css')


import Home from './app/containers/home'
import Cart from './app/containers/cart'
import Checkout from './app/containers/checkout'
import WishList from './app/containers/wishlist'
import Category from './app/containers/category'
import Product from './app/containers/product'
import Order from './app/containers/order'
import AddWishList from './app/containers/addwishlist'
import RootApp from "./app/RootApp";


ons.platform.select('android')
const store = getStore();
class MStore extends Component {
    componentDidMount() { }
    render() {
        return (
            <Provider store={store}>

            </Provider>
        )
    }
}
const container = document.getElementById('app');
function renderComponent(component){
  ReactDOM.render(<Provider store={store}>
    <RootApp>{component}</RootApp>
  </Provider>, container);
}

routerManager
 .on({
   'dat-hang':  function(params){
     console.log('in dat hang page ')
     //let route = getRoute('order');
     renderComponent(<Order wishList={true} cart={true} search={true} title={'Đặt hàng'} initCategoryId={0}/>);
     //ReactDOM.render(<Provider store={store}><Navigator initialRoute={route}/></Provider>, container);
   },
   'gio-hang':  function(params){
     console.log('in gio hang page ')
     let route = getRoute('cart');
     renderComponent(<Cart wishList={true} title={'Giỏ hàng'}/>);
    // ReactDOM.render(<Provider store={store}><Cart wishList={true} title={'Giỏ hàng'}/></Provider>, container);
   },
   'thuong-mua':  function(params){
     console.log('in thuong mua page ')
     let route = getRoute('wishlist');
     renderComponent(<WishList title={'Danh sách thường mua'} back={true} cart={true}/>);
     //ReactDOM.render(<Provider store={store}><WishList title={'Danh sách thường mua'} back={true} cart={true}/></Provider>, container);
   },
   'thanh-toan': function(params){
     renderComponent(<Checkout wishList={true} title={'Thanh Toán'}/>);
     //ReactDOM.render(<Provider store={store}><Checkout wishList={true} title={'Thanh Toán'}/></Provider>, container);
   },
   'add-wishlist/:id':  function(params){
        let productId = parseInt(params.id)
        ReactDOM.render(<Provider store={store}><AddWishList productId={productId} wishList={true} title="Thêm danh sách thường mua"/></Provider>, container);
   },
   'add-to-cart/:id':  function(params){
        let productId = parseInt(params.id)
        WooWorker.productById(function(json){
          /*localForage.getItem('reduxPersist:WishList', function (err, value) {
             var wishList = JSON.parse(value);
             wishList.wishListItems.push(json)
             value = JSON.stringify(wishList)
             localForage.setItem('reduxPersist:WishList', value, function (err) {
               document.write('ok');
             })
          });
          */
          store.dispatch(addCartItem(json,undefined));
          document.write('ok');
        }, undefined, productId);

   },
   'products/:id': function (params) {
     console.log('in product page: '+params.id)
     //let route = getRoute('product');
     //route = Object.assign({}, route, {productId : parseInt(params.id)})
     renderComponent(<Product productId={parseInt(params.id)} title={'Sản phẩm'} cart={true} back={true}
       wishList={true}/>);
     //ReactDOM.render(<Provider store={store}><Product productId={parseInt(params.id)} title={'Sản phẩm'} cart={true} back={true}
      //      wishList={true}/></Provider>, container);
   },
   'categories/:id': function (params) {
     console.log('in product page: '+params.id)
     const renderCategory = () => {
       renderComponent(<Category initCategoryId={parseInt(params.id)} cart={true} back={true} search={true}/>);
      //ReactDOM.render(<Provider store={store}><Category initCategoryId={parseInt(params.id)} cart={true} back={true} search={true}/></Provider>, container);
     }
     store.dispatch(fetchCategoryById(parseInt(params.id),renderCategory))
     //let route = getRoute('category');
     //route = Object.assign({}, route, {initCategoryId : parseInt(params.id)})
     //ReactDOM.render(<Provider store={store}><Navigator initialRoute={route}/></Provider>, container);

   },
   'about': function () {
     let route = getRoute('about');
     //renderComponent(<Category initCategoryId={parseInt(params.id)} cart={true} back={true} search={true}/>);
     ReactDOM.render(<Provider store={store}><Navigator initialRoute={route}/></Provider>, container);
     console.log('in about page')
   },
   '*': function () {
     //let route = getRoute('home');
     renderComponent(<Home title={'TNT Drink'} cart={true} search={true}/>);
     //ReactDOM.render(<Provider store={store}><Home title={'TNT Drink'} cart={true} search={true}/></Provider>, container);
   }
 })
 .resolve();
//export default connect()(MStore)

/*ReactDOM.render((
  <MStore />
 ),document.getElementById('app'));*/

/*let routes = require('./routes.json');
function render(location) {
   router.resolve(routes, location)
     .then(renderComponent)
     .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
 }
*/
// history.listen(render);
 //render(history.getCurrentLocation());
