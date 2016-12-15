'use strict';

import React, {PropTypes, Component} from "react";
import Constants from '../../Constants';

import {Icon} from 'react-onsenui';

export default class Rating extends Component {
  static propTypes = {
      size: PropTypes.number,
      color: PropTypes.string,
      rating: PropTypes.number.isRequired,
  };

  static defaultProps = {
      size: Constants.Rating.Size,
      color: Constants.Color.Rating,
      rating: 5,
  };

  render() {
    let stars = [];
    for (let i = 1; i < 6; i++) {
      stars[i - 1] = <Icon
          key={i}
          icon={this.props.rating >= i ? Constants.Icon.RatingFull : Constants.Icon.RatingEmpty}
          size={this.props.size} style={{color: this.props.color}} color={this.props.color}
      />;
    }

    return (
        <div style={{...{flexDirection: 'row'}, ...this.props.style}}>
            {stars}
        </div>
    );
  }

}
