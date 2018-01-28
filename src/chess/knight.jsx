import React from 'react';
import PropTypes from 'prop-types';

// @DragSource(types, spec, collect, options)
/* The DragSource higher-order component accepts three required parameters + a fourth options parameter: 
  - types : one or more ItemType(s), 
  - spec : a plain object with a few allowed methods. It describes how the drag DragSource reacts to drag and drop events
  - collect(connect, monitor) : a function that returns a plain object of the props to inject into your component
  - options
*/
import { DragSource } from 'react-dnd';
import { ItemTypes } from './constants';

const knightSource = {
  // This is ES6 object syntax, equivalent to:
  // var knightSource = { beginDrag: function(props) { do stuff } };
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    /*
      http://react-dnd.github.io/react-dnd/docs-drag-source-connector.html

      DragSourceConnector is an object passed to the collecting function of the DragSource. 
      Its methods return functions that let you assign the roles to your component's DOM nodes.

      Call the DragSourceConnector methods inside your collecting function. 
      This will pass the returned functions to your component as props. 
      You can then use them inside render or componentDidMount to indicate the DOM node roles.
    */

    // Returns a function that must be used inside the component to assign the drag source role to a node
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Knight extends React.Component {
  static propTypes = {
    // The collect() function injects connectDragSource and isDragging into this.props
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;

    // Wrap the returned component in connectDragSource()
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 80,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    );
  }
}

// Every DragSource needs at least one corresponding DropTarget
// In this app, it is BoardSquare
export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
