### Overview
This is my work for the official [react-dnd tutorial](http://react-dnd.github.io/react-dnd/docs-tutorial.html)

It consists of a chess board with a single knight piece. You can drag and drop the knight per the rules of chess with validations.

My code is highly annotated to reflect my understanding of the key library components, as of the `react-dnd` version set in `yarn.lock`. 

If interested take a look at:

* src/chess/board_square.jsx (the [DropTarget](http://react-dnd.github.io/react-dnd/docs-drop-target.html));
* src/chess/knight.jsx (the [DragSource](http://react-dnd.github.io/react-dnd/docs-drag-source.html))
* src/chess/board.jsx (the [DragDropContext](http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html))

### To run locally
`npm install -g gatsby-cli` if Gatsby is not installed
`git clone git@github.com:Adam262/react-dnd-chess-tutorial.git`
`cd` into project directory
`yarn install`
`gatsby develop`

You can see local site at `localhost:8000`

## Deployed vesion
TBD



