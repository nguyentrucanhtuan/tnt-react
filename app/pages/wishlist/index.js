import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Toolbar';
import Button from "./../../components/Button";
import Constants from './../../Constants';
import WishListItemRow from './WishListItemRow';
import {addCartItem} from '../../reducers/Cart/actions'
import {emptyWishList} from '../../reducers/WishList/actions'
import { getRoute } from './../../routes'

import {
  Page,
  List,
  BottomToolbar
} from 'react-onsenui';

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
        if (this.props.WishList.wishListItems.length === 0) alert("Empty Add To Cart");
        else {
            this.props.WishList.wishListItems.forEach(wishlistItem => {
                const index = this.props.Cart.cartItems.findIndex((item)=> item.product.id == wishlistItem.product.id);
                const inCartTotal = index == -1 ? 0 : this.props.Cart.cartItems[index].quantity;
                if (inCartTotal < 100)
                    this.props.addCartItem(wishlistItem.product, wishlistItem.variation);
                else
                    console.log('limit')
            });
            //Actions.cart({type: 'replace'});
        }
    }

  }


  static propTypes = {
      WishList: PropTypes.object.isRequired,
  };


  render() {
    return (
      <Page key="WishList" renderBottomToolbar={this.renderButtonGroup.bind(this)}>
        <Toolbar navigator={this.props.navigator} />
        <div style={this.styles.container}>
          {this.props.WishList.wishListItems.length == 0 ?
              this.renderError("No WishList Item") :
              this.renderWishListItems(this.props.WishList.wishListItems)}

        </div>
      </Page>
    );
  }

  renderButtonGroup(){
    return (
      <BottomToolbar modifier="material" >
        <div style={{ backgroundColor: 'white'}}>
          <Button
              onPress={this.opAddAllToCart.bind(this)}
              autoMargin={true}
              autoWidth={false}
              style={{
                width: Constants.Dimension.ScreenWidth(0.43) ,
                height: 35,
                marginBottom: Constants.Dimension.ScreenWidth(0.02)}}
              borderLess>
             {"Move All To Cart"}
          </Button>
          <Button
              onPress={() => this.props.emptyWishList()}
              autoMargin={true}
              autoWidth={false}
              style={{
                width: Constants.Dimension.ScreenWidth(0.43) ,
                height: 35,
                marginBottom: Constants.Dimension.ScreenWidth(0.02)}}
              color='black'
              overlayColor='white'>
              {"Empty Wish List"}
          </Button>
      </div>
    </BottomToolbar>
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

  renderWishListItems(data) {
    //  const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

      const renderRow = (wishListItem) => <WishListItemRow key={wishListItem.product.id} wishListItem={wishListItem}/>

      return <List
          dataSource={data}
          renderRow={renderRow}
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
