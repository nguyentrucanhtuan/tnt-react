import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import Toolbar from '../../components/Toolbar';
import Constants from './../../Constants'
import Spinner from "./../../components/Spinner"
import Rating from "./../../components/Rating"
import Image from './../../components/Image'
import ImageSwiper from './ImageSwiper'

import {fetchProductById, clearProduct} from '../../reducers/Product/actions'
import {addCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import EventEmitter from './../../utils/AppEventEmitter'


import {
  Page,
  Carousel,
  CarouselItem
} from 'react-onsenui';

class Product extends Component {
  constructor(props) {
    super(props);
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
            padding: Constants.Dimension.ScreenWidth(0.05),
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


    this._product = this.props.product;

    return (
      <Page key={this.props.productId}>
        <Toolbar
          navigator={this.props.navigator}
          title={this.state.title}
          cart={this.props.cart}
          wishList={this.props.wishList}/>
          <div className="product-detail">
            <ons-row height="400px">
              <ons-col width="100%">
                {this.state.isWaiting ? <Spinner fullStretch/> :
                  <ImageSwiper product={this.props.product} />}
              </ons-col>
            </ons-row>

          </div>
      </Page>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
