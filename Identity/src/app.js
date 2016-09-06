import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//App Component
export default class App extends Component {
  render() {
    return (
    	<div id='app'>
    		<MuiThemeProvider>
      		{this.props.children}
    		</MuiThemeProvider>
    	</div>
    );
  }
}