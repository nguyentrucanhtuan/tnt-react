import React, {PropTypes, Component} from "react";

import Constants from './../../Constants';

import {Button as OnsButton, Icon} from 'react-onsenui';

export default class Button extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isLoading: this.props.isLoading
      };
  }

  static propTypes = {
      isLoading: PropTypes.bool,
      autoWidth: PropTypes.bool,
      borderLess: PropTypes.bool,
      autoMargin: PropTypes.bool,
      color: PropTypes.string,
      overlayColor: PropTypes.string,
      iconName: PropTypes.string,
  };

  static defaultProps = {
      isLoading: false,
      autoWidth: true,
      borderLess: false,
      autoMargin: true,
      color: Constants.Color.ButtonText,
      overlayColor: Constants.Color.ButtonBackground,
      iconName: ''
      // size: 'large', // 'normal',
  };

  componentWillReceiveProps(nextProps) {
      const {isLoading} = nextProps;
      this.setState({isLoading: isLoading});
  }

  render() {
    let styles = {
        button: {
            borderColor: Constants.Color.ButtonBorder,
            borderWidth: this.props.borderLess ? 0 : 1,
            backgroundColor: this.props.overlayColor,
            alignSelf: "center",
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: this.props.autoMargin ? Constants.Dimension.ScreenWidth(0.05) : 0,
            marginRight: this.props.autoMargin ? Constants.Dimension.ScreenWidth(0.05) : 0,
            height: 45,
            width: this.props.autoWidth ? Constants.Dimension.ScreenWidth(0.9) : undefined,
        },
        text: {
            alignSelf: "center",
            fontSize: 14,
            fontWeight: 'bold',
            color: this.props.color,
        }
    }
    return (
      <OnsButton style={{...styles.button, ...this.props.style}} onClick={this.props.onPress}>
        {this.props.isLoading ?
          <Icon style={{color: this.props.color}}  size={12} spin icon='md-spinner' />
           : (
           this.props.iconName === '' ?
               <span style={styles.text}>{this.props.children}</span> :
               <Icon icon={this.props.iconName} size={30} style={{color: Constants.Color.ButtonText}}/>)
        }
      </OnsButton>
    );
  }

}