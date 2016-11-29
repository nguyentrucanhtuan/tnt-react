/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider, connect } from 'react-redux'
import * as localForage from "localforage";
import getStore from './app/store';
import reducers from './app/reducers';

//import RootRouter from './app/RootRouter';
import Navigator from './app/components/Navigator'
require('onsenui/stylus/blue-basic-theme.styl');
require('onsenui/css/onsenui.css');
require('onsenui/css/onsen-css-components.css');

const store = getStore();
class MStore extends Component {
    componentDidMount() { }
    render() {
        return (
          <Provider store={store}>
            <Navigator />
          </Provider>
        )
    }
}

//export default connect()(MStore)

ReactDOM.render((
  <MStore />
 ),document.getElementById('app'));
