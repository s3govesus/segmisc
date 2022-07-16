const { LList } = require(`./llist`);

/******************************************************************************/

class LLQueue {
  constructor() {
    this.list = new LList();
  }

  /******************************************************************************/

  // add an item to the queue
  add(value) {
    this.list.append(value);
  }

  /******************************************************************************/

  // remove the item from the front of the queue
  remove() {
    return this.list.removeFromFront();
  }

  /******************************************************************************/

  // get the first item in the queue
  check() {
    return this.list.head.value;
  }

  /******************************************************************************/

  // return true if the queue is empty or false otherwise
  isEmpty() {
    return this.list.isEmpty();
  }

  /******************************************************************************/

  // return the total number of items in the queue
  getSize() {
    return this.list.getSize();
  }

  /******************************************************************************/

  // print the items in the queue
  print(options) {
    return this.list.print(options);
  }

  /******************************************************************************/

  // create a string of the values of the items in the queue
  toString(options) {
    return this.list.toString(options);
  }
}

/******************************************************************************/

exports.LLQueue = LLQueue;
exports.LinkedListQueue = LLQueue;
