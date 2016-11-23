import React, {Component} from 'react';

import { connect } from 'react-redux'
import { openMenu } from '../../actions/menu'
import { setRoute } from '../../actions/route'
import {
  Toolbar as OnsToolbar,
  ToolbarButton,
  Icon,
  BackButton,
} from 'react-onsenui';
import ToolbarIcon from './ToolbarIcon'



class Toolbar extends React.Component {
  goBack = () => {
    const { navigator, setRoute } = this.props
    const pageToPop = navigator.pages[navigator.pages.length - 2]
    navigator.popPage().then(() => setRoute(pageToPop.props.id))
  }
  render() {
    const { openMenu, navigator } = this.props;
    const title = navigator.pages[navigator.pages.length - 1].props.title;


    return (
      <OnsToolbar inline>
        <div className="left">
          {navigator && navigator.pages.length > 1 &&
            <BackButton onClick={this.goBack}>Back</BackButton>}

          {navigator && navigator.pages.length === 1 &&
            <ToolbarButton onClick={openMenu}>
              <Icon icon="ion-navicon, material:md-menu" />
            </ToolbarButton>}

        </div>
        <div className="center">{title}</div>
        <div className="right">
          <ToolbarIcon icon={"ion-ios-heart-outline"} />
          <ToolbarIcon icon={"ion-ios-cart-outline"} total={2}/>
        </div>
      </OnsToolbar>
    );
  }
}

const mapStateToProps = _state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => dispatch(openMenu()),
    setRoute: id => dispatch(setRoute(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
