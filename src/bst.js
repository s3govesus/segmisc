const { Queue } = require(`./queue`);

/******************************************************************************/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/******************************************************************************/

class BST {
  constructor() {
    // TODO make this so it can accept an array as an argument on the constructor to convert the array into a binary search tree
    this.root = null;
  }

  /******************************************************************************/

  // return true if there is no root node, otherwise return false
  isEmpty() {
    return this.root === null;
  }

  /******************************************************************************/

  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /******************************************************************************/

  insertNode(parent, newNode) {
    if (newNode.value < parent.value) {
      if (parent.left === null) {
        parent.left = newNode;
      } else {
        this.insertNode(parent.left, newNode);
      }
    } else {
      if (parent.right === null) {
        parent.right = newNode;
      } else {
        this.insertNode(parent.right, newNode);
      }
    }
  }

  /******************************************************************************/

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  /******************************************************************************/

  deleteNode(parent, value) {
    if (parent === null) {
      return parent;
    }
    if (value < parent.value) {
      parent.left = this.deleteNode(parent.left, value);
    } else if (value > parent.value) {
      parent.right = this.deleteNode(parent.right, value);
    } else {
      if (!parent.left && !parent.right) {
        return null;
      }
      if (!parent.left) {
        return parent.right;
      }
      if (!parent.right) {
        return parent.left;
      }
      parent.value = this.min(parent.right);
      parent.right = this.deleteNode(parent.right, parent.value);
    }
    return parent;
  }

  /******************************************************************************/

  search(parent, value) {
    if (!parent) {
      return false;
    }
    if (parent.value === value) {
      return true;
    }
    if (value < parent.value) {
      return this.search(parent.left, value);
    }
    return this.search(parent.right, value);
  }

  /******************************************************************************/

  min(root) {
    if (root === undefined) {
      return this.getMin(this.root);
    }
    return this.getMin(root);
  }

  /******************************************************************************/

  getMin(parent) {
    if (!parent.left) {
      return parent.value;
    }
    return this.min(parent.left);
  }

  /******************************************************************************/

  max(root) {
    if (root === undefined) {
      return this.getMax(this.root);
    }
    return this.getMax(root);
  }

  /******************************************************************************/

  getMax(parent) {
    if (!parent.right) {
      return parent.value;
    }
    return this.max(parent.right);
  }

  /******************************************************************************/

  // preorder traversal
  // read the data of the node
  // visit the left subtree
  // visit the right subtree
  preOrder(parent, arr) {
    if (parent) {
      arr.push(parent.value);
      this.preOrder(parent.left, arr);
      this.preOrder(parent.right, arr);
    }
  }

  /******************************************************************************/

  // inorder traversal
  // visit the left subtree
  // read the data of the node
  // visit the right subtree
  inOrder(parent, arr) {
    if (parent) {
      this.inOrder(parent.left, arr);
      arr.push(parent.value);
      this.inOrder(parent.right, arr);
    }
  }

  /******************************************************************************/

  // postorder traversal
  // visit the left subtree
  // visit the right subtree
  // read the data of the node
  postOrder(parent, arr) {
    if (parent) {
      this.postOrder(parent.left, arr);
      this.postOrder(parent.right, arr);
      arr.push(parent.value);
    }
  }

  /******************************************************************************/

  // create a queue
  // enqueue the root node
  // as long as a node exists in the queue
  // -- dequeue the node from the front
  // -- read the node's value
  // -- enqueue the node's left child if it exists
  // -- enqueue the node's right child if it exists
  levelOrder(arr) {
    const q = new Queue();
    q.add(this.root);
    while (!q.isEmpty()) {
      let current = q.check();
      q.remove();
      //
      // console.log(current.value);
      arr.push(current.value);
      if (current.left) {
        q.add(current.left);
      }
      if (current.right) {
        q.add(current.right);
      }
    }
  }

  /******************************************************************************/

  // returns an array of the tree, given a certain method of traversing the binary search tree
  traverse(mode) {
    let returnVal = [];

    mode = mode === undefined ? `inorder` : mode;
    switch (mode.toLowerCase()) {
      case `preorder`: {
        this.preOrder(this.root, returnVal);
        return returnVal;
      }
      case `inorder`: {
        this.inOrder(this.root, returnVal);
        return returnVal;
      }
      case `postorder`: {
        this.postOrder(this.root, returnVal);
        return returnVal;
      }
      case `levelorder`: {
        this.levelOrder(returnVal);
        return returnVal;
      }
      default: {
        // default to inorder
        throw new Error(`The traversal method was not understood. Expected 'preorder', 'inorder', or 'postorder' - received '${mode}'`);
      }
    }
  }
}
exports.BST = BST;
exports.BinarySearchTree = BST;
exports.BinaryTree = BST;
