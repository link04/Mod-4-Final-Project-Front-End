import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

export default class NewGameForm extends React.Component {

  state = {
    user_id1:4,
    user_id2:2,
  }



  handleSubmit = event => {
    event.preventDefault();
    fetch(`${API_ROOT}/games`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({game:{user_id:this.state.user_id1}})
    });

  }


  render(){
    return(
      <div>
      <h1>Start Game Match</h1>
      <form onSubmit={this.handleSubmit}>
         <input type="submit" value="CREATE" />
       </form>
      </div>
    )
  }
}
