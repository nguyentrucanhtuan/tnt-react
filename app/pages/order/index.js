import React, {Component, PropTypes} from 'react';
import {Text, View, ListView, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import Toolbar from '../../components/Toolbar';
import ToolbarNative from "../../components/ToolbarNative";
//import Spinner from "../../components/Spinner"
import LogoSpinner from "./../../components/LogoSpinner";
import {selectCategoryOrder,fetchAllCategoriesOrder} from '../../reducers/Order/actions';
import {toggleProductViewMode, fetchProductsByCategoryId, fetchAllProducts} from '../../reducers/Product/actions';
import {addCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import {clearProducts} from '../../reducers/Product/actions';
import { getRoute } from './../../routes'
import { navigate } from './../../RouterManager'
import ProductCard from "./ProductCard"
import Constants from './../../Constants';
import TopBar from "./TopBar";
import ons from 'onsenui';
import {
  Page,
  BottomToolbar,
  List
} from 'react-onsenui';


class Order extends Component {
  constructor(props) {
      super(props);
      this.styles = {container: {flex: 1, height : Constants.Dimension.ScreenHeight() - 80}};
      this.currentCategoryId = -1;
      this.currentViewMode = this.props.Product.viewMode;
      this.pageNumber = 1;
      this.limitPerPage = 8;
  }

  static propTypes = {
    toggleProductViewMode: PropTypes.func.isRequired,
    selectCategoryOrder: PropTypes.func.isRequired,
    fetchProductsByCategoryId: PropTypes.func.isRequired,
    fetchAllProducts: PropTypes.func.isRequired,
    clearProducts: PropTypes.func.isRequired,
    addCartItem: PropTypes.func.isRequired,
    addWishListItem: PropTypes.func.isRequired,
    CategoryOrder: PropTypes.object.isRequired,
    Product: PropTypes.object.isRequired,

    initCategoryId: PropTypes.number.isRequired, //categoryId
    title: PropTypes.string.isRequired,
  }


  componentWillMount(){
    this.props.clearProducts();
    this.props.selectCategoryOrder(0,undefined)
  }

  componentDidMount() {
    if (this.props.CategoryOrder.categories.length == 0)
        this.props.fetchAllCategoriesOrder();


    console.log('have selectCategory')
    this.props.fetchProductsByCategoryId(this.props.CategoryOrder.selectedCategoryId, this.limitPerPage, this.pageNumber++);

  }
  componentWillReceiveProps(nextProps) {
    const {CategoryOrder, Product} = nextProps;
    console.log(Product);
    if (this.currentCategoryId !== CategoryOrder.selectedCategoryId) {
        this.currentCategoryId = CategoryOrder.selectedCategoryId;
        this.pageNumber = 1;
        this.props.fetchProductsByCategoryId(CategoryOrder.selectedCategoryId, this.limitPerPage, this.pageNumber++);
    }

    if (this.currentViewMode !== Product.viewMode) {
        this.currentViewMode = Product.viewMode;
        if (this.refs._listView !== undefined)
            this.refs._listView.scrollTo({x: 5, y: 5, animated: true}) //Scroll to top when view mode change
    }
  }


  gotoComponent(component) {
    this.props.navigator.pushPage({ comp: component });
  }
  render() {

    return (

      <View style={this.styles.container}>
          <ToolbarNative {...this.props}/>
          <TopBar toggleProductViewMode={this.props.toggleProductViewMode}
                    selectCategory={this.props.selectCategoryOrder}
                    viewMode={this.props.Product.viewMode}
                    categories={this.props.CategoryOrder.categories}
                    initCategoryId={this.props.initCategoryId}
                    initCategoryName={'Select Category'}
                    clearProducts={this.props.clearProducts}

            />
            {this.props.Product.products.length > 0 ?
                this.renderProducts(this.props.Product.products) : <LogoSpinner fullStretch/>
            }
      </View>
    );
  }

  renderProducts(data) {
    const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    const goToProduct = (productId) => {
      navigate('/products/'+productId)
    }

    const renderRow = (product) => {
       return (<ProductCard
           onPress={goToProduct}
           viewMode={this.props.Product.viewMode}
           product={product}
           addCartItem={this.props.addCartItem}
           addWishListItem={this.props.addWishListItem}
           removeWishListItem={this.props.removeWishListItem}
           wishLists= {this.props.wishLists}
       />);
    }



    const onEndReached = () => {
      if (!this.props.Product.isFetching && this.props.Product.stillFetch)
          this.props.fetchProductsByCategoryId(this.props.CategoryOrder.selectedCategoryId, this.limitPerPage, this.pageNumber++);
    }
    const renderFooter = () => {
      console.log('renderfooter')
      return (this.props.Product.stillFetch ? <View style={{height: 30}}/> :
          <View style={{
              height: 60,
              width: Constants.Dimension.ScreenWidth(),
              justifyContent: 'center',
              alignItems: 'center',
          }}>
              <Text style={{color: Constants.Color.TextDark, fontSize: 16}}>{'There Is No More'}</Text>
          </View>);
    }

    const onRefresh = () => {
      this.props.clearProducts();
      this.pageNumber = 1;
      this.props.fetchProductsByCategoryId(this.props.CategoryOrder.selectedCategoryId, this.limitPerPage, this.pageNumber++);
    }

    return (<ListView
        ref="_listView"
        contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: "flex-start"
        }}
        dataSource={dataSource.cloneWithRows(data)}
        renderRow={renderRow}
        onScroll={(e) => { console.log('ScrollView.onScroll', e); } }
        onEndReached={onEndReached}
        renderFooter={renderFooter}
        scrollEventThrottle={1000}
    />);
  }
}

const mapStateToProps = (state) => {
    return {
        CategoryOrder: state.CategoryOrder,
        Product: state.Product,
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
        toggleProductViewMode: () => {
            dispatch(toggleProductViewMode());
        },
        selectCategoryOrder: (selectedCategoryId, selectedCategoryName) => {
            dispatch(selectCategoryOrder(selectedCategoryId, selectedCategoryName));
        },
        fetchProductsByCategoryId: (categoryId, per_page, page) => {
            dispatch(fetchProductsByCategoryId(categoryId, per_page, page));
        },
        fetchAllProducts:  (per_page,page) => {
            dispatch(fetchAllProducts(per_page, page))
        },
        clearProducts: () => dispatch(clearProducts()),
        fetchAllCategoriesOrder: () => {
            dispatch(fetchAllCategoriesOrder());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
