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
import { ItemTypes, colors } from './constants';

import styled from 'styled-components';

/*
  This is the spec object. 

  We've written it in ES6 object syntax, equivalent to:
    var squareTarget = { drop: function(props) { do stuff } }

  It can have methods:
  - canDrop(props, monitor, component)
  - drop(props, monitor, component)
  - hover(props, monitor)
*/
const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  },

  drop(props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    /*
      http://react-dnd.github.io/react-dnd/docs-drop-target-connector.html

      collect(connect, monitor) returns an object that lets you pass methods from its arguments to your component as props: 

        - connect is an instance of DropTargetConnector, an object with the single method connect.dropTarget(). 
          connect.dropTarget() is called in render(); it wraps an element to make it a drop target for draggable elements.
        - monitor is an instance of DropTargetMonitor. it is used to query info on the drag state

    */
    connectDropTarget: connect.dropTarget(),
    monitorCanDrop: monitor.canDrop(),
    monitorIsOver: monitor.isOver(),
  };
}

class BoardSquare extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,

    // The collect() function injects the object returned by collect() into your component props
    connectDropTarget: PropTypes.func.isRequired,
    monitorCanDrop: PropTypes.bool.isRequired,
    monitorIsOver: PropTypes.bool.isRequired,
  };

  render() {
    const { x, y, children, connectDropTarget, monitorCanDrop, monitorIsOver } = this.props;
    const black = (x + y) % 2 === 1;
  
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}> {children} </Square>
        { monitorIsOver && <HighlightOverlay canDrop={ monitorCanDrop } /> }
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
  background: ${ props => props.canDrop ? colors.lightGreen : colors.red };
`;

// Every DropTarget needs at least one corresponding DragSource
// In this app, it is Knight
export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
