export const binaryTreeData = {
    title: 'Binary Tree',
    description: 'Master binary trees with problems covering tree traversals, tree construction, path problems, and fundamental tree algorithms',
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
5. **Binary Search Tree (BST)**: Left subtree < node < right subtree

## What is a Binary Search Tree (BST)?
A **Binary Search Tree (BST)** is a special type of binary tree where:
- **Left subtree** contains only nodes with values **less than** the node's value
- **Right subtree** contains only nodes with values **greater than** the node's value
- Both left and right subtrees are also BSTs
- This property enables efficient search, insertion, and deletion operations

## Time Complexity

### General Binary Tree
| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search    | O(n)    | O(n)       |
| Insert    | O(1)*   | O(1)*      |
| Delete    | O(n)    | O(n)       |
| Traversal | O(n)    | O(n)       |

*Insert is O(1) if you have a reference to the parent node

### Binary Search Tree (BST)
| Operation | Balanced BST | Worst Case (Unbalanced) |
|-----------|--------------|------------------------|
| Search    | O(log n)     | O(n)                   |
| Insert    | O(log n)     | O(n)                   |
| Delete    | O(log n)     | O(n)                   |
| Traversal | O(n)         | O(n)                   |

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

## BST-Specific Operations

### BST Validation
\`\`\`swift
func isValidBST(_ root: TreeNode?) -> Bool {
    func validate(_ node: TreeNode?, _ minVal: Int, _ maxVal: Int) -> Bool {
        guard let node = node else { return true }
        
        if node.val <= minVal || node.val >= maxVal {
            return false
        }
        
        return validate(node.left, minVal, node.val) && 
               validate(node.right, node.val, maxVal)
    }
    
    return validate(root, Int.min, Int.max)
}
\`\`\`

### BST Search Operation
\`\`\`swift
func searchBST(_ root: TreeNode?, _ val: Int) -> TreeNode? {
    guard let root = root else { return nil }
    
    if val == root.val {
        return root
    } else if val < root.val {
        return searchBST(root.left, val)
    } else {
        return searchBST(root.right, val)
    }
}
\`\`\`

### BST Insert Operation
\`\`\`swift
func insertIntoBST(_ root: TreeNode?, _ val: Int) -> TreeNode? {
    guard let root = root else {
        return TreeNode(val)
    }
    
    if val < root.val {
        root.left = insertIntoBST(root.left, val)
    } else {
        root.right = insertIntoBST(root.right, val)
    }
    
    return root
}
\`\`\`

### Kth Smallest Element in BST
\`\`\`swift
func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
    var count = 0
    var result = 0
    
    func inOrder(_ node: TreeNode?) {
        guard let node = node, count < k else { return }
        
        inOrder(node.left)
        
        count += 1
        if count == k {
            result = node.val
            return
        }
        
        inOrder(node.right)
    }
    
    inOrder(root)
    return result
}
\`\`\`

### Lowest Common Ancestor in BST
\`\`\`swift
func lowestCommonAncestorBST(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
    guard let root = root, let p = p, let q = q else { return nil }
    
    // If both nodes are in left subtree
    if p.val < root.val && q.val < root.val {
        return lowestCommonAncestorBST(root.left, p, q)
    }
    
    // If both nodes are in right subtree
    if p.val > root.val && q.val > root.val {
        return lowestCommonAncestorBST(root.right, p, q)
    }
    
    // If nodes are on different sides, current node is LCA
    return root
}
\`\`\`

## BST vs Binary Tree Comparison

| Aspect | Binary Tree | Binary Search Tree |
|--------|-------------|---------------------|
| **Structure** | Any arrangement | Left < Root < Right |
| **Search** | O(n) - must check all nodes | O(log n) average |
| **Insert** | O(1) with parent reference | O(log n) average |
| **Delete** | O(n) - need to find node | O(log n) average |
| **Inorder Traversal** | Random order | Sorted order |
| **Use Case** | Hierarchical data | Searching & sorting |

## When to Use Binary Trees vs BSTs

✅ Need hierarchical data representation
✅ Expression parsing and evaluation
✅ File system organization
✅ Decision trees and game trees
✅ Heap implementation (complete binary trees)

### Use Binary Search Trees when:
✅ Need efficient searching (O(log n))
✅ Need sorted data retrieval
✅ Implementing dictionaries/maps
✅ Range queries and closest element searches
✅ Dynamic insertion/deletion with search

### Avoid when:
❌ Need frequent sequential access
❌ Memory usage is extremely critical
❌ Simple linear operations are sufficient
❌ Data doesn't have natural ordering (for BSTs)
`,
    questions: [
        // Easy Problems - Binary Tree Foundation
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
        
        // Easy Problems - BST Foundation
        'Search in a Binary Search Tree - https://leetcode.com/problems/search-in-a-binary-search-tree/',
        'Insert into a Binary Search Tree - https://leetcode.com/problems/insert-into-a-binary-search-tree/',
        'Validate Binary Search Tree - https://leetcode.com/problems/validate-binary-search-tree/',
        'Lowest Common Ancestor of a BST - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
        
        // Medium Problems - Advanced Binary Tree Concepts
        'Binary Tree Zigzag Level Order Traversal - https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
        'Binary Tree Right Side View - https://leetcode.com/problems/binary-tree-right-side-view/',
        'Count Good Nodes in Binary Tree - https://leetcode.com/problems/count-good-nodes-in-binary-tree/',
        'Lowest Common Ancestor of a Binary Tree - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        'Diameter of Binary Tree - https://leetcode.com/problems/diameter-of-binary-tree/',
        'Subtree of Another Tree - https://leetcode.com/problems/subtree-of-another-tree/',
        'Populating Next Right Pointers in Each Node - https://leetcode.com/problems/populating-next-right-pointers-in-each-node/',
        
        // Medium Problems - Advanced BST Concepts
        'Kth Smallest Element in a BST - https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
        'Delete Node in a BST - https://leetcode.com/problems/delete-node-in-a-bst/',
        'Convert BST to Greater Tree - https://leetcode.com/problems/convert-bst-to-greater-tree/',
        'Construct BST from Preorder Traversal - https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/',
        
        // Hard Problems - Complex Algorithms
        'Binary Tree Maximum Path Sum - https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        'Serialize and Deserialize Binary Tree - https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        'Binary Tree Cameras - https://leetcode.com/problems/binary-tree-cameras/',
        'Recover Binary Search Tree - https://leetcode.com/problems/recover-binary-search-tree/'
    ]
};

// Export BST data for backward compatibility (will be removed after migration)
export const bstData = binaryTreeData;