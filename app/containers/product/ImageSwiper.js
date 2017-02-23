
import React, {Component} from "react";
import {Image} from 'react-native';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./swiper.css";

export default class ImageSwiper extends Component {
  constructor(props) {
      super(props);
  }

  render () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };
    return (
      <Slider {...settings}>
      {this.props.product.images.map((image, index) =>
        <img key={index} src={image.src} style={{height:'auto'}}/>,this)}
      </Slider>
    );
  }

}
