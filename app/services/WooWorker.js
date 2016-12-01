'use strict';

import React, {Component} from 'react';
import WooCommerceAPI from "./WooCommerceAPI"
import Constants from './../Constants';


const Api = new WooCommerceAPI({
    url: Constants.WooCommerce.url,
    consumerKey: Constants.WooCommerce.consumerKey,
    consumerSecret: Constants.WooCommerce.consumerSecret,
    wpApi: Constants.WooCommerce.wp_api,
    version: Constants.WooCommerce.version,
    timeout: Constants.WooCommerce.timeout
});

class WooWorker extends Component {
  customerByEmail(email, callback, callback2) {
      Api.get('customers', {email: email}).then((responseData) => {
          if (responseData.length != 0)
              callback(responseData[0]);
          else {
              callback2();
          }
      }).catch((error) => console.log(error));
  }

  customerById(id, callback) {
      Api.get('customers/' + id).then((responseData) => {
          if (responseData.message === undefined)
              callback(responseData);
          else
              console.log(JSON.stringify(responseData.message));
      }).catch((error) => console.log(error));
  }

  createCustomer(data, callback) {
      console.log("CREATE CUSTOMER")
      Api.post('customers', data).then((responseData) => {
          if (responseData.code === undefined)
              callback(responseData);
          else {
              alert(JSON.stringify(data.code));
              console.log(JSON.stringify(responseData));
          }
      }).catch((error) => console.log(error));
  }

  // categoriesByParentId(id, callback, error = (e) => console.log(e)) {
  //     Api.get('products/categories', {hide_empty: true, parent: id}).then((json) => {
  //         if (json.message === undefined)
  //             callback(json);
  //         else
  //             error(JSON.stringify(json.message))
  //     }).catch(error);
  // }

  categories(callback, error = (e) => console.log(e)) {
      Api.get('products/categories', {
          hide_empty: true,
          per_page: 100,
          order: 'desc',
          orderby: 'count'
      }).then((json) => {
          if (json.message === undefined)
              callback(json);
          else
              error(JSON.stringify(json.message));
      }).catch(error);
  }


}

export default new WooWorker();
