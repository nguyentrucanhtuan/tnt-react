/**
 * Created by Luan on 10/28/2016.
 */

import React, {Component, PropTypes} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-collapsible';
import Constants from './../../Constants';
import {ProductViewMode} from '../../reducers/Product/actions'

import {
  Icon,
} from 'react-onsenui';

const {LIST_VIEW} =  ProductViewMode;

export default class TopBar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          hideSubCategory: false,
      }
      this.styles = {
          topBar: {
              backgroundColor: Constants.Color.TopBar,
              height: undefined,
              width: Constants.Dimension.ScreenWidth(),
              //elevation: 5,
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
              padding: 10,
              borderLeftWidth: 1,
              borderColor: Constants.Color.ViewBorder,
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
    const isListMode = this.props.viewMode === LIST_VIEW;
    const filterText = this.state.hideSubCategory ? "ShowFilter" : "HideFilter";
    const filterIcon = this.state.hideSubCategory ? Constants.Icon.ShowItem : Constants.Icon.HideItem;

    const filterButton = this.renderIconWithText(filterText, filterIcon, () => this.setState({hideSubCategory: !this.state.hideSubCategory}))

    const sortButton = this.renderIconWithText("Sort", Constants.Icon.Sort, () => alert("Mock Sort"))
    const viewModeButton = this.renderIcon(isListMode ?
        Constants.Icon.ListMode : Constants.Icon.GridMode, this.props.toggleProductViewMode)


    return (
        <View style={this.styles.topBar}>
          <View style={this.styles.top_topBar}>
            {filterButton}
            {viewModeButton}
          </View>
          <Collapsible open={this.state.hideSubCategory}>
            <View>
                <TouchableOpacity
                    key={"cate_default"}
                    style={this.styles.listItem}
                    onPress={() => this.onSelect(this.props.initCategoryId, undefined)}
                >
                    <Text style={this.styles.listItemText}>{this.props.initCategoryName}</Text>
                </TouchableOpacity>
                {this.renderCategories(this.props.initCategoryId, this.props.categories, 1)}
            </View>
          </Collapsible>
        </View>
     );
  }

  renderIcon(icon, callback) {
      return (
          <TouchableOpacity
              onPress={callback}
              style={this.styles.iconWrapper}
          >
              <Icon
                  icon={icon}
                  size={30}
                  style={{icon : Constants.Color.TopBarIcon}}
              />
          </TouchableOpacity>
      );
  }

  renderIconWithText(text, icon, callback) {
      return (
          <TouchableOpacity
              onPress={callback}
              style={this.styles.iconWithTextWrapper}
          >
              <Icon
                  icon={icon}
                  size={20}
                  style={{marginRight: 10,color:Constants.Color.TopBarIcon}}
              />
              <Text style={this.styles.buttonText}>{text}</Text>
          </TouchableOpacity>
      );
  }

  renderCategories(initCategoryId, categories, level = 0) {
      const subCategories = categories.filter(category => category.parent === initCategoryId);
      return subCategories.map((category, index)=> (
          <TouchableOpacity
              key={"cate_" + index}
              style={this.styles.listItem}
              onPress={() => this.onSelect(category.id, category.name)}
          >
              <Text style={this.styles.listItemText}>{'--'.repeat(level) + " " + category.name}</Text>
              {this.renderCategories(category.id, categories, level + 1)}
          </TouchableOpacity>
      ));
  }

  onSelect(categoryId, categoryName) {
      this.props.clearProducts();
      this.props.selectCategory(categoryId, categoryName);
  }

}
