import React, {Component} from 'react';
import {connect} from 'react-redux';

import {selectCategory} from '../../reducers/Category/actions'
import {ListItem, Icon} from 'react-onsenui';
import { getRoute } from './../../routes'
class Category extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListItem onClick={() => {
          this.props.selectCategory(this.props.id, undefined);
          this.props.navigator.pushPage(Object.assign({},getRoute('category'), {initCategoryId: this.props.id, title: this.props.name}))
        }} tappable>
        <div>
          <h2>{this.props.name}</h2>
        </div>
      </ListItem>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCategory: (selectedCategoryId, selectedCategoryName) => {
            dispatch(selectCategory(selectedCategoryId, selectedCategoryName));
        },
    }
}

export default connect(undefined,mapDispatchToProps)(Category);
