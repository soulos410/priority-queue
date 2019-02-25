class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left && this.right) return;
    if (this.left === null) {
      this.left = node;
      node.parent = this;
    } else {
      this.right = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if (this.left === node) {
      this.left = null;
      node.parent = null;
    }
    if (this.right === node) {
      this.right = null;
      node.parent = null;
    }
    if (this.left && this.right) throw new Error();
  }

  remove() {
    return this.parent === null ? 1 : this.parent.removeChild(this);
  }

  swapWithParent() {
    if (this.parent === null) return;
    if (this.parent.parent === null) {
      let oldParent = this.parent,
        parentLeft = this.parent.left,
        parentRight = this.parent.right,
        nodeLeft = this.left,
        nodeRight = this.right;
      this.parent.parent = this;
      if (this.parent.left === this) {
        this.left = this.parent;
        this.right = parentRight;
        if (oldParent.right) oldParent.right.parent = this;
      } else {
        this.right = this.parent;
        this.left = parentLeft;
        oldParent.left.parent = this;
      }
      this.parent.left = nodeLeft;
      this.parent.right = nodeRight;
    } else {
      let currentNode = this,
        parentOfParent = this.parent.parent,
        parentOfNode = this.parent,
        parentLeftNode = this.parent.left,
        parentRightNode = this.parent.right,
        nodeLeft = this.left,
        nodeRight = this.right,
        isParentLeft = this.parent.parent.left === this.parent ? true : false,
        isNodeLeft = this.parent.left === this ? true : false;

      if (isParentLeft) {
        parentOfParent.left = currentNode;
        currentNode.parent = parentOfParent;
        if (isNodeLeft) {
          currentNode.left = parentOfNode;
          currentNode.right = parentRightNode;
          if (parentRightNode !== null) parentRightNode.parent = currentNode;
          parentOfNode.parent = currentNode;
          parentOfNode.left = nodeLeft;
          parentOfNode.right = nodeRight;
          if (nodeLeft) nodeLeft.parent = parentOfNode;
          if (nodeRight) nodeRight.parent = parentOfNode;
        } else {
          currentNode.right = parentOfNode;
          currentNode.left = parentLeftNode;
          if (parentLeftNode !== null) parentLeftNode.parent = currentNode;
          parentOfNode.parent = currentNode;
          parentOfNode.left = nodeLeft;
          parentOfNode.right = nodeRight;
          if (nodeLeft) nodeLeft.parent = parentOfNode;
          if (nodeRight) nodeRight.parent = parentOfNode;
        }
      } else {
        parentOfParent.right = currentNode;
        currentNode.parent = parentOfParent;
        if (isNodeLeft) {
          currentNode.left = parentOfNode;
          currentNode.right = parentRightNode;
          if (parentRightNode !== null) parentRightNode.parent = currentNode;
          parentOfNode.parent = currentNode;
          parentOfNode.left = nodeLeft;
          parentOfNode.right = nodeRight;
          if (nodeLeft) nodeLeft.parent = parentOfNode;
          if (nodeRight) nodeRight.parent = parentOfNode;
        } else {
          currentNode.right = parentOfNode;
          currentNode.left = parentLeftNode;
          if (parentLeftNode !== null) parentLeftNode.parent = currentNode;
          parentOfNode.parent = currentNode;
          parentOfNode.left = nodeLeft;
          parentOfNode.right = nodeRight;
          if (nodeLeft) nodeLeft.parent = parentOfNode;
          if (nodeRight) nodeRight.parent = parentOfNode;
        }
      }
    }
  }
}

module.exports = Node;
