// a class for working with ring buffers / circular queues
class Ring {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.currentLength = 0;
    this.rear = -1;
    this.front = -1;
  }

  /******************************************************************************/

  isFull() {
    return this.currentLength === this.capacity;
  }

  /******************************************************************************/

  isEmpty() {
    return this.currentLength === 0;
  }

  /******************************************************************************/

  add(element) {
    // if the ring buffer isn't full
    if (!this.isFull()) {
      this.rear = (this.rear + 1) % this.capacity;
      this.items[this.rear] = element;
      this.currentLength += 1;
      if (this.front === -1) {
        this.front = this.rear;
      }
    }
  }

  /******************************************************************************/

  // alternative name for `add()`
  enqueue(element) {
    this.add(element);
  }

  /******************************************************************************/

  remove() {
    if (this.isEmpty()) {
      return null;
    }
    const item = this.items[this.front];
    this.items[this.front] = null;
    this.front = (this.front + 1) % this.capacity;
    this.currentLength -= 1;
    if (this.isEmpty()) {
      this.front = -1;
      this.rear = -1;
    }
    return item;
  }

  /******************************************************************************/

  // alternative name for `remove()`
  dequeue() {
    this.remove();
  }

  /******************************************************************************/

  check() {
    if (!this.isEmpty()) {
      return this.items[this.front];
    }
    return null;
  }

  /******************************************************************************/

  print(options) {
    // get or fill the options with defaults
    // TODO add more options?
    if (options === undefined) {
      options = {
        separator: `, `,
      };
    }
    if (options.separator === undefined) {
      options.separator = `, `;
    }

    if (this.isEmpty()) {
      console.log(`{}`);
    } else {
      let i;
      let str = ``;
      for (i = this.front; i !== this.rear; i = (i + 1) % this.capacity) {
        str += `${this.items[i]}${options.separator}`;
      }
      str += this.items[i];
      console.log(str);
    }
  }

  /******************************************************************************/

  toString(options) {
    let returnString = ``;

    // get or fill the options with defaults
    // TODO add more options?
    if (options === undefined) {
      options = {
        separator: `, `,
      };
    }
    if (options.separator === undefined) {
      options.separator = `, `;
    }

    if (this.isEmpty() === false) {
      let i;
      for (i = this.front; i !== this.rear; i = (i + 1) % this.capacity) {
        returnString += `${this.items[i]}${options.separator}`;
      }
      returnString += this.items[i];
    }

    return returnString;
  }
}

/******************************************************************************/

exports.Ring = Ring;
exports.RingBuffer = Ring;
exports.CircularQueue = Ring;
