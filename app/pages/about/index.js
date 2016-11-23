import React from 'react';
import Toolbar from '../../components/Toolbar';
import {
  Page
} from 'react-onsenui';

export default class About extends React.Component {
  gotoComponent(component) {
    this.props.navigator.pushPage({ comp: component });
  }
  render() {
    return (
      <Page  key="About">
        <Toolbar navigator={this.props.navigator} />
        <p style={{ padding: '0 15px' }}>
          This is a kitchen sink example that shows
          off the React extension for Onsen UI.
        </p>

        <p style={{ padding: '0 15px' }}>
          <a href="https://onsen.io/v2/react.html" target="_blank">
            <strong>Official site with docs</strong>
          </a>
        </p>
      </Page>
    );
  }
}
