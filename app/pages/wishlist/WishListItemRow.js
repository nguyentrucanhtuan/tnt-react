/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Constants from './../../Constants';
import Image from './../../components/Image'
import Button from './../../components/Button';
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import {addCartItem} from '../../reducers/Cart/actions'
import {ListItem, Icon} from 'react-onsenui';

class WishListItemRow extends Component {
  constructor(props) {
    super(props);

    this.styles = {
        container: {
            height: undefined,
            width: undefined,
            borderColor: Constants.Color.ViewBorder,
            borderWidth: 1,
            flexDirection: 'row',
            marginTop: 10,
        },
        image: {
            width: Constants.Dimension.ScreenWidth(0.3),
            height: Constants.Dimension.ScreenWidth(0.3) * 1.2,
        },
        product_name: {
            fontSize: 19,
            fontWeight: 400,
            margin: 0,
        },
        product_price: {
            padding: 10,
            paddingTop: 0,
            paddingBottom: 0,
            flex: 1,
            justifyContent: 'flex-start',
        },
        product_variation: {
            padding: 10,
            paddingTop: 5,
            paddingBottom: 5,
            flex: 1,
            justifyContent: 'center',
        },
        buttons_wrapper: {
            padding: 10,
            paddingTop: 5,
            paddingBottom: 5,
            flex: 1,
            justifyContent: 'flex-end',
        },
        itemWrapper: {
            justifyContent: 'center',
            padding: 0,
            marginLeft: 10,
        },
    }
  }

  static propTypes = {
      wishListItem: PropTypes.object.isRequired,
      addWishListItem: PropTypes.func.isRequired,
      // onPress: PropTypes.func.isRequired,
  };

  render() {
    const _product = this.props.wishListItem.product;
    const _variation = this.props.wishListItem.variation;

    const productImage = (
      <Image src={_product.images[0].src} width={"100%"} height={'auto'}/>
    );

    const productVariations = (<div style={this.styles.product_name}>
        {this.renderAttributeOptions(this.props.wishListItem.variation)}
    </div>);

    return (
      <ListItem >
        <ons-row >
          <ons-col width="30%" height={120}>
              {productImage}
          </ons-col>
          <ons-col width="70%" height={120}>
            <div className="product" style={{padding: 5}}>
                <h3 className="product-name" style={this.styles.product_name}>{_product.name}</h3>
                {this.renderPriceGroup(_variation == undefined ? _product : _variation)}
                {productVariations}
                {this.renderButtonsGroup()}
            </div>
          </ons-col>
        </ons-row>
      </ListItem>
    );
  }

  renderAttributeOptions(_variation) {
      let s = '';
      if (_variation !== undefined)
          _variation.attributes.forEach((attribute) => {
              s += attribute.name + ': ' + attribute.option + ' ';
          }, this);
      return s;
  }

  renderPriceGroup(_product) {
    const styles = {
        row: {
            flexDirection: 'row',
        },
        price: {
            color: Constants.Color.ProductPrice,
            fontSize: 14,
            fontWeight: "bold",
            marginRight: 5,
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

    console.log(_product);
    return (
      <div style={this.styles.product_price}>
        <div style={styles.row}>
          <h3 style={[styles.price]}>
              {Constants.Formatter.currency(_product.price) }
          </h3>
          <div style={{...styles.price, ...styles.sale_price}}>
              {_product.on_sale ? Constants.Formatter.currency(_product.regular_price) : ''}
          </div>
          {_product.on_sale ?
              <p style={[styles.price, styles.sale_off]}>
                  {'(-' + ((1 - Number(_product.price) / Number(_product.regular_price)) * 100).toFixed(0) + '%)' }
              </p> : <div/>
          }
        </div>
      </div>
    );
  }
  renderButtonsGroup() {
    const styles = {
        row: {
            flexDirection: 'row',
        },
        row_end: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    }

    const onPressBuyNow = () => {
        if (this.inCartTotal < 5)
            this.props.addCartItem(product, variation)
        else
            alert("Product Limit Waring");
    }

    const onPressDelete = () => {
      
    }

    const {product, variation} =  this.props.wishListItem;
    return (<div style={this.styles.buttons_wrapper}>
        <div style={styles.row_end}>
            <Button autoMargin={false}
                    onPress={onPressBuyNow}
                    style={{
                        width: Constants.Dimension.ScreenWidth(0.2),
                        height: 30,
                        marginTop: 0,
                        borderWidth: 0
                    }}>{"BUY NOW"}</Button>

            {this.renderIconButton(Constants.Icon.Delete, onPressDelete)}

        </div>
    </div>);
  }
}


const mapStateToProps = (state) => {
    return {
        WishList: state.WishList,
        Cart: state.Cart,
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
        addCartItem: (product, variation) => {
            dispatch(addCartItem(product, variation));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListItemRow);
