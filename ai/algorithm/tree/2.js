const tree = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
      left: null,
      right: null
    },
    right: {
      val: 'E',
      left: null,
      right: null
    }
  },
  right: {
    val: 'C',
    left: {
      val: 'F',
      left: null,
      right: null
    },
    right: {
      val: 'G',
      left: null,
      right: null
    }
  }
}

function preorder(root) {
  // 退出条件
  if (!root) {
    return
  }
  console.log(`当前遍历节点值是：`, root.val) // 根节点先
  preorder(root.left) // 左子树
  preorder(root.right) // 右子树
}
function inorder(root) {
  // 退出条件
  if (!root) {
    return
  }
  preorder(root.left) // 左子树
  console.log(`当前遍历节点值是：`, root.val) // 根节点先

  preorder(root.right) // 右子树
}
function postorder(root) {
  // 退出条件
  if (!root) {
    return
  }
  preorder(root.left) // 左子树
  preorder(root.right) // 右子树
  console.log(`当前遍历节点值是：`, root.val) // 根节点先
}
function levelorder(root) {
  const queue = [] // 队列实现
  const result = [] // 结果数组
  if (!root) {
    return result
  }
  queue.push(root) // 根节点入队
  while (queue.length) {
    const node = queue.shift()
    result.push(node.val)
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
  return result
}

preorder(tree)
console.log('-----------------')
inorder(tree)
console.log('-----------------')
postorder(tree)
console.log('-----------------')
console.log(levelorder(tree))
