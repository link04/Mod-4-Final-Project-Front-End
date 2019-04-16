import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ games, handleReceivedGameMove }) => {
  return (
    <Fragment>
      {games.map(game => {
        return (
          <ActionCable
            key={game.id}
            channel={{ channel: 'GameMovesChannel', game: game.id }}
            onReceived={handleReceivedGameMove}/>
        );
      })}
    </Fragment>
  );
};

export default Cable;
