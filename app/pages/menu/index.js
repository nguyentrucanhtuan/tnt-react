import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import classnames from 'classnames'
import styleable from 'react-styleable'
import Spinner from './../../components/Spinner';
import Image from './../../components/Image';
import {signIn, signOut} from './../../reducers/Customer/actions';
import WooWorker from "./../../services/WooWorker";

import Constants from "../../Constants"

import {
  Page,
  Toolbar,
  List,
  ListItem,
  ListHeader
} from 'react-onsenui';


import { getRouteList } from './../../routes'

const menuItems = getRouteList()


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
    }

    this.styles = {
        icon: {
            fontSize: 24,
            marginRight: 20
        },
        avatar: {height: 60, width: 60, borderRadius: 30},
        avatar_background: {width: Constants.Dimension.ScreenWidth(0.7), height: 150, padding: 20,},
        fullName: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
        email: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
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
      picture = {uri: this.props.customer.avatar_url};
    }
    return (<ListHeader style={{padding: '0px 0px'}}>
      {this.state.isLoading ? <div style={this.styles.avatar_background}><Spinner fullStretch/></div> :
          <div style={{...this.styles.avatar_background,...{backgroundImage: `url("${Constants.Image.AvatarBackground}")`,}}}>
              <Image src={picture} style={this.styles.avatar}/>
              <div style={this.styles.fullName}>{fullName}</div>
              <div style={this.styles.email}>{email}</div>
          </div>}
    </ListHeader>)
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
