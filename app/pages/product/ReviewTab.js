'use strict';

import React, {Component} from "react";

import Rating from "./../../components/Rating"
import Spinner from "./../../components/Spinner"
import Constants from './../../Constants';
import WooWorker from './../../services/WooWorker';
import moment from 'moment';

export default class ReviewTab extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,       // Flag to know we are retrieving data or not.
          dataSource: null,
      }
  }

  componentWillMount() {
      this.fetchData();
  }

  fetchData() {
      let self = this;
      self.setState({isLoading: true});
      WooWorker.reviewByProductId(this.props.product.id, (data) => {
          self.setState({isLoading: false, dataSource: data});
      })
  }

  render() {
    return (
      <div style={{minHeight: 60,}}>
      {this.state.isLoading ?
          <Spinner fullStretch/> :
          this.state.dataSource.length == 0 ?
              <div
                  style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                  <p> {'No Review'}</p>
              </div > :
              <div>
                  {this.state.dataSource.map((review, i) =>
                      <ReviewRow key={i} review={review}/>
                  ) }
              </div>
      }
      </div>
    );
  }
}

class ReviewRow extends Component {
  constructor(props) {
      super(props);
      this.dateFormat = this.dateFormat.bind(this);
  }

  render() {
     const styles = {
        review_container: {
            borderColor: Constants.Color.ViewBorder,
            marginTop: 20,
            borderWidth: 1,
        },
        review_btm_container: {
            flex: 1,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: Constants.Color.ViewBorder,
        },
        review_btm_left: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 3,
            borderRightWidth: 1,
            borderColor: Constants.Color.ViewBorder,
        },
        review_btm_right: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        review_name: {
            color: Constants.Color.TextDark,
            fontSize: 24,
            margin: 15,
        },
        review_review: {
            color: Constants.Color.TextDark,
            fontSize: 14,
            margin: 15,
            marginTop: 0,
            textAlign: 'justify',
        },
        review_date: {
            color: Constants.Color.TextDark,
            fontSize: 14,
            margin: 10,
        },
        review_rating: {
            margin: 10,
        },
      };
      return (
        <div style={styles.review_container}>
            <div style={styles.review_name}> {this.props.review.name}</div>
            <div style={styles.review_review}> {this.props.review.review}</div>
        </div>
      );
  }

  dateFormat(date) {
      return moment.parseZone(date).format('MMMM DD, YYYY')
  }
}
