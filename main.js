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
import { Provider, connect } from 'react-redux'
import * as localForage from "localforage";
import getStore from './app/store';
import {getRoute} from './app/routes'
//import {setRoute} from './app/actions/routes'
import reducers from './app/reducers';


//import RootRouter from './app/RootRouter';
import Navigator from './app/components/Navigator'
import Navigo from 'navigo'
require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');
require('onsenui/css/onsen-css-components.css');

ons.platform.select('android')
const store = getStore();
class MStore extends Component {
    componentDidMount() { }
    render() {
        return (
          <div className="mstore-wrapper">
            <Provider store={store}>
              <Navigator />
            </Provider>
          </div>
        )
    }
}
const container = document.getElementById('app');
function renderComponent(component){
  ReactDOM.render(<Provider store={store}><Navigator /></Provider>, container);
}
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


 let routerManager = new Navigo(null, false);

 routerManager
  .on({
    'products/:id': function (params) {
      console.log('in product page: '+params.id)
      let route = getRoute('product');
      route = Object.assign({}, route, {productId : parseInt(params.id)})
      ReactDOM.render(<Provider store={store}><Navigator initialRoute={route}/></Provider>, container);
    },
    'categories/:id': function (params) {
      console.log('in product page: '+params.id)
      let route = getRoute('category');
      route = Object.assign({}, route, {initCategoryId : parseInt(params.id)})
      ReactDOM.render(<Provider store={store}><Navigator initialRoute={route}/></Provider>, container);
    },
    'about': function () {
      let route = getRoute('about');
      ReactDOM.render(<Provider store={store}><Navigator initialRoute={route}/></Provider>, container);
      console.log('in about page')
    },
    '*': function () {
      let route = getRoute('home');
      ReactDOM.render(<Provider store={store}><Navigator initialRoute={route}/></Provider>, container);
      renderComponent();
    }
  })
  .resolve();
