import React from 'react';

import Board from '../chess/board';
import { observe, knightPosition } from '../chess/game';

export default class BoardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      knightPosition: knightPosition
    }
  }

  componentDidMount() {
    const callback = newPosition => this.setState({knightPosition: newPosition});
    observe(callback);
  }

  render() {    
    return (
      <div>
        <h1>Chess</h1>
        <p> Based on the official React DnD
          <a href={ "http://react-dnd.github.io/react-dnd/docs-tutorial.html"} target="_blank"> tutorial</a> 
        </p>
        <Board knightPosition={this.state.knightPosition} />
      </div>
    );
  }
};
