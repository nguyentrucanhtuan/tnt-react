import React, {Component} from 'react';
import Toolbar from '../../components/Toolbar'
import { getRoute } from './../../routes'
import {
  Page,
  Button
} from 'react-onsenui';

export default class Home extends Component {
  goTo = id => this.props.navigator.pushPage(getRoute(id))
  render() {
    return (
      <Page key="Home">
        <Toolbar navigator={this.props.navigator} title={this.props.title} cart={this.props.cart} wishList={this.props.wishList}/>
        <p style={{ padding: '0 15px' }}>
          This is a kitchen sink example that shows
          off the React extension for Onsen UI.
        </p>
        <Button onClick={this.goTo.bind(this, 'longList') }>
          Go to the long list demo
        </Button>
      </Page>
    );
  }
}
