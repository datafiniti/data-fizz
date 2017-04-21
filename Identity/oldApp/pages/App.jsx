import React from 'react';
import AppContainer from '../containers/AppContainer';

class App extends React.Component {
	render() {
		return (
			<AppContainer>
				{this.props.children}
			</AppContainer>
		);
	}
}

export default App;