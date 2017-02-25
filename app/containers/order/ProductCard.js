/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component, PropTypes} from 'react';
import {Text, View, TouchableOpacity, Image, Button} from 'react-native';

import Constants from './../../Constants';
import Rating from "./../../components/Rating"
import {ProductViewMode} from '../../reducers/Product/actions'
const {LIST_VIEW} =  ProductViewMode;

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            container: {
                height: undefined,
                borderColor: Constants.Color.ViewBorder,
                borderWidth: 1,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                paddingBottom: 5,
            },
            infoContainer:{
              flexDirection: 'column'

            },
            image: {
                marginBottom: 8,
            },
            price_wrapper: {
                flexDirection: 'row',
            },
            text: {
                color: "black",
                marginBottom: 8,
            },
            sale_price: {
                textDecorationLine: 'line-through',
                color: Constants.Color.TextLight,
                marginLeft: 0,
                marginRight: 0
            },
            price: {
                fontWeight: "600",
                color: Constants.Color.ProductPrice,
            },
            sale_off: {
                color: Constants.Color.TextLight,
            }
        }
    }

    static propTypes = {
        viewMode: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
        addCartItem: PropTypes.func.isRequired,
        addWishListItem: PropTypes.func.isRequired,
    };

    render() {
        this.isInWishList = this.props.wishLists.find((item) => item.product.id == this.props.product.id) != undefined
        const isListMode = this.props.viewMode === LIST_VIEW;
        this.styles = Object.assign({}, this.styles, {
            container: isListMode ? {
                ...this.styles.container,
                ...Constants.ProductCard.ListMode.container,
            } : {
                ...this.styles.container,
                ...Constants.ProductCard.GridMode.container,
            },
            infoContainer: isListMode ? {
                ...this.styles.infoContainer,
                ...Constants.ProductCard.ListMode.infoContainer,
            } : {
                ...this.styles.infoContainer,
                ...Constants.ProductCard.GridMode.infoContainer,
            },
            image: isListMode ? {
                ...this.styles.image,
                ...Constants.ProductCard.ListMode.image,
            } : {
                ...this.styles.image,
                ...Constants.ProductCard.GridMode.image,
            },
            text: isListMode ? {
                ...this.styles.text,
                ...Constants.ProductCard.ListMode.text,
            } : {
                ...this.styles.text,
                ...Constants.ProductCard.GridMode.text,
            },
        });

        const productImage = (<Image
            //on_sale={_product.on_sale}
            //saleSize={this.state.currentMode == listMode ? 'big' : 'small'}
            source={{uri: this.props.product.images[0].src}} //TODO: no image case
            style={this.styles.image}
            resizeMode="cover"
        />);

        const productRating = (<View style={this.styles.price_wrapper}>
            <Text style={{marginLeft: this.styles.text.marginLeft} }/>
            <Rating rating={Number(this.props.product.average_rating)} size={this.styles.text.fontSize + 4}/>
            <Text style={[this.styles.text, {color: Constants.Color.ViewBorder}]}>
                {'(' + this.props.product.rating_count + ')'}
            </Text>
        </View>);

        const productName = (<Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={this.styles.text}
        >
            {this.props.product.name}
        </Text>);

        const productPrice = (
            <View style={this.styles.price_wrapper}>
                <Text style={[this.styles.text, this.styles.price]}>
                    {Constants.Formatter.currency(this.props.product.price) }
                </Text>
                <Text style={[this.styles.text, this.styles.sale_price]}>
                    {this.props.product.on_sale ? Constants.Formatter.currency(this.props.product.regular_price) : ''}
                </Text>
                {!this.props.product.on_sale ? <View/> :
                    <Text style={[this.styles.text, this.styles.sale_off]}>
                        {'(' + ((1 - Number(this.props.product.price) / Number(this.props.product.regular_price)) * 100).toFixed(0) + '% off)' }
                    </Text>
                }
            </View>);

      const opAddToCart = (go = false) => {
        let _product = this.props.product;
        this.props.addCartItem(_product, undefined);
      }

      const opAddToWishlist = () => {
        if (this.isInWishList) {
            this.props.removeWishListItem(this.props.product, undefined);
        } else {
            //TODO: check limit
            this.props.addWishListItem(this.props.product, undefined);
        }
      }
      const buttonsGroup = (
        <View style={{flexDirection:'column', marginLeft: 5, marginRight:10, flex:1}}>
          <Button
            autoWidth={false}
            onPress={opAddToCart}
            title="Mua"
            color="#841584"
            accessibilityLabel="Press to Buy"
          />
          <Button
            autoWidth={false}
            onPress={opAddToWishlist}
            title={this.isInWishList ? 'Bỏ thường mua' : 'Thêm vào thường mua'}
            color={Constants.Color.BuyNowButton}
            accessibilityLabel="Press to WishList"
          />
        </View>
      );

        return (
            <TouchableOpacity
                style={this.styles.container}
                //onPress={() => this.props.onPress(this.props.product.id)}
            >
                {productImage}
                <View style={{flexDirection:'column', flex: 1}}>
                  <View style={this.styles.infoContainer}>
                    {productRating}
                    {productName}
                    {productPrice}
                  </View>
                  <View>
                      {buttonsGroup}
                  </View>
                </View>
            </TouchableOpacity>
        );
    }
}
