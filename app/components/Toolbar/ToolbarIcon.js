
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import { bounce, shake , bounceInDown} from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import {Icon,ToolbarButton} from 'react-onsenui';
import TimerMixin from 'react-timer-mixin';

export default class ToolbarIcon extends Component {
  constructor(props) {
      super(props);
      this.animation = StyleSheet.create({
        bounce: {
          animationName: bounceInDown,
          animationDuration: '2s'
        },
        shake: {
          animationName: shake,
          animationDuration: '2s'
        },

      })
      this.state = {
        animationClass: css(this.animation.bounce)
      }
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
              //right: 4,
              height: 16,
              width: 16,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: 0,
              marginRight: 8
          },
          number_text: {
            color: 'white',
            fontSize: 11,
            height: 16,
            minWidth: 16,
            lineHeight: '16px',
            right: 5,
            top: 3
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

    if (total !== this.total) {
      //this.refs.totalNum.style = Object.assign({}, this.refs.totalNum.style, amination.shake)
      //ReactDOM.findDOMNode(this.refs.totalNum).style = Object.assign({}, ReactDOM.findDOMNode(this.refs.totalNum).style, amination.shake);
      this.setState({
        animationClass: css(this.animation.shake)
      })
      TimerMixin.setTimeout(() => {this.setState({animationClass: ''})}, 500,);
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


    let icon = null;

    if(this.props.total == 0){
     icon  = null
    }else{
     //icon  = (<span style={this.styles.number_background} className={css(amination.bounce)} ref={"totalNum"}>

      //          <span className="notification" style={this.styles.number_text} >{this.props.total}</span>
        //    </span>)
        icon  = (<div className={this.state.animationClass + ' notification reply-notification'} ref='totalNum' style={this.styles.number_text}>{this.props.total}</div>)
    }


    return (
      <ToolbarButton >
        <Icon icon={this.props.icon} >{icon}</Icon>

      </ToolbarButton>
    );
  }


}
