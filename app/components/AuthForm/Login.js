import React, {Component} from 'react';
import {connect} from 'react-redux';
import gravatar from 'gravatar';
import Tcomb from 'tcomb-form/lib';
import i18n from 'tcomb-form/lib/i18n/en';
import templates from 'tcomb-form-templates-bootstrap';
import {signIn, signOut} from './../../reducers/Customer/actions';
import { openAuth, closeAuth, setAuth } from '../../actions/auth'
import {Page,Modal,Button,Tabbar,Tab} from 'react-onsenui';
import Validator from "../../utils/Validator"

import JWTAuth from "./../../services/JWTAuth";
import WooWorker from "./../../services/WooWorker";
import 'bootswatch/flatly/bootstrap.css'


import ons from 'onsenui'

Tcomb.form.Form.i18n = i18n;
Tcomb.form.Form.templates = templates;

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      account : {
        email: '',
        password: ''
      }
    }
    this.styles = {
      wrapper : {

      },
      modalTitle : {
        color: 'white',
        backgroundColor: '#009688'
      },
      new_account : {
       cursor: 'pointer'
      }
    }

    this.onChangeForm = (value) => this.setState({account: value});

  }

  login(){
    if(this.refs.form.validate().isValid()){
      console.log(this.state.account)
      let value = this.refs.form.getValue();

      let makeNewCustomer = () => {
        //ons.notification.alert('Ban chua co tai khoan khach hang, vui long tao tai khoan.')
        //this.props.closeAuth();
        this.props.setAuth('register');
        //this.props.openAuth();
      };

      let customerIsExisted = (customer) => {
        let self = this;
        var avatar = gravatar.url(customer.email, {s: '200'});
        JWTAuth.login(this.state.account.email,this.state.account.password).then(function(response) {
          if (response.code != null && response.message != null){
            ons.notification.alert(response.message)
            this.setState({isLoading: false});
          } else if(response.token != null){
            const _customer = Object.assign({}, customer, {avatar_url: avatar,token: response.token})
            self.props.signIn(_customer);
            self.setState({isLoading: false});
            self.props.closeAuth();
          }
        })
      };
      WooWorker.customerByEmail(this.state.account.email, customerIsExisted, makeNewCustomer)

    }

  }


  render() {
    const { openAuth, closeAuth, authorize} = this.props;
    const goToRegister = () => {
      this.props.setAuth('register');
    }
    return (
      <Modal isOpen={authorize.isOpen}>
        <div className="modal-dialog">
          <div className="modal-content">

              <div className="modal-header" style={this.styles.modalTitle}>
                <button type="button" onClick={closeAuth} className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Login</h4>
              </div>
              <div className="modal-body">
                  <Tcomb.form.Form
                        ref="form"
                        options={options}
                        type={LoginForm}
                        value={this.state.account}
                        onChange={this.onChangeForm.bind(this)}
                    />
              </div>
              <div className="modal-footer">
                <a className="pull-left" style={this.styles.new_account} onClick={goToRegister}>I Don't Have a account!</a>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closeAuth}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.login.bind(this)}>Login</button>
              </div>
          </div>
        </div>
      </Modal>
    );
  }
}


const Email = Tcomb.refinement(Tcomb.String, s => Validator.checkEmail(s) === undefined);
Email.getValidationErrorMessage = (s) => Validator.checkEmail(s);
const Password = Tcomb.refinement(Tcomb.String, s => Validator.checkPassword(s) === undefined);
Password.getValidationErrorMessage = (s) => Validator.checkPassword(s);



const options = {
  auto: 'placeholders',
  fields: {
    email : {
      //placeholder: 'Enter your Email',
    },
    password: {
    //  placeholder: 'Enter your Password',
      //password: true,
      type: 'password'
      //secureTextEntry: true,
    }
  }
};

const LoginForm = Tcomb.struct({
    email: Email,                   // string input with custom validate
    password: Password,                   // same ^
});


const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
        authorize: state.authorize,
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
