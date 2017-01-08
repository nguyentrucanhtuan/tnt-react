import React, {Component} from 'react';
import {connect} from 'react-redux';

import { openAuth, closeAuth } from '../../actions/auth'
import { openMenu, closeMenu } from '../../actions/menu'

import Login from './Login'
import Register from './Register'
import {Page,Modal,Button,Tabbar,Tab} from 'react-onsenui';



class AuthForm extends Component{
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.authorize.authType !== nextProps.authorize.authType) {
      return true;
    }

    return false;
  }

  render(){
    const { openAuth, closeAuth, authorize} = this.props;
    let auth= null;
    if(authorize.authType == 'login'){
      return (<Login key="loginTab" close={closeAuth}/>)
    }else if(authorize.authType == 'register'){
      return (<Register key="registerTab" close={closeAuth}/>)
    }

  }

}


class MyTab extends Component{
  render() {
    return (
      <Page>
        <section style={{margin: '16px'}}>
          <p>
            This is the <strong>{this.props.title}</strong> tab.
          </p>
        </section>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorize: state.authorize,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openAuth: () => dispatch(openAuth()),
    closeAuth: () => dispatch(closeAuth()),
    openMenu: () => dispatch(openMenu()),
    closeMenu: () => dispatch(closeMenu())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
