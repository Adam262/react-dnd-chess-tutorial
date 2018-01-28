import React from 'react';
import PropTypes from 'prop-types';

import { canMoveKnight, moveKnight } from './game';
import Square from './square';

// @DropTarget(types, spec, collect, options)
/* The DropTarget higher-order component accepts three required parameters + a fourth options parameter: 
  - types : one or more ItemType(s), 
  - spec : a plain object with a few allowed methods. It describes how the drop target reacts to drag and drop events
  - collect(connect, monitor) : a function that returns a plain object of the props to inject into your component
  - options
*/
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './constants';

import styled from 'styled-components';

// This is ES6 object syntax, equivalent to:
// var squareTarget = { drop: function(props) { do stuff } }
const squareTarget = {
  drop(props) {
    canMoveKnight(props.x, props.y) && moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    /*
      http://react-dnd.github.io/react-dnd/docs-drop-target-connector.html

      DropTargetConnector is an object passed to the collecting function of the DropTarget. 
      Its only method dropTarget() returns a function that lets you assign the drop target role to one of your component's DOM nodes.

      Call the DropTargetConnector's dropTarget() method inside your collecting function. 
      This will pass the returned function to your component as a prop.
      You can then use it inside render or componentDidMount to indicate a DOM node should react to drop target events
    */
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class BoardSquare extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    // The collect() function injects connectDropTarget and isOver into props
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };

  render() {
    const { x, y, children, connectDropTarget, isOver } = this.props;
    const black = (x + y) % 2 === 1;
  
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}> {children} </Square>
        {isOver && <HighlightOverlay validMove={canMoveKnight(x, y)} />}
      </div>
    );
  }
}

const HighlightOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  zIndex: 1;
  opacity: 0.5;
  background: ${props => !!props.validMove ? '#66FF33' : 'red'};
`;

// Every DropTarget needs at least one corresponding DragSource
// In this app, it is Knight
export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
