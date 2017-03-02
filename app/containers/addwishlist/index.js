/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, TouchableOpacity, Image,Button} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {connect} from 'react-redux';
import Constants from './../../Constants'
import Toolbar from "./../../components/ToolbarNative"
//import Button from "./../../components/ButtonNative"
import Rating from "./../../components/Rating"
import LogoSpinner from "./../../components/LogoSpinner"
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import {fetchProductById, clearProductWishlist} from '../../reducers/AddWishlist/actions'
class AddWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {     //current variation that match form input attributes
        isWaiting: true,
    }
    this.styles = {
        container: {
          height: undefined,
          borderColor: Constants.Color.ViewBorder,
          borderWidth: 1,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          paddingBottom: 5,
        },
        row : {
          flexDirection: 'row',
          padding: 10,
        },
        image: {
            width: Constants.Dimension.ScreenWidth(0.3),
            height: Constants.Dimension.ScreenWidth(0.3) * 1.2,
        },
        product_name: {
            padding: 10,
            paddingTop: 5,
            paddingBottom: 5,
            height: undefined,
            justifyContent: 'flex-start',
        },
        product_price: {
            padding: 10,
            paddingTop: 0,
            paddingBottom: 0,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'column'
        },
        price_wrapper: {
            flexDirection: 'row',
        },
        text: {
            color: "black",
            marginBottom: 8,
        },
        sale_price: {
            textDecorationLine: 'line-through',
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
        }
    };
  }

  static propTypes = {
    fetchProductById: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
    currentWishlist: PropTypes.object,
  }

  componentWillMount() {
      TimerMixin.setTimeout(() => this.props.fetchProductById(this.props.productId, () => this.setState({isWaiting: false})), 500,);
  }

  componentWillReceiveProps(nextProps) {
      const {currentWishlist} = nextProps;
      if (currentWishlist.propduct !== undefined) {
          this.setState({price: urrentWishlist.propduct.price});
      }
  }

  render() {
    if (this.state.isWaiting)
        return <LogoSpinner fullStretch/>
    let _product = this.props.currentWishlist.product;
    this.isInWishList = this.props.wishLists.find((item) => item.product.id == _product.id) != undefined

    const productImage = (<Image
        source={_product.images[0] != undefined ? {uri: _product.images[0].src} : Constants.Image.PlaceHolder}
        style={this.styles.image}
        resizeMode="cover"
    />);


    const productRating = (<View style={this.styles.price_wrapper}>
        <Text style={{marginLeft: this.styles.text.marginLeft} }/>
        <Rating rating={Number(_product.average_rating)} size={this.styles.text.fontSize + 4}/>
        <Text style={[this.styles.text, {color: Constants.Color.ViewBorder}]}>
            {'(' + _product.rating_count + ')'}
        </Text>
    </View>);

    const productName = (<Text
        ellipsizeMode={'tail'}
        numberOfLines={1}
        style={this.styles.text}
    >
        {_product.name}
    </Text>);


    const productPrice = (
        <View style={this.styles.price_wrapper}>
            <Text style={[this.styles.text, this.styles.price]}>
                {Constants.Formatter.currency(_product.price) }
            </Text>
            <Text style={[this.styles.text, this.styles.sale_price]}>
                {_product.on_sale ? Constants.Formatter.currency(_product.regular_price) : ''}
            </Text>
            {!_product.on_sale ? <View/> :
                <Text style={[this.styles.text, this.styles.sale_off]}>
                    {'(' + ((1 - Number(_product.price) / Number(_product.regular_price)) * 100).toFixed(0) + '% off)' }
                </Text>
            }
        </View>);


        const opAddToWishlist = () => {
          if (this.isInWishList) {
              this.props.removeWishListItem(_product, undefined);
          } else {
              //TODO: check limit
              this.props.addWishListItem(_product, undefined);
          }
        }
    return (
      <View style={[this.styles.container, {backgroundColor: Constants.Color.DirtyBackground}]}>
      <Toolbar
          {...this.props}
          transparentMode={this.state.currentPosition < this.swiperHeight }
      />
        <View style={this.styles.row}>
            {productImage}
            <View style={{flexDirection:'column',flex: 1, marginLeft: 10}}>
              {productRating}
              {productName}
              {productPrice}
            </View>
        </View>

          <Button
              onPress={()=>opAddToWishlist()}
              autoMargin={false}
              style={{marginBottom: Constants.Dimension.ScreenWidth(0.05)}}
              borderLess
              color={Constants.Color.BuyNowButton}
              title={this.isInWishList ? 'Bỏ khỏi danh sách thường mua' : 'Bấm nếu bạn thường mua sản phẩm này'}
          >
          </Button>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
   console.log(state.currentWishlist.product)
    return {
        wishLists: state.WishList.wishListItems,
        currentWishlist: state.currentWishlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddWishList);
