import React from 'react';
import PropTypes from 'prop-types'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Link from 'gatsby-link';

import Knight from './knight';
import BoardSquare from './board_square';
import { moveKnight, canMoveKnight } from './game';

import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

class Board extends React.Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  }

  handleSquareClick(toX, toY) {
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY);
    }
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x}
                     y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;

    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  render() {
    const squares = Array(64).fill().map((_, i) => this.renderSquare(i));

    return (
      <StyledDiv>
        {squares}
      </StyledDiv>
    );
  }
}


// DragDropContext(HTML5Backend)

/* 
  This is the top level component for your feature. 
  We're specifying the HTML5 Drag and Drop API, as opposed to another 3rd party backend, such as touch
*/ 
export default DragDropContext(HTML5Backend)(Board);
