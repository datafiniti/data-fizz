import React, { Component } from 'react';
import Header from './common/header';

const App = ({children}) => {
  return (
    <div>
      <Header />
      <h1>Welcome!</h1>
      {children}
    </div>
  );
}

export default App;
