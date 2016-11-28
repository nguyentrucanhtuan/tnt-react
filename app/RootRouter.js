'use strict';

import React, {Component, PropTypes} from "react";
import TimerMixin from 'react-timer-mixin';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';
import localForage from 'localForage'

import Constants from './Constants';
import {store} from './store'
import Home from "./containers/home";



export default class RootRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
        this.introFlag = true; // change this after mock
    }

    componentWillMount() {
      TimerMixin.setTimeout(
          () => {
              localForage.getItem(Constants.AsyncCode.Intro, (error, result) => {
                  if (error) console.log(error)
                  else this.introFlag = (result != 'done');
                  this.setState({isLoading: false});
              });
          },
          Constants.SplashScreen.Duration
      );
    }

    render() {

      let styles = {
          centering: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
          }
      };

      if (this.state.isLoading) {
          return (
              <div style={styles.centering}>
                  <img
                      style={{height: Constants.Dimension.ScreenHeight(1), width: Constants.Dimension.ScreenWidth(1)}}
                      src={Constants.SplashScreen.Image}/>
              </div>
         );
      }

      return (
        <Home title={'Home'} cart={true} wishList={true}/>
      );
    }
}
