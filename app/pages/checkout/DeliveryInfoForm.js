/**
 * Created by Luan on 11/7/2016.
 */

import React, {Component, PropTypes} from 'react';
import Tcomb from 'tcomb-form/lib';
import i18n from 'tcomb-form/lib/i18n/en';
import templates from 'tcomb-form-templates-bootstrap';
import 'bootswatch/flatly/bootstrap.css'
import Validator from "../../utils/Validator"
Tcomb.form.Form.i18n = i18n;
Tcomb.form.Form.templates = templates

var Form = Tcomb.form.Form;
export default class DeliveryInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        value: {
            first_name: '', last_name: '',
            address_1: '',
            state: '',
            postcode: '',
            country: '',
            email: '', phone: '',
            note: ''
        },
    }

    this.onChange = (value) => this.setState({value: value});
    this.onPress = () => this.refs.form.getValue();
  }

  componentDidMount() {
    const {customer} = this.props;
    if (customer.email !== undefined) {
      this.setState({
          value: {
              first_name: customer.billing.first_name == '' ? customer.first_name : customer.billing.first_name,
              last_name: customer.billing.last_name == '' ? customer.last_name : customer.billing.last_name,
              email: customer.email.first_name == '' ? customer.email : customer.billing.email,
              address_1: customer.billing.address_1,
              state: customer.billing.state,
              postcode: customer.billing.postcode,
              country: customer.billing.country,
              phone: customer.billing.phone
          },
      });
    }
  }

  static propTypes = {
      customer: PropTypes.object.isRequired,
  };

  render() {
      return (<Form
              ref="form"
              type={Customer}
              options={options}
              value={this.state.value}
              onChange={this.onChange.bind(this) }
          />
      );
  }
}

const Provinces = Tcomb.enums({
    AL: 'Alabama ',
    AK: 'Alaska ',
    AS: 'American Samoa',
    AZ: 'Arizona ',
    AR: 'Arkansas ',
    CA: 'California ',
    CO: 'Colorado ',
    CT: 'Connecticut ',
    DE: 'Delaware ',
    DC: 'Dist. of Columbia',
    FL: 'Florida ',
    GA: 'Georgia ',
    GU: 'Guam ',
    HI: 'Hawaii ',
    ID: 'Idaho ',
    IL: 'Illinois ',
    IN: 'Indiana ',
    IA: 'Iowa ',
    KS: 'Kansas ',
    KY: 'Kentucky ',
    LA: 'Louisiana ',
    ME: 'Maine ',
    MD: 'Maryland ',
    MH: 'Marshall Islands',
    MA: 'Massachusetts ',
    MI: 'Michigan ',
    FM: 'Micronesia',
    MN: 'Minnesota ',
    MS: 'Mississippi ',
    MO: 'Missouri ',
    MT: 'Montana ',
    NE: 'Nebraska ',
    NV: 'Nevada ',
    NH: 'New Hampshire ',
    NJ: 'New Jersey ',
    NM: 'New Mexico ',
    NY: 'New York ',
    NC: 'North Carolina ',
    ND: 'North Dakota ',
    MP: 'Northern Marianas',
    OH: 'Ohio ',
    OK: 'Oklahoma ',
    OR: 'Oregon ',
    PW: 'Palau',
    PA: 'Pennsylvania ',
    PR: 'Puerto Rico ',
    RI: 'Rhode Island ',
    SC: 'South Carolina ',
    SD: 'South Dakota ',
    TN: 'Tennessee ',
    TX: 'Texas ',
    UT: 'Utah ',
    VT: 'Vermont ',
    VA: 'Virginia ',
    VI: 'Virgin Islands',
    WA: 'Washington ',
    WV: 'West Virginia ',
    WI: 'Wisconsin ',
    WY: 'Wyoming ',
});

const Countries = Tcomb.enums({
    US: 'United States',
});

const Email = Tcomb.refinement(Tcomb.String, s => Validator.checkEmail(s) === undefined);
Email.getValidationErrorMessage = (s) => Validator.checkEmail(s);
const Phone = Tcomb.refinement(Tcomb.String, s => Validator.checkPhone(s) === undefined);
Phone.getValidationErrorMessage = (s) => Validator.checkPhone(s);


//define customer form
const Customer = Tcomb.struct({
    first_name: Tcomb.String,       // normal string
    last_name: Tcomb.String,
    address_1: Tcomb.String,
    state: Provinces,                //combobox
    postcode: Tcomb.String,
    country: Countries,
    email: Email,                   // string input with custom validate
    phone: Phone,                   // same ^
    note: Tcomb.maybe(Tcomb.String) //maybe = optional
});

//form options
const options = {
    label: 'Delivery Info', // <= form legend, displayed before the fields
    auto: 'placeholders', //we have labels and placeholders as option here (in Engrish, ofcourse).
    //stylesheet: css,
    fields: {
        first_name: {
            placeholder: 'First Name',
            error: 'This field is empty', //for simple empty error warning.
            underlineColorAndroid: 'transparent',
        },
        last_name: {
            placeholder: 'Last Name',
            error: 'This field is empty',
            underlineColorAndroid: 'transparent',
        },
        address_1: {
            placeholder: 'Address',
            error: 'This field is empty',
            underlineColorAndroid: 'transparent',
        },
        state: {
            nullOption: {value: '', text: 'State - Not select'},
            error: 'Please choose one',
            // underlineColorAndroid: 'transparent',
        },
        postcode: {
            placeholder: 'Postcode',
            error: 'This field is empty',
            underlineColorAndroid: 'transparent',
        },
        country: {
            nullOption: {value: '', text: 'Country'},
            error: 'Please choose one',
            styles: {
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: 'pink',
            }
        },
        email: {
            placeholder: 'Email',
            underlineColorAndroid: 'transparent',
        },
        phone: {
            placeholder: 'Phone Number',
            underlineColorAndroid: 'transparent',
        },
        note: {
            placeholder: 'Note',
            underlineColorAndroid: 'transparent',
        }
    }
};
