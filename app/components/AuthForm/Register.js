import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from "./../../components/Button";
import gravatar from 'gravatar';
import {signIn, signOut} from './../../reducers/Customer/actions';
import { openAuth, closeAuth, setAuth } from '../../actions/auth'
import {Page,Modal,Icon} from 'react-onsenui';
import Constants from './../../Constants';
import Tcomb from 'tcomb-form/lib';
import i18n from 'tcomb-form/lib/i18n/en';
import templates from 'tcomb-form-templates-bootstrap';
import Validator from '../../utils/Validator'
import WooWorker from "./../../services/WooWorker";


Tcomb.form.Form.i18n = i18n;
Tcomb.form.Form.templates = templates;

class Register extends Component{
  constructor(props){
    super(props)
    this.state = {
        stage: 0,
        info : {
          first_name : '',
          last_name: '',
          address_1: '',
          address_2: '',
          state: 'HCM'
        },
        account: {
          email: '',
          phone: '',
          generate_password: false,
          newPassword: '',
        },
        isExisted: false,
        optionsAccount: options,
    }

    this.styles = {
      wrapper : {

      },
      modalTitle : {
        color: 'white',
        backgroundColor: '#009688'
      }
    }

    this.onChangeForm1 = (value) => this.setState({info: value});
    this.onChangeForm2 = (value) => {
      console.log(value);
      var newoptions = Tcomb.update(this.state.optionsAccount, {
          fields: {
            newPassword: {
              disabled: {'$set': value.generate_password}
            },
            confirmPassword: {
              disabled: {'$set': value.generate_password}
            }
          }
      });

      this.setState({account: value, optionsAccount: newoptions})
    };
  }

  register(){

    const makeRandomPassword = (length) => {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    if(this.state.stage == 0){
      if(this.refs.form.validate().isValid()) {
        this.setState({stage: 1})

      }
    }else if(this.state.stage ==  1){
      console.log('run register out')
      if (this.refs.form2.validate().isValid()){
        console.log('run register')
        const customerIsExisted = (customer) => {
          this.setState({isExisted : true, stage: 2})
        }

        let makeNewCustomer = () => {
          var avatar = gravatar.url(this.state.account.email, {s: '200'});
          let data = {
              "email": this.state.account.email,
              "first_name": this.state.info.first_name,
              "last_name": this.state.info.last_name,
              "username": this.state.account.email,
              "password": this.state.account.generate_password? makeRandomPassword(10) : this.state.account.newPassword,
              "avatar_url": avatar,
              "billing": {
                  "first_name": this.state.info.first_name,
                  "last_name": this.state.info.last_name,
                  "email": this.state.account.email,
                  "address_1": this.state.info.address_1,
                  "address_2": this.state.info.address_2,
                  "state": this.state.info.state,
                  "country": 'VN',
                  "phone": this.state.account.phone
              },
              "shipping": {
                  "first_name": this.state.info.first_name,
                  "last_name": this.state.info.last_name,
                  "address_1": this.state.info.address_1,
                  "address_2": this.state.info.address_2,
                  "state": this.state.info.state,
                  "country": 'VN',
              }
          }

          console.log(data)

          WooWorker.createCustomer(data, (customer) => {
              const _customer = Object.assign({}, customer, {avatar_url: avatar})
                console.log(_customer)
              this.props.signIn(_customer)
              //this.setState({isLoading: false});
              this.setState({stage : 2})
              // if (DBHelper.saveCustomer(customer) != undefined) {
              //     this.setState({isLoading: false});
              //     EventEmitter.emit(Constants.EmitCode.CustomerSignIn);
              //     Actions.home({type: "reset"});
              // }
          });
        }

        WooWorker.customerByEmail(this.state.account.email, customerIsExisted, makeNewCustomer)
      }
    }else{

    }
  }

  goShopping(){
    this.props.closeAuth();
  }

  goLogin(){
    this.props.setAuth('login')
  }

  render() {
    const { openAuth, closeAuth, authorize} = this.props;

    const renderPhaseOne = () => (
      <Tcomb.form.Form
            ref="form"
            options={options}
            type={RegisterForm}
            value={this.state.info}
            onChange={this.onChangeForm1.bind(this) }
        />
    )

    const renderPhaseTwo = () => (
      <Tcomb.form.Form
            ref="form2"
            options={this.state.optionsAccount}
            type={RegisterFormStep2}
            value={this.state.account}
            onChange={this.onChangeForm2.bind(this) }
        />
    )

    const renderPhaseThree = () => (

      this.state.isExisted?
      <div>

          <div style={{flex: 1, backgroundColor: 'white', textAlign: 'center', padding:20}}>
            <Icon icon={'ion-ios-information-outline'}
                  style={{
                      textAlign: "center",
                      fontSize: 200,
                      color: Constants.Color.ButtonBackground,
                  }}/>
            <div style={{
                      color: Constants.Color.TextDark,
                      fontSize: 22,
                      padding: 20,
                      textAlign: "center"
                  }}>{'Tài khoản quý khách đã tồn tại, vui lòng đăng nhập!'}</div>

            <div style={{
                      padding: 10,
                      fontSize: 13,
                      textAlign: "center",
                  }}>{'Tip: Nếu quý khách ên mật khẩu, vui lòng ghé website nguyenlieuphache.com để lấy lại mật khẩu.'}</div>
        </div>
        <button type='button' className='btn btn-primary' onClick={this.goLogin.bind(this)}>Đăng nhập tại đây</button>

      </div>: this.state.isFailed ?
      <div>

          <div style={{flex: 1, backgroundColor: 'white', textAlign: 'center', padding:20}}>
            <Icon icon={'ion-sad-outline'}
                  style={{
                      textAlign: "center",
                      fontSize: 200,
                      color: Constants.Color.ButtonBackground,
                  }}/>
            <div style={{
                      color: Constants.Color.TextDark,
                      fontSize: 22,
                      padding: 20,
                      textAlign: "center"
                  }}>{'Đăng ký không thành công!'}</div>

            <div style={{
                      padding: 10,
                      fontSize: 13,
                      textAlign: "center",
                  }}>{'Tip: Quý khách có thể thử lại và kiểm tra lại thông tin trước khi tạo tại khoản.'}</div>
        </div>
        <button type='button' className='btn btn-primary' onClick={()=>{this.setState({stage: 0})}}>Thử lại</button>

      </div>:
      <div>

          <div style={{flex: 1, backgroundColor: 'white', textAlign: 'center', padding:20}}>
            <Icon icon={'ion-happy-outline'}
                  style={{
                      textAlign: "center",
                      fontSize: 200,
                      color: Constants.Color.ButtonBackground,
                  }}/>
            <div style={{
                      color: Constants.Color.TextDark,
                      fontSize: 22,
                      padding: 20,
                      textAlign: "center"
                  }}>{'Register Successfull!'}</div>

            <div style={{
                      padding: 10,
                      fontSize: 13,
                      textAlign: "center",
                  }}>{'Tip: You account and password will be sent to you email, please check it.'}</div>
        </div>
        <button type='button' className='btn btn-primary' onClick={this.goShopping.bind(this)}>Go to shop</button>

      </div>

    )

    const goBack = () => {
      this.setState({stage : this.state.stage - 1})
    }

    const renderButton = () => (
      <div className='modal-footer'>
        {this.state.stage > 0 ? <button type='button' className='btn btn-default' data-dismiss='modal' onClick={goBack}>Back</button> : <div />}
        <button type='button' className='btn btn-default' data-dismiss='modal' onClick={closeAuth}>Close</button>
        <button type='button' className='btn btn-primary' onClick={this.register.bind(this)}>Register</button>
      </div>
    )
    return (
      <Modal isOpen={authorize.isOpen}>
      <div className='modal-dialog'>
        <div className='modal-content'>

            <div className='modal-header' style={this.styles.modalTitle}>
              <button type='button' onClick={closeAuth} className='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
              <h4 className='modal-title'>Register</h4>
            </div>
            <div className='modal-body'>
              {this.state.stage == 0 ? renderPhaseOne() :
                  this.state.stage == 1 ? renderPhaseTwo() : renderPhaseThree()}

            </div>
            {this.state.stage != 2 ?
              renderButton()
            : <div />
           }
        </div>
      </div>
    </Modal>
    );
  }
}

const Email = Tcomb.refinement(Tcomb.String, s => Validator.checkEmail(s) === undefined);
Email.getValidationErrorMessage = (s) => Validator.checkEmail(s);

const ConfirmPassword = Tcomb.refinement(Tcomb.String, s => Validator.checkConfirmPassword(s) === undefined);
ConfirmPassword.getValidationErrorMessage = (s) => Validator.checkConfirmPassword(s);
const Phone = Tcomb.refinement(Tcomb.String, s => Validator.checkPhone(s) === undefined);
Phone.getValidationErrorMessage = (s) => Validator.checkPhone(s);


function samePasswords(x) {
  return x.newPassword === x.confirmPassword;
}


const Countries = Tcomb.enums({
    VN: 'Viet Nam',
});



const Provinces = Tcomb.enums({
  HN: 'Hà Nội',
  HG: 'Hà Giang',
  CB: 'Cao Bằng',
  BK: 'Bắc Kạn',
  TQ: 'Tuyên Quang',
  LC: 'Lào Cai',
  DB: 'Điện Biên',
  LC: 'Lai Châu',
  SL: 'Sơn La',
  YB: 'Yên Bái',
  HB: 'Hòa Bình',
  TN: 'Thái Nguyên',
  LS: 'Lạng Sơn',
  QNI: 'Quảng Ninh',
  BG: 'Bắc Giang',
  PT: 'Phú Thọ',
  VP: 'Vĩnh Phúc',
  BN: 'Bắc Ninh',
  HD: 'Hải Dương',
  HP: 'Hải Phòng',
  HY: 'Hưng Yên',
  TB: 'Thái Bình',
  HNA: 'Hà Nam',
  ND: 'Nam Định',
  NB: 'Ninh Bình',
  TH: 'Thanh Hóa',
  NA: 'Nghệ An',
  HT: 'Hà Tĩnh',
  QB: 'Quảng Bình',
  QT: 'Quảng Trị',
  TTH: 'Thừa Thiên–Huế',
  DN: 'Đà Nẵng',
  QNA: 'Quảng Nam',
  QNG: 'Quảng Ngãi',
  BD: 'Bình Định',
  PY: 'Phú Yên',
  KH: 'Khánh Hòa',
  NT: 'Ninh Thuận',
  BT: 'Bình Thuận',
  KT: 'Kon Tum',
  GL: 'Gia Lai',
  DL: 'Đắk Lắk',
  DNO :'Đắk Nông',
  LD: 'Lâm Đồng',
  BP: 'Bình Phước',
  TN: 'Tây Ninh',
  BD: 'Bình Dương',
  DNAI: 'Đồng Nai',
  BRVT: 'Bà Rịa–Vũng Tàu',
  HCM: 'Thành phố Hồ Chí Minh',
  LA: 'Long An',
  TG: 'Tiền Giang',
  BT: 'Bến Tre',
  TV: 'Trà Vinh',
  VL: 'Vĩnh Long',
  DT: 'Đồng Tháp',
  AG: 'An Giang',
  KG: 'Kiên Giang',
  CT: 'Cần Thơ',
  HG: 'Hậu Giang',
  ST: 'Sóc Trăng',
  BL: 'Bạc Liêu',
  CM: 'Cà Mau',
});
const RegisterForm = Tcomb.struct({
    first_name: Tcomb.String,
    last_name: Tcomb.String,
    address_1: Tcomb.String,
    address_2: Tcomb.String,
    //country: Countries,
    state: Provinces,              // same ^
});

const RegisterFormStep2 = Tcomb.subtype(Tcomb.struct({
    email: Email,
    phone: Phone,
    generate_password: Tcomb.maybe(Tcomb.Boolean),                   // string input with custom validate
    newPassword: Tcomb.maybe(Tcomb.String),
    confirmPassword: Tcomb.maybe(Tcomb.String),
}), samePasswords);


RegisterFormStep2.getValidationErrorMessage = function (value) {
  if (!samePasswords(value)) {
    return 'Password must match';
  }
};

const options = {
  auto: 'placeholders',
  fields: {
    email : {
      //placeholder: 'Enter your Email',
    },

    newPassword: {
      //  placeholder: 'Enter your Password',
      //password: true,
      type: 'password'
      //secureTextEntry: true,
    },
    confirmPassword: {
      type: 'password'
    },

    generate_password: {
      label: <i style={{color: 'black'}}>Check here to auto generate password</i>,
    }

  }
};




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
export default connect(mapStateToProps, mapDispatchToProps)(Register)
