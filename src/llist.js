class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/******************************************************************************/

class LList {
  constructor() {
    this.head = null; // the first node
    this.tail = null;
    this.size = 0;
  }

  /******************************************************************************/

  isEmpty() {
    return this.size === 0;
  }

  /******************************************************************************/

  getSize() {
    return this.size;
  }

  /******************************************************************************/

  prepend(value) {
    // const node = new Node(value);
    // if (this.isEmpty()) {
    //   this.head = node;
    // } else {
    //   node.next = this.head;
    //   this.head = node;
    // }
    // this.size += 1;
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size += 1;
  }

  /******************************************************************************/

  append(value) {
    // const node = new Node(value);
    // if (this.isEmpty()) {
    //   this.head = node;
    // } else {
    //   let previous = this.head;
    //   while (previous.next) {
    //     previous = previous.next;
    //   }
    //   previous.next = node;
    // }
    // this.size += 1;
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size += 1;
  }

  /******************************************************************************/

  insert(value, index) {
    // make sure the provided index is always valid
    if (index < 0 || index > this.size) {
      return;
    }
    if (index === 0) {
      this.prepend(value);
    } else {
      const node = new Node(value);
      let previous = this.head;
      for (let i = 0; i < index - 1; i += 1) {
        previous = previous.next;
      }
      node.next = previous.next;
      previous.next = node;
      this.size += 1;
    }
  }

  /******************************************************************************/

  removeFrom(index) {
    // make sure the provided index is always valid
    if (index < 0 || index >= this.size) {
      return null;
    }
    let removedNode;
    if (index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
    } else {
      let previous = this.head;
      for (let i = 0; i < index - 1; i += 1) {
        previous = previous.next;
      }
      removedNode = previous.next;
      previous.next = removedNode.next;
    }
    this.size -= 1;
    return removedNode.value;
  }

  /******************************************************************************/

  removeFromFront() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.size -= 1;
    return value;
  }

  /******************************************************************************/

  removeFromEnd() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.tail.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let previous = this.head;
      while (previous.next !== this.tail) {
        previous = previous.next;
      }
      previous.next = null;
      this.tail = previous;
    }
    this.size -= 1;
    return value;
  }

  /******************************************************************************/

  // removes the first instance of a given value from the linked list
  // returns true if the value was present and removed, false if it wasn't
  // TODO modify this to return the index of the item removed
  removeValue(value, options) {
    if (this.isEmpty()) {
      return false;
    }
    // get the options and interpret them
    // TODO ??? finish implementing this
    if (options === undefined || typeof options !== `object`) {
      options = {
        scope: `single`, // or `single`
      };
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      this.size -= 1;
      return true;
    }
    let previous = this.head;
    // advance the previous pointer as long as there's a next node in the list
    while (previous.next && previous.next.value !== value) {
      previous = previous.next;
    }
    if (previous.next) {
      const removedNode = previous.next;
      previous.next = removedNode.next;
      this.size -= 1;
      return true;
    }
    return false;
  }

  /******************************************************************************/

  // returns the index of the first instance of a given value
  search(value) {
    if (this.isEmpty()) {
      return -1;
    }
    let i = 0;
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return i;
      }
      current = current.next;
      i += 1;
    }
    // if the value wasn't found, return -1
    return -1;
  }

  /******************************************************************************/

  reverse() {
    let previous = null;
    let current = this.head;
    while (current) {
      let next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
  }

  /******************************************************************************/

  print(options) {
    // get or fill the options with defaults
    // TODO maybe add more options?
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
      let current = this.head;
      let listValues = ``;
      while (current) {
        listValues += `${current.value} `;
        current = current.next;
      }
      console.log(listValues);
    }
  }

  /******************************************************************************/

  toString(options) {
    let returnString = ``;

    // get or fill the options with defaults
    // TODO maybe add more options?
    if (options === undefined) {
      options = {
        separator: `, `,
      };
    }
    if (options.separator === undefined) {
      options.separator = `, `;
    }

    if (this.isEmpty()) {
      return returnString;
    }
    // else, build the return string with each node value followed by the separator string
    let current = this.head;
    while (current) {
      returnString += `${current.value}${options.separator}`;
      current = current.next;
    }

    return returnString;
  }

  // TODO write a method for calculating the summation of node values if they're numerical
}

/******************************************************************************/

// exports.Node = Node;
exports.LList = LList;
exports.LinkedList = LList; // just another way of naming the LList class
