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
        <Image
          //on_sale={_product.on_sale}
          //saleSize={this.state.currentMode == listMode ? 'big' : 'small'}
          src={this.props.product.images[0].src} //TODO: no image case
          style={this.styles.image}
          resizeMode="cover"
          aspectRatio={1}
      />
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
