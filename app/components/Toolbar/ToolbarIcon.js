
import React, {Component, PropTypes} from 'react';
import { bounce, shake , bounceInDown} from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import {Icon,ToolbarButton} from 'react-onsenui';

export default class ToolbarIcon extends Component {
  constructor(props) {
      super(props);
      this.state = {}
      this.styles = {
          itemWrapper: {
              //justifyContent: 'center',
            //  padding: 10,
              //marginRight: 10,
              //marginLeft: -10,
              // backgroundColor: 'pink'
          },
          number_background: {
              backgroundColor: 'red',
              position: 'absolute',
              top: 7,
              right: 4,
              height: 16,
              width: 16,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: 0
          },
          number_text: {
            color: 'white',
            fontSize: 11,
            height: 16,
            minWidth: 16,
            lineHeight: '16px'
          //  padding: "2px 5px"
          }

      }
  }



  static propTypes = {
      //name: PropTypes.string.isRequired,
      total: PropTypes.number,
      //onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
      total: 0
  };

  componentWillMount() {
    this.total = this.props.total;
  }

  componentWillReceiveProps(nextProps) {
    const {total} = nextProps;
    const amination = StyleSheet.create({
      bounce: {
        animationName: bounceInDown,
        animationDuration: '2s'
      },
      shake: {
        animationName: shake,
        animationDuration: '2s'
      },

    })
    if (total !== this.total) {
      ReactDOM.findDOMNode(this.refs.totalNum).style = Object.assign({}, ReactDOM.findDOMNode(this.refs.totalNum).style, amination.shake);
    }
    this.total = total;
  }

  render() {

    const amination = StyleSheet.create({
      bounce: {
        animationName: bounceInDown,
        animationDuration: '2s'
      },
      shake: {
        animationName: shake,
        animationDuration: '2s'
      },

    })

    console.log(amination);

    let icon = null;

    if(this.props.total == 0){
     icon  = null
    }else{
     icon  = (<span style={this.styles.number_background} className={css(amination.bounce)} ref={"totalNum"}>

                <span className="notification" style={this.styles.number_text} >{this.props.total}</span>
            </span>)
    }


    return (
      <ToolbarButton>
        <Icon icon={this.props.icon} >{icon}</Icon>

      </ToolbarButton>
    );
  }


}
