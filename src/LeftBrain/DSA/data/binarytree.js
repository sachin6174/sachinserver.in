export const binaryTreeData = {
    title: 'Binary Tree',
    description: 'Complete guide to binary trees - from fundamentals to advanced traversal algorithms',
    explanation: `
## What is a Binary Tree?
A binary tree is a hierarchical data structure where each node has at most two children, referred to as the left child and the right child. It's one of the most fundamental tree structures in computer science.

## Key Characteristics
- **Hierarchical Structure**: Nodes are organized in parent-child relationships
- **At Most Two Children**: Each node can have 0, 1, or 2 children
- **Root Node**: The topmost node with no parent
- **Leaf Nodes**: Nodes with no children
- **Height**: The longest path from root to any leaf
- **Depth**: Distance from root to a specific node

## Types of Binary Trees
1. **Full Binary Tree**: Every node has either 0 or 2 children
2. **Complete Binary Tree**: All levels are filled except possibly the last level
3. **Perfect Binary Tree**: All internal nodes have 2 children, all leaves at same level
4. **Balanced Binary Tree**: Height difference between left and right subtrees ≤ 1
5. **Binary Search Tree**: Left subtree < node < right subtree

## Time Complexity
| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search    | O(log n)| O(n)       |
| Insert    | O(log n)| O(n)       |
| Delete    | O(log n)| O(n)       |
| Traversal | O(n)    | O(n)       |

## Binary Tree Node in Swift
\`\`\`swift
// Basic Binary Tree Node
class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    
    init(_ val: Int) {
        self.val = val
        self.left = nil
        self.right = nil
    }
}

// Generic Binary Tree Node
class BinaryTreeNode<T> {
    var data: T
    var left: BinaryTreeNode<T>?
    var right: BinaryTreeNode<T>?
    
    init(_ data: T) {
        self.data = data
        self.left = nil
        self.right = nil
    }
}
\`\`\`

## Tree Traversal Algorithms

### 1. Depth-First Search (DFS) Traversals

#### Preorder Traversal (Root → Left → Right)
\`\`\`swift
// Recursive Approach
func preorderTraversal(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    
    var result: [Int] = []
    result.append(root.val)
    result.append(contentsOf: preorderTraversal(root.left))
    result.append(contentsOf: preorderTraversal(root.right))
    
    return result
}

// Iterative Approach using Stack
func preorderTraversalIterative(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    
    var result: [Int] = []
    var stack: [TreeNode] = [root]
    
    while !stack.isEmpty {
        let node = stack.removeLast()
        result.append(node.val)
        
        // Push right first, then left (stack is LIFO)
        if let right = node.right {
            stack.append(right)
        }
        if let left = node.left {
            stack.append(left)
        }
    }
    
    return result
}
\`\`\`

#### Inorder Traversal (Left → Root → Right)
\`\`\`swift
// Recursive Approach
func inorderTraversal(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    
    var result: [Int] = []
    result.append(contentsOf: inorderTraversal(root.left))
    result.append(root.val)
    result.append(contentsOf: inorderTraversal(root.right))
    
    return result
}

// Iterative Approach using Stack
func inorderTraversalIterative(_ root: TreeNode?) -> [Int] {
    var result: [Int] = []
    var stack: [TreeNode] = []
    var current = root
    
    while current != nil || !stack.isEmpty {
        // Go to leftmost node
        while current != nil {
            stack.append(current!)
            current = current!.left
        }
        
        // Process current node
        current = stack.removeLast()
        result.append(current!.val)
        
        // Move to right subtree
        current = current!.right
    }
    
    return result
}
\`\`\`

#### Postorder Traversal (Left → Right → Root)
\`\`\`swift
// Recursive Approach
func postorderTraversal(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    
    var result: [Int] = []
    result.append(contentsOf: postorderTraversal(root.left))
    result.append(contentsOf: postorderTraversal(root.right))
    result.append(root.val)
    
    return result
}

// Iterative - Two Stacks Approach
func postorderTraversalTwoStacks(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    
    var stack1: [TreeNode] = [root]
    var stack2: [TreeNode] = []
    var result: [Int] = []
    
    while !stack1.isEmpty {
        let node = stack1.removeLast()
        stack2.append(node)
        
        if let left = node.left {
            stack1.append(left)
        }
        if let right = node.right {
            stack1.append(right)
        }
    }
    
    while !stack2.isEmpty {
        result.append(stack2.removeLast().val)
    }
    
    return result
}

// Iterative - One Stack Approach
func postorderTraversalOneStack(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    
    var result: [Int] = []
    var stack: [TreeNode] = []
    var lastVisited: TreeNode?
    var current: TreeNode? = root
    
    while current != nil || !stack.isEmpty {
        if current != nil {
            stack.append(current!)
            current = current!.left
        } else {
            let peekNode = stack.last!
            
            if peekNode.right != nil && lastVisited !== peekNode.right {
                current = peekNode.right
            } else {
                result.append(peekNode.val)
                lastVisited = stack.removeLast()
            }
        }
    }
    
    return result
}
\`\`\`

### 2. Breadth-First Search (BFS) - Level Order Traversal

\`\`\`swift
// Level Order Traversal using Queue
func levelOrder(_ root: TreeNode?) -> [[Int]] {
    guard let root = root else { return [] }
    
    var result: [[Int]] = []
    var queue: [TreeNode] = [root]
    
    while !queue.isEmpty {
        let levelSize = queue.count
        var currentLevel: [Int] = []
        
        for _ in 0..<levelSize {
            let node = queue.removeFirst()
            currentLevel.append(node.val)
            
            if let left = node.left {
                queue.append(left)
            }
            if let right = node.right {
                queue.append(right)
            }
        }
        
        result.append(currentLevel)
    }
    
    return result
}

// Recursive Level Order Traversal
func levelOrderRecursive(_ root: TreeNode?) -> [[Int]] {
    var result: [[Int]] = []
    
    func dfs(_ node: TreeNode?, _ level: Int) {
        guard let node = node else { return }
        
        if result.count == level {
            result.append([])
        }
        
        result[level].append(node.val)
        dfs(node.left, level + 1)
        dfs(node.right, level + 1)
    }
    
    dfs(root, 0)
    return result
}
\`\`\`

## Common Binary Tree Operations

### Maximum Depth/Height
\`\`\`swift
func maxDepth(_ root: TreeNode?) -> Int {
    guard let root = root else { return 0 }
    
    let leftDepth = maxDepth(root.left)
    let rightDepth = maxDepth(root.right)
    
    return max(leftDepth, rightDepth) + 1
}
\`\`\`

### Check if Tree is Symmetric
\`\`\`swift
func isSymmetric(_ root: TreeNode?) -> Bool {
    func isMirror(_ left: TreeNode?, _ right: TreeNode?) -> Bool {
        if left == nil && right == nil { return true }
        if left == nil || right == nil { return false }
        
        return left!.val == right!.val &&
               isMirror(left!.left, right!.right) &&
               isMirror(left!.right, right!.left)
    }
    
    return isMirror(root, root)
}
\`\`\`

### Invert Binary Tree
\`\`\`swift
func invertTree(_ root: TreeNode?) -> TreeNode? {
    guard let root = root else { return nil }
    
    let temp = root.left
    root.left = root.right
    root.right = temp
    
    invertTree(root.left)
    invertTree(root.right)
    
    return root
}
\`\`\`

### Path Sum
\`\`\`swift
func hasPathSum(_ root: TreeNode?, _ targetSum: Int) -> Bool {
    guard let root = root else { return false }
    
    if root.left == nil && root.right == nil {
        return root.val == targetSum
    }
    
    let remainingSum = targetSum - root.val
    return hasPathSum(root.left, remainingSum) || 
           hasPathSum(root.right, remainingSum)
}
\`\`\`

## When to Use Binary Trees
✅ **Use when:**
- Need hierarchical data representation
- Implementing search algorithms
- Expression parsing and evaluation
- File system organization
- Decision-making processes

❌ **Avoid when:**
- Need frequent sequential access
- Memory usage is extremely critical
- Simple linear operations are sufficient
`,
    questions: [
        // Easy Problems - Foundation
        'Binary Tree Inorder Traversal - https://leetcode.com/problems/binary-tree-inorder-traversal/',
        'Binary Tree Preorder Traversal - https://leetcode.com/problems/binary-tree-preorder-traversal/',
        'Binary Tree Postorder Traversal - https://leetcode.com/problems/binary-tree-postorder-traversal/',
        'Binary Tree Level Order Traversal - https://leetcode.com/problems/binary-tree-level-order-traversal/',
        'Maximum Depth of Binary Tree - https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        'Symmetric Tree - https://leetcode.com/problems/symmetric-tree/',
        'Invert Binary Tree - https://leetcode.com/problems/invert-binary-tree/',
        'Same Tree - https://leetcode.com/problems/same-tree/',
        'Path Sum - https://leetcode.com/problems/path-sum/',
        'Balanced Binary Tree - https://leetcode.com/problems/balanced-binary-tree/',
        
        // Medium Problems - Advanced Concepts
        'Binary Tree Zigzag Level Order Traversal - https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
        'Binary Tree Right Side View - https://leetcode.com/problems/binary-tree-right-side-view/',
        'Count Good Nodes in Binary Tree - https://leetcode.com/problems/count-good-nodes-in-binary-tree/',
        'Lowest Common Ancestor of a Binary Tree - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        'Diameter of Binary Tree - https://leetcode.com/problems/diameter-of-binary-tree/',
        'Subtree of Another Tree - https://leetcode.com/problems/subtree-of-another-tree/',
        'Populating Next Right Pointers in Each Node - https://leetcode.com/problems/populating-next-right-pointers-in-each-node/',
        
        // Hard Problems - Complex Algorithms
        'Binary Tree Maximum Path Sum - https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        'Serialize and Deserialize Binary Tree - https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        'Binary Tree Cameras - https://leetcode.com/problems/binary-tree-cameras/'
    ]
};