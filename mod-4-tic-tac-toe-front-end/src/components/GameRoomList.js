import React from 'react';
import {ActionCable} from 'react-actioncable-provider';
import {API_ROOT} from '../constants';
import Cable from './Cable';
import NewGameForm from './NewGameForm'
import Game from './Game'

export default class GameRoomList extends React.Component {

  state = {
    games: [],
    activeGame: null
  }

  componentDidMount() {
    fetch(`${API_ROOT}/games`)
      .then(res => res.json())
      .then(gamesJSON => this.setState({games: gamesJSON}));
  }

  handleClick = id => {
    this.setState({activeGame: id})
  }

  handleReceivedGame = response => {
    const {game} = response;
    this.setState({games: [...this.state.games, game]});
  }

  handleReceivedGameMove = response => {
    const {game_move} = response;
    const games = [...this.state.games]
    const game = games.find(game => game.id === game_move.game_id);
    game.game_moves = [...game.game_moves, game_move];

    this.setState({games: games});
  }

  render() {
    const {games, activeGame} = this.state;
    return (
      <div>
        <ActionCable channel={{channel: 'GamesChannel'}} onReceived={this.handleReceivedGame}/>
        {games.length ? (
          <Cable games={games} handleReceivedGameMove={this.handleReceivedGameMove}/>)
            : null
        }
        <h1>Game Rooms</h1>
        <NewGameForm />
        <ul>{mapGames(games, this.handleClick)}</ul>

        { activeGame ? (
          <Game game={findActiveGame(games,activeGame)} />
        ) : null }
      </div>
    )
  }
}

const findActiveGame = (games, activeGame) => {
  return games.find(
    game => game.id === activeGame
  );
};

const mapGames = (games, handleClick) => {
  return games.map(game => {
    return (
      <li key={game.id} onClick={() => handleClick(game.id)}>
        Game {game.id}
      </li>
    );
  });
};
