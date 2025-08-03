export const heapData = {
    title: 'Heap / Priority Queue',
    description: 'Master heaps and priority queues with problems covering heap construction, insertion, extraction, and heap sort algorithms for efficient data organization and priority-based operations.',
    questions: [
        'Introduction to Heaps - https://leetcode.com/explore/learn/card/heap/',
        'Creating a Heap - https://leetcode.com/problems/kth-largest-element-in-an-array/',
        'Inserting a node in Heap - https://leetcode.com/problems/last-stone-weight/',
        'Extracting Values in Heap & HeapifyDown - https://leetcode.com/problems/kth-largest-element-in-a-stream/',
        'Heap Sort Algorithm - https://leetcode.com/problems/sort-an-array/',
        'Heap Sort Code - https://leetcode.com/problems/sort-an-array/',
        'Heap Sort - Dive Deep - https://leetcode.com/problems/sort-an-array/'
    ],
    explanation: `## Heap / Priority Queue Fundamentals

### Core Heap Properties
**Heap**: A complete binary tree that satisfies the heap property:
- **Max Heap**: Parent nodes are greater than or equal to their children
- **Min Heap**: Parent nodes are less than or equal to their children
- **Complete Binary Tree**: All levels filled except possibly the last, filled left to right

### Essential Heap Operations

#### Time Complexity Analysis
- **Insert (Heapify Up)**: O(log n)
- **Extract Root (Heapify Down)**: O(log n)
- **Peek (Get Root)**: O(1)
- **Build Heap**: O(n)
- **Heap Sort**: O(n log n)

### Heap Implementation

#### 1. Array-Based Heap Representation
\`\`\`swift
// Swift Min Heap Implementation
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
    
    // Helper functions for array indices
    private func leftChildIndex(of index: Int) -> Int {
        return 2 * index + 1
    }
    
    private func rightChildIndex(of index: Int) -> Int {
        return 2 * index + 2
    }
    
    private func parentIndex(of index: Int) -> Int {
        return (index - 1) / 2
    }
}
\`\`\`

#### 2. Heap Insert Operation (Heapify Up)
\`\`\`swift
mutating func insert(_ element: T) {
    elements.append(element)
    heapifyUp(from: elements.count - 1)
}

private mutating func heapifyUp(from index: Int) {
    let parentIndex = self.parentIndex(of: index)
    
    guard index > 0, elements[index] < elements[parentIndex] else {
        return
    }
    
    elements.swapAt(index, parentIndex)
    heapifyUp(from: parentIndex)
}
\`\`\`

#### 3. Heap Extract Operation (Heapify Down)
\`\`\`swift
mutating func extractMin() -> T? {
    guard !elements.isEmpty else { return nil }
    
    if elements.count == 1 {
        return elements.removeLast()
    }
    
    let min = elements[0]
    elements[0] = elements.removeLast()
    heapifyDown(from: 0)
    return min
}

private mutating func heapifyDown(from index: Int) {
    let leftChild = leftChildIndex(of: index)
    let rightChild = rightChildIndex(of: index)
    var smallest = index
    
    if leftChild < elements.count && elements[leftChild] < elements[smallest] {
        smallest = leftChild
    }
    
    if rightChild < elements.count && elements[rightChild] < elements[smallest] {
        smallest = rightChild
    }
    
    guard smallest != index else { return }
    
    elements.swapAt(index, smallest)
    heapifyDown(from: smallest)
}
\`\`\`

### Build Heap Algorithm

#### Floyd's Heap Construction (Bottom-Up)
\`\`\`swift
static func buildHeap(from array: [T]) -> MinHeap<T> {
    var heap = MinHeap<T>()
    heap.elements = array
    
    // Start from last non-leaf node and heapify down
    let lastNonLeafIndex = (array.count - 2) / 2
    for i in stride(from: lastNonLeafIndex, through: 0, by: -1) {
        heap.heapifyDown(from: i)
    }
    
    return heap
}
\`\`\`

### Heap Sort Algorithm

#### Complete Heap Sort Implementation
\`\`\`swift
func heapSort<T: Comparable>(_ array: inout [T]) {
    guard array.count > 1 else { return }
    
    // Build max heap
    buildMaxHeap(&array)
    
    // Extract elements one by one
    for i in stride(from: array.count - 1, to: 0, by: -1) {
        array.swapAt(0, i)  // Move current root to end
        maxHeapify(&array, 0, i)  // Restore heap property
    }
}

func buildMaxHeap<T: Comparable>(_ array: inout [T]) {
    let lastNonLeafIndex = (array.count - 2) / 2
    for i in stride(from: lastNonLeafIndex, through: 0, by: -1) {
        maxHeapify(&array, i, array.count)
    }
}

func maxHeapify<T: Comparable>(_ array: inout [T], _ index: Int, _ heapSize: Int) {
    let leftChild = 2 * index + 1
    let rightChild = 2 * index + 2
    var largest = index
    
    if leftChild < heapSize && array[leftChild] > array[largest] {
        largest = leftChild
    }
    
    if rightChild < heapSize && array[rightChild] > array[largest] {
        largest = rightChild
    }
    
    if largest != index {
        array.swapAt(index, largest)
        maxHeapify(&array, largest, heapSize)
    }
}
\`\`\`

### Priority Queue Applications

#### 1. Task Scheduling
\`\`\`swift
struct Task {
    let priority: Int
    let name: String
}

extension Task: Comparable {
    static func < (lhs: Task, rhs: Task) -> Bool {
        return lhs.priority < rhs.priority  // Higher priority first
    }
}

// Usage
var taskQueue = MinHeap<Task>()
taskQueue.insert(Task(priority: 3, name: "Low Priority"))
taskQueue.insert(Task(priority: 1, name: "High Priority"))
taskQueue.insert(Task(priority: 2, name: "Medium Priority"))
\`\`\`

#### 2. Dijkstra's Algorithm
- Use min heap to always process nearest vertex
- Essential for shortest path algorithms

#### 3. Huffman Coding
- Use min heap to build optimal prefix codes
- Merge smallest frequency nodes first

### Heap Variants and Applications

#### 1. Binary Heap (Most Common)
- Complete binary tree structure
- Array-based implementation
- O(log n) insert/extract operations

#### 2. Fibonacci Heap
- Better amortized performance
- O(1) insert, decrease-key operations
- Used in advanced graph algorithms

#### 3. Binomial Heap
- Collection of binomial trees
- Efficient merge operations
- O(log n) worst-case operations

### Heap vs Other Data Structures

| Operation | Binary Heap | BST (Balanced) | Sorted Array |
|-----------|-------------|----------------|--------------|
| Insert | O(log n) | O(log n) | O(n) |
| Extract Min/Max | O(log n) | O(log n) | O(1) |
| Peek Min/Max | O(1) | O(log n) | O(1) |
| Build from Array | O(n) | O(n log n) | O(n log n) |
| Space | O(1) extra | O(n) pointers | O(1) extra |

### Common Heap Problems

#### 1. Top K Elements
- Use min heap of size K
- Maintain K largest elements efficiently

#### 2. Merge K Sorted Lists
- Use min heap to track smallest elements
- Extract and insert efficiently

#### 3. Running Median
- Use two heaps: max heap for smaller half, min heap for larger half
- Balance heaps to maintain median access

#### 4. Heap Sort Applications
- **In-place sorting**: O(1) extra space
- **Not stable**: Equal elements may change relative order
- **Worst case O(n log n)**: Better than quicksort worst case

### Advanced Heap Techniques

#### 1. Lazy Deletion
- Mark elements as deleted instead of immediate removal
- Clean up during extract operations

#### 2. Heap with Decrease Key
- Maintain element indices for O(log n) priority updates
- Essential for Dijkstra's and Prim's algorithms

#### 3. Multi-way Heaps
- D-ary heaps with more than 2 children per node
- Trade-off between tree height and comparison cost

✅ **Pro Tips**:
- Use heaps for priority-based operations
- Build heap is O(n), not O(n log n)
- Heap sort is in-place but not stable
- Min/Max heap selection depends on problem requirements

❌ **Common Pitfalls**:
- Confusing min heap vs max heap requirements
- Incorrect parent/child index calculations
- Forgetting to maintain heap property after modifications
- Using heap when simpler data structure suffices`,
    javascript: {
        title: 'Heap/Priority Queue Algorithms in JavaScript',
        code: `// 1. Introduction to Heaps - Min Heap Implementation
class MinHeap {
    constructor() {
        this.elements = [];
    }
    
    // Helper methods for array indices
    leftChildIndex(index) {
        return 2 * index + 1;
    }
    
    rightChildIndex(index) {
        return 2 * index + 2;
    }
    
    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    hasLeftChild(index) {
        return this.leftChildIndex(index) < this.elements.length;
    }
    
    hasRightChild(index) {
        return this.rightChildIndex(index) < this.elements.length;
    }
    
    hasParent(index) {
        return this.parentIndex(index) >= 0;
    }
    
    leftChild(index) {
        return this.elements[this.leftChildIndex(index)];
    }
    
    rightChild(index) {
        return this.elements[this.rightChildIndex(index)];
    }
    
    parent(index) {
        return this.elements[this.parentIndex(index)];
    }
    
    swap(index1, index2) {
        [this.elements[index1], this.elements[index2]] = 
        [this.elements[index2], this.elements[index1]];
    }
    
    peek() {
        if (this.elements.length === 0) return null;
        return this.elements[0];
    }
    
    size() {
        return this.elements.length;
    }
    
    isEmpty() {
        return this.elements.length === 0;
    }
}

// 2. Creating a Heap - Build Heap from Array
MinHeap.prototype.buildHeap = function(array) {
    this.elements = [...array];
    // Start from last non-leaf node and heapify down
    const lastNonLeafIndex = Math.floor((this.elements.length - 2) / 2);
    for (let i = lastNonLeafIndex; i >= 0; i--) {
        this.heapifyDown(i);
    }
};

// 3. Inserting a node in Heap
MinHeap.prototype.insert = function(element) {
    this.elements.push(element);
    this.heapifyUp(this.elements.length - 1);
};

MinHeap.prototype.heapifyUp = function(index) {
    if (!this.hasParent(index)) return;
    
    const parentIdx = this.parentIndex(index);
    if (this.elements[index] < this.parent(index)) {
        this.swap(index, parentIdx);
        this.heapifyUp(parentIdx);
    }
};

// 4. Extracting Values in Heap & HeapifyDown
MinHeap.prototype.extractMin = function() {
    if (this.elements.length === 0) return null;
    
    if (this.elements.length === 1) {
        return this.elements.pop();
    }
    
    const min = this.elements[0];
    this.elements[0] = this.elements.pop();
    this.heapifyDown(0);
    return min;
};

MinHeap.prototype.heapifyDown = function(index) {
    let smallest = index;
    
    if (this.hasLeftChild(index) && 
        this.leftChild(index) < this.elements[smallest]) {
        smallest = this.leftChildIndex(index);
    }
    
    if (this.hasRightChild(index) && 
        this.rightChild(index) < this.elements[smallest]) {
        smallest = this.rightChildIndex(index);
    }
    
    if (smallest !== index) {
        this.swap(index, smallest);
        this.heapifyDown(smallest);
    }
};

// Max Heap for Heap Sort
class MaxHeap extends MinHeap {
    heapifyUp(index) {
        if (!this.hasParent(index)) return;
        
        const parentIdx = this.parentIndex(index);
        if (this.elements[index] > this.parent(index)) {
            this.swap(index, parentIdx);
            this.heapifyUp(parentIdx);
        }
    }
    
    heapifyDown(index) {
        let largest = index;
        
        if (this.hasLeftChild(index) && 
            this.leftChild(index) > this.elements[largest]) {
            largest = this.leftChildIndex(index);
        }
        
        if (this.hasRightChild(index) && 
            this.rightChild(index) > this.elements[largest]) {
            largest = this.rightChildIndex(index);
        }
        
        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }
    
    extractMax() {
        return this.extractMin(); // Same logic, different property
    }
}

// 5. Heap Sort Algorithm
function heapSort(array) {
    if (array.length <= 1) return array;
    
    const result = [...array];
    
    // Build max heap
    buildMaxHeap(result);
    
    // Extract elements one by one
    for (let i = result.length - 1; i > 0; i--) {
        // Move current root to end
        [result[0], result[i]] = [result[i], result[0]];
        
        // Restore heap property for reduced heap
        maxHeapify(result, 0, i);
    }
    
    return result;
}

function buildMaxHeap(array) {
    const lastNonLeafIndex = Math.floor((array.length - 2) / 2);
    for (let i = lastNonLeafIndex; i >= 0; i--) {
        maxHeapify(array, i, array.length);
    }
}

function maxHeapify(array, index, heapSize) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let largest = index;
    
    if (leftChild < heapSize && array[leftChild] > array[largest]) {
        largest = leftChild;
    }
    
    if (rightChild < heapSize && array[rightChild] > array[largest]) {
        largest = rightChild;
    }
    
    if (largest !== index) {
        [array[index], array[largest]] = [array[largest], array[index]];
        maxHeapify(array, largest, heapSize);
    }
}

// 6. Priority Queue Implementation
class PriorityQueue {
    constructor(compareFn = (a, b) => a.priority - b.priority) {
        this.heap = new MinHeap();
        this.compare = compareFn;
    }
    
    enqueue(element) {
        this.heap.insert(element);
        // Re-heapify based on custom comparison
        this.maintainPriority();
    }
    
    dequeue() {
        return this.heap.extractMin();
    }
    
    peek() {
        return this.heap.peek();
    }
    
    isEmpty() {
        return this.heap.isEmpty();
    }
    
    size() {
        return this.heap.size();
    }
    
    maintainPriority() {
        // Sort elements based on priority and rebuild heap
        this.heap.elements.sort(this.compare);
        this.heap.buildHeap(this.heap.elements);
    }
}

// 7. Common Heap Applications

// Find Kth Largest Element
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

// Top K Frequent Elements
function topKFrequent(nums, k) {
    const frequencyMap = new Map();
    
    // Count frequencies
    for (let num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Use min heap to keep top K elements
    const minHeap = new MinHeap();
    
    for (let [num, freq] of frequencyMap) {
        minHeap.insert({ value: num, frequency: freq });
        
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }
    
    return minHeap.elements.map(item => item.value);
}

// Merge K Sorted Lists (using heap)
function mergeKLists(lists) {
    const minHeap = new MinHeap();
    const result = [];
    
    // Initialize heap with first element from each list
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].length > 0) {
            minHeap.insert({ 
                value: lists[i][0], 
                listIndex: i, 
                elementIndex: 0 
            });
        }
    }
    
    while (!minHeap.isEmpty()) {
        const { value, listIndex, elementIndex } = minHeap.extractMin();
        result.push(value);
        
        // Add next element from same list
        if (elementIndex + 1 < lists[listIndex].length) {
            minHeap.insert({
                value: lists[listIndex][elementIndex + 1],
                listIndex,
                elementIndex: elementIndex + 1
            });
        }
    }
    
    return result;
}

// Running Median using two heaps
class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap(); // For smaller half
        this.minHeap = new MinHeap(); // For larger half
    }
    
    addNum(num) {
        // Add to appropriate heap
        if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
            this.maxHeap.insert(num);
        } else {
            this.minHeap.insert(num);
        }
        
        // Balance heaps
        this.balance();
    }
    
    balance() {
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.insert(this.maxHeap.extractMax());
        } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
            this.maxHeap.insert(this.minHeap.extractMin());
        }
    }
    
    findMedian() {
        if (this.maxHeap.size() === this.minHeap.size()) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        }
        
        return this.maxHeap.size() > this.minHeap.size() ? 
               this.maxHeap.peek() : this.minHeap.peek();
    }
}

// Test cases
const heap = new MinHeap();
heap.buildHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]);
console.log("Heap elements:", heap.elements); // Min heap order

console.log("Extract min:", heap.extractMin()); // 1
console.log("Extract min:", heap.extractMin()); // 2

const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", unsorted);
console.log("Heap sorted:", heapSort(unsorted));

console.log("Kth largest:", findKthLargest([3,2,1,5,6,4], 2)); // 5

const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log("Median:", medianFinder.findMedian()); // 1.5`
    },
    swift: {
        title: 'Heap/Priority Queue Algorithms in Swift',
        code: `import Foundation

// 1. Introduction to Heaps - Min Heap Implementation
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
    
    // Helper methods for array indices
    private func leftChildIndex(of index: Int) -> Int {
        return 2 * index + 1
    }
    
    private func rightChildIndex(of index: Int) -> Int {
        return 2 * index + 2
    }
    
    private func parentIndex(of index: Int) -> Int {
        return (index - 1) / 2
    }
    
    private func hasLeftChild(at index: Int) -> Bool {
        return leftChildIndex(of: index) < elements.count
    }
    
    private func hasRightChild(at index: Int) -> Bool {
        return rightChildIndex(of: index) < elements.count
    }
    
    private func hasParent(at index: Int) -> Bool {
        return parentIndex(of: index) >= 0
    }
}

// 2. Creating a Heap - Build Heap from Array
extension MinHeap {
    mutating func buildHeap(from array: [T]) {
        elements = array
        // Start from last non-leaf node and heapify down
        let lastNonLeafIndex = (elements.count - 2) / 2
        for i in stride(from: lastNonLeafIndex, through: 0, by: -1) {
            heapifyDown(from: i)
        }
    }
}

// 3. Inserting a node in Heap
extension MinHeap {
    mutating func insert(_ element: T) {
        elements.append(element)
        heapifyUp(from: elements.count - 1)
    }
    
    private mutating func heapifyUp(from index: Int) {
        guard hasParent(at: index) else { return }
        
        let parentIndex = self.parentIndex(of: index)
        if elements[index] < elements[parentIndex] {
            elements.swapAt(index, parentIndex)
            heapifyUp(from: parentIndex)
        }
    }
}

// 4. Extracting Values in Heap & HeapifyDown
extension MinHeap {
    @discardableResult
    mutating func extractMin() -> T? {
        guard !elements.isEmpty else { return nil }
        
        if elements.count == 1 {
            return elements.removeLast()
        }
        
        let min = elements[0]
        elements[0] = elements.removeLast()
        heapifyDown(from: 0)
        return min
    }
    
    private mutating func heapifyDown(from index: Int) {
        let leftChild = leftChildIndex(of: index)
        let rightChild = rightChildIndex(of: index)
        var smallest = index
        
        if leftChild < elements.count && elements[leftChild] < elements[smallest] {
            smallest = leftChild
        }
        
        if rightChild < elements.count && elements[rightChild] < elements[smallest] {
            smallest = rightChild
        }
        
        guard smallest != index else { return }
        
        elements.swapAt(index, smallest)
        heapifyDown(from: smallest)
    }
}

// Max Heap for Heap Sort
struct MaxHeap<T: Comparable> {
    private var elements: [T] = []
    
    var isEmpty: Bool { elements.isEmpty }
    var count: Int { elements.count }
    func peek() -> T? { elements.first }
    
    private func leftChildIndex(of index: Int) -> Int { 2 * index + 1 }
    private func rightChildIndex(of index: Int) -> Int { 2 * index + 2 }
    private func parentIndex(of index: Int) -> Int { (index - 1) / 2 }
    
    mutating func insert(_ element: T) {
        elements.append(element)
        heapifyUp(from: elements.count - 1)
    }
    
    private mutating func heapifyUp(from index: Int) {
        guard index > 0 else { return }
        
        let parentIndex = self.parentIndex(of: index)
        if elements[index] > elements[parentIndex] {
            elements.swapAt(index, parentIndex)
            heapifyUp(from: parentIndex)
        }
    }
    
    @discardableResult
    mutating func extractMax() -> T? {
        guard !elements.isEmpty else { return nil }
        
        if elements.count == 1 {
            return elements.removeLast()
        }
        
        let max = elements[0]
        elements[0] = elements.removeLast()
        heapifyDown(from: 0)
        return max
    }
    
    private mutating func heapifyDown(from index: Int) {
        let leftChild = leftChildIndex(of: index)
        let rightChild = rightChildIndex(of: index)
        var largest = index
        
        if leftChild < elements.count && elements[leftChild] > elements[largest] {
            largest = leftChild
        }
        
        if rightChild < elements.count && elements[rightChild] > elements[largest] {
            largest = rightChild
        }
        
        guard largest != index else { return }
        
        elements.swapAt(index, largest)
        heapifyDown(from: largest)
    }
}

// 5. Heap Sort Algorithm
func heapSort<T: Comparable>(_ array: inout [T]) {
    guard array.count > 1 else { return }
    
    // Build max heap
    buildMaxHeap(&array)
    
    // Extract elements one by one
    for i in stride(from: array.count - 1, to: 0, by: -1) {
        array.swapAt(0, i)  // Move current root to end
        maxHeapify(&array, 0, i)  // Restore heap property
    }
}

func buildMaxHeap<T: Comparable>(_ array: inout [T]) {
    let lastNonLeafIndex = (array.count - 2) / 2
    for i in stride(from: lastNonLeafIndex, through: 0, by: -1) {
        maxHeapify(&array, i, array.count)
    }
}

func maxHeapify<T: Comparable>(_ array: inout [T], _ index: Int, _ heapSize: Int) {
    let leftChild = 2 * index + 1
    let rightChild = 2 * index + 2
    var largest = index
    
    if leftChild < heapSize && array[leftChild] > array[largest] {
        largest = leftChild
    }
    
    if rightChild < heapSize && array[rightChild] > array[largest] {
        largest = rightChild
    }
    
    if largest != index {
        array.swapAt(index, largest)
        maxHeapify(&array, largest, heapSize)
    }
}

// 6. Priority Queue Implementation
struct PriorityQueue<T> {
    private var heap: MinHeap<Element>
    
    private struct Element: Comparable {
        let value: T
        let priority: Int
        
        static func < (lhs: Element, rhs: Element) -> Bool {
            return lhs.priority < rhs.priority
        }
        
        static func == (lhs: Element, rhs: Element) -> Bool {
            return lhs.priority == rhs.priority
        }
    }
    
    init() {
        heap = MinHeap<Element>()
    }
    
    var isEmpty: Bool {
        return heap.isEmpty
    }
    
    var count: Int {
        return heap.count
    }
    
    mutating func enqueue(_ value: T, priority: Int) {
        let element = Element(value: value, priority: priority)
        heap.insert(element)
    }
    
    @discardableResult
    mutating func dequeue() -> T? {
        return heap.extractMin()?.value
    }
    
    func peek() -> T? {
        return heap.peek()?.value
    }
}

// 7. Common Heap Applications

// Find Kth Largest Element
func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
    var minHeap = MinHeap<Int>()
    
    for num in nums {
        minHeap.insert(num)
        if minHeap.count > k {
            minHeap.extractMin()
        }
    }
    
    return minHeap.peek() ?? 0
}

// Top K Frequent Elements
func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
    var frequencyMap: [Int: Int] = [:]
    
    // Count frequencies
    for num in nums {
        frequencyMap[num, default: 0] += 1
    }
    
    // Use min heap to keep top K elements
    var minHeap = MinHeap<(Int, Int)>()
    
    for (num, freq) in frequencyMap {
        minHeap.insert((freq, num))
        
        if minHeap.count > k {
            minHeap.extractMin()
        }
    }
    
    return minHeap.elements.map { $0.1 }
}

extension MinHeap where T == (Int, Int) {
    private var elements: [(Int, Int)] {
        get { return self.elements }
        set { self.elements = newValue }
    }
}

// Running Median using two heaps
class MedianFinder {
    private var maxHeap = MaxHeap<Int>() // For smaller half
    private var minHeap = MinHeap<Int>() // For larger half
    
    func addNum(_ num: Int) {
        // Add to appropriate heap
        if maxHeap.isEmpty || num <= maxHeap.peek()! {
            maxHeap.insert(num)
        } else {
            minHeap.insert(num)
        }
        
        // Balance heaps
        balance()
    }
    
    private func balance() {
        if maxHeap.count > minHeap.count + 1 {
            minHeap.insert(maxHeap.extractMax()!)
        } else if minHeap.count > maxHeap.count + 1 {
            maxHeap.insert(minHeap.extractMin()!)
        }
    }
    
    func findMedian() -> Double {
        if maxHeap.count == minHeap.count {
            return Double(maxHeap.peek()! + minHeap.peek()!) / 2.0
        }
        
        return Double(maxHeap.count > minHeap.count ? maxHeap.peek()! : minHeap.peek()!)
    }
}

// Test cases
var heap = MinHeap<Int>()
heap.buildHeap(from: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7])
print("Heap elements:", heap.elements) // Min heap order

print("Extract min:", heap.extractMin() ?? "nil") // 1
print("Extract min:", heap.extractMin() ?? "nil") // 2

var unsorted = [64, 34, 25, 12, 22, 11, 90]
print("Original:", unsorted)
heapSort(&unsorted)
print("Heap sorted:", unsorted)

print("Kth largest:", findKthLargest([3,2,1,5,6,4], 2)) // 5

let medianFinder = MedianFinder()
medianFinder.addNum(1)
medianFinder.addNum(2)
print("Median:", medianFinder.findMedian()) // 1.5

var priorityQueue = PriorityQueue<String>()
priorityQueue.enqueue("Low Priority Task", priority: 3)
priorityQueue.enqueue("High Priority Task", priority: 1)
priorityQueue.enqueue("Medium Priority Task", priority: 2)

print("Next task:", priorityQueue.dequeue() ?? "None") // High Priority Task`
    },
    cpp: {
        title: 'Heap/Priority Queue Algorithms in C++',
        code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <unordered_map>
#include <functional>

using namespace std;

// 1. Introduction to Heaps - Min Heap Implementation
template<typename T>
class MinHeap {
private:
    vector<T> elements;
    
    int leftChildIndex(int index) { return 2 * index + 1; }
    int rightChildIndex(int index) { return 2 * index + 2; }
    int parentIndex(int index) { return (index - 1) / 2; }
    
    bool hasLeftChild(int index) { return leftChildIndex(index) < elements.size(); }
    bool hasRightChild(int index) { return rightChildIndex(index) < elements.size(); }
    bool hasParent(int index) { return parentIndex(index) >= 0; }
    
    T leftChild(int index) { return elements[leftChildIndex(index)]; }
    T rightChild(int index) { return elements[rightChildIndex(index)]; }
    T parent(int index) { return elements[parentIndex(index)]; }
    
public:
    bool isEmpty() { return elements.empty(); }
    int size() { return elements.size(); }
    
    T peek() {
        if (elements.empty()) throw runtime_error("Heap is empty");
        return elements[0];
    }
    
    // 2. Creating a Heap - Build Heap from Array
    void buildHeap(const vector<T>& array) {
        elements = array;
        // Start from last non-leaf node and heapify down
        int lastNonLeafIndex = (elements.size() - 2) / 2;
        for (int i = lastNonLeafIndex; i >= 0; i--) {
            heapifyDown(i);
        }
    }
    
    // 3. Inserting a node in Heap
    void insert(const T& element) {
        elements.push_back(element);
        heapifyUp(elements.size() - 1);
    }
    
private:
    void heapifyUp(int index) {
        if (!hasParent(index)) return;
        
        int parentIdx = parentIndex(index);
        if (elements[index] < parent(index)) {
            swap(elements[index], elements[parentIdx]);
            heapifyUp(parentIdx);
        }
    }
    
public:
    // 4. Extracting Values in Heap & HeapifyDown
    T extractMin() {
        if (elements.empty()) throw runtime_error("Heap is empty");
        
        if (elements.size() == 1) {
            T min = elements.back();
            elements.pop_back();
            return min;
        }
        
        T min = elements[0];
        elements[0] = elements.back();
        elements.pop_back();
        heapifyDown(0);
        return min;
    }
    
private:
    void heapifyDown(int index) {
        int leftChild = leftChildIndex(index);
        int rightChild = rightChildIndex(index);
        int smallest = index;
        
        if (leftChild < elements.size() && elements[leftChild] < elements[smallest]) {
            smallest = leftChild;
        }
        
        if (rightChild < elements.size() && elements[rightChild] < elements[smallest]) {
            smallest = rightChild;
        }
        
        if (smallest != index) {
            swap(elements[index], elements[smallest]);
            heapifyDown(smallest);
        }
    }
    
public:
    // For debugging
    void printHeap() {
        cout << "Heap: ";
        for (const T& elem : elements) {
            cout << elem << " ";
        }
        cout << endl;
    }
};

// Max Heap for Heap Sort
template<typename T>
class MaxHeap {
private:
    vector<T> elements;
    
    int leftChildIndex(int index) { return 2 * index + 1; }
    int rightChildIndex(int index) { return 2 * index + 2; }
    int parentIndex(int index) { return (index - 1) / 2; }
    
    void heapifyUp(int index) {
        if (index <= 0) return;
        
        int parentIdx = parentIndex(index);
        if (elements[index] > elements[parentIdx]) {
            swap(elements[index], elements[parentIdx]);
            heapifyUp(parentIdx);
        }
    }
    
    void heapifyDown(int index) {
        int leftChild = leftChildIndex(index);
        int rightChild = rightChildIndex(index);
        int largest = index;
        
        if (leftChild < elements.size() && elements[leftChild] > elements[largest]) {
            largest = leftChild;
        }
        
        if (rightChild < elements.size() && elements[rightChild] > elements[largest]) {
            largest = rightChild;
        }
        
        if (largest != index) {
            swap(elements[index], elements[largest]);
            heapifyDown(largest);
        }
    }
    
public:
    bool isEmpty() { return elements.empty(); }
    int size() { return elements.size(); }
    T peek() { return elements.empty() ? T() : elements[0]; }
    
    void insert(const T& element) {
        elements.push_back(element);
        heapifyUp(elements.size() - 1);
    }
    
    T extractMax() {
        if (elements.empty()) return T();
        
        if (elements.size() == 1) {
            T max = elements.back();
            elements.pop_back();
            return max;
        }
        
        T max = elements[0];
        elements[0] = elements.back();
        elements.pop_back();
        heapifyDown(0);
        return max;
    }
};

// 5. Heap Sort Algorithm
template<typename T>
void heapSort(vector<T>& array) {
    if (array.size() <= 1) return;
    
    // Build max heap
    buildMaxHeap(array);
    
    // Extract elements one by one
    for (int i = array.size() - 1; i > 0; i--) {
        // Move current root to end
        swap(array[0], array[i]);
        
        // Restore heap property for reduced heap
        maxHeapify(array, 0, i);
    }
}

template<typename T>
void buildMaxHeap(vector<T>& array) {
    int lastNonLeafIndex = (array.size() - 2) / 2;
    for (int i = lastNonLeafIndex; i >= 0; i--) {
        maxHeapify(array, i, array.size());
    }
}

template<typename T>
void maxHeapify(vector<T>& array, int index, int heapSize) {
    int leftChild = 2 * index + 1;
    int rightChild = 2 * index + 2;
    int largest = index;
    
    if (leftChild < heapSize && array[leftChild] > array[largest]) {
        largest = leftChild;
    }
    
    if (rightChild < heapSize && array[rightChild] > array[largest]) {
        largest = rightChild;
    }
    
    if (largest != index) {
        swap(array[index], array[largest]);
        maxHeapify(array, largest, heapSize);
    }
}

// 6. Priority Queue using STL
template<typename T>
class PriorityQueue {
private:
    struct Element {
        T value;
        int priority;
        
        bool operator<(const Element& other) const {
            return priority > other.priority; // Min heap (lower priority first)
        }
    };
    
    priority_queue<Element> pq;
    
public:
    bool empty() { return pq.empty(); }
    int size() { return pq.size(); }
    
    void enqueue(const T& value, int priority) {
        pq.push({value, priority});
    }
    
    T dequeue() {
        if (pq.empty()) throw runtime_error("Priority queue is empty");
        T value = pq.top().value;
        pq.pop();
        return value;
    }
    
    T peek() {
        if (pq.empty()) throw runtime_error("Priority queue is empty");
        return pq.top().value;
    }
};

// 7. Common Heap Applications

// Find Kth Largest Element
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap; // Min heap
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    return minHeap.top();
}

// Top K Frequent Elements
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> frequencyMap;
    
    // Count frequencies
    for (int num : nums) {
        frequencyMap[num]++;
    }
    
    // Use min heap to keep top K elements
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
    
    for (auto& [num, freq] : frequencyMap) {
        minHeap.push({freq, num});
        
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().second);
        minHeap.pop();
    }
    
    return result;
}

// Running Median using two heaps
class MedianFinder {
private:
    priority_queue<int> maxHeap; // For smaller half
    priority_queue<int, vector<int>, greater<int>> minHeap; // For larger half
    
public:
    void addNum(int num) {
        // Add to appropriate heap
        if (maxHeap.empty() || num <= maxHeap.top()) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }
        
        // Balance heaps
        balance();
    }
    
private:
    void balance() {
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size() + 1) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
public:
    double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        }
        
        return maxHeap.size() > minHeap.size() ? maxHeap.top() : minHeap.top();
    }
};

// Merge K Sorted Arrays
vector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {
    struct Element {
        int value;
        int arrayIndex;
        int elementIndex;
        
        bool operator>(const Element& other) const {
            return value > other.value;
        }
    };
    
    priority_queue<Element, vector<Element>, greater<Element>> minHeap;
    vector<int> result;
    
    // Initialize heap with first element from each array
    for (int i = 0; i < arrays.size(); i++) {
        if (!arrays[i].empty()) {
            minHeap.push({arrays[i][0], i, 0});
        }
    }
    
    while (!minHeap.empty()) {
        Element current = minHeap.top();
        minHeap.pop();
        
        result.push_back(current.value);
        
        // Add next element from same array
        if (current.elementIndex + 1 < arrays[current.arrayIndex].size()) {
            minHeap.push({
                arrays[current.arrayIndex][current.elementIndex + 1],
                current.arrayIndex,
                current.elementIndex + 1
            });
        }
    }
    
    return result;
}

// Test function
int main() {
    MinHeap<int> heap;
    vector<int> testArray = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
    heap.buildHeap(testArray);
    heap.printHeap(); // Min heap order
    
    cout << "Extract min: " << heap.extractMin() << endl; // 1
    cout << "Extract min: " << heap.extractMin() << endl; // 2
    
    vector<int> unsorted = {64, 34, 25, 12, 22, 11, 90};
    cout << "Original: ";
    for (int x : unsorted) cout << x << " ";
    cout << endl;
    
    heapSort(unsorted);
    cout << "Heap sorted: ";
    for (int x : unsorted) cout << x << " ";
    cout << endl;
    
    vector<int> kthArray = {3, 2, 1, 5, 6, 4};
    cout << "Kth largest: " << findKthLargest(kthArray, 2) << endl; // 5
    
    MedianFinder medianFinder;
    medianFinder.addNum(1);
    medianFinder.addNum(2);
    cout << "Median: " << medianFinder.findMedian() << endl; // 1.5
    
    PriorityQueue<string> priorityQueue;
    priorityQueue.enqueue("Low Priority Task", 3);
    priorityQueue.enqueue("High Priority Task", 1);
    priorityQueue.enqueue("Medium Priority Task", 2);
    
    cout << "Next task: " << priorityQueue.dequeue() << endl; // High Priority Task
    
    return 0;
}`
    }
};