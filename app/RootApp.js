'use strict';
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { openMenu, closeMenu } from './actions/menu'
import { openSearch, closeSearch } from './actions/search'
import {
  Page,
  Splitter,
  SplitterSide,
  SplitterContent,
  Modal
} from 'react-onsenui';
import Constants from './Constants';

import SideMenu from "./containers/sidemenu";
import SearchPanel from "./components/SearchPanel";

class RootApp extends Component {
  constructor (props){
    super(props);
  }

  render() {
    const { openMenu, closeMenu, isOpen, isSearchOpen} = this.props;
    return (
      <Splitter style={{maxWidth: 740, margin: "0 auto"}}>
          <SplitterSide
            side='left'
            width={240}
            collapse={true}
            isSwipeable={true}
            isOpen={isOpen}
            onClose={closeMenu}
            onOpen={openMenu}
          >
          <Page style={{backgroundColor: Constants.Color.SideMenu}}>
            <SideMenu/>
          </Page>

          </SplitterSide>
          <SplitterContent style={{overflowY:'auto'}}>

                {this.props.children}
                <Modal isOpen={isSearchOpen}>
                    <SearchPanel/>
                </Modal>

          </SplitterContent>
        </Splitter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.isMenuOpen,
    isSearchOpen : state.isSearchOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => dispatch(openMenu()),
    closeMenu: () => dispatch(closeMenu()),
    openSearch: () => dispatch(openSearch()),
    closeSearch: () => dispatch(closeSearch()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RootApp)
