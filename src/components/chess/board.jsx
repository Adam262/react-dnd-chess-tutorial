import React from 'react';
import PropTypes from 'prop-types'

import Link from 'gatsby-link';

import Knight from './knight';
import Square from './square';
import { moveKnight } from './game';

import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export default class Board extends React.Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  }

  handleSquareClick(toX, toY) {
    moveKnight(toX, toY);
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;

    return (
      <div  key={i}
            style={{ width: '12.5%', height: '12.5%' }}
            onClick={() => this.handleSquareClick(x, y)}
           >
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }

  render() {
    let i = 0;
    const squares = [];

    for (i; i < 64; i++) {
      console.log(i)
      squares.push(this.renderSquare(i));
    }

    return (
      <StyledDiv>
        {squares}
      </StyledDiv>
    );
  }
}
