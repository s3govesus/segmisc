class Queue {
  constructor() {
    this.items = {};
    this.first = 0;
    this.last = 0;
  }

  /******************************************************************************/

  // add an item to the rear of the queue
  add(element) {
    this.items[this.last] = element;
    this.last += 1;
  }

  /******************************************************************************/

  // alternative name for `add()`
  enqueue(element) {
    this.add(element);
  }

  /******************************************************************************/

  // remove the item from the front of the queue
  remove() {
    const item = this.items[this.first];
    delete this.items[this.front];
    this.first += 1;
    return item;
  }

  /******************************************************************************/

  // alternative name for `remove()`
  dequeue() {
    this.remove();
  }

  /******************************************************************************/

  // return true if the queue is empty, false otherwise
  isEmpty() {
    return this.last - this.first === 0;
  }

  /******************************************************************************/

  // return the item at the front of the queue
  check() {
    return this.items[this.first];
  }

  /******************************************************************************/

  // return the current number of items in the queue
  size() {
    return this.last - this.first;
  }

  /******************************************************************************/

  print(options) {
    // TODO implement the options
    console.log(this.items);
  }

  /******************************************************************************/

  toString(options) {
    // TODO implement the options and make this all a bit more elegant

    let returnStr = ``;
    returnStr = JSON.stringify(this.items);
    return returnStr;
  }
}
exports.Queue = Queue;
