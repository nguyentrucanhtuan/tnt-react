import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import renderHTML from 'react-render-html';
import Notifications, {notify} from 'react-notify-toast';

import Toolbar from '../../components/Toolbar';
import Constants from './../../Constants'
import Spinner from "./../../components/Spinner"
import Rating from "./../../components/Rating"
import Image from './../../components/Image'
import ImageSwiper from './ImageSwiper'

import ReviewTab from "./ReviewTab";
import VariationsForm from './VariationsForm'

import { setSwipeable } from '../../actions/swipeable'
import {fetchProductById, clearProduct} from '../../reducers/Product/actions'
import {addCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import EventEmitter from './../../utils/AppEventEmitter'

import ons from 'onsenui';
import {
  Page,
  Fab,
  Icon,
  SpeedDial,
  SpeedDialItem
} from 'react-onsenui';

class Product extends Component {
  constructor(props) {
    super(props);
    //this.props.setSwipeable(false);
    this.state = {
        currentVariation: undefined,       //current variation that match form input attributes
        isWaiting: true,
        currentPosition: 0,
        title : "Product",
        index: 0
    }

    this.styles = {
        container: {flex: 1},
        container_row: {
            flexDirection: 'row',
        },
        card: {
            backgroundColor: 'white',
            marginBottom: 8,
            paddingLeft: Constants.Dimension.ScreenWidth(0.05),
            paddingRight: Constants.Dimension.ScreenWidth(0.05),
            paddingBottom: 10,
            paddingTop: 10,
            borderBottom: '1px solid #ccc'
        },
        label: {
            color: Constants.Color.TextDark,
            fontSize: 20,
            fontWeight: 'bold',
        },
        swipe_control : {
          textAlign: 'center',
          fontSize: '20px',
          position: 'absolute',
          bottom: '36px',
          left: '0px',
          right: '0px'
        }
    };

    this.updatePrice = (props) => this.setState({price: props.price});
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
      TimerMixin.setTimeout(() => this.props.fetchProductById(this.props.productId, ()=> this.setState({isWaiting: false})), 500,);
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

    return (
      <Page key={this.props.productId} renderFixed={this.renderButtonGroup.bind(this)}>
        <Toolbar
          navigator={this.props.navigator}
          title={this.state.title}
          cart={this.props.cart}
          wishList={this.props.wishList}/>

            {this.state.isWaiting ? <Spinner fullStretch/> :
              this.renderProduct()}

      </Page>
    );
  }

  renderProduct(){

    this._product = this.props.product;
    console.log(this._product);
    this.isInWishList = this.props.wishLists.find((item)=> item.product.id == this._product.id) != undefined
    const index = this.props.Cart.cartItems.findIndex((item)=> item.product.id == this._product.id);
    this.inCartTotal = index == -1 ? 0 : this.props.Cart.cartItems[index].quantity;
    //this.inCartTotal = 0;
    return (
      <div className="product-detail">
        <ons-row height={300}>
          <ons-col width="100%">
              <ImageSwiper product={this.props.product} />
          </ons-col>
        </ons-row>
        <ons-row>
            <ons-col width="100%">
              {this.renderTopInfo(this._product)}
              {this.renderVariation(this._product)}
              {this.renderDescription(this._product)}
              {this.renderReviews(this._product)}
            </ons-col>
        </ons-row>
        <Notifications />
      </div>

    );
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
            textAlign: 'center',
            display: 'inline-block'
        },
        sale_price: {
            textDecoration: 'line-through',
            color: Constants.Color.TextLight,
            fontWeight: "normal",
            textAlign: 'center',
            display: 'inline-block'
        },
        sale_off: {
            color: Constants.Color.TextLight,
            fontWeight: "normal",
            display: 'inline-block'
        }
    }

    return (
      <div style={this.styles.card}>
        <h3 style={styles.name}>{_product.name}</h3>
        <div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <div style={{flexDirection: 'row'}}>
            <div style={styles.price}>{Constants.Formatter.currency(_product.price) }</div>
            <div style={{...styles.price, ...styles.sale_price}}>
                {_product.on_sale ? Constants.Formatter.currency(_product.regular_price) : ''}
            </div>
            {!_product.on_sale ? <div/> :
                <div style={{...styles.price, ...styles.sale_off}}>
                    {'(' + ((1 - Number(_product.price) / Number(_product.regular_price)) * 100).toFixed(0) + '% off)' }
                </div>
            }
          </div>
          <div style={this.styles.container_row}>
            <div style={{marginLeft: 10} }/>
            <Rating rating={Number(_product.average_rating)} size={25} style={{display:'inline-block'}}/>
            <p style={{color: Constants.Color.ViewBorder, fontSize: 15, marginLeft: 5, display: 'inline-block'}}>
                  {'(' + _product.rating_count + ')'}
            </p>
          </div>
        </div>
      </div>
    );

  }

  renderVariation(_product) {
    return (
      <div style={this.styles.card}>
        <label style={this.styles.label}>Product Variations</label>
        <VariationsForm
              ref={'form'}
              attributes={_product.attributes}
              variations={_product.variations}
              product={this}
          />
      </div>
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
        <div style={this.styles.card}>
            <label style={{...this.styles.label, ...{marginBottom: -10,}}}>
                {"Additional Information"}
            </label>
            {_product.description == '' ?
                <p style={styles.text}>
                    {'No Product Description'}
                </p> :
                <div style={{margin: 10}}>
                   {renderHTML(_product.description)}
                </div>
            }
        </div>
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

  share(name) {
    ons.notification.confirm(`Do you want to share on "${name}"?`);
  }


  renderButtonGroup() {
    let opAddToCart = (go = false) => {
      if (this.inCartTotal < 10){
        let _product = this.props.product;
        let _variation = this.state.currentVariation;

        if(_product.variations.length > 0){
          this.refs.form.onPress();
          if(! _variation) return
        }
        this.props.addCartItem(_product, _variation)
        notify.show('Thành công!','success',3000)
        if(go) console.log("go to cart")
      }
      else{
        ons.notification.confirm(`Do you want to add this product to Cart"?`);
      }
    }

    const opAddToWishlist = () => {
      let _product = this.props.product;
      let _variation = this.state.currentVariation;

      //console.log(_product.variations)
      if (_product.variations.length > 0){
        this.refs.form.onPress();
        if(!_variation) return;
      }

      if (this.isInWishList){
        this.props.removeWishListItem(_product, _variation);
      }
      else{
        this.props.addWishListItem(_product, _variation);
        notify.show('Yêu thích!','success',3000)
      }
    }

    const opPhoneCall = (phoneNumber,promt = false) => {
      //let phoneNumber = "0976502505";
      let url;
      if (!ons.platform.isAndroid()){
        url = prompt ? 'telprompt:' : 'tel:';
      }else{
        url = 'tel:';
      }
      url += phoneNumber;
      window.open(url)
    }
    return (
      <SpeedDial position='bottom right'>
        <Fab>
          <Icon icon='md-plus' />
        </Fab>
        <SpeedDialItem onClick={() => opAddToCart()}>
          <Icon icon='md-shopping-cart-plus' />
        </SpeedDialItem>
        <SpeedDialItem onClick={()=> opAddToWishlist()}>
          <Icon icon={this.isInWishList ? Constants.Icon.Wishlist : Constants.Icon.WishlistEmpty} style={{color: this.isInWishList ? '#f38612' : ''}}/>
        </SpeedDialItem>
        <SpeedDialItem onClick={()=> opPhoneCall('0976502505')}>
          <Icon icon='md-phone' />
        </SpeedDialItem>
      </SpeedDial>
    );
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
        setSwipeable: swipeable => dispatch(setSwipeable(swipeable))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
