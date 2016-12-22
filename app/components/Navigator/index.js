'use strict';
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setRoute } from '../../actions/route'
import { setSwipeable } from '../../actions/swipeable'
import { openMenu, closeMenu } from '../../actions/menu'
import {
  Navigator as OnsNavigator,
  Splitter,
  SplitterSide,
  SplitterContent
} from 'react-onsenui';

import Menu from '../../pages/menu'
import { getInitialRoute } from './../../routes'

import Constants from './../../Constants';


const initialRoute = getInitialRoute()

class Navigator extends Component {

  constructor (props){
    super(props);
    this.navigator = null;
    this.props.setSwipeable(false);
  }

  componentWillMount(){

  }

  renderPage = (route, navigator) => {
    this.navigator = navigator;
    //this.props.setRoute(route.id)
    //this.props.setSwipeable(route.swipeable)
    return (
      <route.component navigator={navigator} {...route} />
    );
  }


  onPostPop = (e, v) => {

    //console.log('onPostPop', e.navigator.page, e.enterPage, e.leavePage)
  }
  onPostPush = (e, v) => {

    //console.log('onPostPush', e.navigator.pages, e.enterPage.title, e.leavePage)
  }
  onPrePush = (e, v) => {
    //console.log(e);
    //console.log(v);
    //this.props.setRoute(e.routes.pushingRoute.id)
    //console.log('onPrePush', e.currentPage)
  }
  onPrePop = (e, v) => {
    //console.log('onPrePop', e.currentPage)
  }

  render() {
    const { openMenu, closeMenu, isOpen, currentRoute, isSwipeable} = this.props;

    return (
      <Splitter style={{maxWidth: 720, margin: "0 auto"}}>
        <SplitterSide
          side="left"
          isOpen={isOpen}
          onClose={closeMenu}
          onOpen={openMenu}
          width={240}
          collapse={true}
          isSwipeable={isSwipeable}>
          <Menu
            navigator={this.navigator}
            onMenuItemClick={closeMenu}
            currentRouteId={currentRoute} />
        </SplitterSide>

        <SplitterContent>
          <OnsNavigator
            initialRoute={initialRoute}
            renderPage={this.renderPage}
            onPrePush={this.onPrePush}
            onPostPush={this.onPostPush}
            onPrePop={this.onPrePop}
            onPostPop={this.onPostPop}
            animation='fade'
            animationOptions={{duration: 0.2, timing: 'ease-in'}}
            />
        </SplitterContent>
      </Splitter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.isMenuOpen,
    currentRoute: state.currentRoute,
    isSwipeable: state.isSwipeable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => dispatch(openMenu()),
    closeMenu: () => dispatch(closeMenu()),
    setRoute: id => dispatch(setRoute(id)),
    setSwipeable: swipeable => dispatch(setSwipeable(swipeable))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
