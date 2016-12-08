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
        price_wrapper: {
            flexDirection: 'row',
        },
        text: {
            color: "black",
            marginBottom: 8,
            paddingRight: 10
        },
        sale_price: {
            textDecoration: 'line-through',
            color: Constants.Color.TextLight,
            marginLeft: 0,
            marginRight: 0
        },
        price: {
            fontWeight: "600",
            color: Constants.Color.ProductPrice,
        },
        sale_off: {
            color: Constants.Color.TextLight,
        },
        product_name: {
          fontSize: 19,
          fontWeight: 400,
          margin: 0,
        },
        product_price: {
          background: "#2BCDC1 none repeat scroll 0 0",
          color: "#fff",
          display: "inline-block",
          fontSize: 13,
          margin: "10px 0",
          padding: "3px 10px",
          marginRight: 10
        },
        product_review_p: {
          color: '#888888',
          fontSize: 11,
          margin: 0,
        }
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
                <div className="product" style={{padding: 5}}>
                  <h3 className="product-name" style={this.styles.product_name}>{this.props.product.name}</h3>
                  <div className="product-price">
                    <span style={{...this.styles.text, ...this.styles.price, ...this.styles.product_price}}>{Constants.Formatter.currency(this.props.product.price) }</span>
                    <span style={{...this.styles.text,...this.styles.sale_price}}>
                        {this.props.product.on_sale ? Constants.Formatter.currency(this.props.product.regular_price) : ''}
                    </span>
                    {!this.props.product.on_sale ? '' :
                        <span style={{...this.styles.text, ...this.styles.sale_off}}>
                            {'(' + ((1 - Number(this.props.product.price) / Number(this.props.product.regular_price)) * 100).toFixed(0) + '% off)' }
                        </span>
                    }
                  </div>
                  <div className="product-rating">
                      <Rating rating={Number(this.props.product.average_rating)} size={this.styles.text.fontSize + 4}/>
                      <p style={this.styles.product_review_p}>({this.props.product.rating_count} khách hàng nhận xét) </p>
                </div>
                </div>
            </ons-col>
          </ons-row>


        </ListItem>

      );
    }
}
