import React, {Component} from 'react';
import classnames from 'classnames'
import styleable from 'react-styleable'

import {
  Page,
  Toolbar,
  List,
  ListItem
} from 'react-onsenui';


import { getRouteList } from './../../routes'

const menuItems = getRouteList()


class Menu extends Component {
  goTo(route) {
    const { navigator, onMenuItemClick, currentRouteId } = this.props;
    if ('home' === route.id) {
      return;
    //  navigator.resetPage(route)
    }else{
        navigator.pushPage(route)
        //navigator.resetPage(route)
    }
    //navigator.resetPage(route)

    onMenuItemClick()
  }
  render() {
    const { css, currentRouteId } = this.props;
    return (
      <Page >
        <Toolbar inline>
          <div className="center">Menu</div>
        </Toolbar>
        <List
          renderRow={item => (
            <ListItem
              key={item.id}
              onClick={this.goTo.bind(this, item) }
              className={classnames(
                { disabled: currentRouteId === item.id }
              ) }>
              {item.title}
            </ListItem>
          ) }
          dataSource={menuItems} />
      </Page>
    );
  }
}

export default Menu;
