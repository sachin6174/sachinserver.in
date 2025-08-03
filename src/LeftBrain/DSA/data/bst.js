export const bstData = {
    title: 'Binary Search Tree',
    description: 'Master Binary Search Trees with problems covering validation, search operations, insertion, and tree traversal algorithms for efficient data organization and retrieval.',
    questions: [
        'Binary Search Tree - Introduction - https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/',
        'Valid Binary Search Tree - https://leetcode.com/problems/validate-binary-search-tree/',
        'Search in a BST - https://leetcode.com/problems/search-in-a-binary-search-tree/',
        'Insert into a BST - https://leetcode.com/problems/insert-into-a-binary-search-tree/',
        'Kth Smallest Element - https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
        'Lowest Common Ancestor of a BST - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'
    ],
    explanation: `## Binary Search Tree Fundamentals

### Core BST Property
**Binary Search Tree (BST)**: A binary tree where for every node:
- **Left subtree** contains only nodes with values **less than** the node's value
- **Right subtree** contains only nodes with values **greater than** the node's value
- Both left and right subtrees are also BSTs

### Essential BST Operations

#### Basic Operations Time Complexity
- **Search**: O(log n) average, O(n) worst case
- **Insert**: O(log n) average, O(n) worst case
- **Delete**: O(log n) average, O(n) worst case
- **Traversal**: O(n) for all traversal types

### BST Implementation

#### 1. Node Structure
\`\`\`swift
// Swift BST Node
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
\`\`\`

#### 2. BST Class Implementation
\`\`\`swift
class BinarySearchTree {
    private var root: TreeNode?
    
    // Insert operation
    func insert(_ val: Int) {
        root = insertRecursive(root, val)
    }
    
    private func insertRecursive(_ node: TreeNode?, _ val: Int) -> TreeNode {
        guard let node = node else {
            return TreeNode(val)
        }
        
        if val < node.val {
            node.left = insertRecursive(node.left, val)
        } else if val > node.val {
            node.right = insertRecursive(node.right, val)
        }
        // Duplicate values ignored
        
        return node
    }
    
    // Search operation
    func search(_ val: Int) -> TreeNode? {
        return searchRecursive(root, val)
    }
    
    private func searchRecursive(_ node: TreeNode?, _ val: Int) -> TreeNode? {
        guard let node = node else { return nil }
        
        if val == node.val {
            return node
        } else if val < node.val {
            return searchRecursive(node.left, val)
        } else {
            return searchRecursive(node.right, val)
        }
    }
}
\`\`\`

### BST Traversal Methods

#### 1. In-Order Traversal (Sorted Output)
\`\`\`swift
func inOrderTraversal(_ root: TreeNode?) -> [Int] {
    guard let root = root else { return [] }
    
    var result: [Int] = []
    result += inOrderTraversal(root.left)
    result.append(root.val)
    result += inOrderTraversal(root.right)
    
    return result
}
// Output: Sorted array of values
\`\`\`

#### 2. Level Order Traversal
\`\`\`swift
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
            
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }
        
        result.append(currentLevel)
    }
    
    return result
}
\`\`\`

### Advanced BST Algorithms

#### 1. BST Validation
\`\`\`swift
func isValidBST(_ root: TreeNode?) -> Bool {
    return validate(root, Int.min, Int.max)
}

func validate(_ node: TreeNode?, _ minVal: Int, _ maxVal: Int) -> Bool {
    guard let node = node else { return true }
    
    if node.val <= minVal || node.val >= maxVal {
        return false
    }
    
    return validate(node.left, minVal, node.val) && 
           validate(node.right, node.val, maxVal)
}
\`\`\`

#### 2. Kth Smallest Element
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

#### 3. Lowest Common Ancestor
\`\`\`swift
func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
    guard let root = root, let p = p, let q = q else { return nil }
    
    // If both nodes are in left subtree
    if p.val < root.val && q.val < root.val {
        return lowestCommonAncestor(root.left, p, q)
    }
    
    // If both nodes are in right subtree
    if p.val > root.val && q.val > root.val {
        return lowestCommonAncestor(root.right, p, q)
    }
    
    // If nodes are on different sides, current node is LCA
    return root
}
\`\`\`

### BST vs Array/List Comparison

| Operation | BST (Balanced) | Array (Sorted) | Linked List |
|-----------|----------------|----------------|-------------|
| Search | O(log n) | O(log n) | O(n) |
| Insert | O(log n) | O(n) | O(1)* |
| Delete | O(log n) | O(n) | O(1)* |
| Space | O(n) | O(n) | O(n) |

*Finding position still requires O(n) for linked list

### BST Applications

#### 1. Database Indexing
- B-trees (variant of BST) for database indexes
- Fast range queries and sorted retrieval

#### 2. Expression Trees
- Parse mathematical expressions
- Evaluate expressions efficiently

#### 3. File Systems
- Directory structures
- Hierarchical organization

### BST Variants

#### 1. AVL Trees
- Self-balancing BST
- Height difference ≤ 1 between subtrees
- Guarantees O(log n) operations

#### 2. Red-Black Trees
- Self-balancing BST with color properties
- Used in many standard libraries
- Less strict balancing than AVL

#### 3. Splay Trees
- Self-adjusting BST
- Recently accessed nodes move to root
- Good for temporal locality

### Problem-Solving Patterns

#### 1. Recursive Approach
- Most BST problems solved recursively
- Base case: null node
- Recursive case: process current node, recurse on children

#### 2. In-Order for Sorted Data
- Use in-order traversal when you need sorted order
- Kth smallest/largest problems

#### 3. Boundary-Based Validation
- Pass min/max bounds for validation
- Update bounds as you traverse

✅ **Pro Tips**:
- In-order traversal of BST gives sorted sequence
- Use BST property to optimize search operations
- Consider tree balance for performance
- Recursive solutions are often cleaner

❌ **Common Pitfalls**:
- Forgetting to handle duplicate values
- Not maintaining BST property during modifications
- Infinite recursion without proper base cases
- Unbalanced trees leading to O(n) operations`,
    javascript: {
        title: 'Binary Search Tree Algorithms in JavaScript',
        code: `// BST Node Definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 1. Binary Search Tree - Introduction
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    // Insert operation
    insert(val) {
        this.root = this.insertRecursive(this.root, val);
    }
    
    insertRecursive(node, val) {
        if (!node) {
            return new TreeNode(val);
        }
        
        if (val < node.val) {
            node.left = this.insertRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = this.insertRecursive(node.right, val);
        }
        // Duplicate values ignored
        
        return node;
    }
    
    // Search operation
    search(val) {
        return this.searchRecursive(this.root, val);
    }
    
    searchRecursive(node, val) {
        if (!node) return null;
        
        if (val === node.val) {
            return node;
        } else if (val < node.val) {
            return this.searchRecursive(node.left, val);
        } else {
            return this.searchRecursive(node.right, val);
        }
    }
    
    // In-order traversal (gives sorted output)
    inOrderTraversal(node = this.root) {
        if (!node) return [];
        
        const result = [];
        result.push(...this.inOrderTraversal(node.left));
        result.push(node.val);
        result.push(...this.inOrderTraversal(node.right));
        
        return result;
    }
}

// 2. Valid Binary Search Tree
function isValidBST(root) {
    function validate(node, minVal, maxVal) {
        if (!node) return true;
        
        if (node.val <= minVal || node.val >= maxVal) {
            return false;
        }
        
        return validate(node.left, minVal, node.val) && 
               validate(node.right, node.val, maxVal);
    }
    
    return validate(root, -Infinity, Infinity);
}

// Alternative approach using in-order traversal
function isValidBSTInOrder(root) {
    const inOrder = [];
    
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        inOrder.push(node.val);
        traverse(node.right);
    }
    
    traverse(root);
    
    for (let i = 1; i < inOrder.length; i++) {
        if (inOrder[i] <= inOrder[i - 1]) {
            return false;
        }
    }
    
    return true;
}

// 3. Search in a BST
function searchBST(root, val) {
    if (!root) return null;
    
    if (val === root.val) {
        return root;
    } else if (val < root.val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
}

// Iterative version
function searchBSTIterative(root, val) {
    while (root && root.val !== val) {
        root = val < root.val ? root.left : root.right;
    }
    return root;
}

// 4. Insert into a BST
function insertIntoBST(root, val) {
    if (!root) {
        return new TreeNode(val);
    }
    
    if (val < root.val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }
    
    return root;
}

// Iterative version
function insertIntoBSTIterative(root, val) {
    const newNode = new TreeNode(val);
    
    if (!root) return newNode;
    
    let current = root;
    while (true) {
        if (val < current.val) {
            if (!current.left) {
                current.left = newNode;
                break;
            }
            current = current.left;
        } else {
            if (!current.right) {
                current.right = newNode;
                break;
            }
            current = current.right;
        }
    }
    
    return root;
}

// 5. Kth Smallest Element in BST
function kthSmallest(root, k) {
    let count = 0;
    let result = 0;
    
    function inOrder(node) {
        if (!node || count >= k) return;
        
        inOrder(node.left);
        
        count++;
        if (count === k) {
            result = node.val;
            return;
        }
        
        inOrder(node.right);
    }
    
    inOrder(root);
    return result;
}

// Iterative version using stack
function kthSmallestIterative(root, k) {
    const stack = [];
    let current = root;
    let count = 0;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        count++;
        
        if (count === k) {
            return current.val;
        }
        
        current = current.right;
    }
    
    return -1;
}

// 6. Lowest Common Ancestor of a BST
function lowestCommonAncestor(root, p, q) {
    if (!root) return null;
    
    // If both nodes are in left subtree
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    
    // If both nodes are in right subtree
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    
    // If nodes are on different sides, current node is LCA
    return root;
}

// Iterative version
function lowestCommonAncestorIterative(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}

// Helper function to build BST from array
function buildBSTFromArray(arr) {
    const bst = new BinarySearchTree();
    arr.forEach(val => bst.insert(val));
    return bst.root;
}

// Helper function to delete node from BST
function deleteNode(root, key) {
    if (!root) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node to be deleted found
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Node has two children
        // Find inorder successor (smallest in right subtree)
        let minNode = root.right;
        while (minNode.left) {
            minNode = minNode.left;
        }
        
        // Replace root's value with successor's value
        root.val = minNode.val;
        
        // Delete the successor
        root.right = deleteNode(root.right, minNode.val);
    }
    
    return root;
}

// Test cases
const bst = new BinarySearchTree();
[5, 3, 7, 2, 4, 6, 8].forEach(val => bst.insert(val));

console.log("In-order traversal:", bst.inOrderTraversal()); // [2, 3, 4, 5, 6, 7, 8]
console.log("Search 4:", bst.search(4) !== null); // true
console.log("Search 9:", bst.search(9) !== null); // false
console.log("Is valid BST:", isValidBST(bst.root)); // true
console.log("3rd smallest:", kthSmallest(bst.root, 3)); // 4

// Create nodes for LCA test
const node3 = new TreeNode(3);
const node7 = new TreeNode(7);
console.log("LCA of 3 and 7:", lowestCommonAncestor(bst.root, node3, node7).val); // 5`
    },
    swift: {
        title: 'Binary Search Tree Algorithms in Swift',
        code: `// BST Node Definition
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

// 1. Binary Search Tree - Introduction
class BinarySearchTree {
    private var root: TreeNode?
    
    // Insert operation
    func insert(_ val: Int) {
        root = insertRecursive(root, val)
    }
    
    private func insertRecursive(_ node: TreeNode?, _ val: Int) -> TreeNode {
        guard let node = node else {
            return TreeNode(val)
        }
        
        if val < node.val {
            node.left = insertRecursive(node.left, val)
        } else if val > node.val {
            node.right = insertRecursive(node.right, val)
        }
        // Duplicate values ignored
        
        return node
    }
    
    // Search operation
    func search(_ val: Int) -> TreeNode? {
        return searchRecursive(root, val)
    }
    
    private func searchRecursive(_ node: TreeNode?, _ val: Int) -> TreeNode? {
        guard let node = node else { return nil }
        
        if val == node.val {
            return node
        } else if val < node.val {
            return searchRecursive(node.left, val)
        } else {
            return searchRecursive(node.right, val)
        }
    }
    
    // In-order traversal (gives sorted output)
    func inOrderTraversal(_ node: TreeNode? = nil) -> [Int] {
        let currentNode = node ?? root
        guard let currentNode = currentNode else { return [] }
        
        var result: [Int] = []
        result += inOrderTraversal(currentNode.left)
        result.append(currentNode.val)
        result += inOrderTraversal(currentNode.right)
        
        return result
    }
    
    func getRoot() -> TreeNode? {
        return root
    }
}

// 2. Valid Binary Search Tree
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

// Alternative approach using in-order traversal
func isValidBSTInOrder(_ root: TreeNode?) -> Bool {
    var inOrder: [Int] = []
    
    func traverse(_ node: TreeNode?) {
        guard let node = node else { return }
        traverse(node.left)
        inOrder.append(node.val)
        traverse(node.right)
    }
    
    traverse(root)
    
    for i in 1..<inOrder.count {
        if inOrder[i] <= inOrder[i - 1] {
            return false
        }
    }
    
    return true
}

// 3. Search in a BST
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

// Iterative version
func searchBSTIterative(_ root: TreeNode?, _ val: Int) -> TreeNode? {
    var current = root
    
    while let node = current, node.val != val {
        current = val < node.val ? node.left : node.right
    }
    
    return current
}

// 4. Insert into a BST
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

// Iterative version
func insertIntoBSTIterative(_ root: TreeNode?, _ val: Int) -> TreeNode? {
    let newNode = TreeNode(val)
    
    guard let root = root else { return newNode }
    
    var current = root
    while true {
        if val < current.val {
            if current.left == nil {
                current.left = newNode
                break
            }
            current = current.left!
        } else {
            if current.right == nil {
                current.right = newNode
                break
            }
            current = current.right!
        }
    }
    
    return root
}

// 5. Kth Smallest Element in BST
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

// Iterative version using stack
func kthSmallestIterative(_ root: TreeNode?, _ k: Int) -> Int {
    var stack: [TreeNode] = []
    var current = root
    var count = 0
    
    while current != nil || !stack.isEmpty {
        while let node = current {
            stack.append(node)
            current = node.left
        }
        
        current = stack.removeLast()
        count += 1
        
        if count == k {
            return current!.val
        }
        
        current = current?.right
    }
    
    return -1
}

// 6. Lowest Common Ancestor of a BST
func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
    guard let root = root, let p = p, let q = q else { return nil }
    
    // If both nodes are in left subtree
    if p.val < root.val && q.val < root.val {
        return lowestCommonAncestor(root.left, p, q)
    }
    
    // If both nodes are in right subtree
    if p.val > root.val && q.val > root.val {
        return lowestCommonAncestor(root.right, p, q)
    }
    
    // If nodes are on different sides, current node is LCA
    return root
}

// Iterative version
func lowestCommonAncestorIterative(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
    guard let p = p, let q = q else { return nil }
    var current = root
    
    while let node = current {
        if p.val < node.val && q.val < node.val {
            current = node.left
        } else if p.val > node.val && q.val > node.val {
            current = node.right
        } else {
            return node
        }
    }
    
    return nil
}

// Helper function to build BST from array
func buildBSTFromArray(_ arr: [Int]) -> TreeNode? {
    let bst = BinarySearchTree()
    arr.forEach { bst.insert($0) }
    return bst.getRoot()
}

// Helper function to delete node from BST
func deleteNode(_ root: TreeNode?, _ key: Int) -> TreeNode? {
    guard let root = root else { return nil }
    
    if key < root.val {
        root.left = deleteNode(root.left, key)
    } else if key > root.val {
        root.right = deleteNode(root.right, key)
    } else {
        // Node to be deleted found
        if root.left == nil { return root.right }
        if root.right == nil { return root.left }
        
        // Node has two children
        // Find inorder successor (smallest in right subtree)
        var minNode = root.right
        while let left = minNode?.left {
            minNode = left
        }
        
        // Replace root's value with successor's value
        root.val = minNode!.val
        
        // Delete the successor
        root.right = deleteNode(root.right, minNode!.val)
    }
    
    return root
}

// Level order traversal helper
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
            
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }
        
        result.append(currentLevel)
    }
    
    return result
}

// Test cases
let bst = BinarySearchTree()
[5, 3, 7, 2, 4, 6, 8].forEach { bst.insert($0) }

print("In-order traversal:", bst.inOrderTraversal()) // [2, 3, 4, 5, 6, 7, 8]
print("Search 4:", bst.search(4) != nil) // true
print("Search 9:", bst.search(9) != nil) // false
print("Is valid BST:", isValidBST(bst.getRoot())) // true
print("3rd smallest:", kthSmallest(bst.getRoot(), 3)) // 4

// Create nodes for LCA test
let node3 = TreeNode(3)
let node7 = TreeNode(7)
if let root = bst.getRoot() {
    print("LCA of 3 and 7:", lowestCommonAncestor(root, node3, node7)?.val ?? "Not found") // 5
}`
    },
    cpp: {
        title: 'Binary Search Tree Algorithms in C++',
        code: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <climits>
#include <algorithm>

using namespace std;

// BST Node Definition
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// 1. Binary Search Tree - Introduction
class BinarySearchTree {
private:
    TreeNode* root;
    
    TreeNode* insertRecursive(TreeNode* node, int val) {
        if (!node) {
            return new TreeNode(val);
        }
        
        if (val < node->val) {
            node->left = insertRecursive(node->left, val);
        } else if (val > node->val) {
            node->right = insertRecursive(node->right, val);
        }
        // Duplicate values ignored
        
        return node;
    }
    
    TreeNode* searchRecursive(TreeNode* node, int val) {
        if (!node) return nullptr;
        
        if (val == node->val) {
            return node;
        } else if (val < node->val) {
            return searchRecursive(node->left, val);
        } else {
            return searchRecursive(node->right, val);
        }
    }
    
    void inOrderHelper(TreeNode* node, vector<int>& result) {
        if (!node) return;
        
        inOrderHelper(node->left, result);
        result.push_back(node->val);
        inOrderHelper(node->right, result);
    }
    
public:
    BinarySearchTree() : root(nullptr) {}
    
    // Insert operation
    void insert(int val) {
        root = insertRecursive(root, val);
    }
    
    // Search operation
    TreeNode* search(int val) {
        return searchRecursive(root, val);
    }
    
    // In-order traversal (gives sorted output)
    vector<int> inOrderTraversal() {
        vector<int> result;
        inOrderHelper(root, result);
        return result;
    }
    
    TreeNode* getRoot() { return root; }
};

// 2. Valid Binary Search Tree
bool isValidBST(TreeNode* root) {
    function<bool(TreeNode*, long, long)> validate = 
        [&](TreeNode* node, long minVal, long maxVal) -> bool {
        if (!node) return true;
        
        if (node->val <= minVal || node->val >= maxVal) {
            return false;
        }
        
        return validate(node->left, minVal, node->val) && 
               validate(node->right, node->val, maxVal);
    };
    
    return validate(root, LONG_MIN, LONG_MAX);
}

// Alternative approach using in-order traversal
bool isValidBSTInOrder(TreeNode* root) {
    vector<int> inOrder;
    
    function<void(TreeNode*)> traverse = [&](TreeNode* node) {
        if (!node) return;
        traverse(node->left);
        inOrder.push_back(node->val);
        traverse(node->right);
    };
    
    traverse(root);
    
    for (int i = 1; i < inOrder.size(); i++) {
        if (inOrder[i] <= inOrder[i - 1]) {
            return false;
        }
    }
    
    return true;
}

// 3. Search in a BST
TreeNode* searchBST(TreeNode* root, int val) {
    if (!root) return nullptr;
    
    if (val == root->val) {
        return root;
    } else if (val < root->val) {
        return searchBST(root->left, val);
    } else {
        return searchBST(root->right, val);
    }
}

// Iterative version
TreeNode* searchBSTIterative(TreeNode* root, int val) {
    while (root && root->val != val) {
        root = val < root->val ? root->left : root->right;
    }
    return root;
}

// 4. Insert into a BST
TreeNode* insertIntoBST(TreeNode* root, int val) {
    if (!root) {
        return new TreeNode(val);
    }
    
    if (val < root->val) {
        root->left = insertIntoBST(root->left, val);
    } else {
        root->right = insertIntoBST(root->right, val);
    }
    
    return root;
}

// Iterative version
TreeNode* insertIntoBSTIterative(TreeNode* root, int val) {
    TreeNode* newNode = new TreeNode(val);
    
    if (!root) return newNode;
    
    TreeNode* current = root;
    while (true) {
        if (val < current->val) {
            if (!current->left) {
                current->left = newNode;
                break;
            }
            current = current->left;
        } else {
            if (!current->right) {
                current->right = newNode;
                break;
            }
            current = current->right;
        }
    }
    
    return root;
}

// 5. Kth Smallest Element in BST
int kthSmallest(TreeNode* root, int k) {
    int count = 0;
    int result = 0;
    
    function<void(TreeNode*)> inOrder = [&](TreeNode* node) {
        if (!node || count >= k) return;
        
        inOrder(node->left);
        
        count++;
        if (count == k) {
            result = node->val;
            return;
        }
        
        inOrder(node->right);
    };
    
    inOrder(root);
    return result;
}

// Iterative version using stack
int kthSmallestIterative(TreeNode* root, int k) {
    stack<TreeNode*> st;
    TreeNode* current = root;
    int count = 0;
    
    while (current || !st.empty()) {
        while (current) {
            st.push(current);
            current = current->left;
        }
        
        current = st.top();
        st.pop();
        count++;
        
        if (count == k) {
            return current->val;
        }
        
        current = current->right;
    }
    
    return -1;
}

// 6. Lowest Common Ancestor of a BST
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root) return nullptr;
    
    // If both nodes are in left subtree
    if (p->val < root->val && q->val < root->val) {
        return lowestCommonAncestor(root->left, p, q);
    }
    
    // If both nodes are in right subtree
    if (p->val > root->val && q->val > root->val) {
        return lowestCommonAncestor(root->right, p, q);
    }
    
    // If nodes are on different sides, current node is LCA
    return root;
}

// Iterative version
TreeNode* lowestCommonAncestorIterative(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root) {
        if (p->val < root->val && q->val < root->val) {
            root = root->left;
        } else if (p->val > root->val && q->val > root->val) {
            root = root->right;
        } else {
            return root;
        }
    }
    return nullptr;
}

// Helper function to build BST from array
TreeNode* buildBSTFromArray(const vector<int>& arr) {
    BinarySearchTree bst;
    for (int val : arr) {
        bst.insert(val);
    }
    return bst.getRoot();
}

// Helper function to delete node from BST
TreeNode* deleteNode(TreeNode* root, int key) {
    if (!root) return nullptr;
    
    if (key < root->val) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->val) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node to be deleted found
        if (!root->left) return root->right;
        if (!root->right) return root->left;
        
        // Node has two children
        // Find inorder successor (smallest in right subtree)
        TreeNode* minNode = root->right;
        while (minNode->left) {
            minNode = minNode->left;
        }
        
        // Replace root's value with successor's value
        root->val = minNode->val;
        
        // Delete the successor
        root->right = deleteNode(root->right, minNode->val);
    }
    
    return root;
}

// Level order traversal helper
vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        
        result.push_back(currentLevel);
    }
    
    return result;
}

// Test function
int main() {
    BinarySearchTree bst;
    vector<int> values = {5, 3, 7, 2, 4, 6, 8};
    
    for (int val : values) {
        bst.insert(val);
    }
    
    cout << "In-order traversal: ";
    vector<int> inOrder = bst.inOrderTraversal();
    for (int val : inOrder) {
        cout << val << " ";
    }
    cout << endl; // [2, 3, 4, 5, 6, 7, 8]
    
    cout << "Search 4: " << (bst.search(4) != nullptr) << endl; // 1 (true)
    cout << "Search 9: " << (bst.search(9) != nullptr) << endl; // 0 (false)
    cout << "Is valid BST: " << isValidBST(bst.getRoot()) << endl; // 1 (true)
    cout << "3rd smallest: " << kthSmallest(bst.getRoot(), 3) << endl; // 4
    
    // Create nodes for LCA test
    TreeNode* node3 = new TreeNode(3);
    TreeNode* node7 = new TreeNode(7);
    TreeNode* lca = lowestCommonAncestor(bst.getRoot(), node3, node7);
    cout << "LCA of 3 and 7: " << (lca ? lca->val : -1) << endl; // 5
    
    return 0;
}`
    }
};