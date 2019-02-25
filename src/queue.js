const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.queue = [];
		this.queue.length = this.maxSize;
	}

	push(data, priority) {
		this.queue.push({
			data: data,
			priority: priority
		});
	}

	shift() {

	}

	size() {

	}

	isEmpty() {
		console.log(this.queue);
		// return this.queue.length > 0 ? false : true;
	}
}

module.exports = PriorityQueue;