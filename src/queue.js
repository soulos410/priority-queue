const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap;
		this.currentSize = 0;
	}

	push(data, priority) {
		if (this.heap.size() + 1 > this.maxSize) throw new Error("Max size reached");
		else {
			this.heap.push(data, priority);
			this.currentSize++;
		}
	}

	shift() {
		if (this.isEmpty()) throw new Error("Queue is empty");
		this.currentSize--;
		// return this.heap.pop();
	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		return this.currentSize === 0 ? true : false;
	}
}

module.exports = PriorityQueue;