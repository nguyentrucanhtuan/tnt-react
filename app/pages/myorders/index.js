'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Toolbar from "./../../components/Toolbar";
import Spinner from "./../../components/Spinner";
import Constants from './../../Constants';
import WooWorker from './../../services/WooWorker'

import {
  Page,
  List, ListItem
} from 'react-onsenui';

const cardMargin = Constants.Dimension.ScreenWidth(0.05);

class MyOrders extends Component {
    constructor(props) {
      super(props);
      this.data = [];
      this.state = {
          isLoading: false,       // Flag to know we are retrieving product data or not.

      }
    }

    static propTypes = {
        customer: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.fetchProductsData();
    }

    fetchProductsData() {
      console.log(this.props.customer)
      if (this.props.customer.id == undefined) return;
      let self = this;
      self.setState({isLoading: true});
        WooWorker.ordersByCustomerId(this.props.customer.id, (data) => {
          self.data = self.data.concat(data);
          self.setState({
              isLoading: false
          });
        });
    }

    render() {
      return (
        <Page  key="MyOrders">
          <Toolbar navigator={this.props.navigator} />
          {this.state.isLoading ? <Spinner fullStretch/> :
              <div style={{flex: 1}}>
                {this.data.length == 0 ? this.renderError("You don't have any orders") :
                  <List dataSource={this.data} renderRow={this.renderRow}> </List>}
              </div>}
        </Page>
      );
    }

    renderRow(_order) {}

    renderError(error) {
      return <div style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          paddding: 10
      }}>
          <p>{error}</p>
      </div>
    }
}

const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
