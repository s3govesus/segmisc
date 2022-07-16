class Node {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

/******************************************************************************/

// a class for creating a doubly linked list data structure
class DLList {
  constructor() {
    this.head = null;
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
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }
    this.size += 1;
  }

  /******************************************************************************/

  append(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
    this.size += 1;
  }

  /******************************************************************************/

  removeFromFront() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.head.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.previous = null;
    }
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
      this.tail = this.tail.previous;
      this.tail.next = null;
    }
    this.size -= 1;
    return value;
  }

  /******************************************************************************/

  print(options) {
    // get the options or fill with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        separator: ` <-> `,
        reverse: false,
      };
    }
    if (options.separator === undefined) {
      options.separator = ` <-> `;
    }
    if (options.reverse === undefined) {
      options.reverse = false;
    }

    if (this.isEmpty()) {
      console.log(`{}`);
    } else {
      let list = ``;
      if (options.reverse === false) {
        // print the list normally
        let current = this.head;
        while (current) {
          if (current.next !== null) {
            list += `${current.value}${options.separator}`;
          } else {
            list += `${current.value}`;
          }
          current = current.next;
        }
      } else {
        // print the list in reverse
        let current = this.tail;
        while (current) {
          if (current.previous !== null) {
            list += `${current.value}${options.separator}`;
          } else {
            list += `${current.value}`;
          }
          current = current.previous;
        }
      }

      console.log(list);
    }
  }

  /******************************************************************************/

  toString(options) {
    let returnStr = ``;
    // get the options or fill with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        separator: `, `,
        reverse: false,
      };
    }
    if (options.separator === undefined) {
      options.separator = `, `;
    }
    if (options.reverse === undefined) {
      options.reverse = false;
    }

    if (this.isEmpty()) {
      return ``;
    }
    if (options.reverse === false) {
      // print the list normally
      let current = this.head;
      while (current) {
        if (current.next !== null) {
          returnStr += `${current.value}${options.separator}`;
        } else {
          returnStr += `${current.value}`;
        }
        current = current.next;
      }
    } else {
      // print the list in reverse
      let current = this.tail;
      while (current) {
        if (current.previous !== null) {
          returnStr += `${current.value}${options.separator}`;
        } else {
          returnStr += `${current.value}`;
        }
        current = current.previous;
      }
    }

    return returnStr;
  }
}

/******************************************************************************/

exports.DLList = DLList;
exports.DoublyLinkedList = DLList;
