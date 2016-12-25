import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Toolbar';
import Button from "./../../components/Button";
import CartItemRow from './CartItemRow';
import Constants from './../../Constants';
import { getRoute } from './../../routes'
import {
  Page,
  List,
  BottomToolbar
} from 'react-onsenui';

import ons from 'onsenui';

class Cart extends Component {

  constructor(props) {
    super(props);

    this.styles = {
        container: {flex: 1},
        container_total: {
            flexDirection: "row",
            paddingTop: 0,
            borderTopWidth: 1,
            borderTopColor: Constants.Color.ViewBorder,
            display: 'flex'
        },
        totalText: {
            flex: 1,
            color: Constants.Color.TextLight,
            fontSize: 16,
            fontWeight: "bold",
            paddingTop: 10
        },
        totalPrice: {
            flex: 1,
            color: Constants.Color.ProductPrice,
            alignItems: "center",
            textAlign: "right",
            fontWeight: "bold",
            marginRight: 50,
            paddingTop: 9
        }
    };

    this.opCheckOut = () => {
        if (this.props.Cart.cartItems.length === 0)
        {
          ons.notification.alert("No product in cart")
        }
        else {
          this.props.navigator.pushPage(getRoute('checkout'))
        }
    }
  }

  static propTypes = {
      Cart: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Page  key="Cart" renderBottomToolbar={this.renderButtonCheckout.bind(this)}>
        <Toolbar navigator={this.props.navigator} />
        <div style={this.styles.container}>
          <div style={{
              flex: 1,
              width: Constants.Dimension.ScreenWidth(0.9)
          }}>
          {this.props.Cart.cartItems.length == 0 ?
              this.renderError("No Cart Item") :
              this.renderCartItems(this.props.Cart.cartItems)}
          </div>
        </div>
      </Page>
    );
  }

  renderError(error) {
      return <div style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      }}>
          <p>{error}</p>
      </div>
  }

  renderCartItems(data) {
    const renderRow = (cartItem) => <CartItemRow key={cartItem.product.id} cartItem={cartItem}/>
    return <List
        dataSource={data}
        renderRow={renderRow}
        enableEmptySections={true}
    />
  }

  renderButtonCheckout(){
    return (
      <BottomToolbar modifier="material" >
      <div style={{ backgroundColor: 'white',padding: '0 20px', borderTop: '1px solid #ddd'}}>
        <div style={this.styles.container_total}>
            <label style={this.styles.totalText}>{'Total'}</label>
            <span style={ this.styles.totalPrice}>
                {Constants.Formatter.currency(this.props.Cart.totalPrice) }
            </span>
            <Button modifier='material--flat'
                onPress={this.opCheckOut.bind(this)}
                autoMargin={false}
                autoWidth={false}
                style={{height:35}}
                borderLess
            >
                {'Checkout'}
            </Button>
        </div>


      </div>
    </BottomToolbar>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.Cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
