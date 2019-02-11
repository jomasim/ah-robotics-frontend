import React from 'react';
import logo from '../ahlogo.png';
import '../App.scss';

const HomeView = () =>
  (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Welcome to Author's Haven
        </p>
            The place of choice.
      </header>
    </div>
  );

export default HomeView;