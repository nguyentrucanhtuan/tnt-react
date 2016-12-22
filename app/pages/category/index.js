import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Toolbar';
import Spinner from "../../components/Spinner"
import {selectCategory} from '../../reducers/Category/actions';
import {toggleProductViewMode, fetchProductsByCategoryId} from '../../reducers/Product/actions';
import {clearProducts} from '../../reducers/Product/actions';
import { getRoute } from './../../routes'

//import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";

import {
  Page,
  BottomToolbar,
  List
} from 'react-onsenui';

class Category extends Component {
  constructor(props) {
      super(props);
      this.currentCategoryId = this.props.initCategoryId;
      this.currentViewMode = this.props.Product.viewMode;
      this.pageNumber = 1;
      this.limitPerPage = 8;
  }

  static propTypes = {
    toggleProductViewMode: PropTypes.func.isRequired,
    selectCategory: PropTypes.func.isRequired,
    fetchProductsByCategoryId: PropTypes.func.isRequired,
    clearProducts: PropTypes.func.isRequired,

    Category: PropTypes.object.isRequired,
    Product: PropTypes.object.isRequired,

    initCategoryId: PropTypes.number.isRequired, //categoryId
    title: PropTypes.string.isRequired,
  }
  componentWillMount(){
    this.props.clearProducts();
  }

  componentDidMount() {
      this.props.fetchProductsByCategoryId(this.props.Category.selectedCategoryId, this.limitPerPage, this.pageNumber++);
  }

  componentWillReceiveProps(nextProps) {
     const {Category, Product} = nextProps;
     if (this.currentCategoryId !== Category.selectedCategoryId) {
       this.currentCategoryId = Category.selectedCategoryId;
       this.pageNumber = 1;

       this.props.fetchProductsByCategoryId(Category.selectedCategoryId, this.limitPerPage, this.pageNumber++);
     }

     if (this.currentViewMode !== Product.viewMode) {

     }
  }


  gotoComponent(component) {
    this.props.navigator.pushPage({ comp: component });
  }
  render() {
    //const title = this.props.title + (this.props.Category.selectedCategoryId === this.props.initCategoryId
          //  ? '' : ' - ' + this.props.Category.selectedCategoryName);
    return (
      <Page  key="Category">
        <Toolbar navigator={this.props.navigator} cart={true} wishList={true}/>

          {this.props.Product.products.length > 0 ?
              this.renderProducts(this.props.Product.products) : <Spinner fullStretch/>
          }
      </Page>
    );
  }

  renderProducts(data) {
    //const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    const goToProduct = (productId) =>{
       this.props.navigator.pushPage(Object.assign({},getRoute('product'), {productId: productId}))
    }
    const renderRow = (product) => (
        <ProductCard
            key={product.id}
            navigator={this.props.navigator}
            onPress={goToProduct}
            viewMode={this.props.Product.viewMode}
            product={product}
        />
    );
    return <List
      ref="_listView"
      dataSource={data}
      renderRow={renderRow}
    />
  }
}


const mapStateToProps = (state) => {
    return {
        Category: state.Category,
        Product: state.Product,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProductViewMode: () => {
            dispatch(toggleProductViewMode());
        },
        selectCategory: (selectedCategoryId, selectedCategoryName) => {
            dispatch(selectCategory(selectedCategoryId, selectedCategoryName));
        },
        fetchProductsByCategoryId: (categoryId, per_page, page) => {
            dispatch(fetchProductsByCategoryId(categoryId, per_page, page));
        },
        clearProducts: () => dispatch(clearProducts()),
    }
}

//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(mapStateToProps, mapDispatchToProps)(Category);
