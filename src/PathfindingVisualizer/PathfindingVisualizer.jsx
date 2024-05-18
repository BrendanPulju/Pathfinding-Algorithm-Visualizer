import React, {Component} from 'react';
import Node from './Node/Node';
import {bfs, dfs, getNodesInShortestPathOrder} from '../algorithms/bfs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Legend from '../components/Legend';



//import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';

const NUM_COL = 30;
const NUM_ROW = 12;

let START_NODE_ROW = 6;
let START_NODE_COL = 7;
let FINISH_NODE_ROW = 6;
let FINISH_NODE_COL = 15;

let pathfindingSpeed = 50;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      draggingStartNode: false,
      draggingEndNode: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    console.log('handleMouseDown');
    const newGrid = this.state.grid.slice();
    const node = newGrid[row][col];
    if (node.isStart) {
      console.log('handleMouseDown=>isStart');
      this.setState({ draggingStartNode: true });
    } else if (node.isFinish) {
      this.setState({ draggingEndNode: true });
    } else {
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row][col] = newNode;
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }
  
  handleMouseEnter(row, col) {
    console.log('handleMouseEnter');
    const newGrid = this.state.grid.slice();
    const node = newGrid[row][col];
    if (this.state.draggingStartNode) {
      const startNode = newGrid[START_NODE_ROW][START_NODE_COL];
      startNode.isStart = false;
      node.isStart = true;
      START_NODE_ROW = row;
      START_NODE_COL = col;
      this.setState({ grid: newGrid });
    } else if (this.state.draggingEndNode) {
      const finishNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
      finishNode.isFinish = false;
      node.isFinish = true;
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      this.setState({ grid: newGrid });
    } else if (this.state.mouseIsPressed) { // Add this condition
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row][col] = newNode;
      this.setState({ grid: newGrid });
    }
  }
  
  handleMouseUp() {
    console.log('handleMouseUp');
    this.setState({ mouseIsPressed: false, draggingStartNode: false, draggingEndNode: false });
  }

  animatePathfinding(visitedNodesInOrder, nodesInShortestPathOrder) {
    let currentRowNum = 0;  

    console.log(visitedNodesInOrder);

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      let nodeTimeout = (currentRowNum * 5 * NUM_ROW) + (i * 5);

      //console.log(visitedNodesInOrder.length);
      //console.log(i);

      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, pathfindingSpeed + nodeTimeout);
        return;
      }
      
      //console.log('setTimeout: ' + nodeTimeout);
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, nodeTimeout);

      currentRowNum++;
    }
  }
  
  animateShortestPath(nodesInShortestPathOrder) {
    console.log(nodesInShortestPathOrder.length);
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      //console.log('setTimeout: ' + (100 + (10*i)));
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, (1000 + (pathfindingSpeed*i)));
    }
  }

  visualizeBFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animatePathfinding(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animatePathfinding(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetGrid() {
    const newGrid = this.state.grid.map(row => {
      return row.map(node => {
        return {
          ...node,
          isVisited: false,
          distance: Infinity,
          previousNode: null,
        };
      });
    });
  
    this.setState({ grid: newGrid });
  
    // Reset the classes of the DOM elements
    for (const row of newGrid) {
      for (const node of row) {
        let className = 'node';
        if (node.isStart) {
          className = 'node node-start';
        } else if (node.isFinish) {
          className = 'node node-finish';
        } else if (node.isWall) {
          className = 'node node-wall';
        }
        document.getElementById(`node-${node.row}-${node.col}`).className = className;
      }
    }
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <Header />
        <Legend />
        <div className="App" style={{ margin: '0', padding: '0' }}>
          <div style={{ margin: '0' }}>
            <button onClick={() => {this.resetGrid(); this.visualizeBFS();}}>
              Visualize Breadth-First Search
            </button>
            <button className="algorithmButton" onClick={() => {this.resetGrid(); this.visualizeDFS();}}>
              Visualize Depth-First Search
            </button>
          </div>
          <div className="grid" style={{display: 'grid', rowGap: '0', gridGap: '0', marginTop: '25px'}}>
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <Footer />
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COL; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    //distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewUpdatedGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
