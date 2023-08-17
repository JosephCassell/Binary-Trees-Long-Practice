const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {

  if(!rootNode) return null;

  let curr = rootNode;

  while(curr.left) curr = curr.left;

  return curr.val;

}

function findMaxBST (rootNode) {

  if(!rootNode) return null;

  let curr = rootNode;

  while(curr.right) curr = curr.right;

  return curr.val;
}

function findMinBT (rootNode) {

  if (!rootNode) return null;

  let minVal = rootNode.val;

  const leftMin = findMinBT(rootNode.left);
  const rightMin = findMinBT(rootNode.right);

  if (leftMin !== null && leftMin < minVal) minVal = leftMin;
  if (rightMin !== null && rightMin < minVal) minVal = rightMin;

  return minVal;
}

function findMaxBT (rootNode) {

  if (!rootNode) return null;

  let minVal = rootNode.val;

  const leftMin = findMaxBT(rootNode.left);
  const rightMin = findMaxBT(rootNode.right);

  if (leftMin !== null && leftMin > minVal) minVal = leftMin;
  if (rightMin !== null && rightMin > minVal) minVal = rightMin;

  return minVal;
}

function getHeight (rootNode) {

  if (!rootNode) return -1;

  const leftHeight = getHeight(rootNode.left);
  const rightHeight = getHeight(rootNode.right);

  return Math.max(leftHeight, rightHeight) + 1;
}

function balancedTree (rootNode) {

  if (!rootNode) return true;

  const leftHeight = getHeight(rootNode.left);
  const rightHeight = getHeight(rootNode.right);

  if (Math.abs(leftHeight - rightHeight) > 1) return false;

  return balancedTree(rootNode.left) && balancedTree(rootNode.right);

}

function countNodes (rootNode) {

  if(!rootNode) return 0;

  const leftCount = countNodes(rootNode.left);
  const rightCount = countNodes(rootNode.right);

  return leftCount + rightCount + 1;
}

function getParentNode (rootNode, target) {

  if (!rootNode || rootNode.val === target) return null;

  function findParent(node, target, parent) {
    if (!node) return;
    if (node.val === target) return parent;
    return (findParent(node.left, target, node) || findParent(node.right, target, node))
  }
  return findParent(rootNode, target)
}

function inOrderPredecessor (rootNode, target) {

  let predecessor = null;

  function findPredecessor (node) {
    if(!node) return;
    if(node.val === target) {
      if (node.left) {
        let curr = node.left;
        while (curr.right) {
          curr = curr.right;
        }
        predecessor = curr.val;
      }
      return;
    }
    if(target < node.val) {
      findPredecessor(node.left);
    } else {
      predecessor = node.val;
      findPredecessor(node.right);
    }
  }
  findPredecessor(rootNode);
  return predecessor;
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parent = null;
  let curr = rootNode;
  // Undefined if the target cannot be found
  while(curr && curr.val !== target) {
    parent = curr;
    if (target < curr.val) {
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }
  if (!curr) return;
  if (!curr.left && !curr.right) {
    if(!parent) return null;
    if(parent.left === curr) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  } else if (curr.left && curr.right) {
    const predVal = inOrderPredecessor (rootNode, target);
    deleteNodeBST(rootNode, predVal)
    curr.val = predVal;
  } else {
    const child = curr.left || curr.right;
    if(!parent) {
      rootNode = child;
    } else if (parent.left === curr) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }
  return rootNode;
  // Set target based on parent

  // Case 0: Zero children and no parent:
  //   return null

  // Case 1: Zero children:
  //   Set the parent that points to it to null

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.

  // Case 3: One child:
  //   Make the parent point to the child

}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
