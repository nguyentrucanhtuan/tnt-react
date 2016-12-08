import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Image from './../../components/Image'
import Rating from './../../components/Rating'
//import {ImageComponent as Image} from 'ainojs-react-image';

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
        text: {
            color: "black",
            marginBottom: 8,
        },
      }
    }

    static propTypes = {
        viewMode: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    onImageError(imgElement) {
      console.log('error', imgElement)
    }

    render() {
      const isListMode = this.props.viewMode === LIST_VIEW;

      const productImage = (
        <Image src={this.props.product.images[0].src} width={"100%"} height={"auto"}/>

    );

      return (
        <ListItem key={this.props.product.id} onClick={() => {
            this.props.onPress(this.props.product.id)
          }} tappable>
          <ons-row>
            <ons-col width="40%">
                {productImage}
            </ons-col>
            <ons-col width="60%">
                <h3 className="product-name">{this.props.product.name}</h3>
                <div className="product-price">
                  {Constants.Formatter.currency(this.props.product.price) }
                </div>
                <div className="product-rating">
                    <Rating rating={Number(this.props.product.average_rating)} size={this.styles.text.fontSize + 4}/>
                </div>
            </ons-col>
          </ons-row>


        </ListItem>

      );
    }
}
