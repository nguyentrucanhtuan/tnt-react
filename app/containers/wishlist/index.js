/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, ListView} from 'react-native';
import {connect} from 'react-redux';
import WishListItemRow from './WishListItemRow';
import Constants from './../../Constants';
import Toolbar from "./../../components/ToolbarNative";
import Button from "./../../components/ButtonNative";
import {addCartItem} from '../../reducers/Cart/actions'
import {emptyWishList} from '../../reducers/WishList/actions'
import {navigate} from '../../RouterManager'

class WishList extends Component {
  constructor(props) {
    super(props);
    this.styles = {
        container: {flex: 1},
        container_total: {
            flexDirection: "row",
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: Constants.Color.ViewBorder,
        },
        totalText: {
            flex: 1,
            color: Constants.Color.TextLight,
            fontSize: 16,
            fontWeight: "bold",
        },
        totalPrice: {
            flex: 1,
            color: Constants.Color.ProductPrice,
            alignItems: "center",
            textAlign: "right",
            fontWeight: "bold",
            marginRight: 5,
        }
    };

    this.opAddAllToCart = () => {
        if (this.props.WishList.wishListItems.length === 0) alert('EmptyAddToCart');
        else {
            this.props.WishList.wishListItems.forEach(wishlistItem => {
                const index = this.props.Cart.cartItems.findIndex((item)=> item.product.id == wishlistItem.product.id);
                const inCartTotal = index == -1 ? 0 : this.props.Cart.cartItems[index].quantity;
                this.props.addCartItem(wishlistItem.product, wishlistItem.variation);
            });
            navigate('/gio-hang');
        }
    }
  }

  static propTypes = {
      WishList: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={this.styles.container}>
          <Toolbar {...this.props}/>
          <View style={{
                flex: 1,
                width: Constants.Dimension.ScreenWidth(0.9),
                marginLeft: Constants.Dimension.ScreenWidth(0.05)
          }}>
            {this.props.WishList.wishListItems.length == 0 ?
                this.renderError('NoWishListItem') :
                this.renderWishListItems(this.props.WishList.wishListItems)}
            <Button
                    onPress={this.opAddAllToCart.bind(this)}
                    autoMargin={false}
                    borderLess>
                    {'MoveAllToCart'}
            </Button>
            <Button
                    onPress={() => this.props.emptyWishList()}
                    autoMargin={false}
                    style={{marginBottom: Constants.Dimension.ScreenWidth(0.05)}}
                    color='black'
                    overlayColor='white'>
                    {'EmptyWishList'}
            </Button>
         </View>

      </View>
    );
  }

  renderError(error) {
      return <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      }}>
          <Text>{error}</Text>
      </View>
  }

  renderWishListItems(data) {
      const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

      const renderRow = (wishListItem) => <WishListItemRow wishListItem={wishListItem}/>

      return <ListView
          dataSource={dataSource.cloneWithRows(data)}
          renderRow={renderRow}
          enableEmptySections={true}
      />
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
        emptyWishList: () => {
            dispatch(emptyWishList());
        },
        addCartItem: (product, variation) => {
            dispatch(addCartItem(product, variation));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
