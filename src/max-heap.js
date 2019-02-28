const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		if (this.root !== null) this.root = this.insertNode(new Node(data, priority))
		else {
			const newNode = new Node(data, priority);
			this.insertNode(newNode);
			this.shiftNodeUp(newNode);
		}
		this.heapSize += 1;
	}

	pop() {
		if (this.heapSize === 0) return
		else this.heapSize -= 1;
	}

	detachRoot() {
		this.root = null;
		this.parentNodes.forEach((el) => {
			el.root = null;
		})
		return this.root;
	}

	restoreRootFromLastInsertedNode(detached) {

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
		if (this.root === null) this.root = node;
		else {
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {

	}

	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;