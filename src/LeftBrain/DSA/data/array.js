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
        'First Missing Positive - https://leetcode.com/problems/first-missing-positive/',
        '--- Phase 2: New Questions ---',
        'Single non-repeating element in an array (LeetCode 136) - https://leetcode.com/problems/single-number/',
        'Maximum Sub-Array Sum (LeetCode 53) - https://leetcode.com/problems/maximum-subarray/',
        'HackerRank - Left Rotation - https://www.hackerrank.com/challenges/array-left-rotation/problem',
        'HackerRank - Equal Stacks - https://www.hackerrank.com/challenges/equal-stacks/problem',
        'HackerRank - Missing Numbers - https://www.hackerrank.com/challenges/missing-numbers/problem',
        'HackerRank - Pairs - https://www.hackerrank.com/challenges/pairs/problem',
        'HackerRank - Between Two Sets - https://www.hackerrank.com/challenges/between-two-sets/problem',
        'Find all Duplicates in an Array (LeetCode 442) - https://leetcode.com/problems/find-all-duplicates-in-an-array/',
        'HackerRank - Birthday Cake Candles - https://www.hackerrank.com/challenges/birthday-cake-candles/problem',
        'HackerRank - Equal - https://www.hackerrank.com/challenges/equal/problem',
        'HackerRank - Minimum Loss - https://www.hackerrank.com/challenges/minimum-loss/problem',
        'Stock Span Problem (Leetcode 901) - https://leetcode.com/problems/online-stock-span/',
        'Rotate Image (Leetcode 48) - https://leetcode.com/problems/rotate-image/',
        'First and Last Position of Element Sorted Array (LeetCode 34) - https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
        'Find the duplicate number (LeetCode 287) - https://leetcode.com/problems/find-the-duplicate-number/',
        'Number of Good Pairs (LeetCode 1512) - https://leetcode.com/problems/number-of-good-pairs/',
        'Numbers Smaller than current Number (LeetCode 1365) - https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/',
        'Search Insert Position (LeetCode 35) - https://leetcode.com/problems/search-insert-position/',
        'Climbing Stairs (LeetCode 70) - https://leetcode.com/problems/climbing-stairs/',
        'Find the disappearing numbers (LeetCode 448) - https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/',
        'Subsets (LeetCode 78) - https://leetcode.com/problems/subsets/',
        'Permutations (LeetCode 46) - https://leetcode.com/problems/permutations/',
        'Subsets 2 (LeetCode 90) - https://leetcode.com/problems/subsets-ii/',
        'Permutations 2 (LeetCode 47) - https://leetcode.com/problems/permutations-ii/',
        'Next Greater Element 1 (LeetCode 496) - https://leetcode.com/problems/next-greater-element-i/',
        'Daily Temperatures (LeetCode 739) - https://leetcode.com/problems/daily-temperatures/',
        'Top K Frequent Elements (LeetCode 347) - https://leetcode.com/problems/top-k-frequent-elements/',
        'Squares of Sorted Array (LeetCode 977) - https://leetcode.com/problems/squares-of-a-sorted-array/',
        'Longest Consecutive Sequence (LeetCode 128) - https://leetcode.com/problems/longest-consecutive-sequence/',
        'House Robber (LeetCode 198) - https://leetcode.com/problems/house-robber/',
        'House Robber 2 (LeetCode 213) - https://leetcode.com/problems/house-robber-ii/',
        'Count Servers that Communicate (LeetCode 1267) - https://leetcode.com/problems/count-servers-that-communicate/',
        'Set Matrix Zeroes (LeetCode 73) - https://leetcode.com/problems/set-matrix-zeroes/',
        'Majority Element (LeetCode 169) - https://leetcode.com/problems/majority-element/',
        'Missing Number (LeetCode 268) - https://leetcode.com/problems/missing-number/',
        'Spiral Matrix (LeetCode 54) - https://leetcode.com/problems/spiral-matrix/',
        'Sort Colors (LeetCode 75) - https://leetcode.com/problems/sort-colors/',
        'Three Sum Closest (LeetCode 16) - https://leetcode.com/problems/3sum-closest/',
        'Merge Intervals (LeetCode 56) - https://leetcode.com/problems/merge-intervals/',
        'Search a 2D matrix (LeetCode 74) - https://leetcode.com/problems/search-a-2d-matrix/',
        'Maximum Product Sub-array (LeetCode 152) - https://leetcode.com/problems/maximum-product-subarray/',
        'Shuffle String (LeetCode 1528) - https://leetcode.com/problems/shuffle-string/',
        'Maximum Average Subarray (LeetCode 643) - https://leetcode.com/problems/maximum-average-subarray-i/',
        'Jump Game (LeetCode 55) - https://leetcode.com/problems/jump-game/',
        'Fruits in Basket (LeetCode 904) - https://leetcode.com/problems/fruit-into-baskets/',
        'Maximum Vowels in a Substring (LeetCode 1456) - https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/',
        'Jump Game 2 (LeetCode 45) - https://leetcode.com/problems/jump-game-ii/',
        'Maximum Length of Repeated Subarray (LeetCode 718) - https://leetcode.com/problems/maximum-length-of-repeated-subarray/',
        'Jump Game 3 (LeetCode 1306) - https://leetcode.com/problems/jump-game-iii/',
        'Longest Increasing Subsequence (LeetCode 300) - https://leetcode.com/problems/longest-increasing-subsequence/',
        'Boats to Save People (LeetCode 881) - https://leetcode.com/problems/boats-to-save-people/',
        'Decode Ways (LeetCode 91) - https://leetcode.com/problems/decode-ways/',
        'Kth Missing Positive Number (LeetCode 1539) - https://leetcode.com/problems/kth-missing-positive-number/',
        'Koko Eating Bananas (LeetCode 875) - https://leetcode.com/problems/koko-eating-bananas/',
        'Max Consecutive Ones (LeetCode 485) - https://leetcode.com/problems/max-consecutive-ones/',
        'Max Consecutive Ones (LeetCode 1004) - https://leetcode.com/problems/max-consecutive-ones-iii/',
        'Minimum Size Subarray Sum (LeetCode 209) - https://leetcode.com/problems/minimum-size-subarray-sum/',
        'Maximum Product After K Increments (LeetCode 2233) - https://leetcode.com/problems/maximum-product-after-k-increments/',
        'Sum of Unique Elements (LeetCode 1748) - https://leetcode.com/problems/sum-of-unique-elements/',
        'Matrix Diagonal Sum (LeetCode 1572) - https://leetcode.com/problems/matrix-diagonal-sum/',
        'Capacity to Ship Packages Within D Days (LeetCode 1011) - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
        'Last Stone Weight (LeetCode 1046) - https://leetcode.com/problems/last-stone-weight/',
        'Min Cost Climbing Stairs (LeetCode 746) - https://leetcode.com/problems/min-cost-climbing-stairs/',
        'Find minimum in rotated sorted array (LeetCode 153) - https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
        'Find Pivot Index (LeetCode 724) - https://leetcode.com/problems/find-pivot-index/',
        'Minimum Increments to make array unique (LeetCode 945) - https://leetcode.com/problems/minimum-increment-to-make-array-unique/',
        'Left and Right sum differences (LeetCode 2574) - https://leetcode.com/problems/left-and-right-sum-differences/',
        'Unique Paths (LeetCode 62) - https://leetcode.com/problems/unique-paths/',
        'Non-overlapping Intervals (LeetCode 435) - https://leetcode.com/problems/non-overlapping-intervals/',
        'Insert Interval (LeetCode 57) - https://leetcode.com/problems/insert-interval/',
        'Number of Islands (LeetCode 200) - https://leetcode.com/problems/number-of-islands/',
        'Rotting Oranges (LeetCode 994) - https://leetcode.com/problems/rotting-oranges/',
        '01 Matrix (LeetCode 542) - https://leetcode.com/problems/01-matrix/',
        'Ransom Note (LeetCode 383) - https://leetcode.com/problems/ransom-note/',
        'Gas Station (LeetCode 134) - https://leetcode.com/problems/gas-station/',
        'Maximal Square (LeetCode 221) - https://leetcode.com/problems/maximal-square/',
        'Contiguous Array (LeetCode 525) - https://leetcode.com/problems/contiguous-array/'
    ]
};