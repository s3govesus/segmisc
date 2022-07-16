const { LList } = require(`./llist`);

/******************************************************************************/

// a last in first out data structure
class Stack {
  constructor() {
    this.list = new LList();
  }

  push(value) {
    this.list.prepend(value);
  }

  pop() {
    return this.list.removeFromFront();
  }

  check() {
    return this.list.head.value;
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  getSize() {
    return this.list.getSize();
  }

  print(options) {
    return this.list.print(options);
  }

  toString(options) {
    return this.list.toString(options);
  }
}

/******************************************************************************/

exports.Stack = Stack;
