'use strict';

import React, {Component, PropTypes} from "react";
import {Image, Text, View, TouchableOpacity, ScrollView} from "react-native";
import {connect} from 'react-redux';
import {Icon} from "react-onsenui";

import Spinner from './../../components/Spinner';
import Lock, {LOCK_OPTIONS} from "./../../services/Auth0";
import WooWorker from "./../../services/WooWorker";
import {signIn, signOut} from './../../reducers/Customer/actions';
import { openMenu, closeMenu } from '../../actions/menu'
import css from "./css";
import AppEventEmitter from './../../utils/AppEventEmitter';
import Constants from "../../Constants"

/**
 * This is navigator bar as side menu.
 * This component is always on mount state in all application scences.
 * Put any global checking process in this class
 *
 * @class SideMenu
 */

class SideMenu extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
      }

      this.styles = {
          sideMenu: {
              backgroundColor: Constants.Color.SideMenu,
              flex: 1,

          },
          menuRow: {
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
          },
          icon: {
              fontSize: 24,
              marginRight: 20
          },
          avatar: {height: 60, width: 60, borderRadius: 30},
          avatar_background: {width: 240, height: 150, padding: 20,},
          fullName: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
          email: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
      }
      this.dispatchWrapper = (func) => {
          func();
          this.props.closeMenu();
      }
  }

  static propTypes = {
      customer: PropTypes.object.isRequired,
      signOut: PropTypes.func.isRequired,
      signIn: PropTypes.func.isRequired,
  };

  render() {
      const {signOut} = this.props;
      let fullName = 'Guest Account';
      let email = '';
      let picture = Constants.Image.DefaultAvatar;
      if (this.props.customer.email !== undefined) {
          fullName = this.props.customer.first_name + ' ' + this.props.customer.last_name;
          email = this.props.customer.email;
          picture = {uri: this.props.customer.avatar_url};
      }

      const renderSignIn = () => (
          <TouchableOpacity
              style={this.styles.menuRow}
              onPress={() => this.login() }>
              <Icon icon={Constants.Icon.SignIn} style={css.icon}/>
              <Text style={css.menuLink}>{'Đăng nhập'}</Text>
          </TouchableOpacity>);
      const renderSignOut = () => (
          <TouchableOpacity
              style={this.styles.menuRow}
              onPress={() => this.signOut() }>
              <Icon icon={Constants.Icon.SignOut} style={{color:Constants.Color.SideMenuIcon,...css.icon}} />
              <Text style={css.menuLink}>{'Đăng xuất'}</Text>
          </TouchableOpacity>);
      return (
        <View style={this.styles.sideMenu}>
          {this.state.isLoading ? <View style={this.styles.avatar_background}><Spinner fullStretch/></View> :
              <Image
                  source={Constants.Image.AvatarBackground}
                  style={this.styles.avatar_background}
                  resizeMode='cover'
              >
                  <Image source={picture} style={this.styles.avatar}/>
                  <Text style={this.styles.fullName}>{fullName}</Text>
                  <Text style={this.styles.email}>{email}</Text>
              </Image>}
           <ScrollView style={{padding: 20}}>
              {this.props.customer.email == undefined ? renderSignIn() : renderSignOut()}
              <TouchableOpacity
                  style={this.styles.menuRow}
                  underlayColor="#2D2D30"
                  onPress={() => this.dispatchWrapper(() => console.log('Go to Home'))}>
                  <Icon icon={Constants.Icon.Home}  style={{color:Constants.Color.SideMenuIcon,...css.icon}}/>
                  <Text style={css.menuLink}>{'Trang chủ'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={this.styles.menuRow}
                  underlayColor="#2D2D30"
                  onPress={() => this.dispatchWrapper(() => console.log('Go to WishList'))}>
                  <Icon icon={Constants.Icon.Wishlist}  style={{color:Constants.Color.SideMenuIcon,...css.icon}}/>
                  <Text style={css.menuLink}>{'WishList'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={this.styles.menuRow}
                  underlayColor="#2D2D30"
                  onPress={() => this.dispatchWrapper(() => console.log('Go to My Order'))}>
                  <Icon icon={Constants.Icon.MyOrder}  style={{color: Constants.Color.SideMenuIcon,...css.icon}}/>
                  <Text style={css.menuLink}>{'My Order'}</Text>
              </TouchableOpacity>
           </ScrollView>
        </View>
      );
  }

  login() {

  }
}

const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (customer) => {
            dispatch(signIn(customer));
        },
        signOut: () => {
            dispatch(signOut());
        },
        openMenu: () => dispatch(openMenu()),
        closeMenu: () => dispatch(closeMenu()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
