import React from 'react';
import Toolbar from '../../components/Toolbar';
import {
  Page
} from 'react-onsenui';

export default class Product extends React.Component {
  gotoComponent(component) {
    this.props.navigator.pushPage({ comp: component });
  }
  render() {
    return (
      <Page  key={`product_{this.props.productId}`}>
        <Toolbar navigator={this.props.navigator} />
          <h3>Prodcut page</h3>
      </Page>
    );
  }
}
