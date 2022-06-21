class Queue {
  cosntructor() {
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

  print() {
    console.log(this.items);
  }
}
exports.Queue = Queue;
