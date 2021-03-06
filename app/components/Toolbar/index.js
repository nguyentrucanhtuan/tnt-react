import React, {Component} from 'react';

import { connect } from 'react-redux'
import { openMenu } from '../../actions/menu'
import { setRoute } from '../../actions/route'
import { getRoute } from './../../routes'
import {
  Toolbar as OnsToolbar,
  ToolbarButton,
  Icon,
  BackButton,
} from 'react-onsenui';
import ToolbarIcon from './ToolbarIcon'



class Toolbar extends React.Component {
  goBack = () => {
    const { navigator, setRoute } = this.props
    const pageToPop = navigator.pages[navigator.pages.length - 2]
    navigator.popPage().then(() => setRoute(pageToPop.props.id))
  }


  render() {
    const { openMenu, navigator } = this.props;
    const title = navigator.pages[navigator.pages.length - 1].props.title;

    const openWishList = () =>  {
      this.props.navigator.pushPage(getRoute('wishlist'))
    }

    const openShopCart = () => {
      this.props.navigator.pushPage(getRoute('cart'))
    }

    return (
      <OnsToolbar inline>
        <div className="left">
          {navigator && navigator.pages.length > 1 &&
            <BackButton onClick={this.goBack}>Back</BackButton>}

          {navigator && navigator.pages.length === 1 &&
            <ToolbarButton onClick={openMenu}>
              <Icon icon="ion-navicon, material:md-menu" />
            </ToolbarButton>}

        </div>
        <div className="center">{title}</div>
        <div className="right">
          <ToolbarIcon onPress={openWishList} icon={this.props.WishList.total == 0 ? "ion-ios-heart-outline" : "ion-ios-heart"} total={this.props.WishList.total}/>
          <ToolbarIcon onPress={openShopCart} icon={this.props.Cart.total == 0 ? "ion-ios-cart-outline" : "ion-ios-cart"} total={this.props.Cart.total}/>
        </div>
      </OnsToolbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Cart: state.Cart,
    WishList: state.WishList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => dispatch(openMenu()),
    setRoute: id => dispatch(setRoute(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
