import React, { PropTypes, Component } from 'react'

export default class Image extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    var self = this
    var img = document.createElement('img')

    img.onload = function() {
      self.setState({loaded: true})
    }

    img.src = this.props.src
  }

  render() {
    var imageStyles = {
      position: 'absolute',
      top: 0, right: 0, bottom: 0, left: 0,
      backgroundSize: this.props.resizeMode || 'cover',
      backgroundPosition: 'center center',
      backgroundImage: 'url(' + this.props.src + ')',
      opacity: this.state.loaded ? 100 : 0,
      transition: this.props.transition || 'opacity 0.6s ease'
    }

    return (
      React.DOM.div({
          className: 'component-image' + (!this.state.loaded ? ' component-image--loading' : ''),
          style: divStyles
        },
        React.DOM.div({
          style: imageStyles
        })
      )
    );
  }
}
