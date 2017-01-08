/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Image from './../../components/Image'
import Button from './../../components/Button';
import Constants from './../../Constants';
import {addCartItem, removeCartItem, deleteCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import {ListItem, Icon, Button as OnsButton} from 'react-onsenui';
import ons from 'onsenui';
class CartItemRow extends Component {
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
              padding: 0,
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
              lineHeight: '25px',
              minHeight: 25,
              minWidth: 26
          },
      }
  }
  static propTypes = {
      cartItem: PropTypes.object.isRequired,
      addCartItem: PropTypes.func.isRequired,
      addWishListItem: PropTypes.func.isRequired,
      removeWishListItem: PropTypes.func.isRequired,
      // onPress: PropTypes.func.isRequired,
  };

  render() {
    const _product = this.props.cartItem.product;
    const _variation = this.props.cartItem.variation;
    this.isInWishList = this.props.wishLists.find((item)=> item.product.id == _product.id) != undefined;

    const productImage = (
      <Image src={_product.images[0].src} width={"100%"} height={'auto'}/>
    );

    const productVariations = (<div style={this.styles.product_name}>
        {this.renderAttributeOptions(_variation)}
    </div>);

    return (
      <ListItem >
        <ons-row >
          <ons-col width="30%" height={120}>
              {productImage}
          </ons-col>
          <ons-col width="70%" height={120}>
            <div className="product" style={{paddingLeft: 5,flex: 1}}>
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
            fontSize: 18,
            fontWeight: "bold",
            marginRight: 5,
            marginTop: 15
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
          <h3 style={styles.price}>
              {Constants.Formatter.currency(_product.price) }
          </h3>
          <div style={{...styles.price, ...styles.sale_price}}>
              {_product.on_sale ? Constants.Formatter.currency(_product.regular_price) : ''}
          </div>
          {_product.on_sale ?
              <p style={{...styles.price, ...styles.sale_off}}>
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
        row_between: {
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
        },
        buttonLeft: {
            justifyContent: 'center',
            lineHeight: "25px",
            minHeight: 25,
            borderColor: Constants.Color.ViewBorder,
            borderWidth: 1,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            padding: "0 10px"
        },
        buttonMiddle: {
            justifyContent: 'center',
            padding: "5px 10px",
            borderColor: Constants.Color.ViewBorder,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            display: 'inline',
            //borderStyle: 'solid',
            //borderLeft: 'none',
            //borderRight: 'none'
        },
        buttonRight: {
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            lineHeight: "25px",
            minHeight: 25,
            borderColor: Constants.Color.ViewBorder,
            borderWidth: 1,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            padding: "0 10px"
        },
        buttonWishList: {},
        buttonDelete: {},
    }

    const {product, variation, quantity} =  this.props.cartItem;
    const hitBottomLimit = quantity == 1;
    const hitTopLimit = quantity == 10;
    const pnPressWishList = ()=> {
        if (this.isInWishList)
            this.props.removeWishListItem(product, variation)
        else
            this.props.addWishListItem(product, variation)
    }
    const onPressDelete = () => {
      self = this;
      ons.notification.confirm({
         message: 'Are you sure?',
         callback: function(answer) {
           if(answer){
             self.props.deleteCartItem(product, variation, quantity)
           }
         }
       });
    }
    return (
          <div style={this.styles.buttons_wrapper}>
              <div style={styles.row_between}>
                <div style={styles.row}>
                    <OnsButton style={styles.buttonLeft} modifier='outline' onClick={() => {
                        if (!hitBottomLimit)this.props.removeCartItem(product, variation)
                    }} >
                        <span style={{color: hitBottomLimit ? Constants.Color.DirtyBackground : Constants.Color.TextLight}}>-</span>
                    </OnsButton>
                    <div style={styles.buttonMiddle}>
                        <span>{quantity}</span>
                    </div>
                    <OnsButton modifier='outline' style={styles.buttonLeft} onClick={() => {
                        if (!hitTopLimit)this.props.addCartItem(product, variation)
                    }} >
                        <span style={{color: hitTopLimit ? Constants.Color.DirtyBackground : Constants.Color.TextLight}}>+</span>
                    </OnsButton>

                </div>
                <div style={styles.row}>
                {this.renderIconButton(this.isInWishList ? Constants.Icon.Wishlist : Constants.Icon.WishlistEmpty, pnPressWishList)}
                {this.renderIconButton(Constants.Icon.Delete, onPressDelete)}
                </div>
              </div>
          </div>
    );
  }


  renderIconButton(icon, callback) {
      return (
          <OnsButton onClick={callback} modifier='outline' style={this.styles.itemWrapper}>
              <Icon icon={icon} size={25}
                    style={{color:Constants.Color.ViewBorder}} fixed-width="true"/>
          </OnsButton>
      );
  }

}

const mapStateToProps = (state) => {
    return {
        Cart: state.Cart,
        wishLists: state.WishList.wishListItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCartItem: (product, variation) => {
            dispatch(addCartItem(product, variation));
        },
        removeCartItem: (product, variation) => {
            dispatch(removeCartItem(product, variation));
        },
        deleteCartItem: (product, variation, quantity) => {
            dispatch(deleteCartItem(product, variation, quantity));
        },
        addWishListItem: (product, variation) => {
            dispatch(addWishListItem(product, variation));
        },
        removeWishListItem: (product, variation) => {
            dispatch(removeWishListItem(product, variation));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemRow);
