import React, { Component } from 'react';
import Header from './common/header';

const App = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default App;
