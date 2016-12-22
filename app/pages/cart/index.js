import React from 'react';
import Toolbar from '../../components/Toolbar';
import {
  Page
} from 'react-onsenui';

export default class Cart extends React.Component {
  gotoComponent(component) {
    this.props.navigator.pushPage({ comp: component });
  }
  render() {
    return (
      <Page  key="Cart">
        <Toolbar navigator={this.props.navigator} />
        <h3>Cart Page</h3>
      </Page>
    );
  }
}
