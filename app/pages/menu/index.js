import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import classnames from 'classnames'
import gravatar from 'gravatar';
import styleable from 'react-styleable'
import Spinner from './../../components/Spinner';
import Image from './../../components/Image';
import Button from './../../components/Button';
import {signIn, signOut} from './../../reducers/Customer/actions';
import { openAuth, closeAuth, setAuth} from '../../actions/auth'
import { openMenu, closeMenu } from '../../actions/menu'
import Lock, {LOCK_OPTIONS} from "./../../services/Auth0";
import JWTAuth from "./../../services/JWTAuth";
import WooWorker from "./../../services/WooWorker";

import Constants from "../../Constants"

import {
  Page,
  Toolbar,
  List,
  ListItem,
  ListHeader
} from 'react-onsenui';

import ons from 'onsenui'
import { getRouteList } from './../../routes'

const menuItems = getRouteList()


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
    }

    this.styles = {
        account_wrapper : {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start'
        },
        account_info: {
          display: 'flex',
          flexDirection: 'column',
          padding: 5
        },
        icon: {
            fontSize: 24,
            marginRight: 20
        },
        avatar: {height: 60, width: 60, borderRadius: 30},
        avatar_background: {width: Constants.Dimension.ScreenWidth(0.6), height: 150, padding: 20,},
        fullName: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
        email: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', fontSize:10},
    }
  }

  static propTypes = {
      customer: PropTypes.object.isRequired,
      signOut: PropTypes.func.isRequired,
      signIn: PropTypes.func.isRequired,
  };


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

  renderHeader(){
    const {signOut} = this.props;
    let fullName = "Guest Account";
    let email = '';
    let picture = Constants.Image.DefaultAvatar;

    if (this.props.customer.email !== undefined) {
      fullName = this.props.customer.first_name + ' ' + this.props.customer.last_name;
      email = this.props.customer.email;
      picture = this.props.customer.avatar_url;
    }
    console.log(picture);
    const renderSignIn = () => (
      <ons-button onClick={() => this.login()} modifier='quiet' style={{color: "#ffffff", }}>
          <ons-icon  size={12}  style={{verticalAlign:0}} icon={Constants.Icon.SignIn} />
          <span style={{marginLeft:5}}>{'Sign In'}</span>
      </ons-button>
    );

    const renderSignOut = () => (
      <ons-button onClick={() => signOut()} modifier='quiet' style={{color: "#ffffff", }}>
          <ons-icon  size={12}  style={{verticalAlign:0}} icon={Constants.Icon.SignOut} />
          <span style={{marginLeft:5}}>{'Sign out'}</span>
      </ons-button>
    );
    return (<ListHeader style={{padding: '0px 0px'}}>
      {this.state.isLoading ? <div style={this.styles.avatar_background}><Spinner fullStretch={false} style={{padding: 15}} size={30}/></div> :
          <div style={{...this.styles.avatar_background,...{backgroundImage: `url("${Constants.Image.AvatarBackground}")`,}}}>
              <div style={this.styles.account_wrapper}>
                <Image src={picture} style={this.styles.avatar}/>
                <div style={this.styles.account_info}>
                  <div style={this.styles.fullName}>{fullName}</div>
                  <div style={this.styles.email}>{email}</div>
                </div>
              </div>
              {this.props.customer.email == undefined ? renderSignIn() : renderSignOut()}
          </div>}

    </ListHeader>)
  }

  login() {
    this.props.closeMenu();
    this.props.setAuth('login');
    this.props.openAuth();



    /*Lock.show(LOCK_OPTIONS, (err, profile, token) => {
      console.log('error ' + JSON.stringify(err));
      console.log('profile ' + JSON.stringify(profile));
      console.log('token ' + JSON.stringify(token));
      if (err != null || profile == null || token == null) {
          alert(JSON.stringify(err));
          this.setState({isLoading: false});
      } else if (profile.email == null || profile.email_verified == false) {
        console.log('on 1')
      } else {
        console.log('on 2')
      }

    })

    Lock.on('authenticated', this._doAuthentication.bind(this))
    */
  }


  register(){
    this.setState({isLoading: true});

    const makeRandomPassword = (length) => {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    const customerIsExisted = (customer) => {

    }

    let makeNewCustomer = () => {
      let data = {
        "email": profile.email,
        "first_name": profile.family_name,
        "last_name": profile.given_name,
        "username": profile.email,
        "password": makeRandomPassword(10),
        "avatar_url": profile.picture == undefined ? null : profile.picture,
        "billing": {
            "first_name": profile.family_name,
            "last_name": profile.given_name,
            "email": profile.email,
        },
        "shipping": {
            "first_name": profile.family_name,
            "last_name": profile.given_name,
        }
      }

      WooWorker.createCustomer(data, (customer) => {
          const _customer = Object.assign({}, customer, {avatar_url: profile.picture})
          this.props.signIn(_customer)
          this.setState({isLoading: false});
          // if (DBHelper.saveCustomer(customer) != undefined) {
          //     this.setState({isLoading: false});
          //     EventEmitter.emit(Constants.EmitCode.CustomerSignIn);
          //     Actions.home({type: "reset"});
          // }
      });
    }

    WooWorker.customerByEmail(profile.email, customerIsExisted, makeNewCustomer)
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

          renderHeader={this.renderHeader.bind(this)}
          dataSource={menuItems} />
      </Page>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (customer) => {
            dispatch(signIn(customer));
        },
        signOut: () => {
            dispatch(signOut());
        },
        openAuth: () => dispatch(openAuth()),
        closeAuth: () => dispatch(closeAuth()),
        setAuth: (authType) => {
          dispatch(setAuth(authType))
        },
        openMenu: () => dispatch(openMenu()),
        closeMenu: () => dispatch(closeMenu()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
