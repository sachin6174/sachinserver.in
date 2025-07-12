import React, { useState } from 'react';
import '../shared-styles.css';
import './DSA.css';

const DSA = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [selectedTopic, setSelectedTopic] = useState('introduction');

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
        'arrays-0': {
            title: 'Arrays - Level 0',
            description: 'Basic array operations and fundamental concepts',
            questions: [
                'Two Sum: Find two numbers that add up to a target',
                'Maximum Subarray: Find contiguous subarray with largest sum',
                'Remove Duplicates: Remove duplicates from sorted array',
                'Rotate Array: Rotate array to the right by k steps',
                'Contains Duplicate: Check if array contains any duplicates',
                'Best Time to Buy and Sell Stock',
                'Merge Two Sorted Arrays',
                'Find Missing Number in array from 1 to n',
                'Move Zeros to the end of array',
                'Intersection of Two Arrays'
            ],
            javascript: {
                title: 'JavaScript Arrays Basics',
                code: `// Array Declaration and Initialization
let arr1 = [1, 2, 3, 4, 5];
let arr2 = new Array(5).fill(0);

// Basic Operations
// Access: O(1)
console.log(arr1[0]); // 1

// Insert at end: O(1)
arr1.push(6);

// Insert at beginning: O(n)
arr1.unshift(0);

// Delete from end: O(1)
arr1.pop();

// Delete from beginning: O(n)
arr1.shift();

// Search: O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

// Common Problems
// 1. Two Sum
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
}

// 2. Maximum Subarray (Kadane's Algorithm)
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`
            },
            swift: {
                title: 'Swift Arrays Basics',
                code: `// Array Declaration and Initialization
var arr1 = [1, 2, 3, 4, 5]
var arr2 = Array(repeating: 0, count: 5)

// Basic Operations
// Access: O(1)
print(arr1[0]) // 1

// Insert at end: O(1)
arr1.append(6)

// Insert at beginning: O(n)
arr1.insert(0, at: 0)

// Delete from end: O(1)
arr1.removeLast()

// Delete from beginning: O(n)
arr1.removeFirst()

// Search: O(n)
func linearSearch(_ arr: [Int], _ target: Int) -> Int? {
    for (index, value) in arr.enumerated() {
        if value == target { return index }
    }
    return nil
}

// Common Problems
// 1. Two Sum
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
}

// 2. Maximum Subarray (Kadane's Algorithm)
func maxSubArray(_ nums: [Int]) -> Int {
    var maxSum = nums[0]
    var currentSum = nums[0]
    
    for i in 1..<nums.count {
        currentSum = max(nums[i], currentSum + nums[i])
        maxSum = max(maxSum, currentSum)
    }
    return maxSum
}`
            },
            cpp: {
                title: 'C++ Arrays Basics',
                code: `#include <vector>
#include <unordered_map>
#include <algorithm>

// Array Declaration and Initialization
std::vector<int> arr1 = {1, 2, 3, 4, 5};
std::vector<int> arr2(5, 0);

// Basic Operations
// Access: O(1)
std::cout << arr1[0] << std::endl; // 1

// Insert at end: O(1)
arr1.push_back(6);

// Insert at beginning: O(n)
arr1.insert(arr1.begin(), 0);

// Delete from end: O(1)
arr1.pop_back();

// Delete from beginning: O(n)
arr1.erase(arr1.begin());

// Search: O(n)
int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// Common Problems
// 1. Two Sum
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
}

// 2. Maximum Subarray (Kadane's Algorithm)
int maxSubArray(std::vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
        currentSum = std::max(nums[i], currentSum + nums[i]);
        maxSum = std::max(maxSum, currentSum);
    }
    return maxSum;
}`
            }
        },
        'recursion-0': {
            title: 'Recursion - Level 0',
            description: 'Understanding recursive thinking and basic recursive algorithms',
            questions: [
                'Calculate factorial of n using recursion',
                'Find nth Fibonacci number recursively',
                'Calculate power(base, exponent) recursively',
                'Reverse a string using recursion',
                'Find sum of digits of a number recursively',
                'Check if a string is palindrome using recursion',
                'Binary search implementation using recursion',
                'Tower of Hanoi problem',
                'Generate all subsets of a set',
                'Calculate GCD using Euclidean algorithm recursively'
            ],
            javascript: {
                title: 'JavaScript Recursion Basics',
                code: `// What is Recursion?
// A function that calls itself with a smaller/different input
// Base case: stops the recursion
// Recursive case: function calls itself

// 1. Factorial
function factorial(n) {
    // Base case
    if (n <= 1) return 1;
    // Recursive case
    return n * factorial(n - 1);
}

// 2. Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Optimized Fibonacci with memoization
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// 3. Power function
function power(base, exp) {
    if (exp === 0) return 1;
    if (exp === 1) return base;
    return base * power(base, exp - 1);
}

// 4. Sum of array
function sumArray(arr, index = 0) {
    if (index >= arr.length) return 0;
    return arr[index] + sumArray(arr, index + 1);
}

// 5. Binary search (recursive)
function binarySearchRec(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    
    if (arr[mid] > target) {
        return binarySearchRec(arr, target, left, mid - 1);
    } else {
        return binarySearchRec(arr, target, mid + 1, right);
    }
}

// Test cases
console.log(factorial(5)); // 120
console.log(fibonacci(6)); // 8
console.log(power(2, 3)); // 8
console.log(sumArray([1, 2, 3, 4])); // 10`
            },
            swift: {
                title: 'Swift Recursion Basics',
                code: `// Understanding Recursion in Swift

// 1. Factorial
func factorial(_ n: Int) -> Int {
    // Base case
    if n <= 1 { return 1 }
    // Recursive case
    return n * factorial(n - 1)
}

// 2. Fibonacci
func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// Optimized Fibonacci with memoization
func fibMemo(_ n: Int, memo: inout [Int: Int]) -> Int {
    if let cached = memo[n] { return cached }
    if n <= 1 { return n }
    
    memo[n] = fibMemo(n - 1, memo: &memo) + fibMemo(n - 2, memo: &memo)
    return memo[n]!
}

// 3. Power function
func power(_ base: Int, _ exp: Int) -> Int {
    if exp == 0 { return 1 }
    if exp == 1 { return base }
    return base * power(base, exp - 1)
}

// 4. Sum of array
func sumArray(_ arr: [Int], index: Int = 0) -> Int {
    if index >= arr.count { return 0 }
    return arr[index] + sumArray(arr, index: index + 1)
}

// 5. Binary search (recursive)
func binarySearchRec(_ arr: [Int], _ target: Int, 
                    left: Int = 0, right: Int? = nil) -> Int? {
    let r = right ?? arr.count - 1
    if left > r { return nil }
    
    let mid = (left + r) / 2
    if arr[mid] == target { return mid }
    
    if arr[mid] > target {
        return binarySearchRec(arr, target, left: left, right: mid - 1)
    } else {
        return binarySearchRec(arr, target, left: mid + 1, right: r)
    }
}

// Test cases
print(factorial(5)) // 120
print(fibonacci(6)) // 8
print(power(2, 3)) // 8
print(sumArray([1, 2, 3, 4])) // 10`
            },
            cpp: {
                title: 'C++ Recursion Basics',
                code: `#include <iostream>
#include <vector>
#include <unordered_map>

// Understanding Recursion in C++

// 1. Factorial
int factorial(int n) {
    // Base case
    if (n <= 1) return 1;
    // Recursive case
    return n * factorial(n - 1);
}

// 2. Fibonacci
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Optimized Fibonacci with memoization
std::unordered_map<int, int> memo;
int fibMemo(int n) {
    if (memo.find(n) != memo.end()) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}

// 3. Power function
int power(int base, int exp) {
    if (exp == 0) return 1;
    if (exp == 1) return base;
    return base * power(base, exp - 1);
}

// 4. Sum of array
int sumArray(const std::vector<int>& arr, int index = 0) {
    if (index >= arr.size()) return 0;
    return arr[index] + sumArray(arr, index + 1);
}

// 5. Binary search (recursive)
int binarySearchRec(const std::vector<int>& arr, int target, 
                   int left = 0, int right = -1) {
    if (right == -1) right = arr.size() - 1;
    if (left > right) return -1;
    
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    
    if (arr[mid] > target) {
        return binarySearchRec(arr, target, left, mid - 1);
    } else {
        return binarySearchRec(arr, target, mid + 1, right);
    }
}

int main() {
    std::cout << factorial(5) << std::endl; // 120
    std::cout << fibonacci(6) << std::endl; // 8
    std::cout << power(2, 3) << std::endl; // 8
    
    std::vector<int> arr = {1, 2, 3, 4};
    std::cout << sumArray(arr) << std::endl; // 10
    return 0;
}`
            }
        },
        'searching-sorting-0': {
            title: 'Searching & Sorting - Level 0',
            description: 'Basic searching and sorting algorithms',
            questions: [
                'Implement linear search algorithm',
                'Implement binary search on sorted array',
                'Sort array using bubble sort',
                'Sort array using selection sort',
                'Sort array using insertion sort',
                'Implement merge sort algorithm',
                'Find first and last position of element in sorted array',
                'Search in rotated sorted array',
                'Find peak element in array',
                'Sort colors (Dutch National Flag problem)',
                'Kth largest element in array',
                'Merge k sorted arrays'
            ],
            javascript: {
                title: 'JavaScript Searching & Sorting',
                code: `// SEARCHING ALGORITHMS

// 1. Linear Search - O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

// 2. Binary Search - O(log n) - requires sorted array
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// SORTING ALGORITHMS

// 1. Bubble Sort - O(n²)
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 2. Selection Sort - O(n²)
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

// 3. Insertion Sort - O(n²), but efficient for small arrays
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// 4. Merge Sort - O(n log n)
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
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`
            },
            swift: {
                title: 'Swift Searching & Sorting',
                code: `// SEARCHING ALGORITHMS

// 1. Linear Search - O(n)
func linearSearch<T: Equatable>(_ arr: [T], _ target: T) -> Int? {
    for (index, element) in arr.enumerated() {
        if element == target { return index }
    }
    return nil
}

// 2. Binary Search - O(log n)
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

// SORTING ALGORITHMS

// 1. Bubble Sort - O(n²)
func bubbleSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 0..<n {
        for j in 0..<(n - 1 - i) {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
            }
        }
    }
}

// 2. Selection Sort - O(n²)
func selectionSort(_ arr: inout [Int]) {
    for i in 0..<arr.count {
        var minIndex = i
        for j in (i + 1)..<arr.count {
            if arr[j] < arr[minIndex] {
                minIndex = j
            }
        }
        if minIndex != i {
            arr.swapAt(i, minIndex)
        }
    }
}

// 3. Insertion Sort - O(n²)
func insertionSort(_ arr: inout [Int]) {
    for i in 1..<arr.count {
        let key = arr[i]
        var j = i - 1
        
        while j >= 0 && arr[j] > key {
            arr[j + 1] = arr[j]
            j -= 1
        }
        arr[j + 1] = key
    }
}

// 4. Merge Sort - O(n log n)
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
    
    result.append(contentsOf: left[i...])
    result.append(contentsOf: right[j...])
    return result
}`
            },
            cpp: {
                title: 'C++ Searching & Sorting',
                code: `#include <vector>
#include <algorithm>

// SEARCHING ALGORITHMS

// 1. Linear Search - O(n)
template<typename T>
int linearSearch(const std::vector<T>& arr, const T& target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// 2. Binary Search - O(log n)
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

// SORTING ALGORITHMS

// 1. Bubble Sort - O(n²)
void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// 2. Selection Sort - O(n²)
void selectionSort(std::vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.size(); j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            std::swap(arr[i], arr[minIndex]);
        }
    }
}

// 3. Insertion Sort - O(n²)
void insertionSort(std::vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// 4. Merge Sort - O(n log n)
std::vector<int> mergeSort(std::vector<int> arr) {
    if (arr.size() <= 1) return arr;
    
    int mid = arr.size() / 2;
    std::vector<int> left(arr.begin(), arr.begin() + mid);
    std::vector<int> right(arr.begin() + mid, arr.end());
    
    left = mergeSort(left);
    right = mergeSort(right);
    
    return merge(left, right);
}

std::vector<int> merge(const std::vector<int>& left, 
                      const std::vector<int>& right) {
    std::vector<int> result;
    int i = 0, j = 0;
    
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            result.push_back(left[i++]);
        } else {
            result.push_back(right[j++]);
        }
    }
    
    while (i < left.size()) result.push_back(left[i++]);
    while (j < right.size()) result.push_back(right[j++]);
    
    return result;
}`
            }
        },
        'linkedlist-0': {
            title: 'Linked List - Level 0',
            description: 'Understanding linked list data structure and basic operations',
            questions: [
                'Reverse a singly linked list',
                'Find the middle node of linked list',
                'Detect cycle in linked list',
                'Remove nth node from end of list',
                'Merge two sorted linked lists',
                'Remove duplicates from sorted linked list',
                'Check if linked list is palindrome',
                'Find intersection point of two linked lists',
                'Add two numbers represented as linked lists',
                'Delete node in linked list given only access to that node',
                'Rotate linked list to the right by k places',
                'Convert sorted linked list to binary search tree'
            ],
            javascript: {
                title: 'JavaScript Linked List',
                code: `// Node class
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Singly Linked List implementation
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Insert at beginning - O(1)
    prepend(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    // Insert at end - O(n)
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
    
    // Delete by value - O(n)
    delete(val) {
        if (!this.head) return false;
        
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.val !== val) {
            current = current.next;
        }
        
        if (current.next) {
            current.next = current.next.next;
            this.size--;
            return true;
        }
        return false;
    }
    
    // Find element - O(n)
    find(val) {
        let current = this.head;
        while (current) {
            if (current.val === val) return current;
            current = current.next;
        }
        return null;
    }
    
    // Display list
    display() {
        const values = [];
        let current = this.head;
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        return values.join(' -> ');
    }
}

// Common problems
// 1. Reverse linked list
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

// 2. Find middle of linked list
function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
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

// Singly Linked List implementation
class LinkedList {
    private var head: ListNode?
    private var size = 0
    
    // Insert at beginning - O(1)
    func prepend(_ val: Int) {
        let newNode = ListNode(val)
        newNode.next = head
        head = newNode
        size += 1
    }
    
    // Insert at end - O(n)
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
    
    // Delete by value - O(n)
    func delete(_ val: Int) -> Bool {
        guard let head = head else { return false }
        
        if head.val == val {
            self.head = head.next
            size -= 1
            return true
        }
        
        var current = head
        while current.next != nil && current.next!.val != val {
            current = current.next!
        }
        
        if current.next != nil {
            current.next = current.next!.next
            size -= 1
            return true
        }
        return false
    }
    
    // Find element - O(n)
    func find(_ val: Int) -> ListNode? {
        var current = head
        while current != nil {
            if current!.val == val { return current }
            current = current!.next
        }
        return nil
    }
    
    // Display list
    func display() -> String {
        var values: [String] = []
        var current = head
        while current != nil {
            values.append("\\(current!.val)")
            current = current!.next
        }
        return values.joined(separator: " -> ")
    }
}

// Common problems
// 1. Reverse linked list
func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var current = head
    
    while current != nil {
        let next = current?.next
        current?.next = prev
        prev = current
        current = next
    }
    return prev
}

// 2. Find middle of linked list
func findMiddle(_ head: ListNode?) -> ListNode? {
    var slow = head
    var fast = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
    }
    return slow
}`
            },
            cpp: {
                title: 'C++ Linked List',
                code: `#include <iostream>

// Node structure
struct ListNode {
    int val;
    ListNode* next;
    
    ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

// Singly Linked List implementation
class LinkedList {
private:
    ListNode* head;
    int size;
    
public:
    LinkedList() : head(nullptr), size(0) {}
    
    ~LinkedList() {
        while (head) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
    // Insert at beginning - O(1)
    void prepend(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->next = head;
        head = newNode;
        size++;
    }
    
    // Insert at end - O(n)
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
    
    // Delete by value - O(n)
    bool deleteValue(int val) {
        if (!head) return false;
        
        if (head->val == val) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
            size--;
            return true;
        }
        
        ListNode* current = head;
        while (current->next && current->next->val != val) {
            current = current->next;
        }
        
        if (current->next) {
            ListNode* temp = current->next;
            current->next = current->next->next;
            delete temp;
            size--;
            return true;
        }
        return false;
    }
    
    // Find element - O(n)
    ListNode* find(int val) {
        ListNode* current = head;
        while (current) {
            if (current->val == val) return current;
            current = current->next;
        }
        return nullptr;
    }
    
    // Display list
    void display() {
        ListNode* current = head;
        while (current) {
            std::cout << current->val;
            if (current->next) std::cout << " -> ";
            current = current->next;
        }
        std::cout << std::endl;
    }
};

// Common problems
// 1. Reverse linked list
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;
    
    while (current) {
        ListNode* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

// 2. Find middle of linked list
ListNode* findMiddle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`
            }
        },
        'strings-0': {
            title: 'Strings - Level 0',
            description: 'String manipulation and common string algorithms',
            questions: [
                'Check if two strings are anagrams',
                'Find first non-repeating character in string',
                'Reverse words in a string',
                'Valid palindrome ignoring non-alphanumeric characters',
                'Longest common prefix among array of strings',
                'Valid parentheses checker',
                'Count and say sequence generation',
                'Implement strStr() function (substring search)',
                'Group anagrams together',
                'Longest substring without repeating characters',
                'Valid anagram checker',
                'Reverse string in-place'
            ],
            javascript: {
                title: 'JavaScript String Operations',
                code: `// Basic String Operations

// 1. String length and access
let str = "Hello World";
console.log(str.length); // 11
console.log(str[0]); // 'H'
console.log(str.charAt(0)); // 'H'

// 2. String comparison
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
}

// 3. Palindrome check
function isPalindrome(s) {
    // Clean string: remove non-alphanumeric, convert to lowercase
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let left = 0, right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}

// 4. Reverse string
function reverseString(s) {
    // Method 1: Built-in
    return s.split('').reverse().join('');
    
    // Method 2: Two pointers
    let chars = s.split('');
    let left = 0, right = chars.length - 1;
    while (left < right) {
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    return chars.join('');
}

// 5. First unique character
function firstUniqChar(s) {
    const charCount = {};
    
    // Count frequencies
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first unique
    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) return i;
    }
    return -1;
}

// 6. Valid parentheses
function isValidParentheses(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}

// 7. Longest common prefix
function longestCommonPrefix(strs) {
    if (!strs.length) return '';
    
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    return strs[0];
}

// Test cases
console.log(isAnagram("listen", "silent")); // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(reverseString("hello")); // "olleh"
console.log(firstUniqChar("leetcode")); // 0
console.log(isValidParentheses("()[]{}")); // true`
            },
            swift: {
                title: 'Swift String Operations',
                code: `// Basic String Operations in Swift

// 1. String length and access
let str = "Hello World"
print(str.count) // 11
print(str.first!) // 'H'
print(str[str.startIndex]) // 'H'

// 2. String comparison - Anagram check
func isAnagram(_ s: String, _ t: String) -> Bool {
    guard s.count == t.count else { return false }
    return s.sorted() == t.sorted()
}

// 3. Palindrome check
func isPalindrome(_ s: String) -> Bool {
    let cleaned = s.lowercased().filter { $0.isLetter || $0.isNumber }
    return cleaned == String(cleaned.reversed())
}

// 4. Reverse string
func reverseString(_ s: String) -> String {
    return String(s.reversed())
}

// Two pointer approach
func reverseStringInPlace(_ s: inout [Character]) {
    var left = 0
    var right = s.count - 1
    
    while left < right {
        s.swapAt(left, right)
        left += 1
        right -= 1
    }
}

// 5. First unique character
func firstUniqChar(_ s: String) -> Int {
    var charCount: [Character: Int] = [:]
    
    // Count frequencies
    for char in s {
        charCount[char, default: 0] += 1
    }
    
    // Find first unique
    for (index, char) in s.enumerated() {
        if charCount[char] == 1 {
            return index
        }
    }
    return -1
}

// 6. Valid parentheses
func isValid(_ s: String) -> Bool {
    var stack: [Character] = []
    let mapping: [Character: Character] = [")": "(", "}": "{", "]": "["]
    
    for char in s {
        if let openBracket = mapping[char] {
            if stack.isEmpty || stack.removeLast() != openBracket {
                return false
            }
        } else {
            stack.append(char)
        }
    }
    return stack.isEmpty
}

// 7. Longest common prefix
func longestCommonPrefix(_ strs: [String]) -> String {
    guard !strs.isEmpty else { return "" }
    
    var prefix = ""
    let firstString = strs[0]
    
    for (index, char) in firstString.enumerated() {
        for str in strs[1...] {
            if index >= str.count || str[str.index(str.startIndex, offsetBy: index)] != char {
                return prefix
            }
        }
        prefix.append(char)
    }
    return prefix
}

// Test cases
print(isAnagram("listen", "silent")) // true
print(isPalindrome("A man, a plan, a canal: Panama")) // true
print(reverseString("hello")) // "olleh"
print(firstUniqChar("leetcode")) // 0
print(isValid("()[]{}")) // true`
            },
            cpp: {
                title: 'C++ String Operations',
                code: `#include <string>
#include <algorithm>
#include <unordered_map>
#include <stack>
#include <cctype>

// Basic String Operations

// 1. String length and access
std::string str = "Hello World";
// str.length() or str.size() - 11
// str[0] - 'H'
// str.at(0) - 'H' (with bounds checking)

// 2. String comparison - Anagram check
bool isAnagram(std::string s, std::string t) {
    if (s.length() != t.length()) return false;
    std::sort(s.begin(), s.end());
    std::sort(t.begin(), t.end());
    return s == t;
}

// 3. Palindrome check
bool isPalindrome(std::string s) {
    std::string cleaned;
    for (char c : s) {
        if (std::isalnum(c)) {
            cleaned += std::tolower(c);
        }
    }
    
    int left = 0, right = cleaned.length() - 1;
    while (left < right) {
        if (cleaned[left] != cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}

// 4. Reverse string
std::string reverseString(std::string s) {
    std::reverse(s.begin(), s.end());
    return s;
}

// In-place reverse
void reverseStringInPlace(std::string& s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        std::swap(s[left], s[right]);
        left++;
        right--;
    }
}

// 5. First unique character
int firstUniqChar(std::string s) {
    std::unordered_map<char, int> charCount;
    
    // Count frequencies
    for (char c : s) {
        charCount[c]++;
    }
    
    // Find first unique
    for (int i = 0; i < s.length(); i++) {
        if (charCount[s[i]] == 1) return i;
    }
    return -1;
}

// 6. Valid parentheses
bool isValid(std::string s) {
    std::stack<char> stack;
    std::unordered_map<char, char> mapping = {
        {')', '('}, {'}', '{'}, {']', '['}
    };
    
    for (char c : s) {
        if (mapping.find(c) != mapping.end()) {
            if (stack.empty() || stack.top() != mapping[c]) {
                return false;
            }
            stack.pop();
        } else {
            stack.push(c);
        }
    }
    return stack.empty();
}

// 7. Longest common prefix
std::string longestCommonPrefix(std::vector<std::string>& strs) {
    if (strs.empty()) return "";
    
    for (int i = 0; i < strs[0].length(); i++) {
        char c = strs[0][i];
        for (int j = 1; j < strs.size(); j++) {
            if (i >= strs[j].length() || strs[j][i] != c) {
                return strs[0].substr(0, i);
            }
        }
    }
    return strs[0];
}

// Usage examples:
// isAnagram("listen", "silent") // true
// isPalindrome("A man, a plan, a canal: Panama") // true
// reverseString("hello") // "olleh"
// firstUniqChar("leetcode") // 0
// isValid("()[]{}") // true`
            }
        },
        'stack-queues': {
            title: 'Stack and Queues',
            description: 'Linear data structures with LIFO and FIFO principles',
            questions: [
                'Implement stack using arrays',
                'Implement queue using stacks',
                'Valid parentheses using stack',
                'Next greater element using stack',
                'Implement circular queue',
                'Design min stack (getMin in O(1))',
                'Evaluate postfix expression',
                'Sliding window maximum using deque',
                'Largest rectangle in histogram',
                'Check for balanced parentheses'
            ],
            javascript: {
                title: 'JavaScript Stack & Queue',
                code: `// Stack Implementation
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(item) {
        this.items.push(item);
    }
    
    pop() {
        return this.items.pop();
    }
    
    peek() {
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
}

// Queue Implementation
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(item) {
        this.items.push(item);
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    front() {
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
}

// Valid Parentheses Problem
function isValid(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}

// Next Greater Element
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = nums[i];
        }
        stack.push(i);
    }
    return result;
}`
            },
            swift: {
                title: 'Swift Stack & Queue',
                code: `// Stack Implementation
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

// Queue Implementation
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
    
    var count: Int {
        return items.count
    }
}

// Valid Parentheses Problem
func isValid(_ s: String) -> Bool {
    var stack: [Character] = []
    let mapping: [Character: Character] = [")": "(", "}": "{", "]": "["]
    
    for char in s {
        if let openBracket = mapping[char] {
            if stack.isEmpty || stack.removeLast() != openBracket {
                return false
            }
        } else {
            stack.append(char)
        }
    }
    return stack.isEmpty
}

// Next Greater Element
func nextGreaterElement(_ nums: [Int]) -> [Int] {
    var result = Array(repeating: -1, count: nums.count)
    var stack: [Int] = []
    
    for i in 0..<nums.count {
        while !stack.isEmpty && nums[i] > nums[stack.last!] {
            let index = stack.removeLast()
            result[index] = nums[i]
        }
        stack.append(i)
    }
    return result
}`
            },
            cpp: {
                title: 'C++ Stack & Queue',
                code: `#include <stack>
#include <queue>
#include <vector>
#include <unordered_map>

// Stack Implementation (using STL)
std::stack<int> stack;
stack.push(10);
stack.pop();
int top = stack.top();
bool empty = stack.empty();

// Queue Implementation (using STL)
std::queue<int> queue;
queue.push(10);
queue.pop();
int front = queue.front();
bool empty = queue.empty();

// Custom Stack Implementation
template<typename T>
class Stack {
private:
    std::vector<T> items;
    
public:
    void push(const T& item) {
        items.push_back(item);
    }
    
    void pop() {
        if (!items.empty()) {
            items.pop_back();
        }
    }
    
    T top() const {
        return items.back();
    }
    
    bool empty() const {
        return items.empty();
    }
    
    size_t size() const {
        return items.size();
    }
};

// Valid Parentheses Problem
bool isValid(std::string s) {
    std::stack<char> stack;
    std::unordered_map<char, char> mapping = {
        {')', '('}, {'}', '{'}, {']', '['}
    };
    
    for (char c : s) {
        if (mapping.find(c) != mapping.end()) {
            if (stack.empty() || stack.top() != mapping[c]) {
                return false;
            }
            stack.pop();
        } else {
            stack.push(c);
        }
    }
    return stack.empty();
}

// Next Greater Element
std::vector<int> nextGreaterElement(std::vector<int>& nums) {
    std::vector<int> result(nums.size(), -1);
    std::stack<int> stack;
    
    for (int i = 0; i < nums.size(); i++) {
        while (!stack.empty() && nums[i] > nums[stack.top()]) {
            result[stack.top()] = nums[i];
            stack.pop();
        }
        stack.push(i);
    }
    return result;
}`
            }
        },
        'binary-search': {
            title: 'Binary Search Algorithm',
            description: 'Efficient searching algorithm for sorted arrays',
            questions: [
                'Implement binary search iteratively',
                'Implement binary search recursively',
                'Find first and last position of target in sorted array',
                'Search in rotated sorted array',
                'Find minimum in rotated sorted array',
                'Search a 2D matrix using binary search',
                'Find peak element in array',
                'Square root of number using binary search',
                'Find K closest elements to target',
                'Search for range in sorted array'
            ],
            javascript: {
                title: 'JavaScript Binary Search',
                code: `// Binary Search - Iterative
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Binary Search - Recursive
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Find First and Last Position
function searchRange(nums, target) {
    const findFirst = (arr, target) => {
        let left = 0, right = arr.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    };
    
    const findLast = (arr, target) => {
        let left = 0, right = arr.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    };
    
    return [findFirst(nums, target), findLast(nums, target)];
}

// Search in Rotated Sorted Array
function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } 
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}`
            },
            swift: {
                title: 'Swift Binary Search',
                code: `// Binary Search - Iterative
func binarySearch(_ arr: [Int], _ target: Int) -> Int? {
    var left = 0
    var right = arr.count - 1
    
    while left <= right {
        let mid = (left + right) / 2
        
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return nil
}

// Binary Search - Recursive
func binarySearchRecursive(_ arr: [Int], _ target: Int, 
                          left: Int = 0, right: Int? = nil) -> Int? {
    let r = right ?? arr.count - 1
    guard left <= r else { return nil }
    
    let mid = (left + r) / 2
    
    if arr[mid] == target {
        return mid
    } else if arr[mid] < target {
        return binarySearchRecursive(arr, target, left: mid + 1, right: r)
    } else {
        return binarySearchRecursive(arr, target, left: left, right: mid - 1)
    }
}

// Find First and Last Position
func searchRange(_ nums: [Int], _ target: Int) -> [Int] {
    func findFirst(_ arr: [Int], _ target: Int) -> Int {
        var left = 0, right = arr.count - 1
        var result = -1
        
        while left <= right {
            let mid = (left + right) / 2
            if arr[mid] == target {
                result = mid
                right = mid - 1 // Continue searching left
            } else if arr[mid] < target {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return result
    }
    
    func findLast(_ arr: [Int], _ target: Int) -> Int {
        var left = 0, right = arr.count - 1
        var result = -1
        
        while left <= right {
            let mid = (left + right) / 2
            if arr[mid] == target {
                result = mid
                left = mid + 1 // Continue searching right
            } else if arr[mid] < target {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return result
    }
    
    return [findFirst(nums, target), findLast(nums, target)]
}

// Search in Rotated Sorted Array
func searchRotated(_ nums: [Int], _ target: Int) -> Int? {
    var left = 0, right = nums.count - 1
    
    while left <= right {
        let mid = (left + right) / 2
        
        if nums[mid] == target { return mid }
        
        // Left half is sorted
        if nums[left] <= nums[mid] {
            if target >= nums[left] && target < nums[mid] {
                right = mid - 1
            } else {
                left = mid + 1
            }
        }
        // Right half is sorted
        else {
            if target > nums[mid] && target <= nums[right] {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return nil
}`
            },
            cpp: {
                title: 'C++ Binary Search',
                code: `#include <vector>
#include <algorithm>

// Binary Search - Iterative
int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Binary Search - Recursive
int binarySearchRecursive(const std::vector<int>& arr, int target, 
                         int left = 0, int right = -1) {
    if (right == -1) right = arr.size() - 1;
    if (left > right) return -1;
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Find First and Last Position
std::vector<int> searchRange(std::vector<int>& nums, int target) {
    auto findFirst = [&](int target) -> int {
        int left = 0, right = nums.size() - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    };
    
    auto findLast = [&](int target) -> int {
        int left = 0, right = nums.size() - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    };
    
    return {findFirst(target), findLast(target)};
}

// Search in Rotated Sorted Array
int searchRotated(std::vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

// Using STL binary search
bool found = std::binary_search(arr.begin(), arr.end(), target);
auto it = std::lower_bound(arr.begin(), arr.end(), target);
auto it2 = std::upper_bound(arr.begin(), arr.end(), target);`
            }
        },
        'two-pointers': {
            title: 'Two Pointers & Sliding Window',
            description: 'Efficient techniques for array and string problems',
            questions: [
                'Two Sum in sorted array using two pointers',
                'Remove duplicates from sorted array',
                'Container with most water',
                'Three Sum problem',
                'Longest substring without repeating characters',
                'Minimum window substring',
                'Maximum sum subarray of size K',
                'Longest substring with at most K distinct characters',
                'Trapping rain water',
                'Valid palindrome using two pointers'
            ],
            javascript: {
                title: 'JavaScript Two Pointers & Sliding Window',
                code: `// Two Pointers Technique
// 1. Two Sum in sorted array
function twoSumSorted(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
}

// 2. Container with most water
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const area = width * Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}

// Sliding Window Technique
// 3. Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// 4. Maximum sum subarray of size K
function maxSumSubarray(nums, k) {
    let windowSum = 0;
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    let maxSum = windowSum;
    // Slide the window
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}

// 5. Three Sum
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}`
            },
            swift: {
                title: 'Swift Two Pointers & Sliding Window',
                code: `// Two Pointers Technique
// 1. Two Sum in sorted array
func twoSumSorted(_ nums: [Int], _ target: Int) -> [Int] {
    var left = 0, right = nums.count - 1
    
    while left < right {
        let sum = nums[left] + nums[right]
        if sum == target {
            return [left, right]
        } else if sum < target {
            left += 1
        } else {
            right -= 1
        }
    }
    return []
}

// 2. Container with most water
func maxArea(_ height: [Int]) -> Int {
    var left = 0, right = height.count - 1
    var maxWater = 0
    
    while left < right {
        let width = right - left
        let area = width * min(height[left], height[right])
        maxWater = max(maxWater, area)
        
        if height[left] < height[right] {
            left += 1
        } else {
            right -= 1
        }
    }
    return maxWater
}

// Sliding Window Technique
// 3. Longest substring without repeating characters
func lengthOfLongestSubstring(_ s: String) -> Int {
    var seen = Set<Character>()
    var left = 0, maxLen = 0
    let chars = Array(s)
    
    for right in 0..<chars.count {
        while seen.contains(chars[right]) {
            seen.remove(chars[left])
            left += 1
        }
        seen.insert(chars[right])
        maxLen = max(maxLen, right - left + 1)
    }
    return maxLen
}

// 4. Maximum sum subarray of size K
func maxSumSubarray(_ nums: [Int], _ k: Int) -> Int {
    var windowSum = 0
    // Calculate sum of first window
    for i in 0..<k {
        windowSum += nums[i]
    }
    
    var maxSum = windowSum
    // Slide the window
    for i in k..<nums.count {
        windowSum = windowSum - nums[i - k] + nums[i]
        maxSum = max(maxSum, windowSum)
    }
    return maxSum
}

// 5. Three Sum
func threeSum(_ nums: [Int]) -> [[Int]] {
    let sortedNums = nums.sorted()
    var result: [[Int]] = []
    
    for i in 0..<(sortedNums.count - 2) {
        if i > 0 && sortedNums[i] == sortedNums[i - 1] { continue }
        
        var left = i + 1, right = sortedNums.count - 1
        while left < right {
            let sum = sortedNums[i] + sortedNums[left] + sortedNums[right]
            if sum == 0 {
                result.append([sortedNums[i], sortedNums[left], sortedNums[right]])
                while left < right && sortedNums[left] == sortedNums[left + 1] { left += 1 }
                while left < right && sortedNums[right] == sortedNums[right - 1] { right -= 1 }
                left += 1
                right -= 1
            } else if sum < 0 {
                left += 1
            } else {
                right -= 1
            }
        }
    }
    return result
}`
            },
            cpp: {
                title: 'C++ Two Pointers & Sliding Window',
                code: `#include <vector>
#include <unordered_set>
#include <algorithm>

// Two Pointers Technique
// 1. Two Sum in sorted array
std::vector<int> twoSumSorted(std::vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}

// 2. Container with most water
int maxArea(std::vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    
    while (left < right) {
        int width = right - left;
        int area = width * std::min(height[left], height[right]);
        maxWater = std::max(maxWater, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}

// Sliding Window Technique
// 3. Longest substring without repeating characters
int lengthOfLongestSubstring(std::string s) {
    std::unordered_set<char> seen;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (seen.find(s[right]) != seen.end()) {
            seen.erase(s[left]);
            left++;
        }
        seen.insert(s[right]);
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}

// 4. Maximum sum subarray of size K
int maxSumSubarray(std::vector<int>& nums, int k) {
    int windowSum = 0;
    // Calculate sum of first window
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    int maxSum = windowSum;
    // Slide the window
    for (int i = k; i < nums.size(); i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = std::max(maxSum, windowSum);
    }
    return maxSum;
}

// 5. Three Sum
std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
    std::sort(nums.begin(), nums.end());
    std::vector<std::vector<int>> result;
    
    for (int i = 0; i < nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}`
            }
        },
        'trees-0': {
            title: 'Trees - Level 0',
            description: 'Binary trees, traversals, and basic operations',
            questions: [
                'Implement binary tree traversals (inorder, preorder, postorder)',
                'Find maximum depth of binary tree',
                'Check if two trees are identical',
                'Invert/mirror a binary tree',
                'Level order traversal (BFS)',
                'Find diameter of binary tree',
                'Check if tree is balanced',
                'Lowest common ancestor of two nodes',
                'Path sum problems',
                'Serialize and deserialize binary tree'
            ],
            javascript: {
                title: 'JavaScript Binary Trees',
                code: `// TreeNode definition
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 1. Tree Traversals
// Inorder (Left, Root, Right)
function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}

// Preorder (Root, Left, Right)
function preorderTraversal(root) {
    const result = [];
    
    function preorder(node) {
        if (node) {
            result.push(node.val);
            preorder(node.left);
            preorder(node.right);
        }
    }
    
    preorder(root);
    return result;
}

// Level order traversal (BFS)
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
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

// 2. Maximum depth
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// 3. Check if trees are identical
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && 
           isSameTree(p.left, q.left) && 
           isSameTree(p.right, q.right);
}

// 4. Invert binary tree
function invertTree(root) {
    if (!root) return null;
    
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}

// 5. Check if balanced
function isBalanced(root) {
    function height(node) {
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        if (leftHeight === -1 || rightHeight === -1 || 
            Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    return height(root) !== -1;
}`
            },
            swift: {
                title: 'Swift Binary Trees',
                code: `// TreeNode definition
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

// 1. Tree Traversals
// Inorder (Left, Root, Right)
func inorderTraversal(_ root: TreeNode?) -> [Int] {
    var result: [Int] = []
    
    func inorder(_ node: TreeNode?) {
        guard let node = node else { return }
        inorder(node.left)
        result.append(node.val)
        inorder(node.right)
    }
    
    inorder(root)
    return result
}

// Preorder (Root, Left, Right)
func preorderTraversal(_ root: TreeNode?) -> [Int] {
    var result: [Int] = []
    
    func preorder(_ node: TreeNode?) {
        guard let node = node else { return }
        result.append(node.val)
        preorder(node.left)
        preorder(node.right)
    }
    
    preorder(root)
    return result
}

// Level order traversal (BFS)
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

// 2. Maximum depth
func maxDepth(_ root: TreeNode?) -> Int {
    guard let root = root else { return 0 }
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
}

// 3. Check if trees are identical
func isSameTree(_ p: TreeNode?, _ q: TreeNode?) -> Bool {
    if p == nil && q == nil { return true }
    if p == nil || q == nil { return false }
    return p!.val == q!.val && 
           isSameTree(p!.left, q!.left) && 
           isSameTree(p!.right, q!.right)
}

// 4. Invert binary tree
func invertTree(_ root: TreeNode?) -> TreeNode? {
    guard let root = root else { return nil }
    
    let temp = root.left
    root.left = root.right
    root.right = temp
    
    invertTree(root.left)
    invertTree(root.right)
    
    return root
}

// 5. Check if balanced
func isBalanced(_ root: TreeNode?) -> Bool {
    func height(_ node: TreeNode?) -> Int {
        guard let node = node else { return 0 }
        
        let leftHeight = height(node.left)
        let rightHeight = height(node.right)
        
        if leftHeight == -1 || rightHeight == -1 || 
           abs(leftHeight - rightHeight) > 1 {
            return -1
        }
        
        return 1 + max(leftHeight, rightHeight)
    }
    
    return height(root) != -1
}`
            },
            cpp: {
                title: 'C++ Binary Trees',
                code: `#include <vector>
#include <queue>
#include <algorithm>

// TreeNode definition
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) 
        : val(x), left(l), right(r) {}
};

// 1. Tree Traversals
// Inorder (Left, Root, Right)
std::vector<int> inorderTraversal(TreeNode* root) {
    std::vector<int> result;
    
    std::function<void(TreeNode*)> inorder = [&](TreeNode* node) {
        if (node) {
            inorder(node->left);
            result.push_back(node->val);
            inorder(node->right);
        }
    };
    
    inorder(root);
    return result;
}

// Preorder (Root, Left, Right)
std::vector<int> preorderTraversal(TreeNode* root) {
    std::vector<int> result;
    
    std::function<void(TreeNode*)> preorder = [&](TreeNode* node) {
        if (node) {
            result.push_back(node->val);
            preorder(node->left);
            preorder(node->right);
        }
    };
    
    preorder(root);
    return result;
}

// Level order traversal (BFS)
std::vector<std::vector<int>> levelOrder(TreeNode* root) {
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

// 2. Maximum depth
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
}

// 3. Check if trees are identical
bool isSameTree(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p->val == q->val && 
           isSameTree(p->left, q->left) && 
           isSameTree(p->right, q->right);
}

// 4. Invert binary tree
TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    
    TreeNode* temp = root->left;
    root->left = root->right;
    root->right = temp;
    
    invertTree(root->left);
    invertTree(root->right);
    
    return root;
}

// 5. Check if balanced
bool isBalanced(TreeNode* root) {
    std::function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
        if (!node) return 0;
        
        int leftHeight = height(node->left);
        int rightHeight = height(node->right);
        
        if (leftHeight == -1 || rightHeight == -1 || 
            abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        
        return 1 + std::max(leftHeight, rightHeight);
    };
    
    return height(root) != -1;
}`
            }
        },
        'bst': {
            title: 'Binary Search Tree',
            description: 'BST operations, validation, and advanced algorithms',
            questions: [
                'Validate if a binary tree is a BST',
                'Insert a node into BST',
                'Delete a node from BST',
                'Find LCA in BST',
                'Convert sorted array to BST',
                'Find kth smallest element in BST',
                'Recover BST with two swapped nodes',
                'BST iterator implementation',
                'Range sum query in BST',
                'Convert BST to sorted doubly linked list'
            ],
            javascript: {
                title: 'JavaScript Binary Search Tree',
                code: `// BST Node definition
class BSTNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// BST Class
class BST {
    constructor() {
        this.root = null;
    }
    
    // Insert operation
    insert(val) {
        this.root = this.insertHelper(this.root, val);
    }
    
    insertHelper(node, val) {
        if (!node) return new BSTNode(val);
        
        if (val < node.val) {
            node.left = this.insertHelper(node.left, val);
        } else if (val > node.val) {
            node.right = this.insertHelper(node.right, val);
        }
        return node;
    }
    
    // Search operation
    search(val) {
        return this.searchHelper(this.root, val);
    }
    
    searchHelper(node, val) {
        if (!node || node.val === val) return node;
        
        if (val < node.val) {
            return this.searchHelper(node.left, val);
        }
        return this.searchHelper(node.right, val);
    }
    
    // Delete operation
    delete(val) {
        this.root = this.deleteHelper(this.root, val);
    }
    
    deleteHelper(node, val) {
        if (!node) return null;
        
        if (val < node.val) {
            node.left = this.deleteHelper(node.left, val);
        } else if (val > node.val) {
            node.right = this.deleteHelper(node.right, val);
        } else {
            // Node to delete found
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            // Node has two children
            const minRight = this.findMin(node.right);
            node.val = minRight.val;
            node.right = this.deleteHelper(node.right, minRight.val);
        }
        return node;
    }
    
    findMin(node) {
        while (node.left) node = node.left;
        return node;
    }
}

// Validate BST
function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) return false;
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// Convert sorted array to BST
function sortedArrayToBST(nums) {
    if (!nums.length) return null;
    
    const mid = Math.floor(nums.length / 2);
    const root = new BSTNode(nums[mid]);
    
    root.left = sortedArrayToBST(nums.slice(0, mid));
    root.right = sortedArrayToBST(nums.slice(mid + 1));
    
    return root;
}

// Kth smallest element
function kthSmallest(root, k) {
    let count = 0;
    let result = null;
    
    function inorder(node) {
        if (!node || result !== null) return;
        
        inorder(node.left);
        count++;
        if (count === k) {
            result = node.val;
            return;
        }
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}`
            },
            swift: {
                title: 'Swift Binary Search Tree',
                code: `// BST Node definition
class BSTNode {
    var val: Int
    var left: BSTNode?
    var right: BSTNode?
    
    init(_ val: Int = 0, _ left: BSTNode? = nil, _ right: BSTNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

// BST Class
class BST {
    var root: BSTNode?
    
    // Insert operation
    func insert(_ val: Int) {
        root = insertHelper(root, val)
    }
    
    private func insertHelper(_ node: BSTNode?, _ val: Int) -> BSTNode {
        guard let node = node else { return BSTNode(val) }
        
        if val < node.val {
            node.left = insertHelper(node.left, val)
        } else if val > node.val {
            node.right = insertHelper(node.right, val)
        }
        return node
    }
    
    // Search operation
    func search(_ val: Int) -> BSTNode? {
        return searchHelper(root, val)
    }
    
    private func searchHelper(_ node: BSTNode?, _ val: Int) -> BSTNode? {
        guard let node = node else { return nil }
        
        if node.val == val { return node }
        
        if val < node.val {
            return searchHelper(node.left, val)
        }
        return searchHelper(node.right, val)
    }
    
    // Delete operation
    func delete(_ val: Int) {
        root = deleteHelper(root, val)
    }
    
    private func deleteHelper(_ node: BSTNode?, _ val: Int) -> BSTNode? {
        guard let node = node else { return nil }
        
        if val < node.val {
            node.left = deleteHelper(node.left, val)
        } else if val > node.val {
            node.right = deleteHelper(node.right, val)
        } else {
            // Node to delete found
            if node.left == nil { return node.right }
            if node.right == nil { return node.left }
            
            // Node has two children
            let minRight = findMin(node.right!)
            node.val = minRight.val
            node.right = deleteHelper(node.right, minRight.val)
        }
        return node
    }
    
    private func findMin(_ node: BSTNode) -> BSTNode {
        var current = node
        while current.left != nil {
            current = current.left!
        }
        return current
    }
}

// Validate BST
func isValidBST(_ root: BSTNode?) -> Bool {
    func validate(_ node: BSTNode?, _ min: Int, _ max: Int) -> Bool {
        guard let node = node else { return true }
        
        if node.val <= min || node.val >= max { return false }
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max)
    }
    
    return validate(root, Int.min, Int.max)
}

// Convert sorted array to BST
func sortedArrayToBST(_ nums: [Int]) -> BSTNode? {
    guard !nums.isEmpty else { return nil }
    
    let mid = nums.count / 2
    let root = BSTNode(nums[mid])
    
    root.left = sortedArrayToBST(Array(nums[0..<mid]))
    root.right = sortedArrayToBST(Array(nums[(mid + 1)...]))
    
    return root
}

// Kth smallest element
func kthSmallest(_ root: BSTNode?, _ k: Int) -> Int? {
    var count = 0
    var result: Int?
    
    func inorder(_ node: BSTNode?) {
        guard let node = node, result == nil else { return }
        
        inorder(node.left)
        count += 1
        if count == k {
            result = node.val
            return
        }
        inorder(node.right)
    }
    
    inorder(root)
    return result
}`
            },
            cpp: {
                title: 'C++ Binary Search Tree',
                code: `#include <vector>
#include <climits>

// BST Node definition
struct BSTNode {
    int val;
    BSTNode* left;
    BSTNode* right;
    
    BSTNode(int x = 0, BSTNode* l = nullptr, BSTNode* r = nullptr) 
        : val(x), left(l), right(r) {}
};

// BST Class
class BST {
private:
    BSTNode* root;
    
    BSTNode* insertHelper(BSTNode* node, int val) {
        if (!node) return new BSTNode(val);
        
        if (val < node->val) {
            node->left = insertHelper(node->left, val);
        } else if (val > node->val) {
            node->right = insertHelper(node->right, val);
        }
        return node;
    }
    
    BSTNode* searchHelper(BSTNode* node, int val) {
        if (!node || node->val == val) return node;
        
        if (val < node->val) {
            return searchHelper(node->left, val);
        }
        return searchHelper(node->right, val);
    }
    
    BSTNode* deleteHelper(BSTNode* node, int val) {
        if (!node) return nullptr;
        
        if (val < node->val) {
            node->left = deleteHelper(node->left, val);
        } else if (val > node->val) {
            node->right = deleteHelper(node->right, val);
        } else {
            // Node to delete found
            if (!node->left) return node->right;
            if (!node->right) return node->left;
            
            // Node has two children
            BSTNode* minRight = findMin(node->right);
            node->val = minRight->val;
            node->right = deleteHelper(node->right, minRight->val);
        }
        return node;
    }
    
    BSTNode* findMin(BSTNode* node) {
        while (node->left) node = node->left;
        return node;
    }
    
public:
    BST() : root(nullptr) {}
    
    void insert(int val) {
        root = insertHelper(root, val);
    }
    
    BSTNode* search(int val) {
        return searchHelper(root, val);
    }
    
    void deleteNode(int val) {
        root = deleteHelper(root, val);
    }
};

// Validate BST
bool isValidBST(BSTNode* root) {
    std::function<bool(BSTNode*, long, long)> validate = 
        [&](BSTNode* node, long minVal, long maxVal) -> bool {
        if (!node) return true;
        
        if (node->val <= minVal || node->val >= maxVal) return false;
        
        return validate(node->left, minVal, node->val) && 
               validate(node->right, node->val, maxVal);
    };
    
    return validate(root, LONG_MIN, LONG_MAX);
}

// Convert sorted array to BST
BSTNode* sortedArrayToBST(std::vector<int>& nums) {
    if (nums.empty()) return nullptr;
    
    int mid = nums.size() / 2;
    BSTNode* root = new BSTNode(nums[mid]);
    
    std::vector<int> left(nums.begin(), nums.begin() + mid);
    std::vector<int> right(nums.begin() + mid + 1, nums.end());
    
    root->left = sortedArrayToBST(left);
    root->right = sortedArrayToBST(right);
    
    return root;
}

// Kth smallest element
int kthSmallest(BSTNode* root, int k) {
    int count = 0;
    int result = -1;
    
    std::function<void(BSTNode*)> inorder = [&](BSTNode* node) {
        if (!node || result != -1) return;
        
        inorder(node->left);
        count++;
        if (count == k) {
            result = node->val;
            return;
        }
        inorder(node->right);
    };
    
    inorder(root);
    return result;
}`
            }
        },
        'heap': {
            title: 'Heap',
            description: 'Priority queue implementation and heap-based algorithms',
            questions: [
                'Implement max heap and min heap',
                'Kth largest element in array using heap',
                'Merge k sorted lists using heap',
                'Top k frequent elements',
                'Find median from data stream',
                'Heap sort implementation',
                'Design Twitter (timeline with heap)',
                'Ugly numbers using heap',
                'Meeting rooms II (minimum meeting rooms)',
                'Sliding window maximum using heap'
            ],
            javascript: {
                title: 'JavaScript Heap Implementation',
                code: `// Min Heap Implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }
    
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    
    heapifyUp(i) {
        while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }
    
    heapifyDown(i) {
        let smallest = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);
        
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        
        if (smallest !== i) {
            this.swap(i, smallest);
            this.heapifyDown(smallest);
        }
    }
    
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
    
    size() {
        return this.heap.length;
    }
}

// Kth largest element
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();
    
    for (let num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }
    
    return minHeap.peek();
}

// Top K frequent elements
function topKFrequent(nums, k) {
    const freqMap = new Map();
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    const heap = [];
    
    for (let [num, freq] of freqMap) {
        heap.push([freq, num]);
        if (heap.length > k) {
            heap.sort((a, b) => a[0] - b[0]);
            heap.shift();
        }
    }
    
    return heap.map(item => item[1]);
}

// Heap Sort
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}`
            },
            swift: {
                title: 'Swift Heap Implementation',
                code: `// Min Heap Implementation
struct MinHeap<T: Comparable> {
    private var heap: [T] = []
    
    private func parent(of index: Int) -> Int {
        return (index - 1) / 2
    }
    
    private func leftChild(of index: Int) -> Int {
        return 2 * index + 1
    }
    
    private func rightChild(of index: Int) -> Int {
        return 2 * index + 2
    }
    
    mutating func insert(_ element: T) {
        heap.append(element)
        heapifyUp(from: heap.count - 1)
    }
    
    private mutating func heapifyUp(from index: Int) {
        var currentIndex = index
        
        while currentIndex > 0 && heap[currentIndex] < heap[parent(of: currentIndex)] {
            heap.swapAt(currentIndex, parent(of: currentIndex))
            currentIndex = parent(of: currentIndex)
        }
    }
    
    mutating func extractMin() -> T? {
        guard !heap.isEmpty else { return nil }
        guard heap.count > 1 else { return heap.removeLast() }
        
        let min = heap[0]
        heap[0] = heap.removeLast()
        heapifyDown(from: 0)
        return min
    }
    
    private mutating func heapifyDown(from index: Int) {
        var smallest = index
        let left = leftChild(of: index)
        let right = rightChild(of: index)
        
        if left < heap.count && heap[left] < heap[smallest] {
            smallest = left
        }
        
        if right < heap.count && heap[right] < heap[smallest] {
            smallest = right
        }
        
        if smallest != index {
            heap.swapAt(index, smallest)
            heapifyDown(from: smallest)
        }
    }
    
    func peek() -> T? {
        return heap.first
    }
    
    var count: Int {
        return heap.count
    }
    
    var isEmpty: Bool {
        return heap.isEmpty
    }
}

// Kth largest element
func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
    var minHeap = MinHeap<Int>()
    
    for num in nums {
        minHeap.insert(num)
        if minHeap.count > k {
            _ = minHeap.extractMin()
        }
    }
    
    return minHeap.peek()!
}

// Top K frequent elements
func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
    var freqMap: [Int: Int] = [:]
    for num in nums {
        freqMap[num, default: 0] += 1
    }
    
    // Use array and sort for simplicity (in practice, use proper heap)
    let sortedByFreq = freqMap.sorted { $0.value > $1.value }
    return Array(sortedByFreq.prefix(k).map { $0.key })
}

// Heap Sort
func heapSort(_ arr: inout [Int]) {
    let n = arr.count
    
    // Build max heap
    for i in stride(from: n / 2 - 1, through: 0, by: -1) {
        heapify(&arr, n, i)
    }
    
    // Extract elements one by one
    for i in stride(from: n - 1, to: 0, by: -1) {
        arr.swapAt(0, i)
        heapify(&arr, i, 0)
    }
}

func heapify(_ arr: inout [Int], _ n: Int, _ i: Int) {
    var largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2
    
    if left < n && arr[left] > arr[largest] {
        largest = left
    }
    
    if right < n && arr[right] > arr[largest] {
        largest = right
    }
    
    if largest != i {
        arr.swapAt(i, largest)
        heapify(&arr, n, largest)
    }
}`
            },
            cpp: {
                title: 'C++ Heap Implementation',
                code: `#include <vector>
#include <queue>
#include <unordered_map>
#include <algorithm>

// Min Heap Implementation
template<typename T>
class MinHeap {
private:
    std::vector<T> heap;
    
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return 2 * i + 1; }
    int rightChild(int i) { return 2 * i + 2; }
    
    void heapifyUp(int i) {
        while (i > 0 && heap[i] < heap[parent(i)]) {
            std::swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }
    
    void heapifyDown(int i) {
        int smallest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < heap.size() && heap[left] < heap[smallest]) {
            smallest = left;
        }
        
        if (right < heap.size() && heap[right] < heap[smallest]) {
            smallest = right;
        }
        
        if (smallest != i) {
            std::swap(heap[i], heap[smallest]);
            heapifyDown(smallest);
        }
    }
    
public:
    void insert(T val) {
        heap.push_back(val);
        heapifyUp(heap.size() - 1);
    }
    
    T extractMin() {
        if (heap.empty()) throw std::runtime_error("Heap is empty");
        
        T min = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        
        if (!heap.empty()) {
            heapifyDown(0);
        }
        
        return min;
    }
    
    T peek() const {
        if (heap.empty()) throw std::runtime_error("Heap is empty");
        return heap[0];
    }
    
    int size() const { return heap.size(); }
    bool empty() const { return heap.empty(); }
};

// Using STL priority_queue (max heap by default)
// For min heap: std::priority_queue<int, std::vector<int>, std::greater<int>>

// Kth largest element
int findKthLargest(std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    return minHeap.top();
}

// Top K frequent elements
std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
    std::unordered_map<int, int> freqMap;
    for (int num : nums) {
        freqMap[num]++;
    }
    
    // Min heap based on frequency
    auto cmp = [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
        return a.second > b.second;
    };
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, decltype(cmp)> minHeap(cmp);
    
    for (auto& p : freqMap) {
        minHeap.push({p.first, p.second});
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    std::vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().first);
        minHeap.pop();
    }
    
    return result;
}

// Heap Sort
void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}`
            }
        },
        backtracking: {
            title: 'Backtracking',
            description: 'Systematic method for solving problems by trying all possible solutions and backtracking when needed',
            questions: [
                'Generate all permutations of an array',
                'Find all subsets of a given set',
                'Solve N-Queens problem',
                'Generate all valid parentheses combinations',
                'Find all paths in a maze',
                'Solve Sudoku puzzle',
                'Word search in a 2D grid',
                'Generate all combinations of size k',
                'Palindrome partitioning',
                'Letter combinations of phone number',
                'Restore IP addresses',
                'Expression add operators'
            ],
            javascript: {
                title: 'Backtracking Algorithms in JavaScript',
                code: `// 1. Generate All Permutations
function permutations(nums) {
    const result = [];
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            backtrack(current, newRemaining);
            current.pop(); // backtrack
        }
    }
    
    backtrack([], nums);
    return result;
}

// 2. Generate All Subsets
function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop(); // backtrack
        }
    }
    
    backtrack(0, []);
    return result;
}

// 3. N-Queens Problem
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal (top-left to bottom-right)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check diagonal (top-right to bottom-left)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.'; // backtrack
            }
        }
    }
    
    backtrack(0);
    return result;
}

// 4. Generate Valid Parentheses
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}

// 5. Word Search in 2D Grid
function wordSearch(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    function backtrack(row, col, index) {
        if (index === word.length) return true;
        
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            board[row][col] !== word[index] || board[row][col] === '#') {
            return false;
        }
        
        const temp = board[row][col];
        board[row][col] = '#'; // mark as visited
        
        for (const [dx, dy] of directions) {
            if (backtrack(row + dx, col + dy, index + 1)) {
                board[row][col] = temp; // restore
                return true;
            }
        }
        
        board[row][col] = temp; // backtrack
        return false;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    
    return false;
}

// 6. Sudoku Solver
function solveSudoku(board) {
    function isValid(row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === num) return false;
            }
        }
        
        return true;
    }
    
    function backtrack() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let num = '1'; num <= '9'; num++) {
                        if (isValid(i, j, num)) {
                            board[i][j] = num;
                            if (backtrack()) return true;
                            board[i][j] = '.'; // backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    backtrack();
    return board;
}

// 7. Combinations
function combine(n, k) {
    const result = [];
    
    function backtrack(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i <= n; i++) {
            current.push(i);
            backtrack(i + 1, current);
            current.pop(); // backtrack
        }
    }
    
    backtrack(1, []);
    return result;
}

// 8. Palindrome Partitioning
function palindromePartition(s) {
    const result = [];
    
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    
    function backtrack(start, current) {
        if (start === s.length) {
            result.push([...current]);
            return;
        }
        
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                current.push(s.substring(start, end + 1));
                backtrack(end + 1, current);
                current.pop(); // backtrack
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

// Example Usage
console.log("Permutations of [1,2,3]:", permutations([1, 2, 3]));
console.log("Subsets of [1,2,3]:", subsets([1, 2, 3]));
console.log("4-Queens solutions:", solveNQueens(4).length);
console.log("Valid parentheses (n=3):", generateParenthesis(3));

const grid = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
];
console.log("Word 'ABCCED' exists:", wordSearch(grid, "ABCCED"));`
            },
            swift: {
                title: 'Backtracking Algorithms in Swift',
                code: `// 1. Generate All Permutations
func permutations<T>(_ array: [T]) -> [[T]] {
    var result: [[T]] = []
    
    func backtrack(_ current: inout [T], _ remaining: [T]) {
        if remaining.isEmpty {
            result.append(current)
            return
        }
        
        for i in 0..<remaining.count {
            current.append(remaining[i])
            var newRemaining = remaining
            newRemaining.remove(at: i)
            backtrack(&current, newRemaining)
            current.removeLast() // backtrack
        }
    }
    
    var current: [T] = []
    backtrack(&current, array)
    return result
}

// 2. Generate All Subsets
func subsets<T>(_ nums: [T]) -> [[T]] {
    var result: [[T]] = []
    
    func backtrack(_ start: Int, _ current: inout [T]) {
        result.append(current)
        
        for i in start..<nums.count {
            current.append(nums[i])
            backtrack(i + 1, &current)
            current.removeLast() // backtrack
        }
    }
    
    var current: [T] = []
    backtrack(0, &current)
    return result
}

// 3. N-Queens Problem
func solveNQueens(_ n: Int) -> [[String]] {
    var result: [[String]] = []
    var board = Array(repeating: Array(repeating: ".", count: n), count: n)
    
    func isValid(_ row: Int, _ col: Int) -> Bool {
        // Check column
        for i in 0..<row {
            if board[i][col] == "Q" { return false }
        }
        
        // Check diagonal (top-left to bottom-right)
        var i = row - 1, j = col - 1
        while i >= 0 && j >= 0 {
            if board[i][j] == "Q" { return false }
            i -= 1
            j -= 1
        }
        
        // Check diagonal (top-right to bottom-left)
        i = row - 1
        j = col + 1
        while i >= 0 && j < n {
            if board[i][j] == "Q" { return false }
            i -= 1
            j += 1
        }
        
        return true
    }
    
    func backtrack(_ row: Int) {
        if row == n {
            result.append(board.map { $0.joined() })
            return
        }
        
        for col in 0..<n {
            if isValid(row, col) {
                board[row][col] = "Q"
                backtrack(row + 1)
                board[row][col] = "." // backtrack
            }
        }
    }
    
    backtrack(0)
    return result
}

// 4. Generate Valid Parentheses
func generateParenthesis(_ n: Int) -> [String] {
    var result: [String] = []
    
    func backtrack(_ current: String, _ open: Int, _ close: Int) {
        if current.count == 2 * n {
            result.append(current)
            return
        }
        
        if open < n {
            backtrack(current + "(", open + 1, close)
        }
        
        if close < open {
            backtrack(current + ")", open, close + 1)
        }
    }
    
    backtrack("", 0, 0)
    return result
}

// 5. Word Search in 2D Grid
func wordSearch(_ board: inout [[Character]], _ word: String) -> Bool {
    let rows = board.count
    let cols = board[0].count
    let wordArray = Array(word)
    let directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    
    func backtrack(_ row: Int, _ col: Int, _ index: Int) -> Bool {
        if index == wordArray.count { return true }
        
        if row < 0 || row >= rows || col < 0 || col >= cols ||
           board[row][col] != wordArray[index] || board[row][col] == "#" {
            return false
        }
        
        let temp = board[row][col]
        board[row][col] = "#" // mark as visited
        
        for (dx, dy) in directions {
            if backtrack(row + dx, col + dy, index + 1) {
                board[row][col] = temp // restore
                return true
            }
        }
        
        board[row][col] = temp // backtrack
        return false
    }
    
    for i in 0..<rows {
        for j in 0..<cols {
            if backtrack(i, j, 0) { return true }
        }
    }
    
    return false
}

// 6. Combinations
func combine(_ n: Int, _ k: Int) -> [[Int]] {
    var result: [[Int]] = []
    
    func backtrack(_ start: Int, _ current: inout [Int]) {
        if current.count == k {
            result.append(current)
            return
        }
        
        for i in start...n {
            current.append(i)
            backtrack(i + 1, &current)
            current.removeLast() // backtrack
        }
    }
    
    var current: [Int] = []
    backtrack(1, &current)
    return result
}

// 7. Palindrome Partitioning
func palindromePartition(_ s: String) -> [[String]] {
    var result: [[String]] = []
    let chars = Array(s)
    
    func isPalindrome(_ left: Int, _ right: Int) -> Bool {
        var l = left, r = right
        while l < r {
            if chars[l] != chars[r] { return false }
            l += 1
            r -= 1
        }
        return true
    }
    
    func backtrack(_ start: Int, _ current: inout [String]) {
        if start == chars.count {
            result.append(current)
            return
        }
        
        for end in start..<chars.count {
            if isPalindrome(start, end) {
                let substring = String(chars[start...end])
                current.append(substring)
                backtrack(end + 1, &current)
                current.removeLast() // backtrack
            }
        }
    }
    
    var current: [String] = []
    backtrack(0, &current)
    return result
}

// Example Usage
print("Permutations of [1,2,3]:", permutations([1, 2, 3]))
print("Subsets of [1,2,3]:", subsets([1, 2, 3]))
print("4-Queens solutions count:", solveNQueens(4).count)
print("Valid parentheses (n=3):", generateParenthesis(3))

var grid: [[Character]] = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
]
print("Word 'ABCCED' exists:", wordSearch(&grid, "ABCCED"))`
            },
            cpp: {
                title: 'Backtracking Algorithms in C++',
                code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

// 1. Generate All Permutations
std::vector<std::vector<int>> permutations(std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    
    std::function<void(int)> backtrack = [&](int start) {
        if (start == nums.size()) {
            result.push_back(nums);
            return;
        }
        
        for (int i = start; i < nums.size(); i++) {
            std::swap(nums[start], nums[i]);
            backtrack(start + 1);
            std::swap(nums[start], nums[i]); // backtrack
        }
    };
    
    backtrack(0);
    return result;
}

// 2. Generate All Subsets
std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    
    std::function<void(int)> backtrack = [&](int start) {
        result.push_back(current);
        
        for (int i = start; i < nums.size(); i++) {
            current.push_back(nums[i]);
            backtrack(i + 1);
            current.pop_back(); // backtrack
        }
    };
    
    backtrack(0);
    return result;
}

// 3. N-Queens Problem
std::vector<std::vector<std::string>> solveNQueens(int n) {
    std::vector<std::vector<std::string>> result;
    std::vector<std::string> board(n, std::string(n, '.'));
    
    auto isValid = [&](int row, int col) -> bool {
        // Check column
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q') return false;
        }
        
        // Check diagonal (top-left to bottom-right)
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') return false;
        }
        
        // Check diagonal (top-right to bottom-left)
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 'Q') return false;
        }
        
        return true;
    };
    
    std::function<void(int)> backtrack = [&](int row) {
        if (row == n) {
            result.push_back(board);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.'; // backtrack
            }
        }
    };
    
    backtrack(0);
    return result;
}

// 4. Generate Valid Parentheses
std::vector<std::string> generateParenthesis(int n) {
    std::vector<std::string> result;
    
    std::function<void(std::string, int, int)> backtrack = 
        [&](std::string current, int open, int close) {
            if (current.length() == 2 * n) {
                result.push_back(current);
                return;
            }
            
            if (open < n) {
                backtrack(current + "(", open + 1, close);
            }
            
            if (close < open) {
                backtrack(current + ")", open, close + 1);
            }
        };
    
    backtrack("", 0, 0);
    return result;
}

// 5. Word Search in 2D Grid
bool wordSearch(std::vector<std::vector<char>>& board, std::string word) {
    int rows = board.size();
    int cols = board[0].size();
    std::vector<std::pair<int, int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    
    std::function<bool(int, int, int)> backtrack = 
        [&](int row, int col, int index) -> bool {
            if (index == word.length()) return true;
            
            if (row < 0 || row >= rows || col < 0 || col >= cols || 
                board[row][col] != word[index] || board[row][col] == '#') {
                return false;
            }
            
            char temp = board[row][col];
            board[row][col] = '#'; // mark as visited
            
            for (auto [dx, dy] : directions) {
                if (backtrack(row + dx, col + dy, index + 1)) {
                    board[row][col] = temp; // restore
                    return true;
                }
            }
            
            board[row][col] = temp; // backtrack
            return false;
        };
    
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    
    return false;
}

// 6. Sudoku Solver
bool solveSudoku(std::vector<std::vector<char>>& board) {
    auto isValid = [&](int row, int col, char num) -> bool {
        // Check row
        for (int j = 0; j < 9; j++) {
            if (board[row][j] == num) return false;
        }
        
        // Check column
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num) return false;
        }
        
        // Check 3x3 box
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;
        for (int i = boxRow; i < boxRow + 3; i++) {
            for (int j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] == num) return false;
            }
        }
        
        return true;
    };
    
    std::function<bool()> backtrack = [&]() -> bool {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char num = '1'; num <= '9'; num++) {
                        if (isValid(i, j, num)) {
                            board[i][j] = num;
                            if (backtrack()) return true;
                            board[i][j] = '.'; // backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    
    return backtrack();
}

// 7. Combinations
std::vector<std::vector<int>> combine(int n, int k) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    
    std::function<void(int)> backtrack = [&](int start) {
        if (current.size() == k) {
            result.push_back(current);
            return;
        }
        
        for (int i = start; i <= n; i++) {
            current.push_back(i);
            backtrack(i + 1);
            current.pop_back(); // backtrack
        }
    };
    
    backtrack(1);
    return result;
}

// Example Usage
int main() {
    // Permutations
    std::vector<int> nums = {1, 2, 3};
    auto perms = permutations(nums);
    std::cout << "Permutations count: " << perms.size() << std::endl;
    
    // Subsets
    auto subs = subsets(nums);
    std::cout << "Subsets count: " << subs.size() << std::endl;
    
    // N-Queens
    auto queens = solveNQueens(4);
    std::cout << "4-Queens solutions: " << queens.size() << std::endl;
    
    // Valid Parentheses
    auto parens = generateParenthesis(3);
    std::cout << "Valid parentheses (n=3): " << parens.size() << std::endl;
    
    // Word Search
    std::vector<std::vector<char>> grid = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    bool found = wordSearch(grid, "ABCCED");
    std::cout << "Word 'ABCCED' exists: " << (found ? "true" : "false") << std::endl;
    
    return 0;
}`
            }
        },
        'dp-0': {
            title: 'Dynamic Programming - Level 0',
            description: 'Introduction to dynamic programming and memoization',
            questions: [
                'Fibonacci using memoization',
                'Climbing stairs problem',
                '0/1 Knapsack problem',
                'Coin change problem',
                'Longest common subsequence',
                'Maximum sum subarray',
                'House robber problem',
                'Unique paths in grid',
                'Edit distance',
                'Longest increasing subsequence'
            ],
            javascript: {
                title: 'JavaScript Dynamic Programming',
                code: `// 1. Fibonacci with Memoization
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// 2. Climbing Stairs
function climbStairs(n) {
    if (n <= 1) return 1;
    
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// 3. Coin Change
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// 4. Longest Common Subsequence
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// 5. House Robber
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[nums.length - 1];
}

// 6. Unique Paths
function uniquePaths(m, n) {
    const dp = Array(m).fill().map(() => Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}`
            },
            swift: {
                title: 'Swift Dynamic Programming',
                code: `// 1. Fibonacci with Memoization
func fibMemo(_ n: Int, memo: inout [Int: Int]) -> Int {
    if let cached = memo[n] { return cached }
    if n <= 1 { return n }
    
    memo[n] = fibMemo(n - 1, memo: &memo) + fibMemo(n - 2, memo: &memo)
    return memo[n]!
}

// 2. Climbing Stairs
func climbStairs(_ n: Int) -> Int {
    if n <= 1 { return 1 }
    
    var dp = Array(repeating: 0, count: n + 1)
    dp[0] = 1
    dp[1] = 1
    
    for i in 2...n {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    
    return dp[n]
}

// 3. Coin Change
func coinChange(_ coins: [Int], _ amount: Int) -> Int {
    var dp = Array(repeating: Int.max, count: amount + 1)
    dp[0] = 0
    
    for coin in coins {
        for i in coin...amount {
            if dp[i - coin] != Int.max {
                dp[i] = min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    
    return dp[amount] == Int.max ? -1 : dp[amount]
}

// 4. Longest Common Subsequence
func longestCommonSubsequence(_ text1: String, _ text2: String) -> Int {
    let arr1 = Array(text1)
    let arr2 = Array(text2)
    let m = arr1.count, n = arr2.count
    
    var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)
    
    for i in 1...m {
        for j in 1...n {
            if arr1[i - 1] == arr2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    
    return dp[m][n]
}

// 5. House Robber
func rob(_ nums: [Int]) -> Int {
    if nums.isEmpty { return 0 }
    if nums.count == 1 { return nums[0] }
    
    var dp = Array(repeating: 0, count: nums.count)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in 2..<nums.count {
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    }
    
    return dp[nums.count - 1]
}

// 6. Unique Paths
func uniquePaths(_ m: Int, _ n: Int) -> Int {
    var dp = Array(repeating: Array(repeating: 1, count: n), count: m)
    
    for i in 1..<m {
        for j in 1..<n {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    
    return dp[m - 1][n - 1]
}`
            },
            cpp: {
                title: 'C++ Dynamic Programming',
                code: `#include <vector>
#include <string>
#include <algorithm>
#include <climits>

// 1. Fibonacci with Memoization
std::unordered_map<int, int> memo;
int fibMemo(int n) {
    if (memo.find(n) != memo.end()) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}

// 2. Climbing Stairs
int climbStairs(int n) {
    if (n <= 1) return 1;
    
    std::vector<int> dp(n + 1);
    dp[0] = 1;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// 3. Coin Change
int coinChange(std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            if (dp[i - coin] != INT_MAX) {
                dp[i] = std::min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

// 4. Longest Common Subsequence
int longestCommonSubsequence(std::string text1, std::string text2) {
    int m = text1.length(), n = text2.length();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// 5. House Robber
int rob(std::vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];
    
    std::vector<int> dp(nums.size());
    dp[0] = nums[0];
    dp[1] = std::max(nums[0], nums[1]);
    
    for (int i = 2; i < nums.size(); i++) {
        dp[i] = std::max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[nums.size() - 1];
}

// 6. Unique Paths
int uniquePaths(int m, int n) {
    std::vector<std::vector<int>> dp(m, std::vector<int>(n, 1));
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}`
            }
        },
        greedy: {
            title: 'Greedy Algorithm',
            description: 'Algorithms that make locally optimal choices at each step to find a global optimum',
            questions: [
                'What is a greedy algorithm and when is it applicable?',
                'Implement the Activity Selection Problem',
                'Solve the Fractional Knapsack Problem',
                'Find the minimum number of coins needed for change',
                'Implement Huffman Coding algorithm',
                'Solve the Job Scheduling Problem',
                'Find the minimum spanning tree using Prim\'s algorithm',
                'Implement Dijkstra\'s shortest path algorithm',
                'Solve the Gas Station Problem',
                'Find the maximum number of meetings in one room',
                'Implement the Egyptian Fraction representation',
                'Solve the Minimum Platform Problem'
            ],
            javascript: {
                title: 'Greedy Algorithms in JavaScript',
                code: `// 1. Activity Selection Problem
// Select maximum number of activities that don't overlap
function activitySelection(activities) {
    // Sort by finish time
    activities.sort((a, b) => a.finish - b.finish);
    
    const result = [activities[0]];
    let lastFinish = activities[0].finish;
    
    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastFinish) {
            result.push(activities[i]);
            lastFinish = activities[i].finish;
        }
    }
    
    return result;
}

// 2. Fractional Knapsack Problem
function fractionalKnapsack(items, capacity) {
    // Sort by value-to-weight ratio in descending order
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    const result = [];
    
    for (const item of items) {
        if (remainingCapacity >= item.weight) {
            // Take the whole item
            result.push({ ...item, fraction: 1 });
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else if (remainingCapacity > 0) {
            // Take fraction of the item
            const fraction = remainingCapacity / item.weight;
            result.push({ ...item, fraction });
            totalValue += item.value * fraction;
            remainingCapacity = 0;
            break;
        }
    }
    
    return { totalValue, items: result };
}

// 3. Coin Change - Minimum Coins (Greedy approach for certain coin systems)
function coinChangeGreedy(coins, amount) {
    // Sort coins in descending order
    coins.sort((a, b) => b - a);
    
    const result = [];
    let remaining = amount;
    
    for (const coin of coins) {
        while (remaining >= coin) {
            result.push(coin);
            remaining -= coin;
        }
    }
    
    return remaining === 0 ? result : null; // Returns null if exact change not possible
}

// 4. Job Scheduling with Deadlines
function jobScheduling(jobs) {
    // Sort by profit in descending order
    jobs.sort((a, b) => b.profit - a.profit);
    
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    const schedule = new Array(maxDeadline).fill(null);
    let totalProfit = 0;
    
    for (const job of jobs) {
        // Find latest available slot before deadline
        for (let i = Math.min(job.deadline - 1, maxDeadline - 1); i >= 0; i--) {
            if (schedule[i] === null) {
                schedule[i] = job;
                totalProfit += job.profit;
                break;
            }
        }
    }
    
    return { schedule: schedule.filter(job => job !== null), totalProfit };
}

// 5. Huffman Coding
class HuffmanNode {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function huffmanCoding(text) {
    // Count frequency of each character
    const freqMap = new Map();
    for (const char of text) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    
    // Create priority queue (min-heap)
    const heap = Array.from(freqMap.entries())
        .map(([char, freq]) => new HuffmanNode(char, freq))
        .sort((a, b) => a.freq - b.freq);
    
    // Build Huffman tree
    while (heap.length > 1) {
        const left = heap.shift();
        const right = heap.shift();
        const merged = new HuffmanNode(null, left.freq + right.freq, left, right);
        
        // Insert in sorted position
        let i = 0;
        while (i < heap.length && heap[i].freq < merged.freq) i++;
        heap.splice(i, 0, merged);
    }
    
    const root = heap[0];
    
    // Generate codes
    const codes = new Map();
    function generateCodes(node, code = '') {
        if (node.char !== null) {
            codes.set(node.char, code || '0'); // Single character case
            return;
        }
        generateCodes(node.left, code + '0');
        generateCodes(node.right, code + '1');
    }
    
    generateCodes(root);
    return codes;
}

// 6. Gas Station Problem
function canCompleteCircuit(gas, cost) {
    let totalGas = 0;
    let currentGas = 0;
    let startStation = 0;
    
    for (let i = 0; i < gas.length; i++) {
        const netGas = gas[i] - cost[i];
        totalGas += netGas;
        currentGas += netGas;
        
        if (currentGas < 0) {
            startStation = i + 1;
            currentGas = 0;
        }
    }
    
    return totalGas >= 0 ? startStation : -1;
}

// 7. Meeting Rooms - Maximum meetings
function maxMeetings(meetings) {
    // Sort by end time
    meetings.sort((a, b) => a.end - b.end);
    
    const selected = [meetings[0]];
    let lastEndTime = meetings[0].end;
    
    for (let i = 1; i < meetings.length; i++) {
        if (meetings[i].start > lastEndTime) {
            selected.push(meetings[i]);
            lastEndTime = meetings[i].end;
        }
    }
    
    return selected;
}

// 8. Minimum Platform Problem
function minimumPlatforms(arrivals, departures) {
    arrivals.sort((a, b) => a - b);
    departures.sort((a, b) => a - b);
    
    let platforms = 0;
    let maxPlatforms = 0;
    let i = 0, j = 0;
    
    while (i < arrivals.length && j < departures.length) {
        if (arrivals[i] <= departures[j]) {
            platforms++;
            maxPlatforms = Math.max(maxPlatforms, platforms);
            i++;
        } else {
            platforms--;
            j++;
        }
    }
    
    return maxPlatforms;
}

// Example Usage
const activities = [
    { start: 1, finish: 3 },
    { start: 3, finish: 5 },
    { start: 0, finish: 6 },
    { start: 5, finish: 7 },
    { start: 8, finish: 9 },
    { start: 5, finish: 9 }
];

console.log("Selected activities:", activitySelection(activities));

const items = [
    { value: 60, weight: 10 },
    { value: 100, weight: 20 },
    { value: 120, weight: 30 }
];

console.log("Fractional Knapsack:", fractionalKnapsack(items, 50));

const jobs = [
    { id: 'a', deadline: 2, profit: 100 },
    { id: 'b', deadline: 1, profit: 19 },
    { id: 'c', deadline: 2, profit: 27 },
    { id: 'd', deadline: 1, profit: 25 },
    { id: 'e', deadline: 3, profit: 15 }
];

console.log("Job Scheduling:", jobScheduling(jobs));`
            },
            swift: {
                title: 'Greedy Algorithms in Swift',
                code: `// 1. Activity Selection Problem
struct Activity {
    let start: Int
    let finish: Int
}

func activitySelection(_ activities: [Activity]) -> [Activity] {
    let sortedActivities = activities.sorted { $0.finish < $1.finish }
    
    var result = [sortedActivities[0]]
    var lastFinish = sortedActivities[0].finish
    
    for i in 1..<sortedActivities.count {
        if sortedActivities[i].start >= lastFinish {
            result.append(sortedActivities[i])
            lastFinish = sortedActivities[i].finish
        }
    }
    
    return result
}

// 2. Fractional Knapsack Problem
struct Item {
    let value: Double
    let weight: Double
    
    var valuePerWeight: Double {
        return value / weight
    }
}

func fractionalKnapsack(_ items: [Item], capacity: Double) -> (totalValue: Double, selectedItems: [(item: Item, fraction: Double)]) {
    let sortedItems = items.sorted { $0.valuePerWeight > $1.valuePerWeight }
    
    var totalValue: Double = 0
    var remainingCapacity = capacity
    var selectedItems: [(item: Item, fraction: Double)] = []
    
    for item in sortedItems {
        if remainingCapacity >= item.weight {
            selectedItems.append((item: item, fraction: 1.0))
            totalValue += item.value
            remainingCapacity -= item.weight
        } else if remainingCapacity > 0 {
            let fraction = remainingCapacity / item.weight
            selectedItems.append((item: item, fraction: fraction))
            totalValue += item.value * fraction
            remainingCapacity = 0
            break
        }
    }
    
    return (totalValue: totalValue, selectedItems: selectedItems)
}

// 3. Coin Change - Greedy approach
func coinChangeGreedy(_ coins: [Int], _ amount: Int) -> [Int]? {
    let sortedCoins = coins.sorted(by: >)
    
    var result: [Int] = []
    var remaining = amount
    
    for coin in sortedCoins {
        while remaining >= coin {
            result.append(coin)
            remaining -= coin
        }
    }
    
    return remaining == 0 ? result : nil
}

// 4. Job Scheduling with Deadlines
struct Job {
    let id: String
    let deadline: Int
    let profit: Int
}

func jobScheduling(_ jobs: [Job]) -> (schedule: [Job], totalProfit: Int) {
    let sortedJobs = jobs.sorted { $0.profit > $1.profit }
    let maxDeadline = jobs.map { $0.deadline }.max() ?? 0
    
    var schedule = Array<Job?>(repeating: nil, count: maxDeadline)
    var totalProfit = 0
    
    for job in sortedJobs {
        for i in stride(from: min(job.deadline - 1, maxDeadline - 1), through: 0, by: -1) {
            if schedule[i] == nil {
                schedule[i] = job
                totalProfit += job.profit
                break
            }
        }
    }
    
    let selectedJobs = schedule.compactMap { $0 }
    return (schedule: selectedJobs, totalProfit: totalProfit)
}

// 5. Gas Station Problem
func canCompleteCircuit(_ gas: [Int], _ cost: [Int]) -> Int {
    var totalGas = 0
    var currentGas = 0
    var startStation = 0
    
    for i in 0..<gas.count {
        let netGas = gas[i] - cost[i]
        totalGas += netGas
        currentGas += netGas
        
        if currentGas < 0 {
            startStation = i + 1
            currentGas = 0
        }
    }
    
    return totalGas >= 0 ? startStation : -1
}

// 6. Meeting Rooms - Maximum meetings
struct Meeting {
    let start: Int
    let end: Int
}

func maxMeetings(_ meetings: [Meeting]) -> [Meeting] {
    let sortedMeetings = meetings.sorted { $0.end < $1.end }
    
    var selected = [sortedMeetings[0]]
    var lastEndTime = sortedMeetings[0].end
    
    for i in 1..<sortedMeetings.count {
        if sortedMeetings[i].start > lastEndTime {
            selected.append(sortedMeetings[i])
            lastEndTime = sortedMeetings[i].end
        }
    }
    
    return selected
}

// 7. Minimum Platform Problem
func minimumPlatforms(_ arrivals: [Int], _ departures: [Int]) -> Int {
    let sortedArrivals = arrivals.sorted()
    let sortedDepartures = departures.sorted()
    
    var platforms = 0
    var maxPlatforms = 0
    var i = 0, j = 0
    
    while i < sortedArrivals.count && j < sortedDepartures.count {
        if sortedArrivals[i] <= sortedDepartures[j] {
            platforms += 1
            maxPlatforms = max(maxPlatforms, platforms)
            i += 1
        } else {
            platforms -= 1
            j += 1
        }
    }
    
    return maxPlatforms
}

// Example Usage
let activities = [
    Activity(start: 1, finish: 3),
    Activity(start: 3, finish: 5),
    Activity(start: 0, finish: 6),
    Activity(start: 5, finish: 7),
    Activity(start: 8, finish: 9),
    Activity(start: 5, finish: 9)
]

print("Selected activities:", activitySelection(activities))

let items = [
    Item(value: 60, weight: 10),
    Item(value: 100, weight: 20),
    Item(value: 120, weight: 30)
]

let result = fractionalKnapsack(items, capacity: 50)
print("Fractional Knapsack value:", result.totalValue)

let jobs = [
    Job(id: "a", deadline: 2, profit: 100),
    Job(id: "b", deadline: 1, profit: 19),
    Job(id: "c", deadline: 2, profit: 27),
    Job(id: "d", deadline: 1, profit: 25),
    Job(id: "e", deadline: 3, profit: 15)
]

let jobResult = jobScheduling(jobs)
print("Job Scheduling profit:", jobResult.totalProfit)`
            },
            cpp: {
                title: 'Greedy Algorithms in C++',
                code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <map>

// 1. Activity Selection Problem
struct Activity {
    int start, finish;
    
    Activity(int s, int f) : start(s), finish(f) {}
};

std::vector<Activity> activitySelection(std::vector<Activity> activities) {
    // Sort by finish time
    std::sort(activities.begin(), activities.end(), 
              [](const Activity& a, const Activity& b) {
                  return a.finish < b.finish;
              });
    
    std::vector<Activity> result;
    result.push_back(activities[0]);
    int lastFinish = activities[0].finish;
    
    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].start >= lastFinish) {
            result.push_back(activities[i]);
            lastFinish = activities[i].finish;
        }
    }
    
    return result;
}

// 2. Fractional Knapsack Problem
struct Item {
    double value, weight;
    
    Item(double v, double w) : value(v), weight(w) {}
    
    double valuePerWeight() const {
        return value / weight;
    }
};

double fractionalKnapsack(std::vector<Item> items, double capacity) {
    // Sort by value-to-weight ratio
    std::sort(items.begin(), items.end(), 
              [](const Item& a, const Item& b) {
                  return a.valuePerWeight() > b.valuePerWeight();
              });
    
    double totalValue = 0.0;
    double remainingCapacity = capacity;
    
    for (const auto& item : items) {
        if (remainingCapacity >= item.weight) {
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else if (remainingCapacity > 0) {
            totalValue += item.value * (remainingCapacity / item.weight);
            break;
        }
    }
    
    return totalValue;
}

// 3. Coin Change - Greedy approach
std::vector<int> coinChangeGreedy(std::vector<int> coins, int amount) {
    std::sort(coins.rbegin(), coins.rend()); // Sort in descending order
    
    std::vector<int> result;
    int remaining = amount;
    
    for (int coin : coins) {
        while (remaining >= coin) {
            result.push_back(coin);
            remaining -= coin;
        }
    }
    
    return remaining == 0 ? result : std::vector<int>(); // Empty if not possible
}

// 4. Job Scheduling with Deadlines
struct Job {
    char id;
    int deadline, profit;
    
    Job(char i, int d, int p) : id(i), deadline(d), profit(p) {}
};

std::pair<std::vector<Job>, int> jobScheduling(std::vector<Job> jobs) {
    // Sort by profit in descending order
    std::sort(jobs.begin(), jobs.end(), 
              [](const Job& a, const Job& b) {
                  return a.profit > b.profit;
              });
    
    int maxDeadline = 0;
    for (const auto& job : jobs) {
        maxDeadline = std::max(maxDeadline, job.deadline);
    }
    
    std::vector<Job*> schedule(maxDeadline, nullptr);
    int totalProfit = 0;
    
    for (auto& job : jobs) {
        for (int i = std::min(job.deadline - 1, maxDeadline - 1); i >= 0; i--) {
            if (schedule[i] == nullptr) {
                schedule[i] = &job;
                totalProfit += job.profit;
                break;
            }
        }
    }
    
    std::vector<Job> selectedJobs;
    for (Job* jobPtr : schedule) {
        if (jobPtr != nullptr) {
            selectedJobs.push_back(*jobPtr);
        }
    }
    
    return {selectedJobs, totalProfit};
}

// 5. Huffman Coding
struct HuffmanNode {
    char character;
    int frequency;
    HuffmanNode* left;
    HuffmanNode* right;
    
    HuffmanNode(char c, int f) : character(c), frequency(f), left(nullptr), right(nullptr) {}
    HuffmanNode(int f) : character(0), frequency(f), left(nullptr), right(nullptr) {}
};

struct Compare {
    bool operator()(HuffmanNode* a, HuffmanNode* b) {
        return a->frequency > b->frequency;
    }
};

std::map<char, std::string> huffmanCoding(const std::string& text) {
    // Count frequencies
    std::map<char, int> freqMap;
    for (char c : text) {
        freqMap[c]++;
    }
    
    // Create priority queue
    std::priority_queue<HuffmanNode*, std::vector<HuffmanNode*>, Compare> pq;
    for (auto& pair : freqMap) {
        pq.push(new HuffmanNode(pair.first, pair.second));
    }
    
    // Build Huffman tree
    while (pq.size() > 1) {
        HuffmanNode* left = pq.top(); pq.pop();
        HuffmanNode* right = pq.top(); pq.pop();
        
        HuffmanNode* merged = new HuffmanNode(left->frequency + right->frequency);
        merged->left = left;
        merged->right = right;
        
        pq.push(merged);
    }
    
    HuffmanNode* root = pq.top();
    
    // Generate codes
    std::map<char, std::string> codes;
    std::function<void(HuffmanNode*, std::string)> generateCodes = 
        [&](HuffmanNode* node, std::string code) {
            if (node->character != 0) {
                codes[node->character] = code.empty() ? "0" : code;
                return;
            }
            generateCodes(node->left, code + "0");
            generateCodes(node->right, code + "1");
        };
    
    generateCodes(root, "");
    return codes;
}

// 6. Gas Station Problem
int canCompleteCircuit(std::vector<int>& gas, std::vector<int>& cost) {
    int totalGas = 0;
    int currentGas = 0;
    int startStation = 0;
    
    for (int i = 0; i < gas.size(); i++) {
        int netGas = gas[i] - cost[i];
        totalGas += netGas;
        currentGas += netGas;
        
        if (currentGas < 0) {
            startStation = i + 1;
            currentGas = 0;
        }
    }
    
    return totalGas >= 0 ? startStation : -1;
}

// Example Usage
int main() {
    // Activity Selection
    std::vector<Activity> activities = {
        {1, 3}, {3, 5}, {0, 6}, {5, 7}, {8, 9}, {5, 9}
    };
    
    auto selected = activitySelection(activities);
    std::cout << "Selected activities: " << selected.size() << std::endl;
    
    // Fractional Knapsack
    std::vector<Item> items = {
        {60, 10}, {100, 20}, {120, 30}
    };
    
    double maxValue = fractionalKnapsack(items, 50);
    std::cout << "Fractional Knapsack value: " << maxValue << std::endl;
    
    // Job Scheduling
    std::vector<Job> jobs = {
        {'a', 2, 100}, {'b', 1, 19}, {'c', 2, 27}, {'d', 1, 25}, {'e', 3, 15}
    };
    
    auto [scheduledJobs, totalProfit] = jobScheduling(jobs);
    std::cout << "Job scheduling profit: " << totalProfit << std::endl;
    
    return 0;
}`
            }
        },
        'graphs-0': {
            title: 'Graphs – Level 0',
            description: 'Basic graph concepts, representation, traversal (BFS/DFS)',
            questions: [
                'What is a graph data structure?',
                'What are the different ways to represent a graph?',
                'Explain BFS vs DFS traversal.',
                'How do you detect cycles in an undirected graph?',
                'What is the time complexity of BFS and DFS?',
                'How do you find connected components in a graph?',
                'What is the difference between directed and undirected graphs?',
                'How do you implement graph using adjacency list?',
                'What are the applications of graph traversal?',
                'How do you find the shortest path in an unweighted graph?',
                'What is topological sorting?',
                'How do you check if a graph is bipartite?'
            ],
            javascript: {
                title: 'Graph Basics in JavaScript',
                code: `// Graph representation using adjacency list
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // undirected
    }
    
    // BFS Traversal
    bfs(start) {
        const queue = [start];
        const visited = new Set();
        const result = [];
        
        visited.add(start);
        
        while (queue.length) {
            const vertex = queue.shift();
            result.push(vertex);
            
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }
    
    // DFS Traversal
    dfs(start) {
        const stack = [start];
        const visited = new Set();
        const result = [];
        
        while (stack.length) {
            const vertex = stack.pop();
            
            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);
                
                this.adjacencyList[vertex].forEach(neighbor => {
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                });
            }
        }
        return result;
    }
    
    // Check if graph has cycle (undirected)
    hasCycle() {
        const visited = new Set();
        
        for (let vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                if (this.dfsHasCycle(vertex, visited, null)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    dfsHasCycle(vertex, visited, parent) {
        visited.add(vertex);
        
        for (let neighbor of this.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                if (this.dfsHasCycle(neighbor, visited, vertex)) {
                    return true;
                }
            } else if (neighbor !== parent) {
                return true;
            }
        }
        return false;
    }
}

// Usage
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');

console.log(graph.bfs('A')); // ['A', 'B', 'C']
console.log(graph.dfs('A')); // ['A', 'B', 'C']`
            },
            swift: {
                title: 'Graph Basics in Swift',
                code: `// Graph representation using adjacency list
class Graph {
    private var adjacencyList: [String: [String]] = [:]
    
    func addVertex(_ vertex: String) {
        if adjacencyList[vertex] == nil {
            adjacencyList[vertex] = []
        }
    }
    
    func addEdge(_ vertex1: String, _ vertex2: String) {
        adjacencyList[vertex1]?.append(vertex2)
        adjacencyList[vertex2]?.append(vertex1) // undirected
    }
    
    // BFS Traversal
    func bfs(start: String) -> [String] {
        var queue = [start]
        var visited: Set<String> = [start]
        var result: [String] = []
        
        while !queue.isEmpty {
            let vertex = queue.removeFirst()
            result.append(vertex)
            
            if let neighbors = adjacencyList[vertex] {
                for neighbor in neighbors {
                    if !visited.contains(neighbor) {
                        visited.insert(neighbor)
                        queue.append(neighbor)
                    }
                }
            }
        }
        return result
    }
    
    // DFS Traversal
    func dfs(start: String) -> [String] {
        var stack = [start]
        var visited: Set<String> = []
        var result: [String] = []
        
        while !stack.isEmpty {
            let vertex = stack.removeLast()
            
            if !visited.contains(vertex) {
                visited.insert(vertex)
                result.append(vertex)
                
                if let neighbors = adjacencyList[vertex] {
                    for neighbor in neighbors {
                        if !visited.contains(neighbor) {
                            stack.append(neighbor)
                        }
                    }
                }
            }
        }
        return result
    }
    
    // Check if graph has cycle
    func hasCycle() -> Bool {
        var visited: Set<String> = []
        
        for vertex in adjacencyList.keys {
            if !visited.contains(vertex) {
                if dfsHasCycle(vertex: vertex, visited: &visited, parent: nil) {
                    return true
                }
            }
        }
        return false
    }
    
    private func dfsHasCycle(vertex: String, visited: inout Set<String>, parent: String?) -> Bool {
        visited.insert(vertex)
        
        if let neighbors = adjacencyList[vertex] {
            for neighbor in neighbors {
                if !visited.contains(neighbor) {
                    if dfsHasCycle(vertex: neighbor, visited: &visited, parent: vertex) {
                        return true
                    }
                } else if neighbor != parent {
                    return true
                }
            }
        }
        return false
    }
}

// Usage
let graph = Graph()
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addEdge("A", "B")
graph.addEdge("B", "C")

print(graph.bfs(start: "A")) // ["A", "B", "C"]
print(graph.dfs(start: "A")) // ["A", "B", "C"]`
            },
            cpp: {
                title: 'Graph Basics in C++',
                code: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <unordered_set>
#include <unordered_map>

class Graph {
private:
    std::unordered_map<int, std::vector<int>> adjacencyList;
    
public:
    void addVertex(int vertex) {
        if (adjacencyList.find(vertex) == adjacencyList.end()) {
            adjacencyList[vertex] = std::vector<int>();
        }
    }
    
    void addEdge(int vertex1, int vertex2) {
        adjacencyList[vertex1].push_back(vertex2);
        adjacencyList[vertex2].push_back(vertex1); // undirected
    }
    
    // BFS Traversal
    std::vector<int> bfs(int start) {
        std::queue<int> queue;
        std::unordered_set<int> visited;
        std::vector<int> result;
        
        queue.push(start);
        visited.insert(start);
        
        while (!queue.empty()) {
            int vertex = queue.front();
            queue.pop();
            result.push_back(vertex);
            
            for (int neighbor : adjacencyList[vertex]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
    
    // DFS Traversal
    std::vector<int> dfs(int start) {
        std::stack<int> stack;
        std::unordered_set<int> visited;
        std::vector<int> result;
        
        stack.push(start);
        
        while (!stack.empty()) {
            int vertex = stack.top();
            stack.pop();
            
            if (visited.find(vertex) == visited.end()) {
                visited.insert(vertex);
                result.push_back(vertex);
                
                for (int neighbor : adjacencyList[vertex]) {
                    if (visited.find(neighbor) == visited.end()) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        return result;
    }
    
    // Check if graph has cycle
    bool hasCycle() {
        std::unordered_set<int> visited;
        
        for (auto& pair : adjacencyList) {
            int vertex = pair.first;
            if (visited.find(vertex) == visited.end()) {
                if (dfsHasCycle(vertex, visited, -1)) {
                    return true;
                }
            }
        }
        return false;
    }
    
private:
    bool dfsHasCycle(int vertex, std::unordered_set<int>& visited, int parent) {
        visited.insert(vertex);
        
        for (int neighbor : adjacencyList[vertex]) {
            if (visited.find(neighbor) == visited.end()) {
                if (dfsHasCycle(neighbor, visited, vertex)) {
                    return true;
                }
            } else if (neighbor != parent) {
                return true;
            }
        }
        return false;
    }
};

// Usage
int main() {
    Graph graph;
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    
    std::vector<int> bfsResult = graph.bfs(1);
    std::vector<int> dfsResult = graph.dfs(1);
    
    return 0;
}`
            }
        },
        'tries': {
            title: 'Tries',
            description: 'Trie data structure for efficient string operations and prefix matching',
            questions: [
                'What is a Trie data structure?',
                'How does a Trie help in string searching?',
                'What are the time complexities of Trie operations?',
                'How do you implement autocomplete using Trie?',
                'What is the space complexity of a Trie?',
                'How do you delete a word from a Trie?',
                'What are the advantages of Trie over hash table for strings?',
                'How do you find all words with a given prefix in a Trie?',
                'What is a compressed Trie (Radix Tree)?',
                'How do you count words in a Trie?',
                'What are real-world applications of Tries?',
                'How do you implement spell checker using Trie?'
            ],
            javascript: {
                title: 'Trie in JavaScript',
                code: `// Trie Node
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.wordCount = 0;
    }
}

// Trie Data Structure
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    // Insert a word
    insert(word) {
        let node = this.root;
        
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        
        if (!node.isEndOfWord) {
            node.isEndOfWord = true;
            node.wordCount = 1;
        } else {
            node.wordCount++;
        }
    }
    
    // Search for a word
    search(word) {
        let node = this.root;
        
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        
        return node.isEndOfWord;
    }
    
    // Check if prefix exists
    startsWith(prefix) {
        let node = this.root;
        
        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        
        return true;
    }
    
    // Get all words with given prefix
    getWordsWithPrefix(prefix) {
        let node = this.root;
        const result = [];
        
        // Navigate to prefix
        for (let char of prefix) {
            if (!node.children[char]) {
                return result;
            }
            node = node.children[char];
        }
        
        // DFS to collect all words
        this.dfsCollect(node, prefix, result);
        return result;
    }
    
    dfsCollect(node, currentWord, result) {
        if (node.isEndOfWord) {
            result.push(currentWord);
        }
        
        for (let char in node.children) {
            this.dfsCollect(node.children[char], currentWord + char, result);
        }
    }
    
    // Delete a word
    delete(word) {
        this.deleteHelper(this.root, word, 0);
    }
    
    deleteHelper(node, word, index) {
        if (index === word.length) {
            if (!node.isEndOfWord) {
                return false;
            }
            node.isEndOfWord = false;
            return Object.keys(node.children).length === 0;
        }
        
        const char = word[index];
        const childNode = node.children[char];
        
        if (!childNode) {
            return false;
        }
        
        const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);
        
        if (shouldDeleteChild) {
            delete node.children[char];
            return !node.isEndOfWord && Object.keys(node.children).length === 0;
        }
        
        return false;
    }
    
    // Count total words
    countWords() {
        return this.countWordsHelper(this.root);
    }
    
    countWordsHelper(node) {
        let count = node.isEndOfWord ? node.wordCount : 0;
        
        for (let char in node.children) {
            count += this.countWordsHelper(node.children[char]);
        }
        
        return count;
    }
}

// Usage Example
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("apply");
trie.insert("appreciate");

// Search
console.log(trie.search("app")); // true
console.log(trie.search("appl")); // false

// Prefix search
console.log(trie.startsWith("app")); // true
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application", "apply"]

// Autocomplete function
function autocomplete(trie, prefix, maxSuggestions = 5) {
    const suggestions = trie.getWordsWithPrefix(prefix);
    return suggestions.slice(0, maxSuggestions);
}`
            },
            swift: {
                title: 'Trie in Swift',
                code: `// Trie Node
class TrieNode {
    var children: [Character: TrieNode] = [:]
    var isEndOfWord: Bool = false
    var wordCount: Int = 0
}

// Trie Data Structure
class Trie {
    private let root = TrieNode()
    
    // Insert a word
    func insert(_ word: String) {
        var node = root
        
        for char in word {
            if node.children[char] == nil {
                node.children[char] = TrieNode()
            }
            node = node.children[char]!
        }
        
        if !node.isEndOfWord {
            node.isEndOfWord = true
            node.wordCount = 1
        } else {
            node.wordCount += 1
        }
    }
    
    // Search for a word
    func search(_ word: String) -> Bool {
        var node = root
        
        for char in word {
            guard let childNode = node.children[char] else {
                return false
            }
            node = childNode
        }
        
        return node.isEndOfWord
    }
    
    // Check if prefix exists
    func startsWith(_ prefix: String) -> Bool {
        var node = root
        
        for char in prefix {
            guard let childNode = node.children[char] else {
                return false
            }
            node = childNode
        }
        
        return true
    }
    
    // Get all words with given prefix
    func getWordsWithPrefix(_ prefix: String) -> [String] {
        var node = root
        var result: [String] = []
        
        // Navigate to prefix
        for char in prefix {
            guard let childNode = node.children[char] else {
                return result
            }
            node = childNode
        }
        
        // DFS to collect all words
        dfsCollect(node: node, currentWord: prefix, result: &result)
        return result
    }
    
    private func dfsCollect(node: TrieNode, currentWord: String, result: inout [String]) {
        if node.isEndOfWord {
            result.append(currentWord)
        }
        
        for (char, childNode) in node.children {
            dfsCollect(node: childNode, currentWord: currentWord + String(char), result: &result)
        }
    }
    
    // Delete a word
    func delete(_ word: String) {
        deleteHelper(node: root, word: word, index: 0)
    }
    
    private func deleteHelper(node: TrieNode, word: String, index: Int) -> Bool {
        if index == word.count {
            if !node.isEndOfWord {
                return false
            }
            node.isEndOfWord = false
            return node.children.isEmpty
        }
        
        let char = word[word.index(word.startIndex, offsetBy: index)]
        guard let childNode = node.children[char] else {
            return false
        }
        
        let shouldDeleteChild = deleteHelper(node: childNode, word: word, index: index + 1)
        
        if shouldDeleteChild {
            node.children.removeValue(forKey: char)
            return !node.isEndOfWord && node.children.isEmpty
        }
        
        return false
    }
    
    // Count total words
    func countWords() -> Int {
        return countWordsHelper(node: root)
    }
    
    private func countWordsHelper(node: TrieNode) -> Int {
        var count = node.isEndOfWord ? node.wordCount : 0
        
        for (_, childNode) in node.children {
            count += countWordsHelper(node: childNode)
        }
        
        return count
    }
}

// Usage Example
let trie = Trie()

// Insert words
trie.insert("apple")
trie.insert("app")
trie.insert("application")
trie.insert("apply")
trie.insert("appreciate")

// Search
print(trie.search("app")) // true
print(trie.search("appl")) // false

// Prefix search
print(trie.startsWith("app")) // true
print(trie.getWordsWithPrefix("app"))
// ["app", "apple", "application", "apply"]

// Autocomplete function
func autocomplete(trie: Trie, prefix: String, maxSuggestions: Int = 5) -> [String] {
    let suggestions = trie.getWordsWithPrefix(prefix)
    return Array(suggestions.prefix(maxSuggestions))
}`
            },
            cpp: {
                title: 'Trie in C++',
                code: `#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>

// Trie Node
struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    int wordCount;
    
    TrieNode() : isEndOfWord(false), wordCount(0) {}
};

// Trie Data Structure
class Trie {
private:
    TrieNode* root;
    
    void dfsCollect(TrieNode* node, std::string currentWord, std::vector<std::string>& result) {
        if (node->isEndOfWord) {
            result.push_back(currentWord);
        }
        
        for (auto& pair : node->children) {
            dfsCollect(pair.second, currentWord + pair.first, result);
        }
    }
    
    bool deleteHelper(TrieNode* node, const std::string& word, int index) {
        if (index == word.length()) {
            if (!node->isEndOfWord) {
                return false;
            }
            node->isEndOfWord = false;
            return node->children.empty();
        }
        
        char ch = word[index];
        auto it = node->children.find(ch);
        if (it == node->children.end()) {
            return false;
        }
        
        bool shouldDeleteChild = deleteHelper(it->second, word, index + 1);
        
        if (shouldDeleteChild) {
            delete it->second;
            node->children.erase(it);
            return !node->isEndOfWord && node->children.empty();
        }
        
        return false;
    }
    
    int countWordsHelper(TrieNode* node) {
        int count = node->isEndOfWord ? node->wordCount : 0;
        
        for (auto& pair : node->children) {
            count += countWordsHelper(pair.second);
        }
        
        return count;
    }
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    // Insert a word
    void insert(const std::string& word) {
        TrieNode* node = root;
        
        for (char ch : word) {
            if (node->children.find(ch) == node->children.end()) {
                node->children[ch] = new TrieNode();
            }
            node = node->children[ch];
        }
        
        if (!node->isEndOfWord) {
            node->isEndOfWord = true;
            node->wordCount = 1;
        } else {
            node->wordCount++;
        }
    }
    
    // Search for a word
    bool search(const std::string& word) {
        TrieNode* node = root;
        
        for (char ch : word) {
            auto it = node->children.find(ch);
            if (it == node->children.end()) {
                return false;
            }
            node = it->second;
        }
        
        return node->isEndOfWord;
    }
    
    // Check if prefix exists
    bool startsWith(const std::string& prefix) {
        TrieNode* node = root;
        
        for (char ch : prefix) {
            auto it = node->children.find(ch);
            if (it == node->children.end()) {
                return false;
            }
            node = it->second;
        }
        
        return true;
    }
    
    // Get all words with given prefix
    std::vector<std::string> getWordsWithPrefix(const std::string& prefix) {
        TrieNode* node = root;
        std::vector<std::string> result;
        
        // Navigate to prefix
        for (char ch : prefix) {
            auto it = node->children.find(ch);
            if (it == node->children.end()) {
                return result;
            }
            node = it->second;
        }
        
        // DFS to collect all words
        dfsCollect(node, prefix, result);
        return result;
    }
    
    // Delete a word
    void deleteWord(const std::string& word) {
        deleteHelper(root, word, 0);
    }
    
    // Count total words
    int countWords() {
        return countWordsHelper(root);
    }
};

// Usage Example
int main() {
    Trie trie;
    
    // Insert words
    trie.insert("apple");
    trie.insert("app");
    trie.insert("application");
    trie.insert("apply");
    trie.insert("appreciate");
    
    // Search
    std::cout << trie.search("app") << std::endl; // 1 (true)
    std::cout << trie.search("appl") << std::endl; // 0 (false)
    
    // Prefix search
    std::cout << trie.startsWith("app") << std::endl; // 1 (true)
    
    // Get words with prefix
    std::vector<std::string> words = trie.getWordsWithPrefix("app");
    for (const auto& word : words) {
        std::cout << word << " ";
    }
    // Output: app apple application apply
    
    return 0;
}`
            }
        },
        'searching-sorting-1': {
            title: 'Searching & Sorting – Level 1',
            description: 'Advanced searching and sorting algorithms',
            questions: [
                'Explain the merge sort algorithm and its time complexity.',
                'How does quick sort work and what is its worst-case complexity?',
                'What is heap sort and how does it maintain heap property?',
                'Explain counting sort and when to use it.',
                'What is radix sort and its applications?',
                'How do you implement binary search on rotated array?',
                'What is interpolation search?',
                'Explain bucket sort algorithm.',
                'How do you find kth largest element efficiently?',
                'What is external sorting?',
                'Compare stability of different sorting algorithms.',
                'How do you sort an array with limited range of values?'
            ],
            javascript: {
                title: 'Advanced Sorting in JavaScript',
                code: `// Merge Sort
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
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Quick Sort
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Heap Sort
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Counting Sort
function countingSort(arr, maxValue) {
    const count = new Array(maxValue + 1).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i <= maxValue; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}

// Binary Search in Rotated Array
function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } 
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Quick Select - Find Kth largest
function findKthLargest(nums, k) {
    return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

function quickSelect(nums, left, right, k) {
    if (left === right) return nums[left];
    
    const pivotIndex = partitionQuickSelect(nums, left, right);
    
    if (k === pivotIndex) {
        return nums[k];
    } else if (k < pivotIndex) {
        return quickSelect(nums, left, pivotIndex - 1, k);
    } else {
        return quickSelect(nums, pivotIndex + 1, right, k);
    }
}

function partitionQuickSelect(nums, left, right) {
    const pivot = nums[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }
    
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", arr);
console.log("Merge Sort:", mergeSort([...arr]));
console.log("Quick Sort:", quickSort([...arr]));
console.log("Heap Sort:", heapSort([...arr]));

const rotated = [4, 5, 6, 7, 0, 1, 2];
console.log("Search 0 in rotated array:", searchRotated(rotated, 0)); // 4`
            },
            swift: {
                title: 'Advanced Sorting in Swift',
                code: `// Merge Sort
func mergeSort<T: Comparable>(_ array: [T]) -> [T] {
    guard array.count > 1 else { return array }
    
    let mid = array.count / 2
    let left = mergeSort(Array(array[0..<mid]))
    let right = mergeSort(Array(array[mid..<array.count]))
    
    return merge(left, right)
}

func merge<T: Comparable>(_ left: [T], _ right: [T]) -> [T] {
    var result: [T] = []
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
    
    result.append(contentsOf: left[i...])
    result.append(contentsOf: right[j...])
    
    return result
}

// Quick Sort
func quickSort<T: Comparable>(_ array: inout [T], low: Int = 0, high: Int? = nil) {
    let high = high ?? array.count - 1
    
    if low < high {
        let pivotIndex = partition(&array, low: low, high: high)
        quickSort(&array, low: low, high: pivotIndex - 1)
        quickSort(&array, low: pivotIndex + 1, high: high)
    }
}

func partition<T: Comparable>(_ array: inout [T], low: Int, high: Int) -> Int {
    let pivot = array[high]
    var i = low - 1
    
    for j in low..<high {
        if array[j] <= pivot {
            i += 1
            array.swapAt(i, j)
        }
    }
    
    array.swapAt(i + 1, high)
    return i + 1
}

// Heap Sort
func heapSort<T: Comparable>(_ array: inout [T]) {
    let n = array.count
    
    // Build max heap
    for i in stride(from: n / 2 - 1, through: 0, by: -1) {
        heapify(&array, n: n, i: i)
    }
    
    // Extract elements one by one
    for i in stride(from: n - 1, to: 0, by: -1) {
        array.swapAt(0, i)
        heapify(&array, n: i, i: 0)
    }
}

func heapify<T: Comparable>(_ array: inout [T], n: Int, i: Int) {
    var largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2
    
    if left < n && array[left] > array[largest] {
        largest = left
    }
    
    if right < n && array[right] > array[largest] {
        largest = right
    }
    
    if largest != i {
        array.swapAt(i, largest)
        heapify(&array, n: n, i: largest)
    }
}

// Counting Sort
func countingSort(_ array: [Int], maxValue: Int) -> [Int] {
    var count = Array(repeating: 0, count: maxValue + 1)
    var output = Array(repeating: 0, count: array.count)
    
    // Count occurrences
    for num in array {
        count[num] += 1
    }
    
    // Calculate cumulative count
    for i in 1...maxValue {
        count[i] += count[i - 1]
    }
    
    // Build output array
    for i in stride(from: array.count - 1, through: 0, by: -1) {
        output[count[array[i]] - 1] = array[i]
        count[array[i]] -= 1
    }
    
    return output
}

// Binary Search in Rotated Array
func searchRotated(_ nums: [Int], _ target: Int) -> Int {
    var left = 0
    var right = nums.count - 1
    
    while left <= right {
        let mid = (left + right) / 2
        
        if nums[mid] == target {
            return mid
        }
        
        // Left half is sorted
        if nums[left] <= nums[mid] {
            if target >= nums[left] && target < nums[mid] {
                right = mid - 1
            } else {
                left = mid + 1
            }
        }
        // Right half is sorted
        else {
            if target > nums[mid] && target <= nums[right] {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    
    return -1
}

// Quick Select - Find Kth largest
func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
    var nums = nums
    return quickSelect(&nums, left: 0, right: nums.count - 1, k: nums.count - k)
}

func quickSelect(_ nums: inout [Int], left: Int, right: Int, k: Int) -> Int {
    if left == right {
        return nums[left]
    }
    
    let pivotIndex = partitionQuickSelect(&nums, left: left, right: right)
    
    if k == pivotIndex {
        return nums[k]
    } else if k < pivotIndex {
        return quickSelect(&nums, left: left, right: pivotIndex - 1, k: k)
    } else {
        return quickSelect(&nums, left: pivotIndex + 1, right: right, k: k)
    }
}

func partitionQuickSelect(_ nums: inout [Int], left: Int, right: Int) -> Int {
    let pivot = nums[right]
    var i = left
    
    for j in left..<right {
        if nums[j] <= pivot {
            nums.swapAt(i, j)
            i += 1
        }
    }
    
    nums.swapAt(i, right)
    return i
}

// Example usage
let arr = [64, 34, 25, 12, 22, 11, 90]
print("Original: \\(arr)")
print("Merge Sort: \\(mergeSort(arr))")

var quickArr = arr
quickSort(&quickArr)
print("Quick Sort: \\(quickArr)")

var heapArr = arr
heapSort(&heapArr)
print("Heap Sort: \\(heapArr)")`
            },
            cpp: {
                title: 'Advanced Sorting in C++',
                code: `#include <iostream>
#include <vector>
#include <algorithm>

// Merge Sort
std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
    std::vector<int> result;
    size_t i = 0, j = 0;
    
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            result.push_back(left[i++]);
        } else {
            result.push_back(right[j++]);
        }
    }
    
    while (i < left.size()) result.push_back(left[i++]);
    while (j < right.size()) result.push_back(right[j++]);
    
    return result;
}

std::vector<int> mergeSort(const std::vector<int>& arr) {
    if (arr.size() <= 1) return arr;
    
    size_t mid = arr.size() / 2;
    std::vector<int> left(arr.begin(), arr.begin() + mid);
    std::vector<int> right(arr.begin() + mid, arr.end());
    
    return merge(mergeSort(left), mergeSort(right));
}

// Quick Sort
int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

// Heap Sort
void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

// Counting Sort
std::vector<int> countingSort(const std::vector<int>& arr, int maxValue) {
    std::vector<int> count(maxValue + 1, 0);
    std::vector<int> output(arr.size());
    
    // Count occurrences
    for (int num : arr) {
        count[num]++;
    }
    
    // Calculate cumulative count
    for (int i = 1; i <= maxValue; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}

// Binary Search in Rotated Array
int searchRotated(const std::vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Quick Select - Find Kth largest
int partitionQuickSelect(std::vector<int>& nums, int left, int right) {
    int pivot = nums[right];
    int i = left;
    
    for (int j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            std::swap(nums[i], nums[j]);
            i++;
        }
    }
    
    std::swap(nums[i], nums[right]);
    return i;
}

int quickSelect(std::vector<int>& nums, int left, int right, int k) {
    if (left == right) return nums[left];
    
    int pivotIndex = partitionQuickSelect(nums, left, right);
    
    if (k == pivotIndex) {
        return nums[k];
    } else if (k < pivotIndex) {
        return quickSelect(nums, left, pivotIndex - 1, k);
    } else {
        return quickSelect(nums, pivotIndex + 1, right, k);
    }
}

int findKthLargest(std::vector<int> nums, int k) {
    return quickSelect(nums, 0, nums.size() - 1, nums.size() - k);
}

// Example usage
int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    std::cout << "Original: ";
    for (int num : arr) std::cout << num << " ";
    std::cout << std::endl;
    
    auto sorted = mergeSort(arr);
    std::cout << "Merge Sort: ";
    for (int num : sorted) std::cout << num << " ";
    std::cout << std::endl;
    
    auto quickArr = arr;
    quickSort(quickArr, 0, quickArr.size() - 1);
    std::cout << "Quick Sort: ";
    for (int num : quickArr) std::cout << num << " ";
    std::cout << std::endl;
    
    return 0;
}`
            }
        },
        'arrays-1': {
            title: 'Arrays – Level 1',
            description: 'Advanced array manipulation and optimization techniques',
            questions: [
                'How do you find all subarrays with given sum?',
                'Explain the sliding window maximum problem.',
                'How do you merge overlapping intervals?',
                'What is the maximum subarray problem (Kadane\'s algorithm)?',
                'How do you rotate an array by k positions?',
                'Explain the trapping rainwater problem.',
                'How do you find the minimum window substring?',
                'What is the next greater element problem?',
                'How do you implement a circular array?',
                'Explain the maximum product subarray problem.',
                'How do you find duplicates in an array with constraints?',
                'What is the best time to buy and sell stock problem?'
            ],
            javascript: {
                title: 'Advanced Arrays in JavaScript',
                code: `// Kadane's Algorithm - Maximum Subarray Sum
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Sliding Window Maximum
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove smaller elements from back
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add to result when window is complete
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// Merge Overlapping Intervals
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];
        
        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
}

// Rotate Array
function rotateArray(nums, k) {
    const n = nums.length;
    k = k % n;
    
    // Three reversals approach
    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
    
    return nums;
}

function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

// Trapping Rain Water
function trapRainWater(height) {
    if (height.length < 3) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// Next Greater Element
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
            const index = stack.pop();
            result[index] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

// Product of Array Except Self
function productExceptSelf(nums) {
    const result = new Array(nums.length);
    
    // Left products
    result[0] = 1;
    for (let i = 1; i < nums.length; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right products
    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= right;
        right *= nums[i];
    }
    
    return result;
}

// Find All Duplicates (1 to n array)
function findDuplicates(nums) {
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;
        
        if (nums[index] < 0) {
            result.push(index + 1);
        } else {
            nums[index] = -nums[index];
        }
    }
    
    return result;
}

// Best Time to Buy and Sell Stock
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    
    return maxProfit;
}

// Subarray Sum Equals K
function subarraySum(nums, k) {
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1);
    
    let count = 0;
    let sum = 0;
    
    for (let num of nums) {
        sum += num;
        
        if (prefixSumCount.has(sum - k)) {
            count += prefixSumCount.get(sum - k);
        }
        
        prefixSumCount.set(sum, (prefixSumCount.get(sum) || 0) + 1);
    }
    
    return count;
}

// Example usage
console.log("Max Subarray:", maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
console.log("Sliding Window Max:", maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
console.log("Merge Intervals:", mergeIntervals([[1,3],[2,6],[8,10],[15,18]]));
console.log("Trapped Water:", trapRainWater([0,1,0,2,1,0,1,3,2,1,2,1])); // 6`
            },
            swift: {
                title: 'Advanced Arrays in Swift',
                code: `// Kadane's Algorithm - Maximum Subarray Sum
func maxSubArray(_ nums: [Int]) -> Int {
    guard !nums.isEmpty else { return 0 }
    
    var maxSum = nums[0]
    var currentSum = nums[0]
    
    for i in 1..<nums.count {
        currentSum = max(nums[i], currentSum + nums[i])
        maxSum = max(maxSum, currentSum)
    }
    
    return maxSum
}

// Sliding Window Maximum
func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
    var result: [Int] = []
    var deque: [Int] = [] // Store indices
    
    for i in 0..<nums.count {
        // Remove indices outside current window
        while !deque.isEmpty && deque.first! <= i - k {
            deque.removeFirst()
        }
        
        // Remove smaller elements from back
        while !deque.isEmpty && nums[deque.last!] <= nums[i] {
            deque.removeLast()
        }
        
        deque.append(i)
        
        // Add to result when window is complete
        if i >= k - 1 {
            result.append(nums[deque.first!])
        }
    }
    
    return result
}

// Merge Overlapping Intervals
func mergeIntervals(_ intervals: [[Int]]) -> [[Int]] {
    guard intervals.count > 1 else { return intervals }
    
    let sorted = intervals.sorted { $0[0] < $1[0] }
    var merged: [[Int]] = [sorted[0]]
    
    for i in 1..<sorted.count {
        let current = sorted[i]
        let lastMerged = merged[merged.count - 1]
        
        if current[0] <= lastMerged[1] {
            merged[merged.count - 1][1] = max(lastMerged[1], current[1])
        } else {
            merged.append(current)
        }
    }
    
    return merged
}

// Rotate Array
func rotateArray(_ nums: inout [Int], _ k: Int) {
    let n = nums.count
    let k = k % n
    
    // Three reversals approach
    reverse(&nums, 0, n - 1)
    reverse(&nums, 0, k - 1)
    reverse(&nums, k, n - 1)
}

func reverse(_ nums: inout [Int], _ start: Int, _ end: Int) {
    var start = start
    var end = end
    
    while start < end {
        nums.swapAt(start, end)
        start += 1
        end -= 1
    }
}

// Trapping Rain Water
func trapRainWater(_ height: [Int]) -> Int {
    guard height.count >= 3 else { return 0 }
    
    var left = 0
    var right = height.count - 1
    var leftMax = 0
    var rightMax = 0
    var water = 0
    
    while left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax {
                leftMax = height[left]
            } else {
                water += leftMax - height[left]
            }
            left += 1
        } else {
            if height[right] >= rightMax {
                rightMax = height[right]
            } else {
                water += rightMax - height[right]
            }
            right -= 1
        }
    }
    
    return water
}

// Next Greater Element
func nextGreaterElement(_ nums: [Int]) -> [Int] {
    var result = Array(repeating: -1, count: nums.count)
    var stack: [Int] = []
    
    for i in 0..<nums.count {
        while !stack.isEmpty && nums[stack.last!] < nums[i] {
            let index = stack.removeLast()
            result[index] = nums[i]
        }
        stack.append(i)
    }
    
    return result
}

// Product of Array Except Self
func productExceptSelf(_ nums: [Int]) -> [Int] {
    var result = Array(repeating: 1, count: nums.count)
    
    // Left products
    for i in 1..<nums.count {
        result[i] = result[i - 1] * nums[i - 1]
    }
    
    // Right products
    var right = 1
    for i in stride(from: nums.count - 1, through: 0, by: -1) {
        result[i] *= right
        right *= nums[i]
    }
    
    return result
}

// Best Time to Buy and Sell Stock
func maxProfit(_ prices: [Int]) -> Int {
    var minPrice = Int.max
    var maxProfit = 0
    
    for price in prices {
        if price < minPrice {
            minPrice = price
        } else if price - minPrice > maxProfit {
            maxProfit = price - minPrice
        }
    }
    
    return maxProfit
}

// Subarray Sum Equals K
func subarraySum(_ nums: [Int], _ k: Int) -> Int {
    var prefixSumCount: [Int: Int] = [0: 1]
    var count = 0
    var sum = 0
    
    for num in nums {
        sum += num
        
        if let prevCount = prefixSumCount[sum - k] {
            count += prevCount
        }
        
        prefixSumCount[sum, default: 0] += 1
    }
    
    return count
}

// Example usage
print("Max Subarray:", maxSubArray([-2,1,-3,4,-1,2,1,-5,4])) // 6
print("Sliding Window Max:", maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
print("Merge Intervals:", mergeIntervals([[1,3],[2,6],[8,10],[15,18]]))
print("Trapped Water:", trapRainWater([0,1,0,2,1,0,1,3,2,1,2,1])) // 6`
            },
            cpp: {
                title: 'Advanced Arrays in C++',
                code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <deque>
#include <unordered_map>

// Kadane's Algorithm - Maximum Subarray Sum
int maxSubArray(std::vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
        currentSum = std::max(nums[i], currentSum + nums[i]);
        maxSum = std::max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Sliding Window Maximum
std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
    std::vector<int> result;
    std::deque<int> dq; // Store indices
    
    for (int i = 0; i < nums.size(); i++) {
        // Remove indices outside current window
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // Remove smaller elements from back
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // Add to result when window is complete
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}

// Merge Overlapping Intervals
std::vector<std::vector<int>> mergeIntervals(std::vector<std::vector<int>>& intervals) {
    if (intervals.size() <= 1) return intervals;
    
    std::sort(intervals.begin(), intervals.end());
    std::vector<std::vector<int>> merged = {intervals[0]};
    
    for (int i = 1; i < intervals.size(); i++) {
        auto& current = intervals[i];
        auto& lastMerged = merged.back();
        
        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = std::max(lastMerged[1], current[1]);
        } else {
            merged.push_back(current);
        }
    }
    
    return merged;
}

// Rotate Array
void rotateArray(std::vector<int>& nums, int k) {
    int n = nums.size();
    k = k % n;
    
    // Three reversals approach
    std::reverse(nums.begin(), nums.end());
    std::reverse(nums.begin(), nums.begin() + k);
    std::reverse(nums.begin() + k, nums.end());
}

// Trapping Rain Water
int trapRainWater(std::vector<int>& height) {
    if (height.size() < 3) return 0;
    
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// Next Greater Element
std::vector<int> nextGreaterElement(std::vector<int>& nums) {
    std::vector<int> result(nums.size(), -1);
    std::vector<int> stack;
    
    for (int i = 0; i < nums.size(); i++) {
        while (!stack.empty() && nums[stack.back()] < nums[i]) {
            int index = stack.back();
            stack.pop_back();
            result[index] = nums[i];
        }
        stack.push_back(i);
    }
    
    return result;
}

// Product of Array Except Self
std::vector<int> productExceptSelf(std::vector<int>& nums) {
    std::vector<int> result(nums.size(), 1);
    
    // Left products
    for (int i = 1; i < nums.size(); i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right products
    int right = 1;
    for (int i = nums.size() - 1; i >= 0; i--) {
        result[i] *= right;
        right *= nums[i];
    }
    
    return result;
}

// Best Time to Buy and Sell Stock
int maxProfit(std::vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    
    for (int price : prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    
    return maxProfit;
}

// Subarray Sum Equals K
int subarraySum(std::vector<int>& nums, int k) {
    std::unordered_map<int, int> prefixSumCount;
    prefixSumCount[0] = 1;
    
    int count = 0;
    int sum = 0;
    
    for (int num : nums) {
        sum += num;
        
        if (prefixSumCount.find(sum - k) != prefixSumCount.end()) {
            count += prefixSumCount[sum - k];
        }
        
        prefixSumCount[sum]++;
    }
    
    return count;
}

// Example usage
int main() {
    std::vector<int> arr1 = {-2,1,-3,4,-1,2,1,-5,4};
    std::cout << "Max Subarray: " << maxSubArray(arr1) << std::endl; // 6
    
    std::vector<int> arr2 = {1,3,-1,-3,5,3,6,7};
    auto result = maxSlidingWindow(arr2, 3);
    std::cout << "Sliding Window Max: ";
    for (int num : result) std::cout << num << " ";
    std::cout << std::endl;
    
    std::vector<int> heights = {0,1,0,2,1,0,1,3,2,1,2,1};
    std::cout << "Trapped Water: " << trapRainWater(heights) << std::endl; // 6
    
    return 0;
}`
            }
        },
        'linkedlist-1': {
            title: 'Linked List – Level 1',
            description: 'Advanced linked list operations and algorithms',
            questions: [
                'How do you reverse a linked list iteratively and recursively?',
                'How do you detect and remove cycles in a linked list?',
                'Explain how to merge two sorted linked lists.',
                'How do you find the intersection of two linked lists?',
                'What is the approach to clone a linked list with random pointers?',
                'How do you reverse nodes in k-group?',
                'Explain the concept of flattening a multilevel linked list.',
                'How do you sort a linked list?',
                'What is the palindrome linked list problem?',
                'How do you remove nth node from the end?',
                'Explain the rotate linked list problem.',
                'How do you add two numbers represented as linked lists?'
            ],
            javascript: {
                title: 'Advanced Linked Lists in JavaScript',
                code: `// Linked List Node
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Reverse Linked List (Iterative)
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

// Reverse Linked List (Recursive)
function reverseListRecursive(head) {
    if (!head || !head.next) {
        return head;
    }
    
    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

// Detect Cycle using Floyd's Algorithm
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}

// Remove Cycle
function removeCycle(head) {
    if (!head || !head.next) return head;
    
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            break;
        }
    }
    
    // No cycle found
    if (!fast || !fast.next) return head;
    
    // Find start of cycle
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // Find node before cycle start
    while (fast.next !== slow) {
        fast = fast.next;
    }
    
    // Remove cycle
    fast.next = null;
    return head;
}

// Merge Two Sorted Lists
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}

// Find Intersection of Two Lists
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    
    let pA = headA;
    let pB = headB;
    
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    
    return pA;
}

// Reverse Nodes in k-Group
function reverseKGroup(head, k) {
    if (!head || k === 1) return head;
    
    // Check if we have k nodes
    let current = head;
    for (let i = 0; i < k; i++) {
        if (!current) return head;
        current = current.next;
    }
    
    // Reverse k nodes
    let prev = null;
    current = head;
    for (let i = 0; i < k; i++) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Recursively reverse remaining
    head.next = reverseKGroup(current, k);
    return prev;
}

// Remove Nth Node from End
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let first = dummy;
    let second = dummy;
    
    // Move first n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }
    
    // Move both until first reaches end
    while (first) {
        first = first.next;
        second = second.next;
    }
    
    // Remove nth node
    second.next = second.next.next;
    return dummy.next;
}

// Check if Palindrome
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // Find middle
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let secondHalf = reverseList(slow.next);
    
    // Compare
    let firstHalf = head;
    while (secondHalf) {
        if (firstHalf.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}

// Add Two Numbers
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        const sum = val1 + val2 + carry;
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}

// Sort Linked List (Merge Sort)
function sortList(head) {
    if (!head || !head.next) return head;
    
    // Find middle
    let slow = head;
    let fast = head;
    let prev = null;
    
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Split list
    prev.next = null;
    
    // Sort both halves
    const left = sortList(head);
    const right = sortList(slow);
    
    // Merge sorted halves
    return mergeTwoLists(left, right);
}

// Copy List with Random Pointer
class RandomNode {
    constructor(val, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    if (!head) return null;
    
    const map = new Map();
    
    // First pass: create nodes
    let current = head;
    while (current) {
        map.set(current, new RandomNode(current.val));
        current = current.next;
    }
    
    // Second pass: set pointers
    current = head;
    while (current) {
        const newNode = map.get(current);
        newNode.next = current.next ? map.get(current.next) : null;
        newNode.random = current.random ? map.get(current.random) : null;
        current = current.next;
    }
    
    return map.get(head);
}

// Helper function to create list from array
function createList(arr) {
    if (!arr.length) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Helper function to print list
function printList(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// Example usage
const list1 = createList([1, 2, 3, 4, 5]);
console.log("Original:", printList(list1));

const reversed = reverseList(createList([1, 2, 3, 4, 5]));
console.log("Reversed:", printList(reversed));

const merged = mergeTwoLists(createList([1, 3, 5]), createList([2, 4, 6]));
console.log("Merged:", printList(merged));`
            },
            swift: {
                title: 'Advanced Linked Lists in Swift',
                code: `// Linked List Node
class ListNode {
    var val: Int
    var next: ListNode?
    
    init(_ val: Int, _ next: ListNode? = nil) {
        self.val = val
        self.next = next
    }
}

// Reverse Linked List (Iterative)
func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var current = head
    
    while current != nil {
        let next = current?.next
        current?.next = prev
        prev = current
        current = next
    }
    
    return prev
}

// Reverse Linked List (Recursive)
func reverseListRecursive(_ head: ListNode?) -> ListNode? {
    guard let head = head, let next = head.next else {
        return head
    }
    
    let newHead = reverseListRecursive(next)
    next.next = head
    head.next = nil
    
    return newHead
}

// Detect Cycle using Floyd's Algorithm
func hasCycle(_ head: ListNode?) -> Bool {
    guard let head = head, head.next != nil else { return false }
    
    var slow: ListNode? = head
    var fast: ListNode? = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
        
        if slow === fast {
            return true
        }
    }
    
    return false
}

// Merge Two Sorted Lists
func mergeTwoLists(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
    let dummy = ListNode(0)
    var current: ListNode? = dummy
    var l1 = l1
    var l2 = l2
    
    while l1 != nil && l2 != nil {
        if l1!.val <= l2!.val {
            current?.next = l1
            l1 = l1?.next
        } else {
            current?.next = l2
            l2 = l2?.next
        }
        current = current?.next
    }
    
    current?.next = l1 ?? l2
    return dummy.next
}

// Find Intersection of Two Lists
func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
    guard headA != nil && headB != nil else { return nil }
    
    var pA = headA
    var pB = headB
    
    while pA !== pB {
        pA = (pA != nil) ? pA?.next : headB
        pB = (pB != nil) ? pB?.next : headA
    }
    
    return pA
}

// Reverse Nodes in k-Group
func reverseKGroup(_ head: ListNode?, _ k: Int) -> ListNode? {
    guard let head = head, k > 1 else { return head }
    
    // Check if we have k nodes
    var current: ListNode? = head
    for _ in 0..<k {
        guard current != nil else { return head }
        current = current?.next
    }
    
    // Reverse k nodes
    var prev: ListNode? = nil
    current = head
    for _ in 0..<k {
        let next = current?.next
        current?.next = prev
        prev = current
        current = next
    }
    
    // Recursively reverse remaining
    head.next = reverseKGroup(current, k)
    return prev
}

// Remove Nth Node from End
func removeNthFromEnd(_ head: ListNode?, _ n: Int) -> ListNode? {
    let dummy = ListNode(0)
    dummy.next = head
    
    var first: ListNode? = dummy
    var second: ListNode? = dummy
    
    // Move first n+1 steps ahead
    for _ in 0...n {
        first = first?.next
    }
    
    // Move both until first reaches end
    while first != nil {
        first = first?.next
        second = second?.next
    }
    
    // Remove nth node
    second?.next = second?.next?.next
    return dummy.next
}

// Check if Palindrome
func isPalindrome(_ head: ListNode?) -> Bool {
    guard let head = head, head.next != nil else { return true }
    
    // Find middle
    var slow: ListNode? = head
    var fast: ListNode? = head
    
    while fast?.next != nil && fast?.next?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
    }
    
    // Reverse second half
    let secondHalf = reverseList(slow?.next)
    
    // Compare
    var firstHalf: ListNode? = head
    var secondPtr = secondHalf
    
    while secondPtr != nil {
        if firstHalf?.val != secondPtr?.val {
            return false
        }
        firstHalf = firstHalf?.next
        secondPtr = secondPtr?.next
    }
    
    return true
}

// Add Two Numbers
func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
    let dummy = ListNode(0)
    var current: ListNode? = dummy
    var carry = 0
    var l1 = l1
    var l2 = l2
    
    while l1 != nil || l2 != nil || carry > 0 {
        let val1 = l1?.val ?? 0
        let val2 = l2?.val ?? 0
        let sum = val1 + val2 + carry
        
        carry = sum / 10
        current?.next = ListNode(sum % 10)
        current = current?.next
        
        l1 = l1?.next
        l2 = l2?.next
    }
    
    return dummy.next
}

// Sort Linked List (Merge Sort)
func sortList(_ head: ListNode?) -> ListNode? {
    guard let head = head, head.next != nil else { return head }
    
    // Find middle
    var slow: ListNode? = head
    var fast: ListNode? = head
    var prev: ListNode? = nil
    
    while fast != nil && fast?.next != nil {
        prev = slow
        slow = slow?.next
        fast = fast?.next?.next
    }
    
    // Split list
    prev?.next = nil
    
    // Sort both halves
    let left = sortList(head)
    let right = sortList(slow)
    
    // Merge sorted halves
    return mergeTwoLists(left, right)
}

// Helper function to create list from array
func createList(_ arr: [Int]) -> ListNode? {
    guard !arr.isEmpty else { return nil }
    
    let head = ListNode(arr[0])
    var current = head
    
    for i in 1..<arr.count {
        current.next = ListNode(arr[i])
        current = current.next!
    }
    
    return head
}

// Helper function to print list
func printList(_ head: ListNode?) -> [Int] {
    var result: [Int] = []
    var current = head
    
    while current != nil {
        result.append(current!.val)
        current = current?.next
    }
    
    return result
}

// Example usage
let list1 = createList([1, 2, 3, 4, 5])
print("Original:", printList(list1))

let reversed = reverseList(createList([1, 2, 3, 4, 5]))
print("Reversed:", printList(reversed))

let merged = mergeTwoLists(createList([1, 3, 5]), createList([2, 4, 6]))
print("Merged:", printList(merged))`
            },
            cpp: {
                title: 'Advanced Linked Lists in C++',
                code: `#include <iostream>
#include <vector>
#include <unordered_map>

// Linked List Node
struct ListNode {
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* next) : val(x), next(next) {}
};

// Reverse Linked List (Iterative)
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;
    
    while (current) {
        ListNode* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

// Reverse Linked List (Recursive)
ListNode* reverseListRecursive(ListNode* head) {
    if (!head || !head->next) {
        return head;
    }
    
    ListNode* newHead = reverseListRecursive(head->next);
    head->next->next = head;
    head->next = nullptr;
    
    return newHead;
}

// Detect Cycle using Floyd's Algorithm
bool hasCycle(ListNode* head) {
    if (!head || !head->next) return false;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) {
            return true;
        }
    }
    
    return false;
}

// Merge Two Sorted Lists
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* current = &dummy;
    
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }
        current = current->next;
    }
    
    current->next = l1 ? l1 : l2;
    return dummy.next;
}

// Find Intersection of Two Lists
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    if (!headA || !headB) return nullptr;
    
    ListNode* pA = headA;
    ListNode* pB = headB;
    
    while (pA != pB) {
        pA = pA ? pA->next : headB;
        pB = pB ? pB->next : headA;
    }
    
    return pA;
}

// Reverse Nodes in k-Group
ListNode* reverseKGroup(ListNode* head, int k) {
    if (!head || k == 1) return head;
    
    // Check if we have k nodes
    ListNode* current = head;
    for (int i = 0; i < k; i++) {
        if (!current) return head;
        current = current->next;
    }
    
    // Reverse k nodes
    ListNode* prev = nullptr;
    current = head;
    for (int i = 0; i < k; i++) {
        ListNode* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    
    // Recursively reverse remaining
    head->next = reverseKGroup(current, k);
    return prev;
}

// Remove Nth Node from End
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    
    ListNode* first = &dummy;
    ListNode* second = &dummy;
    
    // Move first n+1 steps ahead
    for (int i = 0; i <= n; i++) {
        first = first->next;
    }
    
    // Move both until first reaches end
    while (first) {
        first = first->next;
        second = second->next;
    }
    
    // Remove nth node
    ListNode* nodeToDelete = second->next;
    second->next = second->next->next;
    delete nodeToDelete;
    
    return dummy.next;
}

// Check if Palindrome
bool isPalindrome(ListNode* head) {
    if (!head || !head->next) return true;
    
    // Find middle
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Reverse second half
    ListNode* secondHalf = reverseList(slow->next);
    
    // Compare
    ListNode* firstHalf = head;
    while (secondHalf) {
        if (firstHalf->val != secondHalf->val) {
            return false;
        }
        firstHalf = firstHalf->next;
        secondHalf = secondHalf->next;
    }
    
    return true;
}

// Add Two Numbers
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* current = &dummy;
    int carry = 0;
    
    while (l1 || l2 || carry) {
        int val1 = l1 ? l1->val : 0;
        int val2 = l2 ? l2->val : 0;
        int sum = val1 + val2 + carry;
        
        carry = sum / 10;
        current->next = new ListNode(sum % 10);
        current = current->next;
        
        if (l1) l1 = l1->next;
        if (l2) l2 = l2->next;
    }
    
    return dummy.next;
}

// Sort Linked List (Merge Sort)
ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;
    
    // Find middle
    ListNode* slow = head;
    ListNode* fast = head;
    ListNode* prev = nullptr;
    
    while (fast && fast->next) {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Split list
    prev->next = nullptr;
    
    // Sort both halves
    ListNode* left = sortList(head);
    ListNode* right = sortList(slow);
    
    // Merge sorted halves
    return mergeTwoLists(left, right);
}

// Helper function to create list from vector
ListNode* createList(const std::vector<int>& arr) {
    if (arr.empty()) return nullptr;
    
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    
    for (size_t i = 1; i < arr.size(); i++) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    
    return head;
}

// Helper function to print list
std::vector<int> printList(ListNode* head) {
    std::vector<int> result;
    while (head) {
        result.push_back(head->val);
        head = head->next;
    }
    return result;
}

// Example usage
int main() {
    ListNode* list1 = createList({1, 2, 3, 4, 5});
    
    std::cout << "Original: ";
    auto original = printList(list1);
    for (int val : original) std::cout << val << " ";
    std::cout << std::endl;
    
    ListNode* reversed = reverseList(createList({1, 2, 3, 4, 5}));
    std::cout << "Reversed: ";
    auto reversedVec = printList(reversed);
    for (int val : reversedVec) std::cout << val << " ";
    std::cout << std::endl;
    
    ListNode* merged = mergeTwoLists(createList({1, 3, 5}), createList({2, 4, 6}));
    std::cout << "Merged: ";
    auto mergedVec = printList(merged);
    for (int val : mergedVec) std::cout << val << " ";
    std::cout << std::endl;
    
    return 0;
}`
            }
        },
        'strings-1': {
            title: 'Strings – Level 1',
            description: 'Advanced string algorithms and pattern matching',
            questions: [
                'How do you implement the KMP algorithm for pattern matching?',
                'Explain the Rabin-Karp algorithm for string searching.',
                'How do you find the longest palindromic substring?',
                'What is the approach for string permutation problems?',
                'How do you implement edit distance (Levenshtein distance)?',
                'Explain the longest common subsequence problem.',
                'How do you detect anagrams efficiently?',
                'What is the sliding window approach for string problems?',
                'How do you implement string compression?',
                'Explain the valid parentheses and balanced brackets problem.',
                'How do you find all palindromic substrings?',
                'What is the approach for word break problem?'
            ],
            javascript: {
                title: 'Advanced Strings in JavaScript',
                code: `// KMP Algorithm for Pattern Matching
function buildLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

function KMPSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const lps = buildLPS(pattern);
    const result = [];
    
    let i = 0; // text index
    let j = 0; // pattern index
    
    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        
        if (j === m) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return result;
}

// Rabin-Karp Algorithm
function rabinKarpSearch(text, pattern) {
    const d = 256; // number of characters
    const q = 101; // prime number
    const n = text.length;
    const m = pattern.length;
    const result = [];
    
    let p = 0; // hash value for pattern
    let t = 0; // hash value for text
    let h = 1;
    
    // Calculate h = pow(d, m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }
    
    // Calculate hash values
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }
    
    // Find pattern
    for (let i = 0; i <= n - m; i++) {
        if (p === t) {
            // Check character by character
            let j;
            for (j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) break;
            }
            if (j === m) result.push(i);
        }
        
        // Calculate next hash
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t += q;
        }
    }
    
    return result;
}

// Longest Palindromic Substring
function longestPalindrome(s) {
    if (!s || s.length < 2) return s;
    
    let start = 0;
    let maxLen = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i); // odd length
        expandAroundCenter(i, i + 1); // even length
    }
    
    return s.substring(start, start + maxLen);
}

// Edit Distance (Levenshtein Distance)
function editDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // delete
                    dp[i][j - 1],     // insert
                    dp[i - 1][j - 1]  // replace
                );
            }
        }
    }
    
    return dp[m][n];
}

// Longest Common Subsequence
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Group Anagrams
function groupAnagrams(strs) {
    const groups = new Map();
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }
    
    return Array.from(groups.values());
}

// Valid Parentheses
function isValid(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}

// String Compression
function compress(chars) {
    let write = 0;
    let anchor = 0;
    
    for (let read = 0; read <= chars.length; read++) {
        if (read === chars.length || chars[read] !== chars[anchor]) {
            chars[write++] = chars[anchor];
            
            if (read - anchor > 1) {
                const count = String(read - anchor);
                for (let digit of count) {
                    chars[write++] = digit;
                }
            }
            
            anchor = read;
        }
    }
    
    return write;
}

// Minimum Window Substring
function minWindow(s, t) {
    const need = new Map();
    const window = new Map();
    
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    let start = 0, len = Infinity;
    
    while (right < s.length) {
        const c = s[right];
        right++;
        
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }
        
        while (valid === need.size) {
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            
            const d = s[left];
            left++;
            
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }
    
    return len === Infinity ? "" : s.substring(start, start + len);
}

// Word Break
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length];
}

// Example usage
console.log("KMP Search:", KMPSearch("ABABDABACDABABCABCABCABCABC", "ABABCABCABCABC"));
console.log("Longest Palindrome:", longestPalindrome("babad"));
console.log("Edit Distance:", editDistance("horse", "ros"));
console.log("LCS Length:", longestCommonSubsequence("abcde", "ace"));
console.log("Group Anagrams:", groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`
            },
            swift: {
                title: 'Advanced Strings in Swift',
                code: `import Foundation

// KMP Algorithm for Pattern Matching
func buildLPS(_ pattern: String) -> [Int] {
    let chars = Array(pattern)
    var lps = Array(repeating: 0, count: chars.count)
    var len = 0
    var i = 1
    
    while i < chars.count {
        if chars[i] == chars[len] {
            len += 1
            lps[i] = len
            i += 1
        } else {
            if len != 0 {
                len = lps[len - 1]
            } else {
                lps[i] = 0
                i += 1
            }
        }
    }
    
    return lps
}

func KMPSearch(_ text: String, _ pattern: String) -> [Int] {
    let textChars = Array(text)
    let patternChars = Array(pattern)
    let n = textChars.count
    let m = patternChars.count
    let lps = buildLPS(pattern)
    var result: [Int] = []
    
    var i = 0 // text index
    var j = 0 // pattern index
    
    while i < n {
        if patternChars[j] == textChars[i] {
            i += 1
            j += 1
        }
        
        if j == m {
            result.append(i - j)
            j = lps[j - 1]
        } else if i < n && patternChars[j] != textChars[i] {
            if j != 0 {
                j = lps[j - 1]
            } else {
                i += 1
            }
        }
    }
    
    return result
}

// Longest Palindromic Substring
func longestPalindrome(_ s: String) -> String {
    guard s.count >= 2 else { return s }
    
    let chars = Array(s)
    var start = 0
    var maxLen = 1
    
    func expandAroundCenter(_ left: Int, _ right: Int) {
        var l = left
        var r = right
        
        while l >= 0 && r < chars.count && chars[l] == chars[r] {
            let len = r - l + 1
            if len > maxLen {
                start = l
                maxLen = len
            }
            l -= 1
            r += 1
        }
    }
    
    for i in 0..<chars.count {
        expandAroundCenter(i, i) // odd length
        expandAroundCenter(i, i + 1) // even length
    }
    
    let startIndex = s.index(s.startIndex, offsetBy: start)
    let endIndex = s.index(startIndex, offsetBy: maxLen)
    return String(s[startIndex..<endIndex])
}

// Edit Distance (Levenshtein Distance)
func editDistance(_ word1: String, _ word2: String) -> Int {
    let chars1 = Array(word1)
    let chars2 = Array(word2)
    let m = chars1.count
    let n = chars2.count
    
    var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)
    
    // Initialize base cases
    for i in 0...m { dp[i][0] = i }
    for j in 0...n { dp[0][j] = j }
    
    for i in 1...m {
        for j in 1...n {
            if chars1[i - 1] == chars2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = 1 + min(
                    dp[i - 1][j],     // delete
                    dp[i][j - 1],     // insert
                    dp[i - 1][j - 1]  // replace
                )
            }
        }
    }
    
    return dp[m][n]
}

// Longest Common Subsequence
func longestCommonSubsequence(_ text1: String, _ text2: String) -> Int {
    let chars1 = Array(text1)
    let chars2 = Array(text2)
    let m = chars1.count
    let n = chars2.count
    
    var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)
    
    for i in 1...m {
        for j in 1...n {
            if chars1[i - 1] == chars2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    
    return dp[m][n]
}

// Group Anagrams
func groupAnagrams(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]
    
    for str in strs {
        let key = String(str.sorted())
        groups[key, default: []].append(str)
    }
    
    return Array(groups.values)
}

// Valid Parentheses
func isValid(_ s: String) -> Bool {
    var stack: [Character] = []
    let mapping: [Character: Character] = [")": "(", "}": "{", "]": "["]
    
    for char in s {
        if let openBracket = mapping[char] {
            if stack.isEmpty || stack.removeLast() != openBracket {
                return false
            }
        } else {
            stack.append(char)
        }
    }
    
    return stack.isEmpty
}

// String Compression
func compress(_ chars: inout [Character]) -> Int {
    var write = 0
    var anchor = 0
    
    for read in 0...chars.count {
        if read == chars.count || chars[read] != chars[anchor] {
            chars[write] = chars[anchor]
            write += 1
            
            if read - anchor > 1 {
                let count = String(read - anchor)
                for digit in count {
                    chars[write] = digit
                    write += 1
                }
            }
            
            anchor = read
        }
    }
    
    return write
}

// Minimum Window Substring
func minWindow(_ s: String, _ t: String) -> String {
    let sChars = Array(s)
    var need: [Character: Int] = [:]
    var window: [Character: Int] = [:]
    
    for char in t {
        need[char, default: 0] += 1
    }
    
    var left = 0, right = 0
    var valid = 0
    var start = 0, minLen = Int.max
    
    while right < sChars.count {
        let c = sChars[right]
        right += 1
        
        if let needCount = need[c] {
            window[c, default: 0] += 1
            if window[c] == needCount {
                valid += 1
            }
        }
        
        while valid == need.count {
            if right - left < minLen {
                start = left
                minLen = right - left
            }
            
            let d = sChars[left]
            left += 1
            
            if let needCount = need[d] {
                if window[d] == needCount {
                    valid -= 1
                }
                window[d, default: 0] -= 1
            }
        }
    }
    
    if minLen == Int.max {
        return ""
    }
    
    let startIndex = s.index(s.startIndex, offsetBy: start)
    let endIndex = s.index(startIndex, offsetBy: minLen)
    return String(s[startIndex..<endIndex])
}

// Word Break
func wordBreak(_ s: String, _ wordDict: [String]) -> Bool {
    let wordSet = Set(wordDict)
    var dp = Array(repeating: false, count: s.count + 1)
    dp[0] = true
    
    for i in 1...s.count {
        for j in 0..<i {
            let startIndex = s.index(s.startIndex, offsetBy: j)
            let endIndex = s.index(s.startIndex, offsetBy: i)
            let substring = String(s[startIndex..<endIndex])
            
            if dp[j] && wordSet.contains(substring) {
                dp[i] = true
                break
            }
        }
    }
    
    return dp[s.count]
}

// Example usage
print("KMP Search:", KMPSearch("ABABDABACDABABCABCABCABCABC", "ABABCABCABCABC"))
print("Longest Palindrome:", longestPalindrome("babad"))
print("Edit Distance:", editDistance("horse", "ros"))
print("LCS Length:", longestCommonSubsequence("abcde", "ace"))
print("Group Anagrams:", groupAnagrams(["eat","tea","tan","ate","nat","bat"]))`
            },
            cpp: {
                title: 'Advanced Strings in C++',
                code: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <stack>
#include <algorithm>

// KMP Algorithm for Pattern Matching
std::vector<int> buildLPS(const std::string& pattern) {
    int m = pattern.length();
    std::vector<int> lps(m, 0);
    int len = 0;
    int i = 1;
    
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

std::vector<int> KMPSearch(const std::string& text, const std::string& pattern) {
    int n = text.length();
    int m = pattern.length();
    std::vector<int> lps = buildLPS(pattern);
    std::vector<int> result;
    
    int i = 0; // text index
    int j = 0; // pattern index
    
    while (i < n) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }
        
        if (j == m) {
            result.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] != text[i]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return result;
}

// Longest Palindromic Substring
std::string longestPalindrome(const std::string& s) {
    if (s.length() < 2) return s;
    
    int start = 0;
    int maxLen = 1;
    
    auto expandAroundCenter = [&](int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            int len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    };
    
    for (int i = 0; i < s.length(); i++) {
        expandAroundCenter(i, i); // odd length
        expandAroundCenter(i, i + 1); // even length
    }
    
    return s.substr(start, maxLen);
}

// Edit Distance (Levenshtein Distance)
int editDistance(const std::string& word1, const std::string& word2) {
    int m = word1.length();
    int n = word2.length();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    
    // Initialize base cases
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + std::min({
                    dp[i - 1][j],     // delete
                    dp[i][j - 1],     // insert
                    dp[i - 1][j - 1]  // replace
                });
            }
        }
    }
    
    return dp[m][n];
}

// Longest Common Subsequence
int longestCommonSubsequence(const std::string& text1, const std::string& text2) {
    int m = text1.length();
    int n = text2.length();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// Group Anagrams
std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
    std::unordered_map<std::string, std::vector<std::string>> groups;
    
    for (const std::string& str : strs) {
        std::string key = str;
        std::sort(key.begin(), key.end());
        groups[key].push_back(str);
    }
    
    std::vector<std::vector<std::string>> result;
    for (auto& pair : groups) {
        result.push_back(pair.second);
    }
    
    return result;
}

// Valid Parentheses
bool isValid(const std::string& s) {
    std::stack<char> stack;
    std::unordered_map<char, char> mapping = {
        {')', '('}, {'}', '{'}, {']', '['}
    };
    
    for (char c : s) {
        if (mapping.count(c)) {
            if (stack.empty() || stack.top() != mapping[c]) {
                return false;
            }
            stack.pop();
        } else {
            stack.push(c);
        }
    }
    
    return stack.empty();
}

// String Compression
int compress(std::vector<char>& chars) {
    int write = 0;
    int anchor = 0;
    
    for (int read = 0; read <= chars.size(); read++) {
        if (read == chars.size() || chars[read] != chars[anchor]) {
            chars[write++] = chars[anchor];
            
            if (read - anchor > 1) {
                std::string count = std::to_string(read - anchor);
                for (char digit : count) {
                    chars[write++] = digit;
                }
            }
            
            anchor = read;
        }
    }
    
    return write;
}

// Minimum Window Substring
std::string minWindow(const std::string& s, const std::string& t) {
    std::unordered_map<char, int> need, window;
    
    for (char c : t) {
        need[c]++;
    }
    
    int left = 0, right = 0;
    int valid = 0;
    int start = 0, len = INT_MAX;
    
    while (right < s.length()) {
        char c = s[right];
        right++;
        
        if (need.count(c)) {
            window[c]++;
            if (window[c] == need[c]) {
                valid++;
            }
        }
        
        while (valid == need.size()) {
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            
            char d = s[left];
            left++;
            
            if (need.count(d)) {
                if (window[d] == need[d]) {
                    valid--;
                }
                window[d]--;
            }
        }
    }
    
    return len == INT_MAX ? "" : s.substr(start, len);
}

// Word Break
bool wordBreak(const std::string& s, std::vector<std::string>& wordDict) {
    std::unordered_set<std::string> wordSet(wordDict.begin(), wordDict.end());
    std::vector<bool> dp(s.length() + 1, false);
    dp[0] = true;
    
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length()];
}

// Example usage
int main() {
    std::string text = "ABABDABACDABABCABCABCABCABC";
    std::string pattern = "ABABCABCABCABC";
    auto kmpResult = KMPSearch(text, pattern);
    
    std::cout << "KMP Search result: ";
    for (int pos : kmpResult) {
        std::cout << pos << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Longest Palindrome: " << longestPalindrome("babad") << std::endl;
    std::cout << "Edit Distance: " << editDistance("horse", "ros") << std::endl;
    std::cout << "LCS Length: " << longestCommonSubsequence("abcde", "ace") << std::endl;
    
    return 0;
}`
            }
        },
        'trees-1': {
            title: 'Trees – Level 1 (Advanced)',
            description: 'Advanced tree operations, complex tree algorithms, and optimization techniques',
            questions: [
                'Implement tree serialization and deserialization',
                'Find the lowest common ancestor of two nodes in a binary tree',
                'Convert a binary tree to a doubly linked list',
                'Find the diameter of a binary tree',
                'Construct binary tree from inorder and preorder traversals',
                'Validate if a binary tree is symmetric',
                'Find all root-to-leaf paths with a given sum',
                'Implement tree isomorphism check',
                'Find the maximum path sum in a binary tree',
                'Convert binary tree to sum tree'
            ],
            javascript: {
                title: 'Advanced Trees in JavaScript',
                code: `// Tree Node Definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Tree Serialization and Deserialization
class Codec {
    // Serialize tree to string
    serialize(root) {
        if (!root) return 'null';
        
        const queue = [root];
        const result = [];
        
        while (queue.length > 0) {
            const node = queue.shift();
            
            if (node) {
                result.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
            } else {
                result.push('null');
            }
        }
        
        return result.join(',');
    }
    
    // Deserialize string to tree
    deserialize(data) {
        const vals = data.split(',');
        if (vals[0] === 'null') return null;
        
        const root = new TreeNode(parseInt(vals[0]));
        const queue = [root];
        let i = 1;
        
        while (queue.length > 0 && i < vals.length) {
            const node = queue.shift();
            
            if (vals[i] !== 'null') {
                node.left = new TreeNode(parseInt(vals[i]));
                queue.push(node.left);
            }
            i++;
            
            if (i < vals.length && vals[i] !== 'null') {
                node.right = new TreeNode(parseInt(vals[i]));
                queue.push(node.right);
            }
            i++;
        }
        
        return root;
    }
}

// Lowest Common Ancestor
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}

// Binary Tree to Doubly Linked List
function treeToDoublyList(root) {
    if (!root) return null;
    
    let first = null;
    let last = null;
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        
        if (last) {
            last.right = node;
            node.left = last;
        } else {
            first = node;
        }
        last = node;
        
        inorder(node.right);
    }
    
    inorder(root);
    
    // Make it circular
    last.right = first;
    first.left = last;
    
    return first;
}

// Diameter of Binary Tree
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;
    
    function depth(node) {
        if (!node) return 0;
        
        const leftDepth = depth(node.left);
        const rightDepth = depth(node.right);
        
        maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
        
        return Math.max(leftDepth, rightDepth) + 1;
    }
    
    depth(root);
    return maxDiameter;
}

// Build Tree from Inorder and Preorder
function buildTree(preorder, inorder) {
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }
    
    let preorderIndex = 0;
    
    function buildSubtree(left, right) {
        if (left > right) return null;
        
        const rootVal = preorder[preorderIndex++];
        const root = new TreeNode(rootVal);
        
        const inorderIndex = inorderMap.get(rootVal);
        
        root.left = buildSubtree(left, inorderIndex - 1);
        root.right = buildSubtree(inorderIndex + 1, right);
        
        return root;
    }
    
    return buildSubtree(0, inorder.length - 1);
}

// Check if tree is symmetric
function isSymmetric(root) {
    function isMirror(t1, t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        
        return t1.val === t2.val &&
               isMirror(t1.right, t2.left) &&
               isMirror(t1.left, t2.right);
    }
    
    return !root || isMirror(root.left, root.right);
}

// Path Sum II (All paths with given sum)
function pathSum(root, targetSum) {
    const result = [];
    
    function dfs(node, currentPath, remainingSum) {
        if (!node) return;
        
        currentPath.push(node.val);
        
        if (!node.left && !node.right && remainingSum === node.val) {
            result.push([...currentPath]);
        }
        
        dfs(node.left, currentPath, remainingSum - node.val);
        dfs(node.right, currentPath, remainingSum - node.val);
        
        currentPath.pop();
    }
    
    dfs(root, [], targetSum);
    return result;
}

// Maximum Path Sum
function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function maxGain(node) {
        if (!node) return 0;
        
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        const priceNewPath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, priceNewPath);
        
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}

// Convert to Sum Tree
function toSumTree(root) {
    function sumTree(node) {
        if (!node) return 0;
        
        const oldVal = node.val;
        
        node.val = sumTree(node.left) + sumTree(node.right);
        
        return node.val + oldVal;
    }
    
    sumTree(root);
    return root;
}

// Example usage
const codec = new Codec();
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);

console.log("Serialized:", codec.serialize(root));
console.log("Diameter:", diameterOfBinaryTree(root));
console.log("Is Symmetric:", isSymmetric(root));
console.log("Max Path Sum:", maxPathSum(root));`
            },
            swift: {
                title: 'Advanced Trees in Swift',
                code: `// Tree Node Definition
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

// Tree Serialization and Deserialization
class Codec {
    // Serialize tree to string
    func serialize(_ root: TreeNode?) -> String {
        guard let root = root else { return "null" }
        
        var queue: [TreeNode?] = [root]
        var result: [String] = []
        
        while !queue.isEmpty {
            let node = queue.removeFirst()
            
            if let node = node {
                result.append(String(node.val))
                queue.append(node.left)
                queue.append(node.right)
            } else {
                result.append("null")
            }
        }
        
        return result.joined(separator: ",")
    }
    
    // Deserialize string to tree
    func deserialize(_ data: String) -> TreeNode? {
        let vals = data.components(separatedBy: ",")
        guard vals[0] != "null" else { return nil }
        
        let root = TreeNode(Int(vals[0])!)
        var queue: [TreeNode] = [root]
        var i = 1
        
        while !queue.isEmpty && i < vals.count {
            let node = queue.removeFirst()
            
            if vals[i] != "null" {
                node.left = TreeNode(Int(vals[i])!)
                queue.append(node.left!)
            }
            i += 1
            
            if i < vals.count && vals[i] != "null" {
                node.right = TreeNode(Int(vals[i])!)
                queue.append(node.right!)
            }
            i += 1
        }
        
        return root
    }
}

// Lowest Common Ancestor
func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
    guard let root = root else { return nil }
    if root === p || root === q { return root }
    
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    
    if left != nil && right != nil { return root }
    return left ?? right
}

// Diameter of Binary Tree
func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
    var maxDiameter = 0
    
    @discardableResult
    func depth(_ node: TreeNode?) -> Int {
        guard let node = node else { return 0 }
        
        let leftDepth = depth(node.left)
        let rightDepth = depth(node.right)
        
        maxDiameter = max(maxDiameter, leftDepth + rightDepth)
        
        return max(leftDepth, rightDepth) + 1
    }
    
    depth(root)
    return maxDiameter
}

// Build Tree from Inorder and Preorder
func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {
    var inorderMap: [Int: Int] = [:]
    for (i, val) in inorder.enumerated() {
        inorderMap[val] = i
    }
    
    var preorderIndex = 0
    
    func buildSubtree(_ left: Int, _ right: Int) -> TreeNode? {
        if left > right { return nil }
        
        let rootVal = preorder[preorderIndex]
        preorderIndex += 1
        let root = TreeNode(rootVal)
        
        let inorderIndex = inorderMap[rootVal]!
        
        root.left = buildSubtree(left, inorderIndex - 1)
        root.right = buildSubtree(inorderIndex + 1, right)
        
        return root
    }
    
    return buildSubtree(0, inorder.count - 1)
}

// Check if tree is symmetric
func isSymmetric(_ root: TreeNode?) -> Bool {
    func isMirror(_ t1: TreeNode?, _ t2: TreeNode?) -> Bool {
        if t1 == nil && t2 == nil { return true }
        if t1 == nil || t2 == nil { return false }
        
        return t1!.val == t2!.val &&
               isMirror(t1!.right, t2!.left) &&
               isMirror(t1!.left, t2!.right)
    }
    
    guard let root = root else { return true }
    return isMirror(root.left, root.right)
}

// Path Sum II (All paths with given sum)
func pathSum(_ root: TreeNode?, _ targetSum: Int) -> [[Int]] {
    var result: [[Int]] = []
    
    func dfs(_ node: TreeNode?, _ currentPath: inout [Int], _ remainingSum: Int) {
        guard let node = node else { return }
        
        currentPath.append(node.val)
        
        if node.left == nil && node.right == nil && remainingSum == node.val {
            result.append(currentPath)
        }
        
        dfs(node.left, &currentPath, remainingSum - node.val)
        dfs(node.right, &currentPath, remainingSum - node.val)
        
        currentPath.removeLast()
    }
    
    var path: [Int] = []
    dfs(root, &path, targetSum)
    return result
}

// Maximum Path Sum
func maxPathSum(_ root: TreeNode?) -> Int {
    var maxSum = Int.min
    
    @discardableResult
    func maxGain(_ node: TreeNode?) -> Int {
        guard let node = node else { return 0 }
        
        let leftGain = max(maxGain(node.left), 0)
        let rightGain = max(maxGain(node.right), 0)
        
        let priceNewPath = node.val + leftGain + rightGain
        maxSum = max(maxSum, priceNewPath)
        
        return node.val + max(leftGain, rightGain)
    }
    
    maxGain(root)
    return maxSum
}

// Convert to Sum Tree
func toSumTree(_ root: TreeNode?) -> TreeNode? {
    @discardableResult
    func sumTree(_ node: TreeNode?) -> Int {
        guard let node = node else { return 0 }
        
        let oldVal = node.val
        
        node.val = sumTree(node.left) + sumTree(node.right)
        
        return node.val + oldVal
    }
    
    sumTree(root)
    return root
}

// Example usage
let codec = Codec()
let root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.right?.left = TreeNode(4)
root.right?.right = TreeNode(5)

print("Serialized:", codec.serialize(root))
print("Diameter:", diameterOfBinaryTree(root))
print("Is Symmetric:", isSymmetric(root))
print("Max Path Sum:", maxPathSum(root))`
            },
            cpp: {
                title: 'Advanced Trees in C++',
                code: `#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <unordered_map>
#include <sstream>
#include <climits>
#include <algorithm>

// Tree Node Definition
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Tree Serialization and Deserialization
class Codec {
public:
    // Serialize tree to string
    std::string serialize(TreeNode* root) {
        if (!root) return "null";
        
        std::queue<TreeNode*> q;
        q.push(root);
        std::string result;
        
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            
            if (node) {
                result += std::to_string(node->val) + ",";
                q.push(node->left);
                q.push(node->right);
            } else {
                result += "null,";
            }
        }
        
        return result;
    }
    
    // Deserialize string to tree
    TreeNode* deserialize(const std::string& data) {
        std::istringstream iss(data);
        std::string val;
        
        if (!std::getline(iss, val, ',') || val == "null") {
            return nullptr;
        }
        
        TreeNode* root = new TreeNode(std::stoi(val));
        std::queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            
            if (std::getline(iss, val, ',')) {
                if (val != "null") {
                    node->left = new TreeNode(std::stoi(val));
                    q.push(node->left);
                }
                
                if (std::getline(iss, val, ',')) {
                    if (val != "null") {
                        node->right = new TreeNode(std::stoi(val));
                        q.push(node->right);
                    }
                }
            }
        }
        
        return root;
    }
};

// Lowest Common Ancestor
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) {
        return root;
    }
    
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    
    if (left && right) return root;
    return left ? left : right;
}

// Diameter of Binary Tree
int diameterOfBinaryTree(TreeNode* root) {
    int maxDiameter = 0;
    
    std::function<int(TreeNode*)> depth = [&](TreeNode* node) -> int {
        if (!node) return 0;
        
        int leftDepth = depth(node->left);
        int rightDepth = depth(node->right);
        
        maxDiameter = std::max(maxDiameter, leftDepth + rightDepth);
        
        return std::max(leftDepth, rightDepth) + 1;
    };
    
    depth(root);
    return maxDiameter;
}

// Build Tree from Inorder and Preorder
TreeNode* buildTree(std::vector<int>& preorder, std::vector<int>& inorder) {
    std::unordered_map<int, int> inorderMap;
    for (int i = 0; i < inorder.size(); i++) {
        inorderMap[inorder[i]] = i;
    }
    
    int preorderIndex = 0;
    
    std::function<TreeNode*(int, int)> buildSubtree = [&](int left, int right) -> TreeNode* {
        if (left > right) return nullptr;
        
        int rootVal = preorder[preorderIndex++];
        TreeNode* root = new TreeNode(rootVal);
        
        int inorderIndex = inorderMap[rootVal];
        
        root->left = buildSubtree(left, inorderIndex - 1);
        root->right = buildSubtree(inorderIndex + 1, right);
        
        return root;
    };
    
    return buildSubtree(0, inorder.size() - 1);
}

// Check if tree is symmetric
bool isSymmetric(TreeNode* root) {
    std::function<bool(TreeNode*, TreeNode*)> isMirror = [&](TreeNode* t1, TreeNode* t2) -> bool {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        
        return t1->val == t2->val &&
               isMirror(t1->right, t2->left) &&
               isMirror(t1->left, t2->right);
    };
    
    return !root || isMirror(root->left, root->right);
}

// Path Sum II (All paths with given sum)
std::vector<std::vector<int>> pathSum(TreeNode* root, int targetSum) {
    std::vector<std::vector<int>> result;
    std::vector<int> currentPath;
    
    std::function<void(TreeNode*, int)> dfs = [&](TreeNode* node, int remainingSum) {
        if (!node) return;
        
        currentPath.push_back(node->val);
        
        if (!node->left && !node->right && remainingSum == node->val) {
            result.push_back(currentPath);
        }
        
        dfs(node->left, remainingSum - node->val);
        dfs(node->right, remainingSum - node->val);
        
        currentPath.pop_back();
    };
    
    dfs(root, targetSum);
    return result;
}

// Maximum Path Sum
int maxPathSum(TreeNode* root) {
    int maxSum = INT_MIN;
    
    std::function<int(TreeNode*)> maxGain = [&](TreeNode* node) -> int {
        if (!node) return 0;
        
        int leftGain = std::max(maxGain(node->left), 0);
        int rightGain = std::max(maxGain(node->right), 0);
        
        int priceNewPath = node->val + leftGain + rightGain;
        maxSum = std::max(maxSum, priceNewPath);
        
        return node->val + std::max(leftGain, rightGain);
    };
    
    maxGain(root);
    return maxSum;
}

// Convert to Sum Tree
TreeNode* toSumTree(TreeNode* root) {
    std::function<int(TreeNode*)> sumTree = [&](TreeNode* node) -> int {
        if (!node) return 0;
        
        int oldVal = node->val;
        
        node->val = sumTree(node->left) + sumTree(node->right);
        
        return node->val + oldVal;
    };
    
    sumTree(root);
    return root;
}

// Example usage
int main() {
    Codec codec;
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->right->left = new TreeNode(4);
    root->right->right = new TreeNode(5);
    
    std::cout << "Serialized: " << codec.serialize(root) << std::endl;
    std::cout << "Diameter: " << diameterOfBinaryTree(root) << std::endl;
    std::cout << "Is Symmetric: " << isSymmetric(root) << std::endl;
    std::cout << "Max Path Sum: " << maxPathSum(root) << std::endl;
    
    return 0;
}`
            }
        },
        'graphs-1': {
            title: 'Graph – Level 1 (Advanced)',
            description: 'Advanced graph algorithms, shortest paths, network flows, and complex graph problems',
            questions: [
                'Implement Dijkstra\'s shortest path algorithm',
                'Find strongly connected components using Kosaraju\'s algorithm',
                'Implement Kruskal\'s minimum spanning tree algorithm',
                'Detect cycles in a directed graph using DFS',
                'Find articulation points (cut vertices) in a graph',
                'Implement Ford-Fulkerson algorithm for maximum flow',
                'Find the shortest path in a weighted graph with negative edges (Bellman-Ford)',
                'Implement A* pathfinding algorithm',
                'Find all bridges in an undirected graph',
                'Solve the traveling salesman problem using dynamic programming'
            ],
            javascript: {
                title: 'Advanced Graphs in JavaScript',
                code: `// Graph representation using adjacency list
class Graph {
    constructor(vertices) {
        this.V = vertices;
        this.adjList = new Array(vertices).fill(null).map(() => []);
        this.adjMatrix = new Array(vertices).fill(null).map(() => new Array(vertices).fill(0));
    }
    
    addEdge(u, v, weight = 1) {
        this.adjList[u].push({ node: v, weight });
        this.adjMatrix[u][v] = weight;
    }
    
    addUndirectedEdge(u, v, weight = 1) {
        this.addEdge(u, v, weight);
        this.addEdge(v, u, weight);
    }
}

// Dijkstra's Shortest Path Algorithm
function dijkstra(graph, src) {
    const V = graph.V;
    const dist = new Array(V).fill(Infinity);
    const visited = new Array(V).fill(false);
    const parent = new Array(V).fill(-1);
    
    dist[src] = 0;
    
    // Priority queue simulation using array
    for (let count = 0; count < V - 1; count++) {
        let u = -1;
        for (let v = 0; v < V; v++) {
            if (!visited[v] && (u === -1 || dist[v] < dist[u])) {
                u = v;
            }
        }
        
        visited[u] = true;
        
        for (const edge of graph.adjList[u]) {
            const v = edge.node;
            const weight = edge.weight;
            
            if (!visited[v] && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                parent[v] = u;
            }
        }
    }
    
    return { distances: dist, parents: parent };
}

// Strongly Connected Components (Kosaraju's Algorithm)
function kosaraju(graph) {
    const V = graph.V;
    const visited = new Array(V).fill(false);
    const stack = [];
    
    // Step 1: Fill stack according to finish times
    function fillOrder(v) {
        visited[v] = true;
        
        for (const edge of graph.adjList[v]) {
            if (!visited[edge.node]) {
                fillOrder(edge.node);
            }
        }
        
        stack.push(v);
    }
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            fillOrder(i);
        }
    }
    
    // Step 2: Create transpose graph
    const transpose = new Graph(V);
    for (let v = 0; v < V; v++) {
        for (const edge of graph.adjList[v]) {
            transpose.addEdge(edge.node, v, edge.weight);
        }
    }
    
    // Step 3: Process all vertices in order defined by stack
    visited.fill(false);
    const sccs = [];
    
    function dfsUtil(v, component) {
        visited[v] = true;
        component.push(v);
        
        for (const edge of transpose.adjList[v]) {
            if (!visited[edge.node]) {
                dfsUtil(edge.node, component);
            }
        }
    }
    
    while (stack.length > 0) {
        const v = stack.pop();
        if (!visited[v]) {
            const component = [];
            dfsUtil(v, component);
            sccs.push(component);
        }
    }
    
    return sccs;
}

// Kruskal's Minimum Spanning Tree
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            return true;
        }
        return false;
    }
}

function kruskalMST(edges, V) {
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    const uf = new UnionFind(V);
    const mst = [];
    let mstWeight = 0;
    
    for (const edge of edges) {
        if (uf.union(edge.u, edge.v)) {
            mst.push(edge);
            mstWeight += edge.weight;
            
            if (mst.length === V - 1) {
                break;
            }
        }
    }
    
    return { mst, weight: mstWeight };
}

// Cycle Detection in Directed Graph
function hasCycleDirected(graph) {
    const V = graph.V;
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const color = new Array(V).fill(WHITE);
    
    function dfsVisit(u) {
        color[u] = GRAY;
        
        for (const edge of graph.adjList[u]) {
            const v = edge.node;
            
            if (color[v] === GRAY) {
                return true; // Back edge found, cycle detected
            }
            
            if (color[v] === WHITE && dfsVisit(v)) {
                return true;
            }
        }
        
        color[u] = BLACK;
        return false;
    }
    
    for (let i = 0; i < V; i++) {
        if (color[i] === WHITE) {
            if (dfsVisit(i)) {
                return true;
            }
        }
    }
    
    return false;
}

// Articulation Points (Cut Vertices)
function findArticulationPoints(graph) {
    const V = graph.V;
    const visited = new Array(V).fill(false);
    const disc = new Array(V);
    const low = new Array(V);
    const parent = new Array(V).fill(-1);
    const ap = new Array(V).fill(false);
    let time = 0;
    
    function bridgeUtil(u) {
        let children = 0;
        visited[u] = true;
        disc[u] = low[u] = ++time;
        
        for (const edge of graph.adjList[u]) {
            const v = edge.node;
            
            if (!visited[v]) {
                children++;
                parent[v] = u;
                bridgeUtil(v);
                
                low[u] = Math.min(low[u], low[v]);
                
                // u is an articulation point in following cases:
                // 1) u is root of DFS tree and has two or more children
                if (parent[u] === -1 && children > 1) {
                    ap[u] = true;
                }
                
                // 2) u is not root and low value of one of its children is more than or equal to discovery value of u
                if (parent[u] !== -1 && low[v] >= disc[u]) {
                    ap[u] = true;
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            bridgeUtil(i);
        }
    }
    
    const articulationPoints = [];
    for (let i = 0; i < V; i++) {
        if (ap[i]) {
            articulationPoints.push(i);
        }
    }
    
    return articulationPoints;
}

// Bellman-Ford Algorithm (handles negative weights)
function bellmanFord(graph, src) {
    const V = graph.V;
    const dist = new Array(V).fill(Infinity);
    dist[src] = 0;
    
    // Relax all edges V-1 times
    for (let i = 0; i < V - 1; i++) {
        for (let u = 0; u < V; u++) {
            for (const edge of graph.adjList[u]) {
                const v = edge.node;
                const weight = edge.weight;
                
                if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }
    
    // Check for negative-weight cycles
    for (let u = 0; u < V; u++) {
        for (const edge of graph.adjList[u]) {
            const v = edge.node;
            const weight = edge.weight;
            
            if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
                return { hasNegativeCycle: true };
            }
        }
    }
    
    return { distances: dist, hasNegativeCycle: false };
}

// A* Pathfinding Algorithm
function aStar(graph, start, goal, heuristic) {
    const openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, goal));
    
    while (openSet.length > 0) {
        // Find node with lowest fScore
        let current = openSet[0];
        let currentIndex = 0;
        
        for (let i = 1; i < openSet.length; i++) {
            if (fScore.get(openSet[i]) < fScore.get(current)) {
                current = openSet[i];
                currentIndex = i;
            }
        }
        
        if (current === goal) {
            // Reconstruct path
            const path = [];
            let temp = current;
            while (temp !== undefined) {
                path.unshift(temp);
                temp = cameFrom.get(temp);
            }
            return path;
        }
        
        openSet.splice(currentIndex, 1);
        
        for (const edge of graph.adjList[current]) {
            const neighbor = edge.node;
            const tentativeGScore = gScore.get(current) + edge.weight;
            
            if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, gScore.get(neighbor) + heuristic(neighbor, goal));
                
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    
    return null; // No path found
}

// Example usage
const graph = new Graph(6);
graph.addEdge(0, 1, 4);
graph.addEdge(0, 2, 3);
graph.addEdge(1, 2, 1);
graph.addEdge(1, 3, 2);
graph.addEdge(2, 3, 4);
graph.addEdge(3, 4, 2);
graph.addEdge(4, 5, 6);

console.log("Dijkstra from vertex 0:", dijkstra(graph, 0));
console.log("Has cycle:", hasCycleDirected(graph));
console.log("Bellman-Ford from vertex 0:", bellmanFord(graph, 0));`
            },
            swift: {
                title: 'Advanced Graphs in Swift',
                code: `import Foundation

// Graph representation using adjacency list
struct Edge {
    let node: Int
    let weight: Int
}

class Graph {
    let V: Int
    var adjList: [[Edge]]
    var adjMatrix: [[Int]]
    
    init(_ vertices: Int) {
        self.V = vertices
        self.adjList = Array(repeating: [], count: vertices)
        self.adjMatrix = Array(repeating: Array(repeating: 0, count: vertices), count: vertices)
    }
    
    func addEdge(_ u: Int, _ v: Int, weight: Int = 1) {
        adjList[u].append(Edge(node: v, weight: weight))
        adjMatrix[u][v] = weight
    }
    
    func addUndirectedEdge(_ u: Int, _ v: Int, weight: Int = 1) {
        addEdge(u, v, weight: weight)
        addEdge(v, u, weight: weight)
    }
}

// Dijkstra's Shortest Path Algorithm
func dijkstra(_ graph: Graph, _ src: Int) -> (distances: [Int], parents: [Int]) {
    let V = graph.V
    var dist = Array(repeating: Int.max, count: V)
    var visited = Array(repeating: false, count: V)
    var parent = Array(repeating: -1, count: V)
    
    dist[src] = 0
    
    for _ in 0..<V-1 {
        var u = -1
        for v in 0..<V {
            if !visited[v] && (u == -1 || dist[v] < dist[u]) {
                u = v
            }
        }
        
        visited[u] = true
        
        for edge in graph.adjList[u] {
            let v = edge.node
            let weight = edge.weight
            
            if !visited[v] && dist[u] != Int.max && dist[u] + weight < dist[v] {
                dist[v] = dist[u] + weight
                parent[v] = u
            }
        }
    }
    
    return (distances: dist, parents: parent)
}

// Strongly Connected Components (Kosaraju's Algorithm)
func kosaraju(_ graph: Graph) -> [[Int]] {
    let V = graph.V
    var visited = Array(repeating: false, count: V)
    var stack: [Int] = []
    
    func fillOrder(_ v: Int) {
        visited[v] = true
        
        for edge in graph.adjList[v] {
            if !visited[edge.node] {
                fillOrder(edge.node)
            }
        }
        
        stack.append(v)
    }
    
    // Step 1: Fill stack according to finish times
    for i in 0..<V {
        if !visited[i] {
            fillOrder(i)
        }
    }
    
    // Step 2: Create transpose graph
    let transpose = Graph(V)
    for v in 0..<V {
        for edge in graph.adjList[v] {
            transpose.addEdge(edge.node, v, weight: edge.weight)
        }
    }
    
    // Step 3: Process all vertices in order defined by stack
    visited = Array(repeating: false, count: V)
    var sccs: [[Int]] = []
    
    func dfsUtil(_ v: Int, _ component: inout [Int]) {
        visited[v] = true
        component.append(v)
        
        for edge in transpose.adjList[v] {
            if !visited[edge.node] {
                dfsUtil(edge.node, &component)
            }
        }
    }
    
    while !stack.isEmpty {
        let v = stack.removeLast()
        if !visited[v] {
            var component: [Int] = []
            dfsUtil(v, &component)
            sccs.append(component)
        }
    }
    
    return sccs
}

// Union-Find Data Structure
class UnionFind {
    private var parent: [Int]
    private var rank: [Int]
    
    init(_ n: Int) {
        parent = Array(0..<n)
        rank = Array(repeating: 0, count: n)
    }
    
    func find(_ x: Int) -> Int {
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }
    
    func union(_ x: Int, _ y: Int) -> Bool {
        let rootX = find(x)
        let rootY = find(y)
        
        if rootX != rootY {
            if rank[rootX] < rank[rootY] {
                parent[rootX] = rootY
            } else if rank[rootX] > rank[rootY] {
                parent[rootY] = rootX
            } else {
                parent[rootY] = rootX
                rank[rootX] += 1
            }
            return true
        }
        return false
    }
}

// Kruskal's Minimum Spanning Tree
struct WeightedEdge {
    let u: Int
    let v: Int
    let weight: Int
}

func kruskalMST(_ edges: [WeightedEdge], _ V: Int) -> (mst: [WeightedEdge], weight: Int) {
    let sortedEdges = edges.sorted { $0.weight < $1.weight }
    let uf = UnionFind(V)
    var mst: [WeightedEdge] = []
    var mstWeight = 0
    
    for edge in sortedEdges {
        if uf.union(edge.u, edge.v) {
            mst.append(edge)
            mstWeight += edge.weight
            
            if mst.count == V - 1 {
                break
            }
        }
    }
    
    return (mst: mst, weight: mstWeight)
}

// Cycle Detection in Directed Graph
func hasCycleDirected(_ graph: Graph) -> Bool {
    let V = graph.V
    enum Color { case white, gray, black }
    var color = Array(repeating: Color.white, count: V)
    
    func dfsVisit(_ u: Int) -> Bool {
        color[u] = .gray
        
        for edge in graph.adjList[u] {
            let v = edge.node
            
            if color[v] == .gray {
                return true // Back edge found, cycle detected
            }
            
            if color[v] == .white && dfsVisit(v) {
                return true
            }
        }
        
        color[u] = .black
        return false
    }
    
    for i in 0..<V {
        if color[i] == .white {
            if dfsVisit(i) {
                return true
            }
        }
    }
    
    return false
}

// Articulation Points (Cut Vertices)
func findArticulationPoints(_ graph: Graph) -> [Int] {
    let V = graph.V
    var visited = Array(repeating: false, count: V)
    var disc = Array(repeating: 0, count: V)
    var low = Array(repeating: 0, count: V)
    var parent = Array(repeating: -1, count: V)
    var ap = Array(repeating: false, count: V)
    var time = 0
    
    func bridgeUtil(_ u: Int) {
        var children = 0
        visited[u] = true
        time += 1
        disc[u] = time
        low[u] = time
        
        for edge in graph.adjList[u] {
            let v = edge.node
            
            if !visited[v] {
                children += 1
                parent[v] = u
                bridgeUtil(v)
                
                low[u] = min(low[u], low[v])
                
                // u is an articulation point in following cases:
                if parent[u] == -1 && children > 1 {
                    ap[u] = true
                }
                
                if parent[u] != -1 && low[v] >= disc[u] {
                    ap[u] = true
                }
            } else if v != parent[u] {
                low[u] = min(low[u], disc[v])
            }
        }
    }
    
    for i in 0..<V {
        if !visited[i] {
            bridgeUtil(i)
        }
    }
    
    var articulationPoints: [Int] = []
    for i in 0..<V {
        if ap[i] {
            articulationPoints.append(i)
        }
    }
    
    return articulationPoints
}

// Bellman-Ford Algorithm
func bellmanFord(_ graph: Graph, _ src: Int) -> (distances: [Int]?, hasNegativeCycle: Bool) {
    let V = graph.V
    var dist = Array(repeating: Int.max, count: V)
    dist[src] = 0
    
    // Relax all edges V-1 times
    for _ in 0..<V-1 {
        for u in 0..<V {
            for edge in graph.adjList[u] {
                let v = edge.node
                let weight = edge.weight
                
                if dist[u] != Int.max && dist[u] + weight < dist[v] {
                    dist[v] = dist[u] + weight
                }
            }
        }
    }
    
    // Check for negative-weight cycles
    for u in 0..<V {
        for edge in graph.adjList[u] {
            let v = edge.node
            let weight = edge.weight
            
            if dist[u] != Int.max && dist[u] + weight < dist[v] {
                return (distances: nil, hasNegativeCycle: true)
            }
        }
    }
    
    return (distances: dist, hasNegativeCycle: false)
}

// Example usage
let graph = Graph(6)
graph.addEdge(0, 1, weight: 4)
graph.addEdge(0, 2, weight: 3)
graph.addEdge(1, 2, weight: 1)
graph.addEdge(1, 3, weight: 2)
graph.addEdge(2, 3, weight: 4)
graph.addEdge(3, 4, weight: 2)
graph.addEdge(4, 5, weight: 6)

let result = dijkstra(graph, 0)
print("Dijkstra distances from vertex 0:", result.distances)
print("Has cycle:", hasCycleDirected(graph))

let bellmanResult = bellmanFord(graph, 0)
print("Bellman-Ford distances:", bellmanResult.distances ?? [])`
            },
            cpp: {
                title: 'Advanced Graphs in C++',
                code: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <algorithm>
#include <climits>
#include <unordered_map>
#include <functional>

// Edge structure
struct Edge {
    int node;
    int weight;
    
    Edge(int n, int w) : node(n), weight(w) {}
};

// Graph class
class Graph {
public:
    int V;
    std::vector<std::vector<Edge>> adjList;
    std::vector<std::vector<int>> adjMatrix;
    
    Graph(int vertices) : V(vertices) {
        adjList.resize(vertices);
        adjMatrix.assign(vertices, std::vector<int>(vertices, 0));
    }
    
    void addEdge(int u, int v, int weight = 1) {
        adjList[u].emplace_back(v, weight);
        adjMatrix[u][v] = weight;
    }
    
    void addUndirectedEdge(int u, int v, int weight = 1) {
        addEdge(u, v, weight);
        addEdge(v, u, weight);
    }
};

// Dijkstra's Shortest Path Algorithm
std::pair<std::vector<int>, std::vector<int>> dijkstra(const Graph& graph, int src) {
    int V = graph.V;
    std::vector<int> dist(V, INT_MAX);
    std::vector<bool> visited(V, false);
    std::vector<int> parent(V, -1);
    
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = -1;
        for (int v = 0; v < V; v++) {
            if (!visited[v] && (u == -1 || dist[v] < dist[u])) {
                u = v;
            }
        }
        
        visited[u] = true;
        
        for (const auto& edge : graph.adjList[u]) {
            int v = edge.node;
            int weight = edge.weight;
            
            if (!visited[v] && dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                parent[v] = u;
            }
        }
    }
    
    return {dist, parent};
}

// Strongly Connected Components (Kosaraju's Algorithm)
std::vector<std::vector<int>> kosaraju(const Graph& graph) {
    int V = graph.V;
    std::vector<bool> visited(V, false);
    std::stack<int> st;
    
    // Step 1: Fill stack according to finish times
    std::function<void(int)> fillOrder = [&](int v) {
        visited[v] = true;
        
        for (const auto& edge : graph.adjList[v]) {
            if (!visited[edge.node]) {
                fillOrder(edge.node);
            }
        }
        
        st.push(v);
    };
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            fillOrder(i);
        }
    }
    
    // Step 2: Create transpose graph
    Graph transpose(V);
    for (int v = 0; v < V; v++) {
        for (const auto& edge : graph.adjList[v]) {
            transpose.addEdge(edge.node, v, edge.weight);
        }
    }
    
    // Step 3: Process all vertices in order defined by stack
    std::fill(visited.begin(), visited.end(), false);
    std::vector<std::vector<int>> sccs;
    
    std::function<void(int, std::vector<int>&)> dfsUtil = [&](int v, std::vector<int>& component) {
        visited[v] = true;
        component.push_back(v);
        
        for (const auto& edge : transpose.adjList[v]) {
            if (!visited[edge.node]) {
                dfsUtil(edge.node, component);
            }
        }
    };
    
    while (!st.empty()) {
        int v = st.top();
        st.pop();
        
        if (!visited[v]) {
            std::vector<int> component;
            dfsUtil(v, component);
            sccs.push_back(component);
        }
    }
    
    return sccs;
}

// Union-Find Data Structure
class UnionFind {
private:
    std::vector<int> parent, rank;
    
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        std::iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX != rootY) {
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true;
        }
        return false;
    }
};

// Kruskal's Minimum Spanning Tree
struct WeightedEdge {
    int u, v, weight;
    
    WeightedEdge(int u, int v, int w) : u(u), v(v), weight(w) {}
    
    bool operator<(const WeightedEdge& other) const {
        return weight < other.weight;
    }
};

std::pair<std::vector<WeightedEdge>, int> kruskalMST(std::vector<WeightedEdge> edges, int V) {
    std::sort(edges.begin(), edges.end());
    
    UnionFind uf(V);
    std::vector<WeightedEdge> mst;
    int mstWeight = 0;
    
    for (const auto& edge : edges) {
        if (uf.unite(edge.u, edge.v)) {
            mst.push_back(edge);
            mstWeight += edge.weight;
            
            if (mst.size() == V - 1) {
                break;
            }
        }
    }
    
    return {mst, mstWeight};
}

// Cycle Detection in Directed Graph
bool hasCycleDirected(const Graph& graph) {
    int V = graph.V;
    enum Color { WHITE, GRAY, BLACK };
    std::vector<Color> color(V, WHITE);
    
    std::function<bool(int)> dfsVisit = [&](int u) -> bool {
        color[u] = GRAY;
        
        for (const auto& edge : graph.adjList[u]) {
            int v = edge.node;
            
            if (color[v] == GRAY) {
                return true; // Back edge found, cycle detected
            }
            
            if (color[v] == WHITE && dfsVisit(v)) {
                return true;
            }
        }
        
        color[u] = BLACK;
        return false;
    };
    
    for (int i = 0; i < V; i++) {
        if (color[i] == WHITE) {
            if (dfsVisit(i)) {
                return true;
            }
        }
    }
    
    return false;
}

// Articulation Points (Cut Vertices)
std::vector<int> findArticulationPoints(const Graph& graph) {
    int V = graph.V;
    std::vector<bool> visited(V, false);
    std::vector<int> disc(V), low(V), parent(V, -1);
    std::vector<bool> ap(V, false);
    int time = 0;
    
    std::function<void(int)> bridgeUtil = [&](int u) {
        int children = 0;
        visited[u] = true;
        disc[u] = low[u] = ++time;
        
        for (const auto& edge : graph.adjList[u]) {
            int v = edge.node;
            
            if (!visited[v]) {
                children++;
                parent[v] = u;
                bridgeUtil(v);
                
                low[u] = std::min(low[u], low[v]);
                
                if (parent[u] == -1 && children > 1) {
                    ap[u] = true;
                }
                
                if (parent[u] != -1 && low[v] >= disc[u]) {
                    ap[u] = true;
                }
            } else if (v != parent[u]) {
                low[u] = std::min(low[u], disc[v]);
            }
        }
    };
    
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            bridgeUtil(i);
        }
    }
    
    std::vector<int> articulationPoints;
    for (int i = 0; i < V; i++) {
        if (ap[i]) {
            articulationPoints.push_back(i);
        }
    }
    
    return articulationPoints;
}

// Bellman-Ford Algorithm
std::pair<std::vector<int>, bool> bellmanFord(const Graph& graph, int src) {
    int V = graph.V;
    std::vector<int> dist(V, INT_MAX);
    dist[src] = 0;
    
    // Relax all edges V-1 times
    for (int i = 0; i < V - 1; i++) {
        for (int u = 0; u < V; u++) {
            for (const auto& edge : graph.adjList[u]) {
                int v = edge.node;
                int weight = edge.weight;
                
                if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }
    
    // Check for negative-weight cycles
    for (int u = 0; u < V; u++) {
        for (const auto& edge : graph.adjList[u]) {
            int v = edge.node;
            int weight = edge.weight;
            
            if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                return {{}, true}; // Negative cycle detected
            }
        }
    }
    
    return {dist, false};
}

// Example usage
int main() {
    Graph graph(6);
    graph.addEdge(0, 1, 4);
    graph.addEdge(0, 2, 3);
    graph.addEdge(1, 2, 1);
    graph.addEdge(1, 3, 2);
    graph.addEdge(2, 3, 4);
    graph.addEdge(3, 4, 2);
    graph.addEdge(4, 5, 6);
    
    auto [distances, parents] = dijkstra(graph, 0);
    std::cout << "Dijkstra distances from vertex 0: ";
    for (int d : distances) {
        std::cout << d << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Has cycle: " << hasCycleDirected(graph) << std::endl;
    
    auto [bellmanDist, hasNegCycle] = bellmanFord(graph, 0);
    if (!hasNegCycle) {
        std::cout << "Bellman-Ford distances: ";
        for (int d : bellmanDist) {
            std::cout << d << " ";
        }
        std::cout << std::endl;
    }
    
    return 0;
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
        { id: 'introduction', name: 'Introduction' },
        { id: 'warmup', name: 'Warm Up' },
        { id: 'complexity', name: 'Time/Space Complexity' },
        { id: 'arrays-0', name: 'Arrays – Level 0' },
        { id: 'recursion-0', name: 'Recursion – Level 0' },
        { id: 'searching-sorting-0', name: 'Searching & Sorting – Level 0' },
        { id: 'linkedlist-0', name: 'Linked List – Level 0' },
        { id: 'strings-0', name: 'Strings – Level 0' },
        { id: 'stack-queues', name: 'Stack and Queues' },
        { id: 'binary-search', name: 'Binary Search Algorithm' },
        { id: 'two-pointers', name: 'Two Pointers & Sliding Window' },
        { id: 'trees-0', name: 'Trees – Level 0' },
        { id: 'bst', name: 'Binary Search Tree' },
        { id: 'heap', name: 'Heap' },
        { id: 'backtracking', name: 'Backtracking' },
        { id: 'greedy', name: 'Greedy Algorithm' },
        { id: 'dp-0', name: 'Dynamic Programming – Level 0' },
        { id: 'graphs-0', name: 'Graphs – Level 0' },
        { id: 'tries', name: 'Tries' },
        { id: 'searching-sorting-1', name: 'Searching & Sorting – Level 1' },
        { id: 'arrays-1', name: 'Arrays – Level 1' },
        { id: 'linkedlist-1', name: 'Linked List – Level 1' },
        { id: 'strings-1', name: 'Strings – Level 1' },
        { id: 'trees-1', name: 'Trees – Level 1' },
        { id: 'graphs-1', name: 'Graph – Level 1' }
    ];

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            // Could add a toast notification here
        });
    };

    const currentTopic = dsaTopics[selectedTopic];
    const currentCode = currentTopic[selectedLanguage];

    return (
        <div className="leftbrain-container dsa-theme">
            <div className="hero-section">
                <h1 className="section-title">Data Structures & Algorithms</h1>
                <p>Code snippets and implementations in JavaScript, Swift, and C++</p>
                <div className="tech-stack">
                    <span className="theme-badge">JavaScript</span>
                    <span className="theme-badge">Swift</span>
                    <span className="theme-badge">C++</span>
                </div>
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
                    <h3>{currentTopic.title}</h3>
                    <p>{currentTopic.description}</p>
                    
                    {currentTopic.questions && (
                        <div className="info-section">
                            <h4>Practice Questions</h4>
                            <div className="questions-list">
                                {currentTopic.questions.map((question, index) => (
                                    <div key={index} className="question-item">
                                        <span className="question-number">{index + 1}.</span>
                                        <span className="question-text">{question}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="highlight-section">
                        <h4>Time & Space Complexity</h4>
                        <div className="grid-2">
                            {selectedTopic === 'arrays' && (
                                <div className="interactive-card">
                                    <h5>Array Operations</h5>
                                    <ul>
                                        <li>Access: O(1)</li>
                                        <li>Search: O(n)</li>
                                        <li>Insertion: O(n)</li>
                                        <li>Deletion: O(n)</li>
                                    </ul>
                                </div>
                            )}
                            {selectedTopic === 'linkedlist' && (
                                <div className="interactive-card">
                                    <h5>Linked List Operations</h5>
                                    <ul>
                                        <li>Access: O(n)</li>
                                        <li>Search: O(n)</li>
                                        <li>Insertion: O(1)</li>
                                        <li>Deletion: O(1)</li>
                                    </ul>
                                </div>
                            )}
                            {selectedTopic === 'trees' && (
                                <div className="interactive-card">
                                    <h5>Binary Tree Traversal</h5>
                                    <ul>
                                        <li>Inorder: O(n)</li>
                                        <li>Preorder: O(n)</li>
                                        <li>Postorder: O(n)</li>
                                        <li>Level Order: O(n)</li>
                                    </ul>
                                </div>
                            )}
                            {selectedTopic === 'sorting' && (
                                <div className="interactive-card">
                                    <h5>Sorting Algorithms</h5>
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

                <div className="content-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                        <h3>{currentCode.title}</h3>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            {languages.map(lang => (
                                <button
                                    key={lang.id}
                                    className={`tech-tag ${selectedLanguage === lang.id ? 'active' : ''}`}
                                    onClick={() => setSelectedLanguage(lang.id)}
                                    title={lang.name}
                                >
                                    {lang.name}
                                </button>
                            ))}
                            <button 
                                className="leftbrain-button"
                                onClick={() => copyToClipboard(currentCode.code)}
                                title="Copy code"
                                style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: 'var(--font-xs)' }}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                    
                    <div className="code-block">
                        <pre><code>{currentCode.code}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DSA;
