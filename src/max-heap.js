const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  push(data, priority) {
    const newNode = new Node(data, priority);
    this.insertNode(newNode);
    this.shiftNodeUp(newNode);
    this.heapSize += 1;
  }

  pop() {
    if (!this.heapSize) return;
    else {
      this.heapSize--;
      let detachedRoot = this.detachRoot(),
        oldRootData = detachedRoot.data;
      this.restoreRootFromLastInsertedNode(detachedRoot);
      this.shiftNodeDown(this.root);
      return this.root.data;
    }
  }

  detachRoot() {
    const detachedRoot = this.root;
    if (this.root.left) this.root.left.parent = null;
    if (this.root.right) this.root.right.parent = null;
    this.root = null;
    if (this.parentNodes.includes(detachedRoot)) this.parentNodes.shift();
    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    let lastNode = this.parentNodes.pop(),
      lastNodeParent = lastNode.parent;
    lastNode.remove();
    lastNode.left = detached.left;
    lastNode.right = detached.right;
    this.root = lastNode;
    this.root.left = detached.left;
    this.root.right = detached.right;
    if (detached.left) detached.left.parent = lastNode;
    if (detached.right) detached.right.parent = lastNode;
    if (detached.right === lastNode) this.parentNodes.unshift(lastNode)
    else this.parentNodes.unshift(lastNodeParent);
  }

  size() {
    return this.heapSize;
  }

  isEmpty() {
    return this.heapSize > 0 ? false : true;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  insertNode(node) {
    if (!this.root) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes.push(node);
      if (!this.parentNodes[0].left) {
        this.parentNodes[0].left = node;
        this.parentNodes[this.parentNodes.length - 1].parent = this.parentNodes[0];
      } else {
        this.parentNodes[0].right = node;
        this.parentNodes[
          this.parentNodes.length - 1
        ].parent = this.parentNodes[0];
        this.parentNodes.shift();
      }
    }
  }

  shiftNodeUp(node) {
    if (node !== this.root && node.priority > node.parent.priority) {
      this.root === node.parent ? this.root = node : this.root = this.root;
      let parentIndex = this.parentNodes.indexOf(node.parent),
        nodeIndex = this.parentNodes.indexOf(node);
      [this.parentNodes[parentIndex], this.parentNodes[nodeIndex]] = [node, node.parent];
      node.swapWithParent();
      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    if (node === this.root) {
      if (node.left && node.left.priority > node.priority) {
        this.root = node.left;
        this.root.left = node;
        this.root.right = node.right;
        if (node.left.left) {
          node.left = node.left.left;
          node.left.left.parent = node.left;
        }
        node.left.swapWithParent();
      }
    } else {
      if (node.left) {
        if (node.left.priority > node.priority) {
          let nodeIndex = this.parentNodes.indexOf(node.left);
          node.left.swapWithParent();
          this.parentNodes[nodeIndex] = node;
          this.shiftNodeDown(node);
        }
      } else if (node.right) {
        if (node.right.priority > node.priority) {
          let nodeIndex = this.parentNodes.indexOf(node.right);
          node.right.swapWithParent();
          this.parentNodes[nodeIndex] = node;
          this.shiftNodeDown(node);
        }
      }
    }
  }
}

module.exports = MaxHeap;