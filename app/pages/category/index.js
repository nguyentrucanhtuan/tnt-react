import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Toolbar';

import {selectCategory} from '../../reducers/Category/actions';
import {toggleProductViewMode, fetchProductsByCategoryId} from '../../reducers/Product/actions';
import {clearProducts} from '../../reducers/Product/actions';

import {
  Page
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

  componentDidMount() {
      this.props.fetchProductsByCategoryId(this.props.Category.selectedCategoryId, this.limitPerPage, this.pageNumber++);
  }


  gotoComponent(component) {
    this.props.navigator.pushPage({ comp: component });
  }
  render() {
    return (
      <Page  key="Category">
        <Toolbar navigator={this.props.navigator} />
        <p style={{ padding: '0 15px' }}>
          Category page
        </p>


      </Page>
    );
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
