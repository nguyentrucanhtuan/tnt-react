/**
 * Created by luanp on 22/09/2016.
 */
'use strict';

import React, {Component, PropTypes} from "react";
import {Text, TextInput, View, TouchableOpacity, ListView, RefreshControl} from "react-native";
import {connect} from "react-redux";
import {Icon} from 'react-onsenui';
import TimerMixin from 'react-timer-mixin';

import Constants from "./../../Constants";
import ItemRow from "./ItemRow";
import AppEventEmitter from './../../utils/AppEventEmitter';
import WooWorker from './../../services/WooWorker';
// import {selectCategory} from '../../reducers/Category/actions'
import { openSearch, closeSearch } from '../../actions/search'
import {navigate} from '../../RouterManager'
class SearchPanel extends Component {
    constructor(props) {
      super(props);
      this.data = [];
      this.state = {
          text: '',
          page: 1,                // Page counter (the numbers of fetch we done).
          limit: 8,               // 5 product per fetch.
          isLoading: false,       // Flag to know we are retrieving product data or not.
          searched: false,
          finish: false,          // Flag to know there is remain product to fetch from server.
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => true
          })
      }

      this.getDataSource = (products) => this.state.dataSource.cloneWithRows(products);
    }

    componentDidMount() {
        TimerMixin.setTimeout(() => this.refs.textInput != undefined && this.refs.textInput.focus(), 400);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderSearchBar()}
                <View style={{flex: 1,maxHeight: Constants.Dimension.ScreenHeight()*0.8 - 50}}>
                  {this.data.length == 0 ?
                      <Text
                          style={{textAlign: 'center'}}>{this.state.searched ? 'Không tìm thấy kết quả' : ''}</Text> :
                      this.renderResultList()
                  }
                </View>
            </View>
        );
    }

    renderSearchBar() {

      const closeButton = (
          <TouchableOpacity
              onPress={() => this.props.closeSearch()}
              style={{width: 50, justifyContent: 'center', alignItems: 'center',}}>
              <Icon icon={Constants.Icon.Close} size={30} style={{color: '#afafaf'}}/>
          </TouchableOpacity>);

      const separate = <View style={{borderLeftWidth: 1, borderColor: Constants.Color.DirtyBackground}}/>
      const searchInput = (
          <TextInput
              ref="textInput"
              placeholder={'Tìm kiếm sản phẩm'}
              style={{flex: 1, marginLeft: 10, fontSize: 18, color: "#777474"}}
              value={this.state.text}
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={() => this.startNewSearch()}
          />);
      return (
          <View style={{
              height: 50,
              flexDirection: 'row',
              marginTop:  0, marginBottom: 10,
              borderBottomWidth: 1,
              borderColor: Constants.Color.DirtyBackground,
          }}>
              {closeButton}
              {separate}
              {searchInput}
          </View>
      );
    }


    renderResultList() {
        const onEndReached = () => {
            if (!this.state.isLoading) this.fetchSearchResults()
        }
        const onPress = (productId) => {
            navigate('/products/'+productId)
            this.props.closeSearch()
        }
        return (
            <ListView
                onEndReached={onEndReached}
                dataSource={this.state.dataSource}
                renderRow={(item) => <ItemRow product={item} onPress={onPress}/>}
                style={{}}
            />
        );
    }


    fetchSearchResults(newSearch = false, page = this.state.page, finish = this.state.finish) {
        if (finish) return;
        const callback = (data) => {
            this.data = newSearch ? data : this.data.concat(data);
            this.setState({
                page: this.state.page + 1,
                finish: data.length < this.state.limit,
                dataSource: this.getDataSource(this.data),
                isLoading: false,
                searched: true
            });
        }

        this.setState({isLoading: true});
        WooWorker.productsByName(callback, null, this.state.text, this.state.limit, page);
    }
    startNewSearch() {
        this.setState({
            page: 1,
            finish: false,
            isLoading: true,
        })
        this.fetchSearchResults(true, 1, false)
    }
}


const mapStateToProps = (state) => {
    return {
        //currentScene: state.routes.scene.name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
//        clearProducts: () => dispatch(clearProducts()),
      openSearch: () => dispatch(openSearch()),
      closeSearch: () => dispatch(closeSearch()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
