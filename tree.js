import Tools from "./bst-helper.js";

export default class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  #arr;
  constructor(array) {
    this.#arr = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.#arr);
  }

  buildTree(arr) {
    if (arr.length === 0 || !arr) return null;

    let midIndex = Math.floor(arr.length / 2);
    const node = new Node(arr[midIndex]);
    node.left = this.buildTree(arr.slice(0, midIndex));
    node.right = this.buildTree(arr.slice(midIndex + 1));

    return node;
  }

  insert(value) {
    this.root = Tools.insertNode(this.root, value);
  }

  deleteItem(value) {
    Tools.deleteNode(this.root, value);
  }

  find(value) {
    return Tools.findNode(this.root, value);
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");

    const queue = [this.root];
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return this.root;
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");

    Tools.inOrder(this.root, callback);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");

    Tools.preOrder(this.root, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");

    Tools.postOrder(this.root, callback);
  }

  height(value) {
    let node = this.root;
    while (node) {
      if (value < node.value) node = node.left;
      else if (value > node.value) node = node.right;
      else {
        return Tools.height(node);
      }
    }

    return null;
  }

  depth(value) {
    let node = this.root;
    let count = 0;
    while (node) {
      if (value < node.value) {
        node = node.left;
        count++;
      } else if (value > node.value) {
        node = node.right;
        count++;
      } else {
        return count;
      }
    }

    return null;
  }

  isBalanced() {
    return Tools.checkBalance(this.root).balanced;
  }

  rebalanced() {
    const newArray = [];
    this.levelOrderForEach((node) => newArray.push(node.value));
    newArray.sort((a, b) => a - b);
    this.root = this.buildTree(newArray);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function getRandomArray() {
  const result = [];
  const size = 10;
  for (let i = 0; i <= size; i++) {
    result.push(Math.floor(Math.random() * size));
  }

  return result;
}

const newArray = getRandomArray();

const test = new Tree(newArray);
prettyPrint(test.root);
console.log(test.isBalanced());
