import React, { useState, useMemo, useCallback, memo } from 'react';
import '../shared-styles.css';
import './DSA.css';
import ContributionGraph from './ContributionGraph';
import { top150Data } from './data/top150.js';
import { arrayData } from './data/array.js';
import { matrixData } from './data/matrix.js';
import { linkedListData } from './data/linkedlist.js';
import { stackQueueData } from './data/stackqueue.js';
import { binaryTreeData } from './data/binarytree.js';
import { bstData } from './data/bst.js';
import { heapData } from './data/heap.js';
import { hashingData } from './data/hashing.js';
import { twoPointersData } from './data/twopointers.js';
import { stringsData } from './data/strings.js';

const DSA = memo(() => {
    const [selectedTopic, setSelectedTopic] = useState('top150');

    // Memoize topic selection handler
    const handleTopicChange = useCallback((topicId) => {
        setSelectedTopic(topicId);
    }, []);

    // Memoize DSA topics to prevent recreation on every render
    const dsaTopics = useMemo(() => ({
        top150: top150Data,
        array: arrayData,
        matrix: matrixData,
        linkedlist: linkedListData,
        stackqueue: stackQueueData,
        binarytree: binaryTreeData,
        bst: bstData,
        heap: heapData,
        hashing: hashingData,
        twopointers: twoPointersData,
        strings: stringsData,
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
        }
    }), []);


    // Memoize topics array
    const topics = useMemo(() => [
        { id: 'top150', name: 'Top 150 Interview Questions' },
        { id: 'array', name: 'Array' },
        { id: 'matrix', name: 'Matrix' },
        { id: 'strings', name: 'Strings' },
        { id: 'stackqueue', name: 'Stack & Queue' },
        { id: 'hashing', name: 'Hashing' },
        { id: 'linkedlist', name: 'Linked List' },
        { id: 'binarytree', name: 'Binary Tree' },
        { id: 'bst', name: 'Binary Search Tree' },
        { id: 'heap', name: 'Heap / Priority Queue' },
        { id: 'twopointers', name: 'Two Pointers & Sliding Window' }
    ], []);

    // Memoize current topic calculation
    const currentTopic = useMemo(() => dsaTopics[selectedTopic], [dsaTopics, selectedTopic]);

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
                            onClick={() => handleTopicChange(topic.id)}
                        >
                            {selectedTopic === topic.id && <span className="selected-indicator">✓</span>}
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

                                    if (question.startsWith('---')) {
                                        return <h3 key={index} className="separator">{questionTitle.replaceAll('---', '')}</h3>;
                                    }
                                    
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
                                                <span>{leetcodeUrl.includes('hackerrank') ? 'Solve on HackerRank' : 'Solve on LeetCode'}</span>
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
});

DSA.displayName = 'DSA';

export default DSA;
