import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Toolbar';
import Button from "./../../components/Button";
import Image from "./../../components/Image";
import WooWorker from './../../services/WooWorker';
import Constants from './../../Constants';
import DeliveryInfoForm from './DeliveryInfoForm';
import {emptyCart} from './../../reducers/Cart/actions';


import {
  Page
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
        }
    };
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
}

/*const Payments = t.enums({
    bacs: 'Credit Card',
    // cheque: 'Check Payments',
    cod: "Cash On Delivery",
    paypal: 'PayPal',
    stripe: 'Stripe',
});
const Payment = t.struct({
    payment_method: Payments,              // a required string
});*/
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
