'use strict';

import React, {Component} from "react";
import {Text, View} from "react-native";
import Tcomb from 'tcomb-form';
import Constants from './../../Constants';
import EventEmitter from './../../utils/AppEventEmitter';

export default class VariationsForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          value: {},                  //contain form data set.
          form: null,                 //our form, generate after receive props
          formOption: {},             //display options for our form
          variations: undefined,      //variations data
      }
      this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
      this.prepareFormData();
      this.onPress = () => this.refs.form.validate();
  }

  prepareFormData() {
    if (this.props.variations.length === 0) return;
    if (this.props.attributes !== null || this.props.attributes.length === 0) {
      let formComponents = {}, componentOptions = {};
      for (let i = 0; i < this.props.attributes.length; i++) {
          formComponents[`${this.props.attributes[i].id}`] = Tcomb.enums.of(this.props.attributes[i].options);
          componentOptions[`${this.props.attributes[i].id}`] = {
              label: this.props.attributes[i].name,
              error: '',
              nullOption: {value: '', text: 'Not selected'}
          };
      }

      this.setState({
          form: Tcomb.struct(formComponents),
          formOption: {
              auto: 'labels',
              //stylesheet: stylesheet,
              //templates : templates,
              fields: componentOptions
          },
          variations: this.props.variations,
      });
    }
  }

  render() {
      return (this.state.form === null ?
          <Text style={{
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              height: 60
          }}>{'NoVariation'}</Text> :
          <Tcomb.form.Form
              ref="form"
              type={this.state.form}
              options={this.state.formOption}
              value={this.state.value}
              onChange={this.onChange.bind(this) }
          />);
  }

  onChange(value) {
      this.refs.form.validate();
      this.setState({value: value}); //default code line for this function, do not touch
      let variation = this.getVariationFromAtts(value);
      this.props.product.setState({
          currentVariation: variation,
      });
      // console.log(variation);
      if (variation != undefined) {
          EventEmitter.emit(Constants.EmitCode.ProductPriceChanged, {price: variation.price});
      }
  }


  /**
   *
   * @param {value} customer attributes option
   * @returns matched variation (from this.state.variations)
   *
   * @memberOf VariationsForm
   */
  getVariationFromAtts(value) {
      for (let variation of this.state.variations) {
          let isMatch = true;
          for (let attribute of variation.attributes) { //loop through variation's attributes
              let selectedOption = value[attribute.id + ""];
              if (selectedOption == undefined) break;
              console.log(slugify(selectedOption) + ' __ ' + slugify(attribute.option))
              if (!(isMatch = slugify(selectedOption) == slugify(attribute.option))) break;
          }
          if (isMatch) return variation;
      }
      return undefined;

      //sub function to parse slug
      function slugify(text) {
          return text.toString().toLowerCase()
              .replace(/\s+/g, '-')           // Replace spaces with -
              .replace(/[^\w\-]+/g, '-')       // Remove all non-word chars
              .replace(/\-\-+/g, '-')         // Replace multiple - with single -
              .replace(/^-+/, '')             // Trim - from start of text
              .replace(/-+$/, '');            // Trim - from end of text
      }
  }
}
