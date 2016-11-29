import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from './../../components/Toolbar'
import Spinner from "./../../components/Spinner"
import Constants from './../../Constants';
import Category from './../../components/Category';
import { getRoute } from './../../routes'
import {fetchAllCategories, selectCategory} from './../../reducers/Category/actions'
//import {clearProducts} from '../../reducers/Product/actions'
import {
  Page,
  Button,
  List,
  ListItem
} from 'react-onsenui';

class Home extends Component {
  constructor(props) {
      super(props);
      this.styles = {
          container: {flex: 1},
          imageCard: {
              width: Constants.Dimension.ScreenWidth(1),
              height: 200,
          },
          mainCategoryText: {
              color: 'white',
              fontSize: 25
          },
          numberOfProductsText: {
              color: 'white',
              fontSize: 25
          }
      };
  }

  static propTypes = {
      Category: PropTypes.object.isRequired,
      clearProducts: PropTypes.func.isRequired,
  };

  componentDidMount() {
      if (this.props.Category.categories.length == 0)
          this.props.fetchAllCategories();
  }


  goTo = id => this.props.navigator.pushPage(getRoute(id))
  render() {
    const subCategories = this.props.Category.categories.filter(category => category.parent === Constants.WooCommerce.RootCategoryId);
    return (
      <Page key="Home">
        <Toolbar navigator={this.props.navigator} title={this.props.title} cart={this.props.cart} wishList={this.props.wishList}/>
          {this.props.Category.isFetching ?
              <Spinner fullStretch/> :
              this.props.Category.error ?
                  this.renderError(this.props.Category.error) :
                  this.renderCategories(subCategories)

          }
      </Page>
    );
  }

  renderCategories(categories) {
    return (
      <List
        dataSource={categories}
        renderRow={(category) => <Category key={category.id} navigator={this.props.navigator} {...category}></Category>}
      />
    );
  }

  renderError(error) {
    console.log(error);
  }
}

const mapStateToProps = (state) => {
    return {
        Category: state.Category,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCategories: () => {
            dispatch(fetchAllCategories());
        },
        selectCategory: (selectedCategoryId, selectedCategoryName) => {
            dispatch(selectCategory(selectedCategoryId, selectedCategoryName));
        },
        clearProducts: () => dispatch(clearProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
