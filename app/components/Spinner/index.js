import React, {Component} from "react";

import Constants from './../../Constants';
import { StyleSheet, css } from 'aphrodite';
import {Icon,ToolbarButton} from 'react-onsenui';


export default class Spinner extends Component {
  constructor(props) {
      super(props);
      this.state = {
          animating: this.props.isLoading
      };
  }

  static propTypes = {
      animating: React.PropTypes.bool,
      color: React.PropTypes.string,
      size: React.PropTypes.number,
      fullStretch: React.PropTypes.bool,
  };

  static defaultProps = {
      animating: true,
      color: Constants.Color.Spinner,
      size: 80,
      fullStretch: false,
  };

  componentWillReceiveProps(nextProps) {
      const {animating} = nextProps;
      this.setState({animating: animating});
  }

  render() {
    //StyleSheet.create();
    const styles = {
        container: {
            backgroundColor: 'transparent',
            height: null,
            width: null,
        },
        container_full_stretch: {
            height: null,
            width: null,
            backgroundColor: 'transparent',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 80,
            margin: "0 auto",
            marginTop: 80
        },
        wrapper: {
            backgroundColor: 'white',
            zIndex: 100,
        }
    }

    return (
        <div style={this.props.fullStretch ? styles.container_full_stretch : styles.container}>
          <Icon icon='fa-spinner' spin size={this.props.size} style={{color : this.props.color}}/>
        </div>
    )
  }

}
