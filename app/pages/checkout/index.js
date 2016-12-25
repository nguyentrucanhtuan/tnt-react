import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import t from 'tcomb-form';
import Toolbar from '../../components/Toolbar';
import Button from "./../../components/Button";
import Image from "./../../components/Image";
import WooWorker from './../../services/WooWorker';
import Constants from './../../Constants';
import DeliveryInfoForm from './DeliveryInfoForm';
import {emptyCart} from './../../reducers/Cart/actions';
import { getRoute } from './../../routes'

import {
  Page,
  Input,
  Icon
} from 'react-onsenui';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stage: 0,
        value: {
            payment_method: '',
        }
    }

    this.styles = {
        container: {flex: 1, backgroundColor: '#F0F0F0'},
        card: {
            height: null,
            width: Constants.Dimension.ScreenWidth(0.9),
            marginLeft: Constants.Dimension.ScreenWidth(0.05),
            marginTop: Constants.Dimension.ScreenWidth(0.05),
            backgroundColor: 'white',
            padding: 10,
            paddingTop: 10
        }
    };

    this.validate = () => {
        const result = this.refs.deliveryForm.onPress();
        if (result !== null) {
            this.setState({stage: 1})
            this.deliveryInfo = result;
        }
    }

    this.purchase = () => {
      const result = this.refs.paymentForm.getValue();

      if (result !== null) {
        let line_items = [];
        this.props.Cart.cartItems.forEach((item) => {
            line_items.push({
                "product_id": item.product.id,
                "quantity": item.quantity,
                "variation_id": item.variation == undefined ? '' : item.variation.id,
            });
        }, this);

        let body = {
            customer_id: this.props.customer.id,
            payment_method: result.payment_method,
            customer_note: this.deliveryInfo.note,
            billing: this.deliveryInfo,
            shipping: this.deliveryInfo,
            line_items: line_items,
        };

        this.setState({isLoading: true});
        WooWorker.createOrder(body, (responseData) => {
            this.setState({
                stage: 2,
                orderID: responseData.id,
                isLoading: false,
            })
            this.props.emptyCart();
        });
      }
    }

    this.onChange = (value) => this.setState({value: value});
  }

  static propTypes = {
      customer: PropTypes.object.isRequired,
      Cart: PropTypes.object.isRequired,
      emptyCart: PropTypes.func.isRequired,
  };

  render() {
    const renderPhaseOne = () => (
      <div>
        <Image
            src={Constants.Image.CheckoutStep1}
            style={{
                width: Constants.Dimension.ScreenWidth() - 50,
                height: 'auto',
                marginLeft: 25,
                marginTop: 30,
                marginBottom: 10
            }}

        />

       <div style={{
            backgroundColor: 'white',
            paddingTop: 10,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
            padding: 10
        }}>
            <DeliveryInfoForm ref="deliveryForm" customer={this.props.customer}/>
        </div>
        <Button onPress={() => this.validate()} borderLess>{'Proceed Payment'}</Button>
      </div>
    )

    const renderPhaseTwo = () => (
      <div>
        <Image
            src={Constants.Image.CheckoutStep2}
            style={{
                width: Constants.Dimension.ScreenWidth() - 50,
                height: 'auto',
                marginLeft: 25,
                marginTop: 30,
                marginBottom: 10
            }}

        />
        {this.renderPayments()}
        {this.renderPaymentDetails()}
        {this.renderCoupon()}

        <Button onPress={() => this.purchase()}
                style={{marginTop: Constants.Dimension.ScreenWidth(0.05)}}
                borderLess
                isLoading={this.state.isLoading}>{'Purchase'}</Button>
      </div>
    );

    const renderPhaseThree = () => (
      <div>
          <div style={{backgroundColor: '#F0F0F0', height: null, width: Constants.Dimension.ScreenWidth()}}>
            <Image
                src={Constants.Image.CheckoutStep3}
                style={{
                    width: Constants.Dimension.ScreenWidth() - 50,
                    height: 'auto',
                    marginLeft: 25,
                    marginTop: 20,
                    marginBottom: 10
                }}

            />
          </div>
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
                  }}>{'Order Completed'}</div>

            <div style={{
                      padding: 10,
                      fontSize: 13,
                      textAlign: "center",
                  }}>{'Order Id' + " " + this.state.orderID}</div>
            <div style={{
                      padding: 10,
                      fontSize: 13,
                      textAlign: "center",
                  }}>{'Tip: You could track your order status in "My Orders" section from side menu'}</div>
        </div>

        <Button onPress={() => this.props.navigator.resetPage(getRoute('home'))} borderLess
                style={{marginBottom: 10}}>{'Back To Home'}</Button>
      </div>

    );
    return (
      <Page  key="Checkout">
        <Toolbar navigator={this.props.navigator} />
        <div style={{...this.styles.container, ...{backgroundColor: this.state.stage == 2 ? 'white' : '#f2f2f2'}}}>
          {this.state.stage == 0 ? renderPhaseOne() :
              this.state.stage == 1 ? renderPhaseTwo() : renderPhaseThree()}
        </div>
      </Page>
    );
  }

  renderPaymentDetails(){
     switch (this.state.value.payment_method) {
       case 'bacs':
          return <div style={this.styles.card}>
              <ons-row>
                  <ons-col width='30%'><label style={{marginTop:10}}>Card Number*</label></ons-col>
                  <ons-col width='70%'>
                    <Input placeholder='0000-0000-0000-0000'
                      value='1234-5678-1234-5678'
                      modifier='underbar'
                      float
                      style={{
                          height: 40, marginBottom: 5, marginTop: 15, width: '100%'
                      }}
                      ></Input>
                  </ons-col>
              </ons-row>

              <ons-row>
                  <ons-col width='30%'><label style={{marginTop:10}}>Card Name*</label></ons-col>
                  <ons-col width='70%'>
                    <Input placeholder='Your Card Name'
                      value='Coffee Tree'
                      modifier='underbar'
                      float
                      style={{
                          height: 40, marginBottom: 5, marginTop: 15, width: '100%'
                      }}
                      ></Input>
                  </ons-col>
              </ons-row>
              <ons-row>
                <ons-col width='30%'><label style={{marginTop:10}}>Expiry Date*</label></ons-col>
                <ons-col width='70%'>
                  <Input
                      placeholder= 'MM'
                      value='01'
                      modifier='underbar'
                      maxLength={2}
                      float
                      style={{
                          height: 40, marginBottom: 5, marginTop: 15, width: 50,marginRight: 10,
                      }}
                      ></Input>

                      <Input
                          placeholder= 'YY'
                          value='16'
                          modifier='underbar'
                          maxLength={2}
                          float
                          style={{
                              height: 40, marginBottom: 5, marginTop: 15, width: 50,marginRight: 10,
                          }}
                          ></Input>
                </ons-col>
            </ons-row>

            <ons-row>
                <ons-col width='30%'><label style={{marginTop:10}}>CVV</label></ons-col>
                <ons-col width='70%'>
                  <Input placeholder='CVV'
                    value='123'
                    modifier='underbar'
                    maxLength={3}
                    float
                    style={{
                        height: 40, marginBottom: 5, marginTop: 15, width: '100%'
                    }}
                    ></Input>
                </ons-col>
            </ons-row>

          </div>
       case 'cod':
          return <div style={{...this.styles.card, ...{flexDirection: 'row', display:'flex'}}}>
              <Image src={Constants.Image.CashOnDelivery}
                   style={{
                       width: Constants.Dimension.ScreenWidth(0.25),
                       height: Constants.Dimension.ScreenWidth(0.125),
              }}/>
             <div style={{
                  justifyContent: 'center',
                  margin: 10,
                  padding: '15px 0px',
                  width: Constants.Dimension.ScreenWidth(0.6)
              }}>
              <p>{'Pay With CoD'}</p>
            </div>

          </div>

       case 'paypal':
            return <div style={{...this.styles.card, ...{flexDirection: 'row', display:'flex'}}}>
                    <Image src={Constants.Image.PayPal} mode='fit'
                     style={{
                         width: Constants.Dimension.ScreenWidth(0.25),
                         height: Constants.Dimension.ScreenWidth(0.125),
                         backgroundColor:'none'
                     }}/>
                   <div style={{
                         justifyContent: 'center',
                         margin: 10,
                         padding: '15px 0px',
                         width: Constants.Dimension.ScreenWidth(0.6)
                     }}>
                         <p>{'Pay With PayPal'}</p>
                     </div>
            </div>
       case 'stripe':
       return <div style={{...this.styles.card, ...{flexDirection: 'row', display:'flex'}}}>
           <Image src={Constants.Image.Stripe} mode='fit'
                  style={{
                      width: Constants.Dimension.ScreenWidth(0.25),
                      height: Constants.Dimension.ScreenWidth(0.125),
                      backgroundColor:'none'
                  }}/>
                <div style={{
                     justifyContent: 'center',
                     margin: 10,
                     padding: '15px 0px',
                     width: Constants.Dimension.ScreenWidth(0.6)
                 }}>
               <p >{'Pay With Stripe'}</p>
           </div>
       </div>
       default:
           return <div/>
     }
  }

  renderPayments(){
    const onChange = (value) => {
        this.refs.paymentForm.validate();
        this.setState({value: value});
    }
    return (
      <div style={this.styles.card}>
        <t.form.Form
            ref="paymentForm"
            type={Payment}
            value={this.state.value}
            onChange={onChange}
            options={options}
        />
      </div>
    );
  }

  renderCoupon() {
    return <div style={this.styles.card}>
              <label style={{marginBottom: 5, marginLeft: 5}}>{'Apply Coupon'}</label>

             <div style={{flexDirection: 'row', justifyContent: 'space-around', display: 'flex'}}>
               <Input
                   modifier='underbar'
                   placeholder={'Coupon Code'}
                   style={{
                       width: Constants.Dimension.ScreenWidth(0.6),
                       borderWidth: 1, borderColor: Constants.Color.ViewBorder, height: 40, marginTop: 15
                   }}/>
                   <Button autoMargin={false}
                           onPress={()=> alert("Coupon is not valid")}
                           style={{
                               width: Constants.Dimension.ScreenWidth(0.2),
                               height: 40,
                               marginTop: 0,
                               borderWidth: 0
                           }}>{'APPLY'}</Button>
             </div>

           </div>
  }
}

const Payments = t.enums({
    bacs: 'Credit Card',
    // cheque: 'Check Payments',
    cod: "Cash On Delivery",
    paypal: 'PayPal',
    stripe: 'Stripe',
});
const Payment = t.struct({
    payment_method: Payments,              // a required string
});
const options = {
    auto: 'none',
    fields: {
        payment_method: {
            nullOption: {value: '', text: "Payment Method"},
            error: "Payment Method Error",
        },
    }
}

const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
        Cart: state.Cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => {
            dispatch(emptyCart());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
