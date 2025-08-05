import Tools from "./bst-helper.js";

class Node {
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

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);
