import React, {Component, PropTypes} from 'react';

import Constants from './../../Constants';

import {ProductViewMode} from '../../reducers/Product/actions'
const {LIST_VIEW} =  ProductViewMode;

import {
  BottomToolbar,
  ToolbarButton,
  Icon,
  BackButton,
} from 'react-onsenui';
export default class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hideSubCategory: true,
    }

    this.styles = {
        topBar: {
            backgroundColor: Constants.Color.TopBar,
            height: undefined,
            width: Constants.Dimension.ScreenWidth(),
            elevation: 5,
        },
        top_topBar: {
            flexDirection: "row",
            justifyContent: "space-between",
            height: 40,
            borderColor: Constants.Color.ViewBorder,
            borderBottomWidth: 1,
            borderTopWidth: 1,
        },
        iconWrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            borderLeftWidth: 1,
            //borderColor: Constants.Color.ViewBorder,
            width: 50,
        },
        iconWithTextWrapper: {
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginLeft: 20,
        },
        buttonText: {color: 'black', fontSize: 15},
        listItemText: {color: 'black', fontSize: 14},
        listItem: {paddingLeft: 20, minHeight: 30, justifyContent: 'center'},
    }
  }

  static propTypes = {
      toggleProductViewMode: PropTypes.func.isRequired,
      selectCategory: PropTypes.func.isRequired,
      clearProducts: PropTypes.func.isRequired,

      categories: PropTypes.array.isRequired,
      viewMode: PropTypes.string.isRequired,

      initCategoryId: PropTypes.number.isRequired,
      initCategoryName: PropTypes.string.isRequired,
  };

  render() {

      // this.styles = Object.assign({}, this.styles, {});
    const isListMode = this.props.viewMode === LIST_VIEW;
    const filterText = this.state.hideSubCategory ? "Show Filter" : "Hide Filter";
    const filterIcon = this.state.hideSubCategory ? Constants.Icon.ShowItem : Constants.Icon.HideItem;

    const filterButton = this.renderIconWithText(filterText, filterIcon, () => this.setState({hideSubCategory: !this.state.hideSubCategory}))
    const sortButton = this.renderIconWithText("Sort", Constants.Icon.Sort, () => alert("Mock Sort"))
    const viewModeButton = this.renderIcon(isListMode ?
        Constants.Icon.ListMode : Constants.Icon.GridMode, this.props.toggleProductViewMode)
    // {sortButton}

    return (
      <BottomToolbar modifier="material">
        <ons-row>
           <ons-col width="85%"> {filterButton} </ons-col>
           <ons-col width="15%"> {viewModeButton} </ons-col>
        </ons-row>
      </BottomToolbar>

    );
  }

  renderIcon(icon, callback) {
    return (
      <ToolbarButton onClick={callback} style={this.styles.iconWrapper}>
        <Icon icon="ion-ios-heart-outline" />
      </ToolbarButton>
    );
  }
  renderIconWithText(text, icon, callback) {
    <ToolbarButton onClick={callback}>
      <Icon icon="ion-navicon, material:md-menu" size={20} style={{marginRight: 10}}/>
      {text}
    </ToolbarButton>
  }
}


<FilterBar toggleProductViewMode={this.props.toggleProductViewMode}
        selectCategory={this.props.selectCategory}
        viewMode={this.props.Product.viewMode}
        categories={this.props.Category.categories}
        initCategoryId={this.props.initCategoryId}
        initCategoryName={this.props.title}
        clearProducts={this.props.clearProducts}
/>
