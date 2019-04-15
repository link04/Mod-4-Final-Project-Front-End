import React, { Component } from 'react';
import './App.css';
import GameRoomList from './components/GameRoomList';

import Game from './components/Game'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GameRoomList  />
        </header>
      </div>
    );
  }
}

export default App;
