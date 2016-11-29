import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListItem, Icon} from 'react-onsenui';

class Category extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListItem tappable>
        <div>
          <h2>{this.props.name}</h2>
        </div>
      </ListItem>
    );
  }
}


export default connect()(Category);
