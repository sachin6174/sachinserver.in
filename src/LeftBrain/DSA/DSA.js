import React, { useState } from 'react';
import './DSA.css';

const DSA = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [selectedTopic, setSelectedTopic] = useState('arrays');

    const dsaTopics = {
        arrays: {
            title: 'Arrays',
            description: 'Basic array operations and algorithms',
            javascript: {
                title: 'JavaScript Array Operations',
                code: `// Array Declaration and Initialization
const arr = [1, 2, 3, 4, 5];
const emptyArr = new Array(5); // Creates array with 5 empty slots

// Common Array Methods
arr.push(6);           // Add to end
arr.pop();             // Remove from end
arr.unshift(0);        // Add to beginning
arr.shift();           // Remove from beginning

// Array Iteration
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// Higher-order functions
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
const sum = arr.reduce((acc, curr) => acc + curr, 0);

// Two Pointer Technique
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
            },
            swift: {
                title: 'Swift Array Operations',
                code: `// Array Declaration and Initialization
var arr = [1, 2, 3, 4, 5]
var emptyArr = Array(repeating: 0, count: 5)

// Common Array Methods
arr.append(6)          // Add to end
arr.removeLast()       // Remove from end
arr.insert(0, at: 0)   // Add to beginning
arr.removeFirst()      // Remove from beginning

// Array Iteration
for i in 0..<arr.count {
    print(arr[i])
}

// Functional Programming
let doubled = arr.map { $0 * 2 }
let evens = arr.filter { $0 % 2 == 0 }
let sum = arr.reduce(0, +)

// Two Pointer Technique
func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    var map: [Int: Int] = [:]
    for (i, num) in nums.enumerated() {
        let complement = target - num
        if let index = map[complement] {
            return [index, i]
        }
        map[num] = i
    }
    return []
}`
            },
            cpp: {
                title: 'C++ Array Operations',
                code: `#include <vector>
#include <algorithm>
#include <unordered_map>

// Array Declaration and Initialization
std::vector<int> arr = {1, 2, 3, 4, 5};
std::vector<int> emptyArr(5); // Creates vector with 5 zeros

// Common Array Methods
arr.push_back(6);      // Add to end
arr.pop_back();        // Remove from end
arr.insert(arr.begin(), 0);  // Add to beginning
arr.erase(arr.begin());      // Remove from beginning

// Array Iteration
for (int i = 0; i < arr.size(); i++) {
    std::cout << arr[i] << std::endl;
}

// STL Algorithms
std::for_each(arr.begin(), arr.end(), [](int x) { 
    std::cout << x * 2 << " "; 
});

// Two Pointer Technique
std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`
            }
        },
        linkedlist: {
            title: 'Linked Lists',
            description: 'Implementation and operations on linked lists',
            javascript: {
                title: 'JavaScript Linked List',
                code: `// Node class
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Linked List class
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Add to beginning
    prepend(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    // Add to end
    append(val) {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    // Reverse linked list
    reverse() {
        let prev = null;
        let current = this.head;
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }
}`
            },
            swift: {
                title: 'Swift Linked List',
                code: `// Node class
class ListNode {
    var val: Int
    var next: ListNode?
    
    init(_ val: Int = 0, _ next: ListNode? = nil) {
        self.val = val
        self.next = next
    }
}

// Linked List class
class LinkedList {
    var head: ListNode?
    var size: Int = 0
    
    // Add to beginning
    func prepend(_ val: Int) {
        let newNode = ListNode(val)
        newNode.next = head
        head = newNode
        size += 1
    }
    
    // Add to end
    func append(_ val: Int) {
        let newNode = ListNode(val)
        guard let head = head else {
            self.head = newNode
            size += 1
            return
        }
        
        var current = head
        while current.next != nil {
            current = current.next!
        }
        current.next = newNode
        size += 1
    }
    
    // Reverse linked list
    func reverse() {
        var prev: ListNode? = nil
        var current = head
        
        while current != nil {
            let next = current?.next
            current?.next = prev
            prev = current
            current = next
        }
        head = prev
    }
}`
            },
            cpp: {
                title: 'C++ Linked List',
                code: `#include <memory>

// Node structure
struct ListNode {
    int val;
    ListNode* next;
    
    ListNode(int x = 0, ListNode* next = nullptr) 
        : val(x), next(next) {}
};

// Linked List class
class LinkedList {
private:
    ListNode* head;
    int size;
    
public:
    LinkedList() : head(nullptr), size(0) {}
    
    // Add to beginning
    void prepend(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->next = head;
        head = newNode;
        size++;
    }
    
    // Add to end
    void append(int val) {
        ListNode* newNode = new ListNode(val);
        if (!head) {
            head = newNode;
        } else {
            ListNode* current = head;
            while (current->next) {
                current = current->next;
            }
            current->next = newNode;
        }
        size++;
    }
    
    // Reverse linked list
    void reverse() {
        ListNode* prev = nullptr;
        ListNode* current = head;
        
        while (current) {
            ListNode* next = current->next;
            current->next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
};`
            }
        },
        trees: {
            title: 'Binary Trees',
            description: 'Binary tree implementation and traversal algorithms',
            javascript: {
                title: 'JavaScript Binary Tree',
                code: `// TreeNode class
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Binary Tree class
class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    // Inorder traversal (Left, Root, Right)
    inorderTraversal(node = this.root, result = []) {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.val);
            this.inorderTraversal(node.right, result);
        }
        return result;
    }
    
    // Preorder traversal (Root, Left, Right)
    preorderTraversal(node = this.root, result = []) {
        if (node) {
            result.push(node.val);
            this.preorderTraversal(node.left, result);
            this.preorderTraversal(node.right, result);
        }
        return result;
    }
    
    // Level order traversal (BFS)
    levelOrder() {
        if (!this.root) return [];
        
        const result = [];
        const queue = [this.root];
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                currentLevel.push(node.val);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            result.push(currentLevel);
        }
        return result;
    }
}`
            },
            swift: {
                title: 'Swift Binary Tree',
                code: `// TreeNode class
class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    
    init(_ val: Int = 0, _ left: TreeNode? = nil, _ right: TreeNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

// Binary Tree class
class BinaryTree {
    var root: TreeNode?
    
    // Inorder traversal (Left, Root, Right)
    func inorderTraversal(_ node: TreeNode? = nil) -> [Int] {
        let currentNode = node ?? root
        guard let currentNode = currentNode else { return [] }
        
        var result: [Int] = []
        result += inorderTraversal(currentNode.left)
        result.append(currentNode.val)
        result += inorderTraversal(currentNode.right)
        
        return result
    }
    
    // Preorder traversal (Root, Left, Right)
    func preorderTraversal(_ node: TreeNode? = nil) -> [Int] {
        let currentNode = node ?? root
        guard let currentNode = currentNode else { return [] }
        
        var result: [Int] = []
        result.append(currentNode.val)
        result += preorderTraversal(currentNode.left)
        result += preorderTraversal(currentNode.right)
        
        return result
    }
    
    // Level order traversal (BFS)
    func levelOrder() -> [[Int]] {
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
}`
            },
            cpp: {
                title: 'C++ Binary Tree',
                code: `#include <vector>
#include <queue>

// TreeNode structure
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x = 0, TreeNode* left = nullptr, TreeNode* right = nullptr) 
        : val(x), left(left), right(right) {}
};

// Binary Tree class
class BinaryTree {
private:
    TreeNode* root;
    
    void inorderHelper(TreeNode* node, std::vector<int>& result) {
        if (node) {
            inorderHelper(node->left, result);
            result.push_back(node->val);
            inorderHelper(node->right, result);
        }
    }
    
public:
    BinaryTree() : root(nullptr) {}
    
    // Inorder traversal (Left, Root, Right)
    std::vector<int> inorderTraversal() {
        std::vector<int> result;
        inorderHelper(root, result);
        return result;
    }
    
    // Preorder traversal (Root, Left, Right)
    std::vector<int> preorderTraversal() {
        std::vector<int> result;
        preorderHelper(root, result);
        return result;
    }
    
    void preorderHelper(TreeNode* node, std::vector<int>& result) {
        if (node) {
            result.push_back(node->val);
            preorderHelper(node->left, result);
            preorderHelper(node->right, result);
        }
    }
    
    // Level order traversal (BFS)
    std::vector<std::vector<int>> levelOrder() {
        if (!root) return {};
        
        std::vector<std::vector<int>> result;
        std::queue<TreeNode*> queue;
        queue.push(root);
        
        while (!queue.empty()) {
            int levelSize = queue.size();
            std::vector<int> currentLevel;
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = queue.front();
                queue.pop();
                currentLevel.push_back(node->val);
                
                if (node->left) queue.push(node->left);
                if (node->right) queue.push(node->right);
            }
            result.push_back(currentLevel);
        }
        return result;
    }
};`
            }
        },
        sorting: {
            title: 'Sorting Algorithms',
            description: 'Common sorting algorithms implementation',
            javascript: {
                title: 'JavaScript Sorting Algorithms',
                code: `// Bubble Sort - O(n²)
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Quick Sort - O(n log n) average
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Merge Sort - O(n log n)
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i), right.slice(j));
}`
            },
            swift: {
                title: 'Swift Sorting Algorithms',
                code: `// Bubble Sort - O(n²)
func bubbleSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 0..<n-1 {
        for j in 0..<n-i-1 {
            if arr[j] > arr[j+1] {
                arr.swapAt(j, j+1)
            }
        }
    }
}

// Quick Sort - O(n log n) average
func quickSort(_ arr: [Int]) -> [Int] {
    guard arr.count > 1 else { return arr }
    
    let pivot = arr[arr.count / 2]
    let left = arr.filter { $0 < pivot }
    let middle = arr.filter { $0 == pivot }
    let right = arr.filter { $0 > pivot }
    
    return quickSort(left) + middle + quickSort(right)
}

// Merge Sort - O(n log n)
func mergeSort(_ arr: [Int]) -> [Int] {
    guard arr.count > 1 else { return arr }
    
    let mid = arr.count / 2
    let left = mergeSort(Array(arr[0..<mid]))
    let right = mergeSort(Array(arr[mid..<arr.count]))
    
    return merge(left, right)
}

func merge(_ left: [Int], _ right: [Int]) -> [Int] {
    var result: [Int] = []
    var i = 0, j = 0
    
    while i < left.count && j < right.count {
        if left[i] <= right[j] {
            result.append(left[i])
            i += 1
        } else {
            result.append(right[j])
            j += 1
        }
    }
    
    result += left[i...]
    result += right[j...]
    
    return result
}`
            },
            cpp: {
                title: 'C++ Sorting Algorithms',
                code: `#include <vector>
#include <algorithm>

// Bubble Sort - O(n²)
void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// Quick Sort - O(n log n) average
void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

// Merge Sort - O(n log n)
void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    std::vector<int> leftArr(n1), rightArr(n2);
    
    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}`
            }
        }
    };

    const languages = [
        { id: 'javascript', name: 'JS' },
        { id: 'swift', name: 'Swift' },
        { id: 'cpp', name: 'C++' }
    ];

    const topics = [
        { id: 'arrays', name: 'Arrays' },
        { id: 'linkedlist', name: 'Linked Lists' },
        { id: 'trees', name: 'Binary Trees' },
        { id: 'sorting', name: 'Sorting' }
    ];

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            // Could add a toast notification here
        });
    };

    const currentTopic = dsaTopics[selectedTopic];
    const currentCode = currentTopic[selectedLanguage];

    return (
        <div className="dsa-container">
            <div className="dsa-header">
                <h1 className="dsa-title">Data Structures & Algorithms</h1>
                <p className="dsa-subtitle">
                    Code snippets and implementations in JavaScript, Swift, and C++
                </p>
            </div>

            <div className="dsa-navigation">
                <div className="topic-tabs">
                    <h3>Topics</h3>
                    <div className="tabs-grid">
                        {topics.map(topic => (
                            <button
                                key={topic.id}
                                className={`topic-tab ${selectedTopic === topic.id ? 'active' : ''}`}
                                onClick={() => setSelectedTopic(topic.id)}
                            >
                                {topic.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dsa-content">
                <div className="left-column">
                    <div className="topic-info">
                        <h2>{currentTopic.title}</h2>
                        <p>{currentTopic.description}</p>
                    </div>
                    
                    <div className="complexity-info">
                        <h3>Time & Space Complexity</h3>
                        <div className="complexity-grid">
                            {selectedTopic === 'arrays' && (
                                <div className="complexity-card">
                                    <h4>Array Operations</h4>
                                    <ul>
                                        <li>Access: O(1)</li>
                                        <li>Search: O(n)</li>
                                        <li>Insertion: O(n)</li>
                                        <li>Deletion: O(n)</li>
                                    </ul>
                                </div>
                            )}
                            {selectedTopic === 'linkedlist' && (
                                <div className="complexity-card">
                                    <h4>Linked List Operations</h4>
                                    <ul>
                                        <li>Access: O(n)</li>
                                        <li>Search: O(n)</li>
                                        <li>Insertion: O(1)</li>
                                        <li>Deletion: O(1)</li>
                                    </ul>
                                </div>
                            )}
                            {selectedTopic === 'trees' && (
                                <div className="complexity-card">
                                    <h4>Binary Tree Traversal</h4>
                                    <ul>
                                        <li>Inorder: O(n)</li>
                                        <li>Preorder: O(n)</li>
                                        <li>Postorder: O(n)</li>
                                        <li>Level Order: O(n)</li>
                                    </ul>
                                </div>
                            )}
                            {selectedTopic === 'sorting' && (
                                <div className="complexity-card">
                                    <h4>Sorting Algorithms</h4>
                                    <ul>
                                        <li>Bubble Sort: O(n²)</li>
                                        <li>Quick Sort: O(n log n)</li>
                                        <li>Merge Sort: O(n log n)</li>
                                        <li>Heap Sort: O(n log n)</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="code-section">
                    <div className="code-header">
                        <h3>{currentCode.title}</h3>
                        <div className="code-header-controls">
                            <div className="language-tabs-small">
                                {languages.map(lang => (
                                    <button
                                        key={lang.id}
                                        className={`language-btn-small ${selectedLanguage === lang.id ? 'active' : ''}`}
                                        onClick={() => setSelectedLanguage(lang.id)}
                                        title={lang.name}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                            <button 
                                className="copy-btn"
                                onClick={() => copyToClipboard(currentCode.code)}
                                title="Copy code"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                    
                    <div className="code-container">
                        <pre className="code-block">
                            <code>{currentCode.code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DSA;
