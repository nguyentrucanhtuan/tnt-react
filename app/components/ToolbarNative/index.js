/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet, Platform} from "react-native";
import {connect} from 'react-redux';
import AppEventEmitter from './../../utils/AppEventEmitter';
import Constants from './../../Constants';
import ToolbarIcon from './ToolbarIcon';
import { navigate } from './../../RouterManager'
import {
  Icon,
} from 'react-onsenui';
class ToolbarNative extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.styles = {
        currentToolbar: {},
        baseToolbar: {
            marginTop: Platform.OS === 'ios' ? 15 : 0,
            flexDirection: "row",
            justifyContent: "space-between",
            height: 40,
            width: Constants.Dimension.ScreenWidth(),
        },
        toolbar_LeftGroup: {
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: 'transparent',
            height: 40,
            width: undefined,
        },
        itemWrapper: {
            justifyContent: 'center',
            padding: 10,
            marginRight: 10,
        },
        rightButtonGroup: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        currentTitle: {},
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 0,
            color: Constants.Color.ToolbarText,
        },
        titleTransparent: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 0,
            color: Constants.Color.ToolbarTextTrans
        },
        EmptyIcon: {height: 40, width: 50},
    }
  }

  render() {
    const titleOnPress = () => {
        if (this.props.back)
            //Actions.pop()
            console.log('go back')
        else
            AppEventEmitter.emit(Constants.EmitCode.SideMenuOpen)
    }
    const title = (
        <TouchableOpacity style={[this.styles.itemWrapper, {marginLeft: -15}]}
                          onPress={titleOnPress}>
            <Text style={this.styles.currentTitle}>{this.props.title}</Text>
        </TouchableOpacity>);
    return (
      <View style={this.styles.baseToolbar}>
        <View style={this.styles.toolbar_LeftGroup}>
            {this.renderMenu() }
            {title }
        </View>
        <View style={this.styles.rightButtonGroup}>
          {this.props.search ? this.renderSearch() : <View/> }
          {this.props.wishList ? this.renderWishList(this.props.WishList.total) : <View/> }
          {this.props.cart ? this.renderCart(this.props.Cart.total) : <View/> }
        </View>
      </View>
    );
  }

  renderButton(icon, callback) {
      return (
          <TouchableOpacity onPress={callback} style={this.styles.itemWrapper}>
              <Icon icon={icon} size={25}
                    style={{color: this.props.transparentMode ? Constants.Color.ToolbarIconTrans : Constants.Color.ToolbarIcon}}/>
          </TouchableOpacity>
      );
  }


  renderMenu() {
      const openMenu = () => AppEventEmitter.emit(Constants.EmitCode.SideMenuOpen);
      const goBack = () => {
          if (this.backEnable) {
              this.backEnable = false;
              //Actions.pop();
          }
      }

      return this.props.back == true ? this.renderButton(Constants.Icon.Back, goBack)
          : this.renderButton(Constants.Icon.Menu, openMenu);
  }


  renderCart(number) {
      const openCart = () => {
          navigate('/gio-hang')
      }
      return <ToolbarIcon name={number == 0 ? Constants.Icon.ShoppingCartEmpty : Constants.Icon.ShoppingCart}
                          onPress={openCart} total={number}/>
  }


  renderWishList(number) {
      const openWishList = () => {
            navigate('/thuong-mua')
      }
      return <ToolbarIcon name={number == 0 ? Constants.Icon.WishlistEmpty : Constants.Icon.Wishlist}
                          onPress={openWishList} total={number}/>
  }

  renderSearch() {
      const openWishList = () => AppEventEmitter.emit(Constants.EmitCode.SearchModalOpen);
      return <ToolbarIcon name={Constants.Icon.Search} onPress={openWishList}/>
  }
}

const mapStateToProps = (state) => {
    return {
        routes: state.routes,
        Cart: state.Cart,
        WishList: state.WishList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarNative);
