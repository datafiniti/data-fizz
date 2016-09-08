import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Necessary for MUI TouchTap event
injectTapEventPlugin();

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