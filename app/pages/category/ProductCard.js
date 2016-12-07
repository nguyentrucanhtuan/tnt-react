import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Image from './../../components/Image'
import ImageResponsive, {Source} from 'react-image-responsive';

import {ListItem, Icon} from 'react-onsenui';
import { getRoute } from './../../routes'
import Constants from './../../Constants';
import {ProductViewMode} from '../../reducers/Product/actions'

const {LIST_VIEW} =  ProductViewMode;

export default class ProductCard extends Component{
   constructor(props) {
      super(props);

      this.styles = {
        image: {
            marginBottom: 8,
        },
      }
    }

    static propTypes = {
        viewMode: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
      const isListMode = this.props.viewMode === LIST_VIEW;

      const productImage = (
        <ImageResponsive type="image" src="http://placehold.it/50x50" width="50%" height="200px">
          <Source src="http://placehold.it/1600x300" maxWidth={1600}/>
          <Source src="http://placehold.it/300x300"  maxWidth={300}/>
          <Source src="http://placehold.it/500x300"  maxWidth={500}/>
          <Source src="http://placehold.it/800x300"  maxWidth={800}/>
          <Source src="http://placehold.it/1000x300" maxWidth={1000}/>
      </ImageResponsive>
    );

      return (
        <ListItem key={this.props.product.id} onClick={() => {
            this.props.onPress(this.props.product.id)
          }} tappable>
          {productImage}

        </ListItem>

      );
    }
}
