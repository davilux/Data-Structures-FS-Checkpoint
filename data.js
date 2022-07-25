"use strict";

/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

// -----------------------------------------
// Stacks

class Stack {
  // Stack constructor function
  constructor() {
    this.head = null;
    this.tail = null;
    this.stack = [];
  }

  // Stack.prototype.add
  add(item) {
    this.head = item;
    if (!this.stack[0]) {
      this.tail = item;
    }
    for (let i = 0; true; i++) {
      if (!this.stack[i]) {
        this.stack[i] = item;
        return this;
      }
    }

    return this; // for chaining, do not edit
  }

  // Stack.prototype.remove
  remove() {
    if (!this.stack[0]) {
      return undefined;
    }

    for (let i = 0; true; i++) {
      if (!this.stack[i]) {
        const valueToReturn = this.stack[i - 1];
        this.stack[i - 1] = undefined;
        return valueToReturn;
      }
    }
  }
}

// -----------------------------------------
// Queues

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

class Queue {
  // Queue constructor function
  constructor() {
    this.head = null;
    this.tail = null;
    this.queue = [];
  }

  // Queue.prototype.add
  add(item) {
    this.tail = item;
    if (!this.queue[0]) {
      this.head = item;
      this.queue[0] = item;
      return this;
    }

    //otherwise, there is at least one value in the queue
    //shifting values over
    let currentValue = item;
    let nextValue = this.queue[0];

    for (let i = 0; true; i++) {
      if (!nextValue) {
        this.queue[i] = currentValue;
        return this;
      }

      this.queue[i] = currentValue;
      currentValue = nextValue;
      nextValue = this.queue[i + 1];
    }
  }

  // Queue.prototype.remove
  remove() {
    if (!this.queue[0]) {
      return undefined;
    }

    for (let i = 0; true; i++) {
      if (!this.queue[i + 1]) {
        this.head = this.queue[i - 1];
        let removedValue = this.queue[i];
        this.queue[i] = null;

        return removedValue;
      }
    }
  }
}

// -----------------------------------------
// Linked lists

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

class LinkedList {
  // LinkedList constructor function
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // LinkedList.prototype.addToTail
  addToTail(item) {
    const newTail = new ListNode(item);
    if (this.tail) {
      const prevTail = this.tail;
      prevTail.next = newTail;
      newTail.prev = prevTail;
    } else {
      this.head = newTail;
      this.tail = newTail;
    }
    this.tail = newTail;
    return this;
  }

  // LinkedList.prototype.removeFromTail
  removeFromTail() {
    //if empty linked list
    if (!this.tail) return undefined;

    const prevTail = this.tail;

    //if linked list of length 1
    if (!this.tail.prev) {
      this.head = null;
      this.tail = null;
      return prevTail.item;
    }

    //otherwise the list is longer
    const newTail = prevTail.prev;
    newTail.next = null;
    this.tail = newTail;
    return prevTail.item;
  }

  // LinkedList.prototype.forEach
  forEach(callbackFunc) {
    let currentNode = this.head;
    let nextNode;

    while (currentNode) {
      callbackFunc(currentNode.item);
      nextNode = currentNode.next;
      currentNode = nextNode;
    }
  }
}

class ListNode {
  // ListNode constructor function
  constructor(item, prev, next) {
    this.item = item;
    this.next = next || null;
    this.prev = prev || null;
  }
}

//-----------------------------------------
// Association lists

class Alist {
  // Alist constructor function
  constructor() {
    this.head = null;
    this.tail = null;
    this.list = [];
  }

  // Alist.prototype.set
  set(key, value) {
    let newNode = {
      key,
      value,
      next: null,
    };
    this.head = newNode;

    if (!this.list[0]) {
      this.list[0] = newNode;
      this.tail = newNode;
      return this;
    }

    newNode.next = this.list[0];
    let currentValue = newNode;
    let nextValue = this.list[0];

    for (let i = 0; true; i++) {
      if (!nextValue) {
        this.list[i] = currentValue;
        return this;
      }

      this.list[i] = currentValue;
      currentValue = nextValue;
      nextValue = this.list[i + 1];
    }
  }

  // Alist.prototype.get
  get(key) {
    for (let i = 0; true; i++) {
      if (!this.list[i]) {
        return undefined;
      }
      if (this.list[i].key === key) {
        return this.list[i].value;
      }
    }
  }
}

class AlistNode {
  // AlistNode constructor function
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

//-----------------------------------------
// Hash Tables

function hash(key) {
  let hashedKey = 0;
  for (let i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

class HashTable {
  // HashTable constructor function
  constructor() {
    this.buckets = Array(20);

    for (let i = 0; i < 20; i++) {
      this.buckets[i] = new Alist();
    }
  }

  // HashTable.prototype.set
  set(key, value) {
    let hashedKey = hash(key);
    this.buckets[hashedKey].set(key, value);

    return this; // for chaining, do not edit
  }

  // HashTable.prototype.get
  get(key) {
    let hashedKey = hash(key);
    return this.buckets[hashedKey].get(key);
  }
}

//-----------------------------------------
// Binary search trees

class BinarySearchTree {
  // BinarySearchTree constructor function
  constructor(value) {
    this.left = null;
    this.right = null;
    this.magnitude = 1;
    this.value = value;
  }

  // BinarySearchTree.prototype.insert
  insert(value) {
    let root = this;
    for (let i = 0; i < this.magnitude; i++) {
      if (value < root.value) {
        if (root.left === null) {
          root.left = new BinarySearchTree(value);
          this.magnitude++;
          return this;
        }
        root = root.left;
      } else {
        if (root.right === null) {
          root.right = new BinarySearchTree(value);
          this.magnitude++;
          return this;
        }
        root = root.right;
      }
    }
  }

  // BinarySearchTree.prototype.min
  min(tree = this) {
    if (!tree.left) return tree.value;
    return this.min(tree.left);
  }

  // BinarySearchTree.prototype.max
  max(tree = this) {
    if (!tree.right) return tree.value;
    return this.max(tree.right);
  }

  // BinarySearchTree.prototype.contains
  contains(value) {
    if (this.value === value) return true;
    if (value < this.value && this.left) {
      return this.left.contains(value);
    } else if (value >= this.value && this.right) {
      return this.right.contains(value);
    }
    return false;
  }

  // BinarySearchTree.prototype.traverse
  traverse(callbackFunc) {
    if (this.left === null && this.right === null) {
      callbackFunc(this.value);
    } else {
      if (this.left) this.left.traverse(callbackFunc);
      callbackFunc(this.value);
      if (this.right) this.right.traverse(callbackFunc);
    }
  }
}
