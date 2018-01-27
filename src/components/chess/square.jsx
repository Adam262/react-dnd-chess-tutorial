import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: ${ props => props.black ? 'black' : 'white' };
  color: ${ props => props.black ? 'white' : 'black' };
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Square = ({ black, children }) => {
  return <StyledDiv black={ black }> { children } </StyledDiv> 
}

Square.propTypes = {
  black: PropTypes.bool
}

export default Square;
