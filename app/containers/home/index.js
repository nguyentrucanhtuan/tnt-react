/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Constants from './../../Constants';
import Toolbar from "./../../components/Toolbar"
import { elastic as Menu } from 'react-burger-menu';

class Home extends Component {
  constructor(props) {
      super(props);
      this.styles = {
          container: {flex: 1},
          imageCard: {
              width: Constants.Dimension.ScreenWidth(1),
              height: 200,
          },
          mainCategoryText: {
              color: 'white',
              fontSize: 25
          },
          numberOfProductsText: {
              color: 'white',
              fontSize: 25
          }
      };
  }

  render() {



      return (
        <div id="outer-container">

          <Toolbar title={this.props.title}
                   back={this.props.back}
                  cart={this.props.cart}
                  wishList={this.props.wishList}/>

          <main id="page-wrap">

          </main>
        </div>

      );
  }
}

export default connect()(Home);
