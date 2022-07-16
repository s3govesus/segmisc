class Queue {
  constructor() {
    this.items = {};
    this.first = 0;
    this.last = 0;
  }

  add(element) {
    this.items[this.last] = element;
    this.last += 1;
  }

  remove() {
    const item = this.items[this.first];
    delete this.items[this.front];
    this.first += 1;
    return item;
  }

  isEmpty() {
    return this.last - this.first === 0;
  }

  check() {
    return this.items[this.first];
  }

  size() {
    return this.last - this.first;
  }

  print(options) {
    // TODO implement the options
    console.log(this.items);
  }

  toString(options) {
    // TODO implement the options and make this all a bit more elegant

    let returnStr = ``;
    returnStr = JSON.stringify(this.items);
    return returnStr;
  }
}
exports.Queue = Queue;
