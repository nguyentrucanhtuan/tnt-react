import React, {Component} from 'react';

export default class Image extends Component {
  render() {
    let {mode, src, height, width, style, ...props} = this.props;
    let modes = {
      'fill': 'cover',
      'fit': 'contain'
    };
    let size = modes[mode] || 'contain';

    let defaults = {
      height: height || 100,
      width: width || 100,
      backgroundColor: null
    };

    let important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    };

    //return <div {...props} style={{...defaults, ...style, ...important}} />
    return <img {...props} src={src} style={{...defaults, ...style, ...important}} />
  }
}
