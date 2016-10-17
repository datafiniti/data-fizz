import React, { Component } from 'react';
import Header from './header';

const App = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default App;
