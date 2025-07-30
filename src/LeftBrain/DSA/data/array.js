export const arrayData = {
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
};