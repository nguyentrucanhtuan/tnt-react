import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Image from './../../components/Image'
//import ImageResponsive, {Source} from 'react-image-responsive';

import {ListItem, Icon} from 'react-onsenui';
import { getRoute } from './../../routes'
import Constants from './../../Constants';
import {ProductViewMode} from '../../reducers/Product/actions'

const {LIST_VIEW} =  ProductViewMode;

export default class ProductCard extends Component{
   constructor(props) {
      super(props);

      this.styles = {
        image: {
            marginBottom: 8,
        },
      }
    }

    static propTypes = {
        viewMode: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
      const isListMode = this.props.viewMode === LIST_VIEW;

      const productImage = (
        <img src={this.props.product.images[0].src} style={this.styles.image}/>
    );

      return (
        <ListItem key={this.props.product.id} onClick={() => {
            this.props.onPress(this.props.product.id)
          }} tappable>
          {productImage}

        </ListItem>

      );
    }
}
