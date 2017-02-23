import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localforage'
export default initialState => {
  const middleware = [thunk];

  /*if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(
        middleware,
        devToolsExtension()
      )
    }
  }*/

  //const store = createStore(reducers, initialState, middleware);
  const store = compose(
      applyMiddleware(...middleware),
      autoRehydrate())(createStore)(reducers);
  persistStore(store, {storage: localForage, blacklist: ['Category','CategoryOrder','Product']})

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
