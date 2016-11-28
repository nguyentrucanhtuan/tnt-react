
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import localForage from 'localforage'
import reducers from './reducers';

const middleware = [thunk,routerMiddleware(browserHistory)];

const store = compose(
    applyMiddleware(...middleware),
    autoRehydrate())(createStore)(reducers);
persistStore(store, {storage: localForage, blacklist: ['Category', 'Product']})

// we export history because we need it in `reduxstagram.js` to feed into <Router>
//export const history = syncHistoryWithStore(browserHistory, store);

export default store;
