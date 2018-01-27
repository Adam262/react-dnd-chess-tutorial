import React from 'react';
import Link from 'gatsby-link';

import Board from '../components/chess/board';
import { observe, knightPosition } from '../components/chess/game';

export default class BoardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      knightPosition: knightPosition
    }
  }

  componentDidMount() {
    observe(
      (newPosition) => this.setState({knightPosition: newPosition})
    )
  }

  render() {    
    return (
      <div>
        <h1>Chess</h1>
        <Board knightPosition={this.state.knightPosition} />
      </div>
    );
  }
};
