import React, { Component } from 'react';

export default function(ComposedComponent) {
  class Authentication extends Component {
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  return Authentication;
}
