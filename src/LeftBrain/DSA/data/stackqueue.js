export const stackQueueData = {
    title: 'Stack and Queues',
    description: 'Master LIFO and FIFO data structures with problems covering stack operations, queue implementations, and real-world applications like expression evaluation and BFS algorithms.',
    questions: [
        'Introduction to Stacks & Queues - https://leetcode.com/explore/learn/card/queue-stack/',
        'Playing with Stacks & Queues - https://leetcode.com/explore/learn/card/queue-stack/',
        'Implement Stack using Two Queues - https://leetcode.com/problems/implement-stack-using-queues/',
        'Implement Stack using One Queue - https://leetcode.com/problems/implement-stack-using-queues/',
        'Implement Queue using Stacks - https://leetcode.com/problems/implement-queue-using-stacks/',
        'Valid Parentheses - https://leetcode.com/problems/valid-parentheses/',
        'Min Stack - https://leetcode.com/problems/min-stack/',
        'Remove Outermost Parentheses - Using Stack - https://leetcode.com/problems/remove-outermost-parentheses/',
        'Remove Outermost Parentheses - without Stack - https://leetcode.com/problems/remove-outermost-parentheses/',
        'Evaluate Reverse Polish Notation - https://leetcode.com/problems/evaluate-reverse-polish-notation/',
        'Next Greater Element - https://leetcode.com/problems/next-greater-element-i/',
        'Daily Temperatures - https://leetcode.com/problems/daily-temperatures/',
        'Next Greater Element - II - https://leetcode.com/problems/next-greater-element-ii/'
    ],
    explanation: `## Stack and Queue Fundamentals

### Core Concepts
**Stack (LIFO - Last In, First Out)**: Elements are added and removed from the same end (top).
**Queue (FIFO - First In, First Out)**: Elements are added at one end (rear) and removed from the other (front).

### Essential Operations

#### Stack Operations
- **Push**: Add element to top - O(1)
- **Pop**: Remove element from top - O(1)
- **Peek/Top**: View top element - O(1)
- **isEmpty**: Check if stack is empty - O(1)

#### Queue Operations
- **Enqueue**: Add element to rear - O(1)
- **Dequeue**: Remove element from front - O(1)
- **Front**: View front element - O(1)
- **isEmpty**: Check if queue is empty - O(1)

### Implementation Strategies

#### 1. Array-Based Implementation
\`\`\`swift
// Swift Stack using Array
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
}
\`\`\`

#### 2. Linked List Implementation
\`\`\`swift
// Swift Queue using Linked List
class QueueNode<T> {
    var value: T
    var next: QueueNode<T>?
    
    init(_ value: T) {
        self.value = value
    }
}

struct Queue<T> {
    private var front: QueueNode<T>?
    private var rear: QueueNode<T>?
    
    mutating func enqueue(_ value: T) {
        let newNode = QueueNode(value)
        if rear == nil {
            front = newNode
            rear = newNode
        } else {
            rear?.next = newNode
            rear = newNode
        }
    }
    
    mutating func dequeue() -> T? {
        guard let frontNode = front else { return nil }
        front = frontNode.next
        if front == nil { rear = nil }
        return frontNode.value
    }
}
\`\`\`

### Advanced Stack & Queue Applications

#### Expression Evaluation
- **Infix to Postfix**: Convert expressions using stack
- **Postfix Evaluation**: Evaluate using stack operations
- **Balanced Parentheses**: Validate using stack matching

#### Monotonic Stack/Queue
- **Next Greater Element**: Use stack to find next larger elements
- **Sliding Window Maximum**: Use deque for efficient window operations

#### BFS Applications
- **Level Order Traversal**: Use queue for tree/graph traversal
- **Shortest Path**: BFS with queue for unweighted graphs

### Complexity Analysis

| Data Structure | Operation | Time | Space | Implementation |
|---------------|-----------|------|-------|----------------|
| Stack (Array) | Push/Pop | O(1) | O(n) | Dynamic array |
| Stack (LinkedList) | Push/Pop | O(1) | O(n) | Linked nodes |
| Queue (Array) | Enqueue/Dequeue | O(1)* | O(n) | Circular buffer |
| Queue (LinkedList) | Enqueue/Dequeue | O(1) | O(n) | Two pointers |

*Amortized for dynamic arrays

### Problem Categories

#### Basic Operations (1-5)
- Understanding fundamental stack/queue operations
- Implementation using different data structures
- Converting between stack and queue

#### Expression Processing (6-9)
- Parentheses validation and manipulation
- Stack-based parsing and evaluation
- Alternative approaches without extra space

#### Advanced Applications (10-13)
- Monotonic stack for next greater elements
- Complex expression evaluation
- Circular array processing

### Design Patterns

#### 1. Two-Stack Queue
\`\`\`swift
struct QueueUsingStacks<T> {
    private var stack1: [T] = []  // For enqueue
    private var stack2: [T] = []  // For dequeue
    
    mutating func enqueue(_ item: T) {
        stack1.append(item)
    }
    
    mutating func dequeue() -> T? {
        if stack2.isEmpty {
            while !stack1.isEmpty {
                stack2.append(stack1.removeLast())
            }
        }
        return stack2.popLast()
    }
}
\`\`\`

#### 2. Min Stack Pattern
\`\`\`swift
struct MinStack {
    private var stack: [Int] = []
    private var minStack: [Int] = []
    
    mutating func push(_ val: Int) {
        stack.append(val)
        if minStack.isEmpty || val <= minStack.last! {
            minStack.append(val)
        }
    }
    
    mutating func pop() {
        if let popped = stack.popLast() {
            if popped == minStack.last {
                minStack.removeLast()
            }
        }
    }
    
    func getMin() -> Int {
        return minStack.last ?? 0
    }
}
\`\`\`

✅ **Pro Tips**:
- Use stacks for nested structures and backtracking
- Use queues for level-order processing and BFS
- Consider deque for sliding window problems
- Monotonic stacks/queues for optimization problems

❌ **Common Pitfalls**:
- Stack overflow with deep recursion
- Queue front/rear pointer management
- Forgetting to check empty conditions
- Circular queue implementation complexity`,
    javascript: {
        title: 'Stack & Queue Algorithms in JavaScript',
        code: `// 1. Introduction to Stacks & Queues
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

// 2. Playing with Stacks & Queues
function demonstrateStackQueue() {
    const stack = new Stack();
    const queue = new Queue();
    
    // Stack operations (LIFO)
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log(stack.pop()); // 3
    console.log(stack.pop()); // 2
    
    // Queue operations (FIFO)
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    console.log(queue.dequeue()); // 1
    console.log(queue.dequeue()); // 2
}

// 3. Implement Stack using Two Queues
class StackUsingTwoQueues {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }
    
    push(x) {
        this.queue2.push(x);
        while (this.queue1.length > 0) {
            this.queue2.push(this.queue1.shift());
        }
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
    }
    
    pop() {
        return this.queue1.shift();
    }
    
    top() {
        return this.queue1[0];
    }
    
    empty() {
        return this.queue1.length === 0;
    }
}

// 4. Implement Stack using One Queue
class StackUsingOneQueue {
    constructor() {
        this.queue = [];
    }
    
    push(x) {
        this.queue.push(x);
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue.push(this.queue.shift());
        }
    }
    
    pop() {
        return this.queue.shift();
    }
    
    top() {
        return this.queue[0];
    }
    
    empty() {
        return this.queue.length === 0;
    }
}

// 5. Implement Queue using Stacks
class QueueUsingStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    
    enqueue(x) {
        this.stack1.push(x);
    }
    
    dequeue() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2.pop();
    }
    
    peek() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length - 1];
    }
    
    empty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}

// 6. Valid Parentheses
function isValid(s) {
    const stack = [];
    const mapping = {')': '(', '}': '{', ']': '['};
    
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

// 7. Min Stack
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        const popped = this.stack.pop();
        if (popped === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// 8. Remove Outermost Parentheses - Using Stack
function removeOuterParenthesesStack(s) {
    const stack = [];
    let result = '';
    
    for (let char of s) {
        if (char === '(') {
            if (stack.length > 0) {
                result += char;
            }
            stack.push(char);
        } else {
            stack.pop();
            if (stack.length > 0) {
                result += char;
            }
        }
    }
    
    return result;
}

// 9. Remove Outermost Parentheses - without Stack
function removeOuterParenthesesNoStack(s) {
    let result = '';
    let depth = 0;
    
    for (let char of s) {
        if (char === '(') {
            if (depth > 0) {
                result += char;
            }
            depth++;
        } else {
            depth--;
            if (depth > 0) {
                result += char;
            }
        }
    }
    
    return result;
}

// 10. Evaluate Reverse Polish Notation
function evalRPN(tokens) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (let token of tokens) {
        if (token in operators) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}

// 11. Next Greater Element
function nextGreaterElement(nums1, nums2) {
    const stack = [];
    const map = new Map();
    
    // Build next greater map for nums2
    for (let num of nums2) {
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }
    
    // Map results for nums1
    return nums1.map(num => map.get(num) || -1);
}

// 12. Daily Temperatures
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = i - index;
        }
        stack.push(i);
    }
    
    return result;
}

// 13. Next Greater Element - II (Circular)
function nextGreaterElements(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    // Process array twice to handle circular nature
    for (let i = 0; i < 2 * n; i++) {
        const num = nums[i % n];
        while (stack.length > 0 && nums[stack[stack.length - 1]] < num) {
            result[stack.pop()] = num;
        }
        if (i < n) {
            stack.push(i);
        }
    }
    
    return result;
}


// Test cases
console.log(isValid("()[]{}"));  // true
console.log(removeOuterParenthesesNoStack("(()())(())"));  // "()()"
console.log(evalRPN(["2", "1", "+", "3", "*"]));  // 9
console.log(nextGreaterElement([4,1,2], [1,3,4,2]));  // [-1,3,-1]
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));  // [1,1,4,2,1,1,0,0]`
    },
    swift: {
        title: 'Stack & Queue Algorithms in Swift',
        code: `// 1. Introduction to Stacks & Queues
struct Stack<T> {
    private var items: [T] = []
    
    mutating func push(_ item: T) {
        items.append(item)
    }
    
    @discardableResult
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

struct Queue<T> {
    private var items: [T] = []
    
    mutating func enqueue(_ item: T) {
        items.append(item)
    }
    
    @discardableResult
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

// 2. Playing with Stacks & Queues
func demonstrateStackQueue() {
    var stack = Stack<Int>()
    var queue = Queue<Int>()
    
    // Stack operations (LIFO)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print(stack.pop() ?? 0) // 3
    print(stack.pop() ?? 0) // 2
    
    // Queue operations (FIFO)
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    print(queue.dequeue() ?? 0) // 1
    print(queue.dequeue() ?? 0) // 2
}

// 3. Implement Stack using Two Queues
class StackUsingTwoQueues {
    private var queue1 = Queue<Int>()
    private var queue2 = Queue<Int>()
    
    func push(_ x: Int) {
        queue2.enqueue(x)
        while !queue1.isEmpty {
            queue2.enqueue(queue1.dequeue()!)
        }
        swap(&queue1, &queue2)
    }
    
    @discardableResult
    func pop() -> Int {
        return queue1.dequeue() ?? -1
    }
    
    func top() -> Int {
        return queue1.front() ?? -1
    }
    
    func empty() -> Bool {
        return queue1.isEmpty
    }
}

// 4. Implement Stack using One Queue
class StackUsingOneQueue {
    private var queue = Queue<Int>()
    
    func push(_ x: Int) {
        queue.enqueue(x)
        for _ in 0..<(queue.count - 1) {
            queue.enqueue(queue.dequeue()!)
        }
    }
    
    @discardableResult
    func pop() -> Int {
        return queue.dequeue() ?? -1
    }
    
    func top() -> Int {
        return queue.front() ?? -1
    }
    
    func empty() -> Bool {
        return queue.isEmpty
    }
}

// 5. Implement Queue using Stacks
class QueueUsingStacks {
    private var stack1 = Stack<Int>()
    private var stack2 = Stack<Int>()
    
    func enqueue(_ x: Int) {
        stack1.push(x)
    }
    
    @discardableResult
    func dequeue() -> Int {
        if stack2.isEmpty {
            while !stack1.isEmpty {
                stack2.push(stack1.pop()!)
            }
        }
        return stack2.pop() ?? -1
    }
    
    func peek() -> Int {
        if stack2.isEmpty {
            while !stack1.isEmpty {
                stack2.push(stack1.pop()!)
            }
        }
        return stack2.peek() ?? -1
    }
    
    func empty() -> Bool {
        return stack1.isEmpty && stack2.isEmpty
    }
}

// 6. Valid Parentheses
func isValid(_ s: String) -> Bool {
    var stack = Stack<Character>()
    let mapping: [Character: Character] = [")": "(", "}": "{", "]": "["]
    
    for char in s {
        if let match = mapping[char] {
            if stack.isEmpty || stack.pop() != match {
                return false
            }
        } else {
            stack.push(char)
        }
    }
    
    return stack.isEmpty
}

// 7. Min Stack
class MinStack {
    private var stack: [Int] = []
    private var minStack: [Int] = []
    
    func push(_ val: Int) {
        stack.append(val)
        if minStack.isEmpty || val <= minStack.last! {
            minStack.append(val)
        }
    }
    
    func pop() {
        if let popped = stack.popLast() {
            if popped == minStack.last {
                minStack.removeLast()
            }
        }
    }
    
    func top() -> Int {
        return stack.last ?? 0
    }
    
    func getMin() -> Int {
        return minStack.last ?? 0
    }
}

// 8. Remove Outermost Parentheses - Using Stack
func removeOuterParenthesesStack(_ s: String) -> String {
    var stack = Stack<Character>()
    var result = ""
    
    for char in s {
        if char == "(" {
            if !stack.isEmpty {
                result += String(char)
            }
            stack.push(char)
        } else {
            stack.pop()
            if !stack.isEmpty {
                result += String(char)
            }
        }
    }
    
    return result
}

// 9. Remove Outermost Parentheses - without Stack
func removeOuterParenthesesNoStack(_ s: String) -> String {
    var result = ""
    var depth = 0
    
    for char in s {
        if char == "(" {
            if depth > 0 {
                result += String(char)
            }
            depth += 1
        } else {
            depth -= 1
            if depth > 0 {
                result += String(char)
            }
        }
    }
    
    return result
}

// 10. Evaluate Reverse Polish Notation
func evalRPN(_ tokens: [String]) -> Int {
    var stack = Stack<Int>()
    
    for token in tokens {
        switch token {
        case "+":
            let b = stack.pop()!
            let a = stack.pop()!
            stack.push(a + b)
        case "-":
            let b = stack.pop()!
            let a = stack.pop()!
            stack.push(a - b)
        case "*":
            let b = stack.pop()!
            let a = stack.pop()!
            stack.push(a * b)
        case "/":
            let b = stack.pop()!
            let a = stack.pop()!
            stack.push(a / b)
        default:
            stack.push(Int(token)!)
        }
    }
    
    return stack.top() ?? 0
}

// 11. Next Greater Element
func nextGreaterElement(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
    var stack = Stack<Int>()
    var map: [Int: Int] = [:]
    
    // Build next greater map for nums2
    for num in nums2 {
        while !stack.isEmpty && stack.peek()! < num {
            map[stack.pop()!] = num
        }
        stack.push(num)
    }
    
    // Map results for nums1
    return nums1.map { map[$0] ?? -1 }
}

// 12. Daily Temperatures
func dailyTemperatures(_ temperatures: [Int]) -> [Int] {
    var result = Array(repeating: 0, count: temperatures.count)
    var stack = Stack<Int>()
    
    for i in 0..<temperatures.count {
        while !stack.isEmpty && temperatures[i] > temperatures[stack.peek()!] {
            let index = stack.pop()!
            result[index] = i - index
        }
        stack.push(i)
    }
    
    return result
}

// 13. Next Greater Element - II (Circular)
func nextGreaterElements(_ nums: [Int]) -> [Int] {
    let n = nums.count
    var result = Array(repeating: -1, count: n)
    var stack = Stack<Int>()
    
    // Process array twice to handle circular nature
    for i in 0..<(2 * n) {
        let num = nums[i % n]
        while !stack.isEmpty && nums[stack.peek()!] < num {
            result[stack.pop()!] = num
        }
        if i < n {
            stack.push(i)
        }
    }
    
    return result
}


// Test cases
print(isValid("()[]{}"))  // true
print(removeOuterParenthesesNoStack("(()())(())"))  // "()()"
print(evalRPN(["2", "1", "+", "3", "*"]))  // 9
print(nextGreaterElement([4,1,2], [1,3,4,2]))  // [-1,3,-1]
print(dailyTemperatures([73,74,75,71,69,72,76,73]))  // [1,1,4,2,1,1,0,0]`
    },
    cpp: {
        title: 'Stack & Queue Algorithms in C++',
        code: `#include <iostream>
#include <vector>
#include <stack>
#include <queue>
#include <string>
#include <unordered_map>
#include <algorithm>

using namespace std;

// 1. Introduction to Stacks & Queues
template<typename T>
class Stack {
private:
    vector<T> items;
    
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

template<typename T>
class Queue {
private:
    vector<T> items;
    size_t frontIndex = 0;
    
public:
    void enqueue(const T& item) {
        items.push_back(item);
    }
    
    void dequeue() {
        if (frontIndex < items.size()) {
            frontIndex++;
        }
    }
    
    T front() const {
        return items[frontIndex];
    }
    
    bool empty() const {
        return frontIndex >= items.size();
    }
    
    size_t size() const {
        return items.size() - frontIndex;
    }
};

// 2. Playing with Stacks & Queues
void demonstrateStackQueue() {
    Stack<int> stack;
    Queue<int> queue;
    
    // Stack operations (LIFO)
    stack.push(1);
    stack.push(2);
    stack.push(3);
    cout << stack.top() << endl; // 3
    stack.pop();
    cout << stack.top() << endl; // 2
    
    // Queue operations (FIFO)
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    cout << queue.front() << endl; // 1
    queue.dequeue();
    cout << queue.front() << endl; // 2
}

// 3. Implement Stack using Two Queues
class StackUsingTwoQueues {
private:
    queue<int> q1, q2;
    
public:
    void push(int x) {
        q2.push(x);
        while (!q1.empty()) {
            q2.push(q1.front());
            q1.pop();
        }
        swap(q1, q2);
    }
    
    int pop() {
        int top = q1.front();
        q1.pop();
        return top;
    }
    
    int top() {
        return q1.front();
    }
    
    bool empty() {
        return q1.empty();
    }
};

// 4. Implement Stack using One Queue
class StackUsingOneQueue {
private:
    queue<int> q;
    
public:
    void push(int x) {
        q.push(x);
        for (int i = 0; i < q.size() - 1; i++) {
            q.push(q.front());
            q.pop();
        }
    }
    
    int pop() {
        int top = q.front();
        q.pop();
        return top;
    }
    
    int top() {
        return q.front();
    }
    
    bool empty() {
        return q.empty();
    }
};

// 5. Implement Queue using Stacks
class QueueUsingStacks {
private:
    stack<int> s1, s2;
    
public:
    void enqueue(int x) {
        s1.push(x);
    }
    
    int dequeue() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        int front = s2.top();
        s2.pop();
        return front;
    }
    
    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        return s2.top();
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }
};

// 6. Valid Parentheses
bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};
    
    for (char c : s) {
        if (mapping.count(c)) {
            if (st.empty() || st.top() != mapping[c]) {
                return false;
            }
            st.pop();
        } else {
            st.push(c);
        }
    }
    
    return st.empty();
}

// 7. Min Stack
class MinStack {
private:
    stack<int> st;
    stack<int> minSt;
    
public:
    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top()) {
            minSt.push(val);
        }
    }
    
    void pop() {
        if (st.top() == minSt.top()) {
            minSt.pop();
        }
        st.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return minSt.top();
    }
};

// 8. Remove Outermost Parentheses - Using Stack
string removeOuterParenthesesStack(string s) {
    stack<char> st;
    string result = "";
    
    for (char c : s) {
        if (c == '(') {
            if (!st.empty()) {
                result += c;
            }
            st.push(c);
        } else {
            st.pop();
            if (!st.empty()) {
                result += c;
            }
        }
    }
    
    return result;
}

// 9. Remove Outermost Parentheses - without Stack
string removeOuterParenthesesNoStack(string s) {
    string result = "";
    int depth = 0;
    
    for (char c : s) {
        if (c == '(') {
            if (depth > 0) {
                result += c;
            }
            depth++;
        } else {
            depth--;
            if (depth > 0) {
                result += c;
            }
        }
    }
    
    return result;
}

// 10. Evaluate Reverse Polish Notation
int evalRPN(vector<string>& tokens) {
    stack<int> st;
    
    for (string token : tokens) {
        if (token == "+") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            st.push(a + b);
        } else if (token == "-") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            st.push(a - b);
        } else if (token == "*") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            st.push(a * b);
        } else if (token == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            st.push(a / b);
        } else {
            st.push(stoi(token));
        }
    }
    
    return st.top();
}

// 11. Next Greater Element
vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    stack<int> st;
    unordered_map<int, int> nextGreater;
    
    // Build next greater map for nums2
    for (int num : nums2) {
        while (!st.empty() && st.top() < num) {
            nextGreater[st.top()] = num;
            st.pop();
        }
        st.push(num);
    }
    
    // Map results for nums1
    vector<int> result;
    for (int num : nums1) {
        result.push_back(nextGreater.count(num) ? nextGreater[num] : -1);
    }
    
    return result;
}

// 12. Daily Temperatures
vector<int> dailyTemperatures(vector<int>& temperatures) {
    vector<int> result(temperatures.size(), 0);
    stack<int> st;
    
    for (int i = 0; i < temperatures.size(); i++) {
        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
            int index = st.top();
            st.pop();
            result[index] = i - index;
        }
        st.push(i);
    }
    
    return result;
}

// 13. Next Greater Element - II (Circular)
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    // Process array twice to handle circular nature
    for (int i = 0; i < 2 * n; i++) {
        int num = nums[i % n];
        while (!st.empty() && nums[st.top()] < num) {
            result[st.top()] = num;
            st.pop();
        }
        if (i < n) {
            st.push(i);
        }
    }
    
    return result;
}


// Test function
int main() {
    cout << isValid("()[]{}") << endl;  // 1 (true)
    cout << removeOuterParenthesesNoStack("(()())(())") << endl;  // "()()"
    
    vector<string> rpn = {"2", "1", "+", "3", "*"};
    cout << evalRPN(rpn) << endl;  // 9
    
    vector<int> nums1 = {4,1,2}, nums2 = {1,3,4,2};
    vector<int> result1 = nextGreaterElement(nums1, nums2);
    for (int x : result1) cout << x << " ";  // -1 3 -1
    cout << endl;
    
    vector<int> temps = {73,74,75,71,69,72,76,73};
    vector<int> result2 = dailyTemperatures(temps);
    for (int x : result2) cout << x << " ";  // 1 1 4 2 1 1 0 0
    cout << endl;
    
    return 0;
}`
    }
};