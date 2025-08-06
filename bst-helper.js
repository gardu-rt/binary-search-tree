import Node from "./tree.js";

export default class Tools {
  static insertNode(node, value) {
    if (!node) return new Node(value);
    if (value === node.value) return node;

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  static findMin(node) {
    while (node.left) {
      node = node.left;
    }

    return node;
  }

  static deleteNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let successor = this.findMin(node.right);
      node.value = successor.value;
      node.right = this.deleteNode(node.right, successor.value);
    }
    return node;
  }

  static findNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      return this.findNode(node.left, value);
    } else if (value > node.value) {
      return this.findNode(node.right, value);
    } else {
      return node;
    }
  }

  static inOrder(node, callback) {
    if (!node) return null;

    if (node.left) node.left = this.inOrder(node.left, callback);
    callback(node);
    if (node.right) node.right = this.inOrder(node.right, callback);

    return node;
  }

  static preOrder(node, callback) {
    if (!node) return null;

    callback(node);
    if (node.left) node.left = this.preOrder(node.left, callback);
    if (node.right) node.right = this.preOrder(node.right, callback);

    return node;
  }

  static postOrder(node, callback) {
    if (!node) return null;

    if (node.left) node.left = this.postOrder(node.left, callback);
    if (node.right) node.right = this.postOrder(node.right, callback);
    callback(node);

    return node;
  }

  static height(node) {
    if (!node) return -1;

    const left = this.height(node.left);
    const right = this.height(node.right);

    return 1 + Math.max(left, right);
  }

  static checkBalance(node) {
    if (!node) return { height: -1, balanced: true };

    const left = this.checkBalance(node.left);
    const right = this.checkBalance(node.right);

    const height = 1 + Math.max(left.height, right.height);
    const balanced =
      left.balanced &&
      right.balanced &&
      Math.abs(left.height - right.height) <= 1;
    return { height, balanced };
  }
}
