/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, ListView, TouchableOpacity, ScrollView, RefreshControl, Image} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {connect} from 'react-redux';
//import Swiper from "react-native-swiper";
//import HTML from 'react-native-fence-html'

import ReviewTab from './ReviewTab.js';
import VariationsForm from './VariationsForm'
import renderHTML from 'react-render-html';
import Constants from './../../Constants'
import Toolbar from "./../../components/ToolbarNative"
import LogoSpinner from "./../../components/LogoSpinner"
import Button from "./../../components/ButtonNative"
import Rating from "./../../components/Rating"
import ImageSwiper from './ImageSwiper'
import {fetchProductById, clearProduct} from '../../reducers/Product/actions'
import {addCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import EventEmitter from './../../utils/AppEventEmitter'
class Product extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentVariation: undefined,       //current variation that match form input attributes
          isWaiting: true,
          currentPosition: 0,
      }
      this.styles = {
          container: {flex: 1, maxHeight: Constants.Dimension.ScreenHeight()-40},
          container_row: {
              flexDirection: 'row',
          },
          card: {
              backgroundColor: 'white',
              marginBottom: 8,
              padding: Constants.Dimension.ScreenWidth(0.05),
          },
          label: {
              color: Constants.Color.TextDark,
              fontSize: 20,
              fontWeight: 'bold',
          },
      };

      this.updatePrice = (props) => this.setState({price: props.price});
      this.swiperHeight = Constants.Dimension.ScreenWidth() * 1.2;
      this.inCartTotal = 0;
  }

  static propTypes = {
      fetchProductById: PropTypes.func.isRequired,
      clearProduct: PropTypes.func.isRequired,
      addCartItem: PropTypes.func.isRequired,
      addWishListItem: PropTypes.func.isRequired,

      productId: PropTypes.number.isRequired,
      product: PropTypes.object,
  };

  componentWillMount() {
      TimerMixin.setTimeout(() => this.props.fetchProductById(this.props.productId, () => this.setState({isWaiting: false})), 500,);
  }

  componentWillUnmount() {
      EventEmitter.removeListener(Constants.EmitCode.ProductPriceChanged, this.updatePrice.bind(this));
  }

  componentDidMount() {
      this.productChangePrice = EventEmitter.addListener(Constants.EmitCode.ProductPriceChanged, this.updatePrice.bind(this));
  }

  componentWillReceiveProps(nextProps) {
      const {product} = nextProps;
      if (product !== undefined) {
          this.setState({price: product.price});
      }
  }

  render() {
    if (this.state.isWaiting)
        return <LogoSpinner fullStretch/>

    this._product = this.props.product;

    this.isInWishList = this.props.wishLists.find((item) => item.product.id == this._product.id) != undefined
    const index = this.props.Cart.cartItems.findIndex((item) => item.product.id == this._product.id);
    this.inCartTotal = index == -1 ? 0 : this.props.Cart.cartItems[index].quantity;

    return (
        <View style={[this.styles.container, {backgroundColor: Constants.Color.DirtyBackground}]}>
          <Toolbar
              {...this.props}
              transparentMode={this.state.currentPosition < this.swiperHeight }
          />
          <ScrollView onScroll={(event) => this.setState({currentPosition: event.nativeEvent.contentOffset.y})}
            showsVerticalScrollIndicator={false}
            style={this.styles.container}>
            {this.renderSwiper(this._product)}
            <View style={this.styles.container}>
                {this.renderTopInfo(this._product)}
                {this.renderVariation(this._product)}
                {this.renderDescription(this._product)}
                {this.renderReviews(this._product)}
            </View>
          </ScrollView>
          {this.renderButtonGroup()}
        </View>
    );
  }


  renderSwiper(_product) {
    return <ImageSwiper product={this.props.product} />
  }

  renderTopInfo(_product) {
    const styles = {
        name: {
            color: Constants.Color.TextDark,
            fontSize: 26,
            margin: 5,
            marginBottom: 0,
            textAlign: 'center'
        },
        price: {
            color: Constants.Color.ProductPrice,
            fontSize: 18,
            fontWeight: "bold",
            margin: 5,
            marginRight: 0,
        },
        sale_price: {
            textDecorationLine: 'line-through',
            color: Constants.Color.TextLight,
            fontWeight: "normal",
        },
        sale_off: {
            color: Constants.Color.TextLight,
            fontWeight: "normal",
        }
    }
    return (<View style={this.styles.card}>
        <Text style={styles.name}> {_product.name}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.price}>
                    {Constants.Formatter.currency(_product.price) }
                </Text>
                <Text style={[styles.price, styles.sale_price]}>
                    {_product.on_sale ? Constants.Formatter.currency(_product.regular_price) : ''}
                </Text>
                {!_product.on_sale ? <View/> :
                    <Text style={[styles.price, styles.sale_off]}>
                        {'(' + ((1 - Number(_product.price) / Number(_product.regular_price)) * 100).toFixed(0) + '% off)' }
                    </Text>
                }
            </View>
            <View style={this.styles.container_row}>
                <Text style={{marginLeft: 10} }/>
                <Rating rating={Number(_product.average_rating)} size={25}/>
                <Text style={{color: Constants.Color.ViewBorder, fontSize: 18, marginLeft: 5,}}>
                    {'(' + _product.rating_count + ')'}
                </Text>
            </View>
        </View>
    </View>);
  }


  renderVariation(_product) {
      return (
          <View style={this.styles.card}>
              <Text style={this.styles.label}>
                  {'Product Variations'}
              </Text>
              <VariationsForm
                  ref={'form'}
                  attributes={_product.attributes}
                  variations={_product.variations}
                  product={this}
              />
          </View >
      );
  }

  renderDescription(_product) {
      const styles = {

          text: {
              color: Constants.Color.TextDark,
              fontSize: 14,
          },
          attribute_container: {
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Constants.Color.ViewBorder,
          },
          attribute_left: {
              flex: 3,
              borderRightWidth: 1,
              borderColor: Constants.Color.ViewBorder,
              backgroundColor: '#F8F8F8',
          },
          attribute_right: {
              flex: 7,
          },
          attribute_name: {
              color: Constants.Color.TextDark,
              fontSize: 14,
              fontWeight: 'bold',
              margin: 10
          },
          attribute_options: {
              fontSize: 14,
              margin: 10,
          },
      }
      return (
          <View style={this.styles.card}>
              <Text style={[this.styles.label, {marginBottom: -10,}]}>
                  {'Thông tin chi tiết'}
              </Text>
              {_product.description == '' ?
                  <Text style={styles.text}>
                      {'No Product Description'}
                  </Text> :
                  <View style={{margin: 10}}>
                      {renderHTML(_product.description)}
                  </View>
              }
          </View>
      );
  }

  renderReviews(_product) {
      return (
          <div style={{...this.styles.card,...{borderBottom:'none'}}}>
              <label style={this.styles.label}>
                  {'Product Reviews' + " (" + _product.rating_count + ")"}
              </label>
              <ReviewTab product={_product}/>
          </div >
      );
  }

  renderButtonGroup() {
      const noMargin = {
          margin: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
      }
      const opAddToCart = (go = false) => {
              let _product = this.props.product;
              let _variation = this.state.currentVariation;

              // if product have variations and if current variation is not found
              if (_product.variations.length > 0) {
                  this.refs.form.onPress();
                  if (!_variation) return;
              }

              //TODO: check limit
              this.props.addCartItem(_product, _variation);


          if (go) console.log('gotoCart');
      }

      const opAddToWishlist = () => {
          let _product = this.props.product;
          let _variation = this.state.currentVariation;

          // if product have variations and if current variation is not found
          if (_product.variations.length > 0) {
              this.refs.form.onPress();
              if (!_variation) return;
          }
          if (this.isInWishList) {
              this.props.removeWishListItem(_product, _variation);
          } else {
              //TODO: check limit
              this.props.addWishListItem(_product, _variation);
          }
      }
      return (<View style={{flexDirection: 'row'}}>
          <Button autoWidth={false}
                  onPress={() => opAddToCart(true)}
                  borderLess
                  style={[noMargin, {flex: 4}]}>
              {'BUYNOW'}
          </Button>
          <View style={{flex: 1, backgroundColor: 'pink', flexDirection: 'row'}}>
            <Button autoWidth={false}
                    onPress={() => opAddToCart()}
                    borderLess
                    overlayColor={Constants.Color.BuyNowButton}
                    iconName={this.inCartTotal == 0 ? Constants.Icon.ShoppingCartEmpty : Constants.Icon.AddToCart}
                    style={[noMargin, {flex: 1}]}/>
          </View>
          <Button autoWidth={false}
                  onPress={() => opAddToWishlist()}
                  borderLess
                  overlayColor={Constants.Color.BuyNowButton}
                  iconName={this.isInWishList ? Constants.Icon.Wishlist : Constants.Icon.WishlistEmpty}
                  style={[noMargin, {flex: 1}]}/>
      </View>);
  }

}


const mapStateToProps = (state) => {
    return {
        currentProduct: state.Product.currentProduct,
        product: state.Product.currentProduct.product,
        Cart: state.Cart,
        wishLists: state.WishList.wishListItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCartItem: (product, variation) => {
            dispatch(addCartItem(product, variation));
        },
        addWishListItem: (product, variation) => {
            dispatch(addWishListItem(product, variation));
        },
        removeWishListItem: (product, variation) => {
            dispatch(removeWishListItem(product, variation));
        },
        fetchProductById: (productId, callback) => {
            dispatch(fetchProductById(productId, callback));
        },
        clearProduct: () => dispatch(clearProduct()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
