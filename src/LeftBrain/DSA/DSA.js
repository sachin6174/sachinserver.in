import React, { useState } from 'react';
import '../shared-styles.css';
import './DSA.css';
import ContributionGraph from './ContributionGraph';

const DSA = () => {
    const [selectedTopic, setSelectedTopic] = useState('array');

    const dsaTopics = {
        introduction: {
            title: 'Introduction to DSA',
            description: 'Foundation concepts and importance of Data Structures and Algorithms',
            questions: [
                'What is the difference between data structures and algorithms?',
                'Why is time complexity important in programming?',
                'What are the common operations performed on data structures?',
                'How do you analyze the efficiency of an algorithm?',
                'What is the relationship between input size and execution time?'
            ],
            javascript: {
                title: 'Introduction to DSA in JavaScript',
                code: `// What are Data Structures?
// - Ways to organize and store data efficiently
// - Examples: Arrays, Objects, Sets, Maps

// What are Algorithms?
// - Step-by-step procedures to solve problems
// - Examples: Sorting, Searching, Optimization

// Why DSA matters:
// 1. Problem-solving skills
// 2. Code efficiency
// 3. Interview preparation
// 4. Software optimization

// Basic Example: Finding maximum in array
function findMax(arr) {
    if (arr.length === 0) return null;
    
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Time Complexity: O(n)
// Space Complexity: O(1)
const numbers = [3, 7, 2, 9, 1];
console.log(findMax(numbers)); // Output: 9`
            },
            swift: {
                title: 'Introduction to DSA in Swift',
                code: `// Data Structures in Swift
// - Strong type system
// - Memory safety
// - Performance optimization

// Common Swift Collections:
// - Array<T>
// - Dictionary<Key, Value>
// - Set<T>

// Example: Finding maximum in array
func findMax<T: Comparable>(_ arr: [T]) -> T? {
    guard !arr.isEmpty else { return nil }
    
    var max = arr[0]
    for element in arr[1...] {
        if element > max {
            max = element
        }
    }
    return max
}

// Using generics for type safety
let numbers = [3, 7, 2, 9, 1]
if let maximum = findMax(numbers) {
    print("Maximum: \\(maximum)") // Output: 9
}

// Swift advantages:
// - Optional safety
// - Protocol-oriented programming
// - Value semantics`
            },
            cpp: {
                title: 'Introduction to DSA in C++',
                code: `#include <iostream>
#include <vector>
#include <algorithm>

// C++ STL (Standard Template Library)
// - Containers: vector, list, set, map
// - Algorithms: sort, find, binary_search
// - Iterators: connecting containers and algorithms

// Example: Finding maximum in array
template<typename T>
T findMax(const std::vector<T>& arr) {
    if (arr.empty()) {
        throw std::invalid_argument("Empty array");
    }
    
    T max = arr[0];
    for (size_t i = 1; i < arr.size(); ++i) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Using STL algorithm
template<typename T>
T findMaxSTL(const std::vector<T>& arr) {
    return *std::max_element(arr.begin(), arr.end());
}

int main() {
    std::vector<int> numbers = {3, 7, 2, 9, 1};
    std::cout << "Maximum: " << findMax(numbers) << std::endl;
    return 0;
}`
            }
        },
        'swift-syntax': {
            title: 'Swift Data Structures Syntax',
            description: 'Comprehensive Swift syntax guide for implementing various data structures',
            questions: [
                'How do you implement a generic stack in Swift?',
                'What is the difference between Array and ContiguousArray?',
                'How do you create a hash table using Dictionary?',
                'What are the performance characteristics of Set operations?',
                'How do you implement a binary tree with protocols?',
                'What is the difference between class and struct for data structures?',
                'How do you use inout parameters for reference semantics?',
                'What are the benefits of using generics in data structures?'
            ],
            swift: {
                title: 'Swift Data Structures Implementation',
                code: `// MARK: - Array (Dynamic Array)
// Creation and initialization
var dynamicArray: [Int] = []
var initializedArray = [1, 2, 3, 4, 5]
var repeatedArray = Array(repeating: 0, count: 10)

// Common operations
dynamicArray.append(10)           // O(1) amortized
dynamicArray.insert(5, at: 0)     // O(n)
dynamicArray.remove(at: 0)        // O(n)
let element = dynamicArray[0]     // O(1) access

// MARK: - Stack Implementation
struct Stack<T> {
    private var items: [T] = []
    
    mutating func push(_ item: T) {
        items.append(item)
    }
    
    mutating func pop() -> T? {
        return items.popLast()
    }
    
    func peek() -> T? {
        return items.last
    }
    
    var isEmpty: Bool {
        return items.isEmpty
    }
    
    var count: Int {
        return items.count
    }
}

// Usage
var stack = Stack<Int>()
stack.push(1)
stack.push(2)
let top = stack.pop() // Returns 2

// MARK: - Queue Implementation
struct Queue<T> {
    private var items: [T] = []
    
    mutating func enqueue(_ item: T) {
        items.append(item)
    }
    
    mutating func dequeue() -> T? {
        return items.isEmpty ? nil : items.removeFirst()
    }
    
    func front() -> T? {
        return items.first
    }
    
    var isEmpty: Bool {
        return items.isEmpty
    }
}

// MARK: - Linked List Implementation
class ListNode<T> {
    var value: T
    var next: ListNode<T>?
    
    init(_ value: T) {
        self.value = value
    }
}

class LinkedList<T> {
    private var head: ListNode<T>?
    
    func append(_ value: T) {
        let newNode = ListNode(value)
        
        guard let head = head else {
            self.head = newNode
            return
        }
        
        var current = head
        while current.next != nil {
            current = current.next!
        }
        current.next = newNode
    }
    
    func prepend(_ value: T) {
        let newNode = ListNode(value)
        newNode.next = head
        head = newNode
    }
    
    func remove(_ value: T) where T: Equatable {
        guard let head = head else { return }
        
        if head.value == value {
            self.head = head.next
            return
        }
        
        var current = head
        while current.next != nil {
            if current.next!.value == value {
                current.next = current.next!.next
                return
            }
            current = current.next!
        }
    }
}

// MARK: - Hash Table (Dictionary)
var hashTable: [String: Int] = [:]
hashTable["apple"] = 5           // O(1) average
hashTable["banana"] = 3
let appleCount = hashTable["apple"] // O(1) average

// Custom hash table implementation
struct HashTable<Key: Hashable, Value> {
    private var buckets: [[(Key, Value)]]
    private let capacity: Int
    
    init(capacity: Int = 16) {
        self.capacity = capacity
        self.buckets = Array(repeating: [], count: capacity)
    }
    
    private func hash(_ key: Key) -> Int {
        return abs(key.hashValue) % capacity
    }
    
    mutating func set(_ key: Key, _ value: Value) {
        let index = hash(key)
        
        for (i, pair) in buckets[index].enumerated() {
            if pair.0 == key {
                buckets[index][i] = (key, value)
                return
            }
        }
        
        buckets[index].append((key, value))
    }
    
    func get(_ key: Key) -> Value? {
        let index = hash(key)
        
        for pair in buckets[index] {
            if pair.0 == key {
                return pair.1
            }
        }
        
        return nil
    }
}

// MARK: - Set Operations
var numberSet: Set<Int> = [1, 2, 3, 4, 5]
numberSet.insert(6)              // O(1) average
numberSet.remove(3)              // O(1) average
let contains = numberSet.contains(4) // O(1) average

// Set operations
let set1: Set = [1, 2, 3]
let set2: Set = [3, 4, 5]
let union = set1.union(set2)        // [1, 2, 3, 4, 5]
let intersection = set1.intersection(set2) // [3]

// MARK: - Binary Tree Implementation
class TreeNode<T> {
    var value: T
    var left: TreeNode<T>?
    var right: TreeNode<T>?
    
    init(_ value: T) {
        self.value = value
    }
}

class BinarySearchTree<T: Comparable> {
    private var root: TreeNode<T>?
    
    func insert(_ value: T) {
        root = insertRecursive(root, value)
    }
    
    private func insertRecursive(_ node: TreeNode<T>?, _ value: T) -> TreeNode<T> {
        guard let node = node else {
            return TreeNode(value)
        }
        
        if value < node.value {
            node.left = insertRecursive(node.left, value)
        } else if value > node.value {
            node.right = insertRecursive(node.right, value)
        }
        
        return node
    }
    
    func search(_ value: T) -> Bool {
        return searchRecursive(root, value)
    }
    
    private func searchRecursive(_ node: TreeNode<T>?, _ value: T) -> Bool {
        guard let node = node else { return false }
        
        if value == node.value {
            return true
        } else if value < node.value {
            return searchRecursive(node.left, value)
        } else {
            return searchRecursive(node.right, value)
        }
    }
}

// MARK: - Protocol-Oriented Data Structure
protocol Collection {
    associatedtype Element
    mutating func add(_ element: Element)
    mutating func remove() -> Element?
    var isEmpty: Bool { get }
    var count: Int { get }
}

// MARK: - Heap Implementation
struct MinHeap<T: Comparable> {
    private var elements: [T] = []
    
    var isEmpty: Bool {
        return elements.isEmpty
    }
    
    var count: Int {
        return elements.count
    }
    
    func peek() -> T? {
        return elements.first
    }
    
    mutating func insert(_ element: T) {
        elements.append(element)
        heapifyUp(from: elements.count - 1)
    }
    
    mutating func removeMin() -> T? {
        guard !elements.isEmpty else { return nil }
        
        if elements.count == 1 {
            return elements.removeLast()
        }
        
        let min = elements[0]
        elements[0] = elements.removeLast()
        heapifyDown(from: 0)
        return min
    }
    
    private mutating func heapifyUp(from index: Int) {
        let parentIndex = (index - 1) / 2
        
        if index > 0 && elements[index] < elements[parentIndex] {
            elements.swapAt(index, parentIndex)
            heapifyUp(from: parentIndex)
        }
    }
    
    private mutating func heapifyDown(from index: Int) {
        let leftChild = 2 * index + 1
        let rightChild = 2 * index + 2
        var smallest = index
        
        if leftChild < elements.count && elements[leftChild] < elements[smallest] {
            smallest = leftChild
        }
        
        if rightChild < elements.count && elements[rightChild] < elements[smallest] {
            smallest = rightChild
        }
        
        if smallest != index {
            elements.swapAt(index, smallest)
            heapifyDown(from: smallest)
        }
    }
}

// MARK: - Usage Examples
var bst = BinarySearchTree<Int>()
bst.insert(5)
bst.insert(3)
bst.insert(7)
print(bst.search(3)) // true

var heap = MinHeap<Int>()
heap.insert(10)
heap.insert(5)
heap.insert(15)
print(heap.removeMin()) // Optional(5)`
            }
        },
        warmup: {
            title: 'Warm Up Problems',
            description: 'Simple problems to get started with programming logic',
            questions: [
                'Write a function to check if a number is prime',
                'Find the factorial of a number using iteration',
                'Reverse an array without using built-in methods',
                'Check if a string is a palindrome',
                'Find the largest element in an array',
                'Count the frequency of each character in a string',
                'Convert a decimal number to binary',
                'Find the GCD of two numbers'
            ],
            javascript: {
                title: 'JavaScript Warm Up',
                code: `// Problem 1: Sum of two numbers
function sum(a, b) {
    return a + b;
}

// Problem 2: Check if number is even
function isEven(num) {
    return num % 2 === 0;
}

// Problem 3: Reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Problem 4: Count vowels
function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

// Problem 5: Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Test cases
console.log(sum(5, 3)); // 8
console.log(isEven(4)); // true
console.log(reverseString("hello")); // "olleh"
console.log(countVowels("programming")); // 3
console.log(factorial(5)); // 120`
            },
            swift: {
                title: 'Swift Warm Up',
                code: `// Problem 1: Sum of two numbers
func sum(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// Problem 2: Check if number is even
func isEven(_ num: Int) -> Bool {
    return num % 2 == 0
}

// Problem 3: Reverse a string
func reverseString(_ str: String) -> String {
    return String(str.reversed())
}

// Problem 4: Count vowels
func countVowels(_ str: String) -> Int {
    let vowels = Set("aeiouAEIOU")
    return str.filter { vowels.contains($0) }.count
}

// Problem 5: Factorial
func factorial(_ n: Int) -> Int {
    guard n > 1 else { return 1 }
    return n * factorial(n - 1)
}

// Test cases
print(sum(5, 3)) // 8
print(isEven(4)) // true
print(reverseString("hello")) // "olleh"
print(countVowels("programming")) // 3
print(factorial(5)) // 120`
            },
            cpp: {
                title: 'C++ Warm Up',
                code: `#include <iostream>
#include <string>
#include <algorithm>

// Problem 1: Sum of two numbers
int sum(int a, int b) {
    return a + b;
}

// Problem 2: Check if number is even
bool isEven(int num) {
    return num % 2 == 0;
}

// Problem 3: Reverse a string
std::string reverseString(std::string str) {
    std::reverse(str.begin(), str.end());
    return str;
}

// Problem 4: Count vowels
int countVowels(const std::string& str) {
    std::string vowels = "aeiouAEIOU";
    int count = 0;
    for (char c : str) {
        if (vowels.find(c) != std::string::npos) {
            count++;
        }
    }
    return count;
}

// Problem 5: Factorial
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    std::cout << sum(5, 3) << std::endl; // 8
    std::cout << isEven(4) << std::endl; // 1 (true)
    std::cout << reverseString("hello") << std::endl; // "olleh"
    std::cout << countVowels("programming") << std::endl; // 3
    std::cout << factorial(5) << std::endl; // 120
    return 0;
}`
            }
        },
        complexity: {
            title: 'Time & Space Complexity',
            description: 'Understanding algorithm efficiency and Big O notation',
            questions: [
                'What is the time complexity of accessing an element in an array?',
                'Compare the space complexity of iterative vs recursive factorial',
                'What is the worst-case time complexity of bubble sort?',
                'Analyze the time complexity of nested loops',
                'What is the difference between O(log n) and O(n log n)?',
                'How does space complexity differ from time complexity?',
                'What is amortized time complexity?',
                'Calculate the time complexity of binary search'
            ],
            javascript: {
                title: 'Complexity Analysis in JavaScript',
                code: `// Big O Notation Examples

// O(1) - Constant Time
function getFirstElement(arr) {
    return arr[0]; // Always takes same time
}

// O(n) - Linear Time
function findElement(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

// O(n²) - Quadratic Time
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// O(log n) - Logarithmic Time
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Space Complexity Examples
// O(1) space
function sum(a, b) {
    return a + b; // No extra space
}

// O(n) space
function createArray(n) {
    return new Array(n).fill(0); // Space grows with input
}`
            },
            swift: {
                title: 'Complexity Analysis in Swift',
                code: `// Big O Notation Examples in Swift

// O(1) - Constant Time
func getFirstElement<T>(_ arr: [T]) -> T? {
    return arr.first // Always takes same time
}

// O(n) - Linear Time
func findElement<T: Equatable>(_ arr: [T], _ target: T) -> Int? {
    for (index, element) in arr.enumerated() {
        if element == target { return index }
    }
    return nil
}

// O(n²) - Quadratic Time
func bubbleSort(_ arr: inout [Int]) {
    for i in 0..<arr.count {
        for j in 0..<(arr.count - 1) {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
            }
        }
    }
}

// O(log n) - Logarithmic Time
func binarySearch(_ arr: [Int], _ target: Int) -> Int? {
    var left = 0
    var right = arr.count - 1
    
    while left <= right {
        let mid = (left + right) / 2
        if arr[mid] == target { return mid }
        else if arr[mid] < target { left = mid + 1 }
        else { right = mid - 1 }
    }
    return nil
}

// Space Complexity
// O(1) space
func sum(_ a: Int, _ b: Int) -> Int {
    return a + b // No extra space
}

// O(n) space
func createArray(_ n: Int) -> [Int] {
    return Array(repeating: 0, count: n) // Space grows with input
}`
            },
            cpp: {
                title: 'Complexity Analysis in C++',
                code: `#include <vector>
#include <algorithm>

// Big O Notation Examples

// O(1) - Constant Time
template<typename T>
T getFirstElement(const std::vector<T>& arr) {
    return arr[0]; // Always takes same time
}

// O(n) - Linear Time
template<typename T>
int findElement(const std::vector<T>& arr, const T& target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// O(n²) - Quadratic Time
void bubbleSort(std::vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr.size() - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// O(log n) - Logarithmic Time
int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Space Complexity Examples
// O(1) space
int sum(int a, int b) {
    return a + b; // No extra space
}

// O(n) space
std::vector<int> createArray(int n) {
    return std::vector<int>(n, 0); // Space grows with input
}`
            }
        },
        'array': {
            title: 'Array',
            description: 'Complete guide to arrays - from fundamentals to advanced problems',
            explanation: `
## What is an Array?
An array is a linear data structure that stores elements of the same type in contiguous memory locations. Elements are accessed using their index (position).

## Key Characteristics
- **Fixed Size**: Size is determined at creation time
- **Homogeneous**: All elements are of the same data type
- **Zero-indexed**: First element is at index 0
- **Random Access**: Direct access to any element using index
- **Contiguous Memory**: Elements stored in adjacent memory locations

## Time Complexity
| Operation | Time Complexity |
|-----------|----------------|
| Access    | O(1)          |
| Search    | O(n)          |
| Insertion | O(n)          |
| Deletion  | O(n)          |

## Array Syntax in Swift

### Declaration and Initialization
\`\`\`swift
// Empty array
var emptyArray: [Int] = []
var anotherEmpty = [String]()

// Array with initial values
var numbers = [1, 2, 3, 4, 5]
var fruits = ["apple", "banana", "orange"]

// Array with repeated values
var zeros = Array(repeating: 0, count: 5) // [0, 0, 0, 0, 0]

// Array with capacity
var arrayWithCapacity = Array<Int>()
arrayWithCapacity.reserveCapacity(100)
\`\`\`

### Basic Operations
\`\`\`swift
var arr = [1, 2, 3, 4, 5]

// Access elements
let first = arr[0]        // 1
let last = arr[arr.count - 1]  // 5

// Safe access
let safeFirst = arr.first  // Optional(1)
let safeLast = arr.last    // Optional(5)

// Modify elements
arr[0] = 10              // [10, 2, 3, 4, 5]

// Insert elements
arr.append(6)            // [10, 2, 3, 4, 5, 6]
arr.insert(0, at: 0)     // [0, 10, 2, 3, 4, 5, 6]

// Remove elements
arr.removeLast()         // [0, 10, 2, 3, 4, 5]
arr.removeFirst()        // [10, 2, 3, 4, 5]
arr.remove(at: 2)        // [10, 2, 4, 5]

// Check properties
print(arr.count)         // 4
print(arr.isEmpty)       // false
\`\`\`

### Array Traversal
\`\`\`swift
let numbers = [1, 2, 3, 4, 5]

// For-in loop
for number in numbers {
    print(number)
}

// With index using enumerated()
for (index, number) in numbers.enumerated() {
    print("Index \\(index): \\(number)")
}

// Traditional for loop
for i in 0..<numbers.count {
    print("numbers[\\(i)] = \\(numbers[i])")
}

// Using indices
for index in numbers.indices {
    print("numbers[\\(index)] = \\(numbers[index])")
}
\`\`\`

### Advanced Operations
\`\`\`swift
var arr = [1, 2, 3, 4, 5]

// Slicing
let slice = arr[1...3]   // [2, 3, 4]
let prefix = arr.prefix(3) // [1, 2, 3]
let suffix = arr.suffix(2) // [4, 5]

// Searching
let index = arr.firstIndex(of: 3)  // Optional(2)
let contains = arr.contains(4)     // true

// Sorting
arr.sort()               // Sorts in place
let sorted = arr.sorted() // Returns new sorted array

// Filtering and Mapping
let evens = arr.filter { $0 % 2 == 0 }  // [2, 4]
let doubled = arr.map { $0 * 2 }        // [2, 4, 6, 8, 10]

// Reducing
let sum = arr.reduce(0, +)  // 15
\`\`\`

### 2D Arrays
\`\`\`swift
// Declaration
var matrix: [[Int]] = []
var grid = Array(repeating: Array(repeating: 0, count: 3), count: 3)

// Initialization with values
let matrix2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

// Access elements
let element = matrix2D[1][2]  // 6

// Modify elements
var mutableMatrix = matrix2D
mutableMatrix[0][0] = 10

// Traverse 2D array
for row in matrix2D {
    for element in row {
        print(element, terminator: " ")
    }
    print() // New line after each row
}
\`\`\`

## When to Use Arrays
✅ **Use when:**
- Need random access to elements
- Memory usage is a concern
- Cache performance is important
- Working with numerical computations

❌ **Avoid when:**
- Frequent insertions/deletions at arbitrary positions
- Size varies significantly during runtime
- Need to store different data types together
`,
            questions: [
                
                // Easy Problems (5)
                'Two Sum - https://leetcode.com/problems/two-sum/',
                'Best Time to Buy and Sell Stock - https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
                'Contains Duplicate - https://leetcode.com/problems/contains-duplicate/',
                'Move Zeroes - https://leetcode.com/problems/move-zeroes/',
                'Merge Sorted Array - https://leetcode.com/problems/merge-sorted-array/',
                
                // Medium Problems (5)
                'Product of Array Except Self - https://leetcode.com/problems/product-of-array-except-self/',
                '3Sum - https://leetcode.com/problems/3sum/',
                'Container With Most Water - https://leetcode.com/problems/container-with-most-water/',
                'Subarray Sum Equals K - https://leetcode.com/problems/subarray-sum-equals-k/',
                'Search in Rotated Sorted Array - https://leetcode.com/problems/search-in-rotated-sorted-array/',
                
                // Hard Problems (3)
                'Trapping Rain Water - https://leetcode.com/problems/trapping-rain-water/',
                'Median of Two Sorted Arrays - https://leetcode.com/problems/median-of-two-sorted-arrays/',
                'First Missing Positive - https://leetcode.com/problems/first-missing-positive/'
            ]
        },
        'linkedlist': {
            title: 'Linked List',
            description: 'Complete guide to linked lists - from fundamentals to advanced problems',
            explanation: `
## What is a Linked List?
A linked list is a linear data structure where elements (nodes) are stored in a sequence, but unlike arrays, elements are not stored in contiguous memory locations. Each node contains data and a reference (or link) to the next node in the sequence.

## Key Characteristics
- **Dynamic Size**: Size can grow or shrink during runtime
- **Non-contiguous Memory**: Nodes can be stored anywhere in memory
- **Sequential Access**: Must traverse from head to reach any element
- **Efficient Insertion/Deletion**: O(1) at known positions
- **Extra Memory**: Requires additional memory for storing pointers

## Time Complexity
| Operation | Time Complexity |
|-----------|----------------|
| Access    | O(n)          |
| Search    | O(n)          |
| Insertion | O(1)*         |
| Deletion  | O(1)*         |
*At known position. O(n) if position needs to be found.

## Types of Linked Lists
1. **Singly Linked List**: Each node points to the next node
2. **Doubly Linked List**: Each node has pointers to both next and previous nodes
3. **Circular Linked List**: Last node points back to the first node

## Linked List Syntax in Swift

### Node Structure
\`\`\`swift
// Singly Linked List Node
class ListNode {
    var val: Int
    var next: ListNode?
    
    init(_ val: Int) {
        self.val = val
        self.next = nil
    }
}

// Doubly Linked List Node
class DoublyListNode {
    var val: Int
    var next: DoublyListNode?
    var prev: DoublyListNode?
    
    init(_ val: Int) {
        self.val = val
        self.next = nil
        self.prev = nil
    }
}
\`\`\`

### Basic Linked List Operations
\`\`\`swift
class LinkedList {
    private var head: ListNode?
    private var size: Int = 0
    
    // Add at head (beginning)
    func addAtHead(_ val: Int) {
        let newNode = ListNode(val)
        newNode.next = head
        head = newNode
        size += 1
    }
    
    // Add at tail (end)
    func addAtTail(_ val: Int) {
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
    
    // Add at specific index
    func addAtIndex(_ index: Int, _ val: Int) {
        if index < 0 || index > size { return }
        
        if index == 0 {
            addAtHead(val)
            return
        }
        
        let newNode = ListNode(val)
        var current = head
        
        for _ in 0..<(index - 1) {
            current = current?.next
        }
        
        newNode.next = current?.next
        current?.next = newNode
        size += 1
    }
    
    // Delete at specific index
    func deleteAtIndex(_ index: Int) {
        if index < 0 || index >= size { return }
        
        if index == 0 {
            head = head?.next
            size -= 1
            return
        }
        
        var current = head
        for _ in 0..<(index - 1) {
            current = current?.next
        }
        
        current?.next = current?.next?.next
        size -= 1
    }
    
    // Get value at index
    func get(_ index: Int) -> Int {
        if index < 0 || index >= size { return -1 }
        
        var current = head
        for _ in 0..<index {
            current = current?.next
        }
        
        return current?.val ?? -1
    }
}
\`\`\`

### Common Linked List Algorithms
\`\`\`swift
// Reverse a linked list
func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var current = head
    
    while current != nil {
        let nextTemp = current?.next
        current?.next = prev
        prev = current
        current = nextTemp
    }
    
    return prev
}

// Find middle of linked list (Floyd's slow-fast pointer)
func findMiddle(_ head: ListNode?) -> ListNode? {
    var slow = head
    var fast = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
    }
    
    return slow
}

// Detect cycle in linked list
func hasCycle(_ head: ListNode?) -> Bool {
    var slow = head
    var fast = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
        
        if slow === fast {
            return true
        }
    }
    
    return false
}

// Merge two sorted linked lists
func mergeTwoLists(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
    let dummy = ListNode(0)
    var current = dummy
    var list1 = l1
    var list2 = l2
    
    while list1 != nil && list2 != nil {
        if list1!.val <= list2!.val {
            current.next = list1
            list1 = list1?.next
        } else {
            current.next = list2
            list2 = list2?.next
        }
        current = current.next!
    }
    
    // Attach remaining nodes
    current.next = list1 ?? list2
    
    return dummy.next
}
\`\`\`

## Linked List vs Array
| Aspect | Linked List | Array |
|--------|-------------|-------|
| Memory | Non-contiguous | Contiguous |
| Access Time | O(n) | O(1) |
| Insertion/Deletion | O(1) at known position | O(n) |
| Memory Overhead | Extra pointer storage | No extra overhead |
| Cache Performance | Poor | Good |

## When to Use Linked Lists
✅ **Use when:**
- Frequent insertions/deletions at arbitrary positions
- Size varies significantly during runtime
- Memory is not allocated contiguously
- Don't need random access to elements

❌ **Avoid when:**
- Need frequent random access to elements
- Memory usage is critical
- Cache performance is important
- Working with numerical computations
`,
            questions: [
                // Easy Problems
                'Design Linked List - https://leetcode.com/problems/design-linked-list/',
                'Adding Nodes to Linked List (addAtHead, addAtTail, addAtIndex) - https://leetcode.com/problems/design-linked-list/',
                'Deleting Nodes in Linked List (deleteAtIndex) - https://leetcode.com/problems/design-linked-list/',
                'Middle of Linked List - https://leetcode.com/problems/middle-of-the-linked-list/',
                'Reverse Linked List - https://leetcode.com/problems/reverse-linked-list/',
                'Linked List Cycle – Hash Table - https://leetcode.com/problems/linked-list-cycle/',
                'Linked List Cycle – Floyd\'s Algorithm - https://leetcode.com/problems/linked-list-cycle/',
                'Palindrome Linked List - https://leetcode.com/problems/palindrome-linked-list/',
                'Intersection of Two Linked Lists - https://leetcode.com/problems/intersection-of-two-linked-lists/',
                'Remove Linked List Elements - https://leetcode.com/problems/remove-linked-list-elements/',
                
                // Medium Problems
                'Remove Nth Node from End of List (Two‐Pass & One‐Pass) - https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
                'Remove Duplicates from Sorted List - https://leetcode.com/problems/remove-duplicates-from-sorted-list/',
                'Odd Even Linked List - https://leetcode.com/problems/odd-even-linked-list/',
                'Add Two Numbers - https://leetcode.com/problems/add-two-numbers/',
                'Merge Two Sorted Lists - https://leetcode.com/problems/merge-two-sorted-lists/',
                'Rotate List - https://leetcode.com/problems/rotate-list/',
                'Swap Nodes in Pairs (iterative or recursive) - https://leetcode.com/problems/swap-nodes-in-pairs/'
            ]
        }
    };


    const topics = [
        { id: 'array', name: 'Array' },
        { id: 'linkedlist', name: 'Linked List' }
    ];

    const currentTopic = dsaTopics[selectedTopic];

    return (
        <div className="leftbrain-container dsa-theme">
            <div className="simple-header">
                <h1>Data Structures & Algorithms</h1>
                <p>Master problem-solving with curated LeetCode challenges and comprehensive Swift programming guides</p>
            </div>

            <div className="section">
                <h2>Topics</h2>
                <div className="grid-4">
                    {topics.map(topic => (
                        <button
                            key={topic.id}
                            className={`leftbrain-button ${selectedTopic === topic.id ? 'active' : ''}`}
                            onClick={() => setSelectedTopic(topic.id)}
                        >
                            {topic.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid-2">
                <div className="content-card">
                    {/* LeetCode Stats Section - Compact */}
                    <div className="leetcode-compact-section">
                        <div className="leetcode-compact-header">
                            <div className="profile-compact">
                                <span className="leetcode-icon">🔥</span>
                                <span className="profile-name">sachinkumar6174</span>
                            </div>
                            <a 
                                href="https://leetcode.com/sachinkumar6174" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="leetcode-compact-link"
                            >
                                View Profile ↗
                            </a>
                        </div>
                        <div className="leetcode-compact-stats">
                            <img 
                                src="https://leetcard.jacoblin.cool/sachinkumar6174?theme=dark&font=Karma" 
                                alt="LeetCode Stats"
                                className="leetcode-compact-card"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="compact-fallback-stats" style={{display: 'none'}}>
                                <div className="compact-stat">
                                    <span className="compact-number">30</span>
                                    <span className="compact-label">2025 Contributions</span>
                                </div>
                                <div className="compact-stat">
                                    <span className="compact-number">Active</span>
                                    <span className="compact-label">July Streak</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* LeetCode Contribution Graph */}
                    <ContributionGraph />
                    
                    <h3>{currentTopic.title}</h3>
                    <p>{currentTopic.description}</p>
                    
                    {currentTopic.questions && (
                        <div className="info-section">
                            <h4>🎯 Practice Problems</h4>
                            <div className="questions-grid">
                                {currentTopic.questions.map((question, index) => {
                                    // Parse question text and URL
                                    const parts = question.split(' - https://');
                                    const questionTitle = parts[0];
                                    const leetcodeUrl = parts[1] ? `https://${parts[1]}` : null;
                                    
                                    
                                    // Only render LeetCode problems, skip concept questions
                                    if (!leetcodeUrl) return null;
                                    
                                    return (
                                        <div key={index} className="question-card">
                                            <div className="question-card-header">
                                                <span className="question-number">#{index + 1}</span>
                                                <span className={`question-difficulty ${
                                                    // Determine difficulty based on position in the problems array
                                                    (index >= 0 && index <= 4) ? 'difficulty-easy' :
                                                    (index >= 5 && index <= 9) ? 'difficulty-medium' :
                                                    'difficulty-hard'
                                                }`}>
                                                    {(index >= 0 && index <= 4) ? 'Easy' :
                                                     (index >= 5 && index <= 9) ? 'Medium' :
                                                     'Hard'}
                                                </span>
                                            </div>
                                            <h3 className="question-title">{questionTitle}</h3>
                                            <a 
                                                href={leetcodeUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="leetcode-link"
                                            >
                                                <span>Solve on LeetCode</span>
                                                <span className="external-icon">↗</span>
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    
                    {currentTopic.explanation && (
                        <div className="info-section">
                            <h4>📚 Fundamentals & Syntax</h4>
                            <div className="explanation-content">
                                <div dangerouslySetInnerHTML={{ 
                                    __html: currentTopic.explanation
                                        .replace(/\n/g, '<br/>')
                                        .replace(/## (.*)/g, '<h3>$1</h3>')
                                        .replace(/### (.*)/g, '<h4>$1</h4>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/`([^`]+)`/g, '<code>$1</code>')
                                        .replace(/```swift\n([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>')
                                        .replace(/\| (.*) \|/g, '<tr><td>$1</td></tr>')
                                        .replace(/\|---/g, '<table class="complexity-table">')
                                        .replace(/✅ \*\*(.*?)\*\*/g, '<div class="pro-tip">✅ <strong>$1</strong>')
                                        .replace(/❌ \*\*(.*?)\*\*/g, '<div class="con-tip">❌ <strong>$1</strong>')
                                }} />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DSA;
