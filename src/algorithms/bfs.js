export function bfs(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  let queue = [];
  queue.push(startNode);

  while (!!queue.length) {
    const closestNode = queue.shift();

    if (closestNode.isWall) continue;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;
    enqueueNeighborsBFS(closestNode, grid, queue);
  }
}

export function dfs(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  let stack = [];
  stack.push(startNode);

  while (!!stack.length) {
    const currentNode = stack.pop();

    if (currentNode.isWall) continue;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;
    enqueueNeighborsDFS(currentNode, grid, stack);
  }
}

function enqueueNeighborsDFS(node, grid, stack) {
  const unvisitedNeighbors = getUnvisitedNeighborsDFS(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (!neighbor.isVisited) {
      neighbor.previousNode = node;
      stack.push(neighbor);
    }
  }
}

function getUnvisitedNeighborsDFS(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function enqueueNeighborsBFS(node, grid, queue) {
  const unvisitedNeighbors = getUnvisitedNeighborsBFS(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (!neighbor.isVisited && !neighbor.isQueued) {
      neighbor.previousNode = node;
      neighbor.isQueued = true;
      queue.push(neighbor);
    }
  }
}

function getUnvisitedNeighborsBFS(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
