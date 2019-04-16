import React from 'react';
import Square from './Square';
import { API_ROOT, HEADERS } from '../constants';

export default class Board extends React.Component {

  state = {
    squares:Array(9).fill(null),
    xIsNext:true,
    content: '',
    game_id: this.props.game.id
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ game_id: nextProps.game_id });
  };

  handleClick = (i) => {

      const squares = this.state.squares.slice();
      if(this.props.calculateWinner(squares) || squares[i]){
        return;
      }

      squares[i] =  this.state.xIsNext ? 'X' : 'O'
      this.setState({
        squares : squares,
        xIsNext: !this.state.xIsNext
      }, () => {
          this.setState({content: this.state.xIsNext ? 'X' : 'O'});
      });

     fetch(`${API_ROOT}/game_moves`, {
       method: 'POST',
       headers: HEADERS,
       body: JSON.stringify({game_id: this.props.game.id ,square_index:i, content: this.state.content})
     });


  }

  renderSquare(i) {
    const gameMove = this.props.game.game_moves.find(move => {
      return move.square_index === i;
    })

    return(
      <Square
        value={gameMove}
        onClick={ () => this.handleClick(i)}
      />
    );

  }


  render() {
    const winner = this.props.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.content ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
