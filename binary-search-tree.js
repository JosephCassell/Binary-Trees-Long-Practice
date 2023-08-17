// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Your code here
// Do not change this
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {

    constructor() {
      this.root = null;
    }

    insert(val, currentNode = this.root) {

      if (!this.root) {
        this.root = new TreeNode(val);
        return;
      }

      if (val < currentNode.val) {
        if (!currentNode.left) {
          currentNode.left = new TreeNode(val);
        } else {
          this.insert(val, currentNode.left)
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = new TreeNode(val);
        } else {
          this.insert(val, currentNode.right)
        }
      }
    }

    search(val) {
      let currentNode = this.root;

      while (currentNode !== null) {

        if (val === currentNode.val) return true;

        else if (val < currentNode.val) currentNode = currentNode.left;

        else currentNode = currentNode.right;
      }

      return false;
    }


    preOrderTraversal(currentNode = this.root) {

      if (currentNode === null) return null;

      console.log(currentNode.val);

      this.preOrderTraversal(currentNode.left);

      this.preOrderTraversal(currentNode.right);

    }


    inOrderTraversal(currentNode = this.root) {

      if (currentNode === null) return null;

      this.inOrderTraversal(currentNode.left)

      console.log(currentNode.val)

      this.inOrderTraversal(currentNode.right)

    }


    postOrderTraversal(currentNode = this.root) {

      if (currentNode === null) return null;

      this.postOrderTraversal(currentNode.left)

      this.postOrderTraversal(currentNode.right)

      console.log(currentNode.val)
    }

    // Breadth First Traversal - Iterative
    breadthFirstTraversal() {

      let queue = [];
      queue.push(this.root);

      while (queue.length) {

        let node = queue.shift();
        console.log(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {

      let stack = [];
      stack.push(this.root);

      while (stack.length) {

        let node = stack.pop();
        console.log(node.val);

        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
      }
    }
  }


  module.exports = { BinarySearchTree, TreeNode };
