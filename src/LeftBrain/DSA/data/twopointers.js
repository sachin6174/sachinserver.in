export const twoPointersData = {
    title: 'Two Pointers & Sliding Window',
    description: 'Master two-pointer and sliding window techniques with problems covering array manipulation, substring optimization, and efficient linear-time algorithms for complex data processing.',
    questions: [
        'Two Sum - https://leetcode.com/problems/two-sum/',
        'Two Sum II - Input Array Is Sorted - https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        'Is Subsequence - https://leetcode.com/problems/is-subsequence/',
        'Find Index of First Occurrence in String - https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
        'KMP (Knuth-Morris-Pratt) Algorithm - https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
        'Intersection of Two Linked Lists - Two Pointers - https://leetcode.com/problems/intersection-of-two-linked-lists/',
        'Container with Most Water - https://leetcode.com/problems/container-with-most-water/',
        'Three Sum - https://leetcode.com/problems/3sum/',
        'Trapping Rain Water - https://leetcode.com/problems/trapping-rain-water/',
        'Longest Substring Without Repeating Characters - https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        'Longest Repeating Character Replacement - https://leetcode.com/problems/longest-repeating-character-replacement/',
        'Permutation in String - https://leetcode.com/problems/permutation-in-string/',
        'Sliding Window Maximum - https://leetcode.com/problems/sliding-window-maximum/'
    ],
    explanation: `## Two Pointers & Sliding Window Fundamentals

### Core Technique Concepts
**Two Pointers**: Use two pointers to traverse data from different positions, often reducing time complexity from O(n²) to O(n).
**Sliding Window**: Maintain a window of elements and slide it across the data structure to find optimal solutions efficiently.

### Essential Patterns and Applications

#### Time Complexity Benefits
- **Two Pointers**: O(n) vs O(n²) for nested loops
- **Sliding Window**: O(n) vs O(n·k) for window problems
- **Space Complexity**: Usually O(1) extra space

### Two Pointers Patterns

#### 1. Opposite Direction Pointers
\`\`\`swift
// Two Sum - Sorted Array
func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
    var left = 0
    var right = numbers.count - 1
    
    while left < right {
        let sum = numbers[left] + numbers[right]
        
        if sum == target {
            return [left + 1, right + 1] // 1-indexed
        } else if sum < target {
            left += 1
        } else {
            right -= 1
        }
    }
    
    return []
}
\`\`\`

#### 2. Same Direction Pointers (Fast & Slow)
\`\`\`swift
// Remove Duplicates from Sorted Array
func removeDuplicates(_ nums: inout [Int]) -> Int {
    guard nums.count > 1 else { return nums.count }
    
    var slow = 0
    
    for fast in 1..<nums.count {
        if nums[fast] != nums[slow] {
            slow += 1
            nums[slow] = nums[fast]
        }
    }
    
    return slow + 1
}
\`\`\`

#### 3. Linked List Two Pointers
\`\`\`swift
// Intersection of Two Linked Lists
func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
    var pointerA = headA
    var pointerB = headB
    
    while pointerA !== pointerB {
        pointerA = (pointerA == nil) ? headB : pointerA?.next
        pointerB = (pointerB == nil) ? headA : pointerB?.next
    }
    
    return pointerA
}
\`\`\`

### Sliding Window Patterns

#### 1. Fixed Size Window
\`\`\`swift
// Maximum Average Subarray
func findMaxAverage(_ nums: [Int], _ k: Int) -> Double {
    var windowSum = nums[0..<k].reduce(0, +)
    var maxSum = windowSum
    
    for i in k..<nums.count {
        windowSum = windowSum - nums[i - k] + nums[i]
        maxSum = max(maxSum, windowSum)
    }
    
    return Double(maxSum) / Double(k)
}
\`\`\`

#### 2. Variable Size Window
\`\`\`swift
// Longest Substring Without Repeating Characters
func lengthOfLongestSubstring(_ s: String) -> Int {
    var charSet = Set<Character>()
    var left = 0
    var maxLength = 0
    let chars = Array(s)
    
    for right in 0..<chars.count {
        while charSet.contains(chars[right]) {
            charSet.remove(chars[left])
            left += 1
        }
        
        charSet.insert(chars[right])
        maxLength = max(maxLength, right - left + 1)
    }
    
    return maxLength
}
\`\`\`

#### 3. Sliding Window with Character Frequency
\`\`\`swift
// Longest Repeating Character Replacement
func characterReplacement(_ s: String, _ k: Int) -> Int {
    var charCount: [Character: Int] = [:]
    var left = 0
    var maxCount = 0
    var maxLength = 0
    let chars = Array(s)
    
    for right in 0..<chars.count {
        charCount[chars[right], default: 0] += 1
        maxCount = max(maxCount, charCount[chars[right]]!)
        
        // If window size - max frequency > k, shrink window
        if right - left + 1 - maxCount > k {
            charCount[chars[left]]! -= 1
            left += 1
        }
        
        maxLength = max(maxLength, right - left + 1)
    }
    
    return maxLength
}
\`\`\`

### Advanced Two Pointer Techniques

#### 1. Three Pointers for 3Sum
\`\`\`swift
func threeSum(_ nums: [Int]) -> [[Int]] {
    let sortedNums = nums.sorted()
    var result: [[Int]] = []
    
    for i in 0..<sortedNums.count - 2 {
        // Skip duplicates for first element
        if i > 0 && sortedNums[i] == sortedNums[i - 1] {
            continue
        }
        
        var left = i + 1
        var right = sortedNums.count - 1
        
        while left < right {
            let sum = sortedNums[i] + sortedNums[left] + sortedNums[right]
            
            if sum == 0 {
                result.append([sortedNums[i], sortedNums[left], sortedNums[right]])
                
                // Skip duplicates
                while left < right && sortedNums[left] == sortedNums[left + 1] {
                    left += 1
                }
                while left < right && sortedNums[right] == sortedNums[right - 1] {
                    right -= 1
                }
                
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
}
\`\`\`

#### 2. Trapping Rain Water
\`\`\`swift
func trap(_ height: [Int]) -> Int {
    guard height.count > 2 else { return 0 }
    
    var left = 0, right = height.count - 1
    var leftMax = 0, rightMax = 0
    var totalWater = 0
    
    while left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax {
                leftMax = height[left]
            } else {
                totalWater += leftMax - height[left]
            }
            left += 1
        } else {
            if height[right] >= rightMax {
                rightMax = height[right]
            } else {
                totalWater += rightMax - height[right]
            }
            right -= 1
        }
    }
    
    return totalWater
}
\`\`\`

### String Pattern Matching

#### KMP Algorithm Implementation
\`\`\`swift
func strStr(_ haystack: String, _ needle: String) -> Int {
    guard !needle.isEmpty else { return 0 }
    
    let haystackArray = Array(haystack)
    let needleArray = Array(needle)
    
    // Build failure function (LPS array)
    let lps = buildLPS(needleArray)
    
    var i = 0 // haystack index
    var j = 0 // needle index
    
    while i < haystackArray.count {
        if haystackArray[i] == needleArray[j] {
            i += 1
            j += 1
        }
        
        if j == needleArray.count {
            return i - j // Found match
        } else if i < haystackArray.count && haystackArray[i] != needleArray[j] {
            if j != 0 {
                j = lps[j - 1]
            } else {
                i += 1
            }
        }
    }
    
    return -1
}

func buildLPS(_ pattern: [Character]) -> [Int] {
    var lps = Array(repeating: 0, count: pattern.count)
    var length = 0
    var i = 1
    
    while i < pattern.count {
        if pattern[i] == pattern[length] {
            length += 1
            lps[i] = length
            i += 1
        } else {
            if length != 0 {
                length = lps[length - 1]
            } else {
                lps[i] = 0
                i += 1
            }
        }
    }
    
    return lps
}
\`\`\`

### Advanced Sliding Window Techniques

#### 1. Sliding Window Maximum
\`\`\`swift
func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
    var result: [Int] = []
    var deque: [Int] = [] // Store indices
    
    for i in 0..<nums.count {
        // Remove elements outside current window
        while !deque.isEmpty && deque.first! < i - k + 1 {
            deque.removeFirst()
        }
        
        // Remove smaller elements from back
        while !deque.isEmpty && nums[deque.last!] < nums[i] {
            deque.removeLast()
        }
        
        deque.append(i)
        
        // Add maximum to result when window is full
        if i >= k - 1 {
            result.append(nums[deque.first!])
        }
    }
    
    return result
}
\`\`\`

#### 2. Permutation in String
\`\`\`swift
func checkInclusion(_ s1: String, _ s2: String) -> Bool {
    guard s1.count <= s2.count else { return false }
    
    var s1Count: [Character: Int] = [:]
    var windowCount: [Character: Int] = [:]
    
    // Count characters in s1
    for char in s1 {
        s1Count[char, default: 0] += 1
    }
    
    let s2Array = Array(s2)
    var left = 0
    
    for right in 0..<s2Array.count {
        // Expand window
        windowCount[s2Array[right], default: 0] += 1
        
        // Shrink window if too large
        if right - left + 1 > s1.count {
            windowCount[s2Array[left]]! -= 1
            if windowCount[s2Array[left]] == 0 {
                windowCount.removeValue(forKey: s2Array[left])
            }
            left += 1
        }
        
        // Check if window matches
        if right - left + 1 == s1.count && windowCount == s1Count {
            return true
        }
    }
    
    return false
}
\`\`\`

### Container With Most Water
\`\`\`swift
func maxArea(_ height: [Int]) -> Int {
    var left = 0
    var right = height.count - 1
    var maxWater = 0
    
    while left < right {
        let width = right - left
        let minHeight = min(height[left], height[right])
        let currentWater = width * minHeight
        
        maxWater = max(maxWater, currentWater)
        
        // Move pointer with smaller height
        if height[left] < height[right] {
            left += 1
        } else {
            right -= 1
        }
    }
    
    return maxWater
}
\`\`\`

### Problem Categories and Patterns

#### Two Pointers Applications
1. **Pair Sum Problems**: Two Sum, Three Sum, Four Sum
2. **Array Manipulation**: Remove duplicates, merge sorted arrays
3. **Palindrome Checking**: Valid palindrome, closest palindrome
4. **Linked List Problems**: Intersection, cycle detection
5. **Container Problems**: Most water, trapping rain water

#### Sliding Window Applications
1. **Substring Problems**: Longest without repeating, minimum window
2. **Array Subarrays**: Maximum sum, minimum size
3. **Character Replacement**: Longest repeating character
4. **Permutation Matching**: Anagram checking in substrings
5. **Window Extrema**: Maximum/minimum in sliding windows

### Optimization Strategies

#### 1. Early Termination
- Break loops when solution found
- Skip unnecessary iterations

#### 2. Duplicate Handling
- Sort array to group duplicates
- Skip duplicate values efficiently

#### 3. Window Optimization
- Use hash maps for O(1) lookups
- Maintain window invariants efficiently

#### 4. Space-Time Tradeoffs
- Use extra space for frequency counting
- Precompute values when beneficial

✅ **Pro Tips**:
- Sort arrays when order doesn't matter for easier duplicate handling
- Use two pointers to reduce time complexity from O(n²) to O(n)
- Sliding window excels for substring/subarray problems
- Maintain window invariants for correctness

❌ **Common Pitfalls**:
- Forgetting to handle edge cases (empty arrays, single elements)
- Incorrect pointer movement logic
- Not handling duplicates properly in sum problems
- Window boundary errors in sliding window problems`,
    javascript: {
        title: 'Two Pointers & Sliding Window Algorithms in JavaScript',
        code: `// 1. Two Sum (Hash Map Approach)
function twoSum(nums, target) {
    const numToIndex = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numToIndex.has(complement)) {
            return [numToIndex.get(complement), i];
        }
        
        numToIndex.set(nums[i], i);
    }
    
    return [];
}

// 2. Two Sum II - Input Array Is Sorted (Two Pointers)
function twoSumSorted(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

// 3. Is Subsequence
function isSubsequence(s, t) {
    let sPointer = 0;
    let tPointer = 0;
    
    while (sPointer < s.length && tPointer < t.length) {
        if (s[sPointer] === t[tPointer]) {
            sPointer++;
        }
        tPointer++;
    }
    
    return sPointer === s.length;
}

// 4. Find Index of First Occurrence in String
function strStr(haystack, needle) {
    if (needle === '') return 0;
    
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.substring(i, i + needle.length) === needle) {
            return i;
        }
    }
    
    return -1;
}

// 5. KMP (Knuth-Morris-Pratt) Algorithm
function strStrKMP(haystack, needle) {
    if (needle === '') return 0;
    
    // Build failure function (LPS array)
    const lps = buildLPS(needle);
    
    let i = 0; // haystack index
    let j = 0; // needle index
    
    while (i < haystack.length) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
        }
        
        if (j === needle.length) {
            return i - j; // Found match
        } else if (i < haystack.length && haystack[i] !== needle[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return -1; // No match found
}

function buildLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let length = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

// 6. Intersection of Two Linked Lists - Two Pointers
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    
    let pointerA = headA;
    let pointerB = headB;
    
    while (pointerA !== pointerB) {
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
    }
    
    return pointerA;
}

// 7. Container with Most Water
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const currentWater = width * minHeight;
        
        maxWater = Math.max(maxWater, currentWater);
        
        // Move pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// 8. Three Sum
function threeSum(nums) {
    const sortedNums = nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < sortedNums.length - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
            continue;
        }
        
        let left = i + 1;
        let right = sortedNums.length - 1;
        
        while (left < right) {
            const sum = sortedNums[i] + sortedNums[left] + sortedNums[right];
            
            if (sum === 0) {
                result.push([sortedNums[i], sortedNums[left], sortedNums[right]]);
                
                // Skip duplicates
                while (left < right && sortedNums[left] === sortedNums[left + 1]) {
                    left++;
                }
                while (left < right && sortedNums[right] === sortedNums[right - 1]) {
                    right--;
                }
                
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
}

// 9. Trapping Rain Water
function trap(height) {
    if (height.length < 3) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let totalWater = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }
    
    return totalWater;
}

// 10. Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// 11. Longest Repeating Character Replacement
function characterReplacement(s, k) {
    const charCount = {};
    let left = 0;
    let maxCount = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        charCount[s[right]] = (charCount[s[right]] || 0) + 1;
        maxCount = Math.max(maxCount, charCount[s[right]]);
        
        // If window size - max frequency > k, shrink window
        if (right - left + 1 - maxCount > k) {
            charCount[s[left]]--;
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// 12. Permutation in String
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const s1Count = {};
    const windowCount = {};
    
    // Count characters in s1
    for (let char of s1) {
        s1Count[char] = (s1Count[char] || 0) + 1;
    }
    
    let left = 0;
    for (let right = 0; right < s2.length; right++) {
        // Expand window
        windowCount[s2[right]] = (windowCount[s2[right]] || 0) + 1;
        
        // Shrink window if too large
        if (right - left + 1 > s1.length) {
            windowCount[s2[left]]--;
            if (windowCount[s2[left]] === 0) {
                delete windowCount[s2[left]];
            }
            left++;
        }
        
        // Check if window matches
        if (right - left + 1 === s1.length && 
            JSON.stringify(windowCount) === JSON.stringify(s1Count)) {
            return true;
        }
    }
    
    return false;
}

// 13. Sliding Window Maximum
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside current window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove smaller elements from back
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add maximum to result when window is full
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// Helper function for testing
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

// Additional utility functions

// Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
    if (nums.length <= 1) return nums.length;
    
    let slow = 0;
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}

// Valid Palindrome (Two Pointers)
function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSumSorted([2, 7, 11, 15], 9)); // [1, 2]
console.log(isSubsequence("abc", "aebdc")); // true
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(characterReplacement("ABAB", 2)); // 4
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]`
    },
    swift: {
        title: 'Two Pointers & Sliding Window Algorithms in Swift',
        code: `import Foundation

// ListNode for linked list problems
class ListNode {
    var val: Int
    var next: ListNode?
    
    init(_ val: Int) {
        self.val = val
        self.next = nil
    }
}

// 1. Two Sum (Hash Map Approach)
func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    var numToIndex: [Int: Int] = [:]
    
    for (i, num) in nums.enumerated() {
        let complement = target - num
        
        if let complementIndex = numToIndex[complement] {
            return [complementIndex, i]
        }
        
        numToIndex[num] = i
    }
    
    return []
}

// 2. Two Sum II - Input Array Is Sorted (Two Pointers)
func twoSumSorted(_ numbers: [Int], _ target: Int) -> [Int] {
    var left = 0
    var right = numbers.count - 1
    
    while left < right {
        let sum = numbers[left] + numbers[right]
        
        if sum == target {
            return [left + 1, right + 1] // 1-indexed
        } else if sum < target {
            left += 1
        } else {
            right -= 1
        }
    }
    
    return []
}

// 3. Is Subsequence
func isSubsequence(_ s: String, _ t: String) -> Bool {
    let sArray = Array(s)
    let tArray = Array(t)
    
    var sPointer = 0
    var tPointer = 0
    
    while sPointer < sArray.count && tPointer < tArray.count {
        if sArray[sPointer] == tArray[tPointer] {
            sPointer += 1
        }
        tPointer += 1
    }
    
    return sPointer == sArray.count
}

// 4. Find Index of First Occurrence in String
func strStr(_ haystack: String, _ needle: String) -> Int {
    guard !needle.isEmpty else { return 0 }
    
    let haystackArray = Array(haystack)
    let needleArray = Array(needle)
    
    for i in 0...(haystackArray.count - needleArray.count) {
        if haystackArray[i..<(i + needleArray.count)] == needleArray {
            return i
        }
    }
    
    return -1
}

// 5. KMP (Knuth-Morris-Pratt) Algorithm
func strStrKMP(_ haystack: String, _ needle: String) -> Int {
    guard !needle.isEmpty else { return 0 }
    
    let haystackArray = Array(haystack)
    let needleArray = Array(needle)
    
    // Build failure function (LPS array)
    let lps = buildLPS(needleArray)
    
    var i = 0 // haystack index
    var j = 0 // needle index
    
    while i < haystackArray.count {
        if haystackArray[i] == needleArray[j] {
            i += 1
            j += 1
        }
        
        if j == needleArray.count {
            return i - j // Found match
        } else if i < haystackArray.count && haystackArray[i] != needleArray[j] {
            if j != 0 {
                j = lps[j - 1]
            } else {
                i += 1
            }
        }
    }
    
    return -1 // No match found
}

func buildLPS(_ pattern: [Character]) -> [Int] {
    var lps = Array(repeating: 0, count: pattern.count)
    var length = 0
    var i = 1
    
    while i < pattern.count {
        if pattern[i] == pattern[length] {
            length += 1
            lps[i] = length
            i += 1
        } else {
            if length != 0 {
                length = lps[length - 1]
            } else {
                lps[i] = 0
                i += 1
            }
        }
    }
    
    return lps
}

// 6. Intersection of Two Linked Lists - Two Pointers
func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
    guard let headA = headA, let headB = headB else { return nil }
    
    var pointerA: ListNode? = headA
    var pointerB: ListNode? = headB
    
    while pointerA !== pointerB {
        pointerA = (pointerA == nil) ? headB : pointerA?.next
        pointerB = (pointerB == nil) ? headA : pointerB?.next
    }
    
    return pointerA
}

// 7. Container with Most Water
func maxArea(_ height: [Int]) -> Int {
    var left = 0
    var right = height.count - 1
    var maxWater = 0
    
    while left < right {
        let width = right - left
        let minHeight = min(height[left], height[right])
        let currentWater = width * minHeight
        
        maxWater = max(maxWater, currentWater)
        
        // Move pointer with smaller height
        if height[left] < height[right] {
            left += 1
        } else {
            right -= 1
        }
    }
    
    return maxWater
}

// 8. Three Sum
func threeSum(_ nums: [Int]) -> [[Int]] {
    let sortedNums = nums.sorted()
    var result: [[Int]] = []
    
    for i in 0..<sortedNums.count - 2 {
        // Skip duplicates for first element
        if i > 0 && sortedNums[i] == sortedNums[i - 1] {
            continue
        }
        
        var left = i + 1
        var right = sortedNums.count - 1
        
        while left < right {
            let sum = sortedNums[i] + sortedNums[left] + sortedNums[right]
            
            if sum == 0 {
                result.append([sortedNums[i], sortedNums[left], sortedNums[right]])
                
                // Skip duplicates
                while left < right && sortedNums[left] == sortedNums[left + 1] {
                    left += 1
                }
                while left < right && sortedNums[right] == sortedNums[right - 1] {
                    right -= 1
                }
                
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
}

// 9. Trapping Rain Water
func trap(_ height: [Int]) -> Int {
    guard height.count > 2 else { return 0 }
    
    var left = 0, right = height.count - 1
    var leftMax = 0, rightMax = 0
    var totalWater = 0
    
    while left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax {
                leftMax = height[left]
            } else {
                totalWater += leftMax - height[left]
            }
            left += 1
        } else {
            if height[right] >= rightMax {
                rightMax = height[right]
            } else {
                totalWater += rightMax - height[right]
            }
            right -= 1
        }
    }
    
    return totalWater
}

// 10. Longest Substring Without Repeating Characters
func lengthOfLongestSubstring(_ s: String) -> Int {
    var charSet = Set<Character>()
    var left = 0
    var maxLength = 0
    let chars = Array(s)
    
    for right in 0..<chars.count {
        while charSet.contains(chars[right]) {
            charSet.remove(chars[left])
            left += 1
        }
        
        charSet.insert(chars[right])
        maxLength = max(maxLength, right - left + 1)
    }
    
    return maxLength
}

// 11. Longest Repeating Character Replacement
func characterReplacement(_ s: String, _ k: Int) -> Int {
    var charCount: [Character: Int] = [:]
    var left = 0
    var maxCount = 0
    var maxLength = 0
    let chars = Array(s)
    
    for right in 0..<chars.count {
        charCount[chars[right], default: 0] += 1
        maxCount = max(maxCount, charCount[chars[right]]!)
        
        // If window size - max frequency > k, shrink window
        if right - left + 1 - maxCount > k {
            charCount[chars[left]]! -= 1
            left += 1
        }
        
        maxLength = max(maxLength, right - left + 1)
    }
    
    return maxLength
}

// 12. Permutation in String
func checkInclusion(_ s1: String, _ s2: String) -> Bool {
    guard s1.count <= s2.count else { return false }
    
    var s1Count: [Character: Int] = [:]
    var windowCount: [Character: Int] = [:]
    
    // Count characters in s1
    for char in s1 {
        s1Count[char, default: 0] += 1
    }
    
    let s2Array = Array(s2)
    var left = 0
    
    for right in 0..<s2Array.count {
        // Expand window
        windowCount[s2Array[right], default: 0] += 1
        
        // Shrink window if too large
        if right - left + 1 > s1.count {
            windowCount[s2Array[left]]! -= 1
            if windowCount[s2Array[left]] == 0 {
                windowCount.removeValue(forKey: s2Array[left])
            }
            left += 1
        }
        
        // Check if window matches
        if right - left + 1 == s1.count && windowCount == s1Count {
            return true
        }
    }
    
    return false
}

// 13. Sliding Window Maximum
func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
    var result: [Int] = []
    var deque: [Int] = [] // Store indices
    
    for i in 0..<nums.count {
        // Remove elements outside current window
        while !deque.isEmpty && deque.first! < i - k + 1 {
            deque.removeFirst()
        }
        
        // Remove smaller elements from back
        while !deque.isEmpty && nums[deque.last!] < nums[i] {
            deque.removeLast()
        }
        
        deque.append(i)
        
        // Add maximum to result when window is full
        if i >= k - 1 {
            result.append(nums[deque.first!])
        }
    }
    
    return result
}

// Additional utility functions

// Remove Duplicates from Sorted Array
func removeDuplicates(_ nums: inout [Int]) -> Int {
    guard nums.count > 1 else { return nums.count }
    
    var slow = 0
    
    for fast in 1..<nums.count {
        if nums[fast] != nums[slow] {
            slow += 1
            nums[slow] = nums[fast]
        }
    }
    
    return slow + 1
}

// Valid Palindrome (Two Pointers)
func isPalindrome(_ s: String) -> Bool {
    let chars = Array(s.lowercased().filter { $0.isLetter || $0.isNumber })
    var left = 0
    var right = chars.count - 1
    
    while left < right {
        if chars[left] != chars[right] {
            return false
        }
        left += 1
        right -= 1
    }
    
    return true
}

// Move Zeroes (Two Pointers)
func moveZeroes(_ nums: inout [Int]) {
    var slow = 0
    
    for fast in 0..<nums.count {
        if nums[fast] != 0 {
            nums.swapAt(slow, fast)
            slow += 1
        }
    }
}

// Reverse String (Two Pointers)
func reverseString(_ s: inout [Character]) {
    var left = 0
    var right = s.count - 1
    
    while left < right {
        s.swapAt(left, right)
        left += 1
        right -= 1
    }
}

// Test cases
print(twoSum([2, 7, 11, 15], 9)) // [0, 1]
print(twoSumSorted([2, 7, 11, 15], 9)) // [1, 2]
print(isSubsequence("abc", "aebdc")) // true
print(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])) // 49
print(threeSum([-1, 0, 1, 2, -1, -4])) // [[-1,-1,2],[-1,0,1]]
print(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])) // 6
print(lengthOfLongestSubstring("abcabcbb")) // 3
print(characterReplacement("ABAB", 2)) // 4
print(checkInclusion("ab", "eidbaooo")) // true
print(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)) // [3,3,5,5,6,7]`
    },
    cpp: {
        title: 'Two Pointers & Sliding Window Algorithms in C++',
        code: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <string>
#include <algorithm>
#include <deque>
#include <climits>

using namespace std;

// ListNode for linked list problems
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// 1. Two Sum (Hash Map Approach)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numToIndex;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (numToIndex.count(complement)) {
            return {numToIndex[complement], i};
        }
        
        numToIndex[nums[i]] = i;
    }
    
    return {};
}

// 2. Two Sum II - Input Array Is Sorted (Two Pointers)
vector<int> twoSumSorted(vector<int>& numbers, int target) {
    int left = 0;
    int right = numbers.size() - 1;
    
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        
        if (sum == target) {
            return {left + 1, right + 1}; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return {};
}

// 3. Is Subsequence
bool isSubsequence(string s, string t) {
    int sPointer = 0;
    int tPointer = 0;
    
    while (sPointer < s.length() && tPointer < t.length()) {
        if (s[sPointer] == t[tPointer]) {
            sPointer++;
        }
        tPointer++;
    }
    
    return sPointer == s.length();
}

// 4. Find Index of First Occurrence in String
int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    
    for (int i = 0; i <= (int)haystack.length() - (int)needle.length(); i++) {
        if (haystack.substr(i, needle.length()) == needle) {
            return i;
        }
    }
    
    return -1;
}

// 5. KMP (Knuth-Morris-Pratt) Algorithm
int strStrKMP(string haystack, string needle) {
    if (needle.empty()) return 0;
    
    // Build failure function (LPS array)
    vector<int> lps = buildLPS(needle);
    
    int i = 0; // haystack index
    int j = 0; // needle index
    
    while (i < haystack.length()) {
        if (haystack[i] == needle[j]) {
            i++;
            j++;
        }
        
        if (j == needle.length()) {
            return i - j; // Found match
        } else if (i < haystack.length() && haystack[i] != needle[j]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return -1; // No match found
}

vector<int> buildLPS(string pattern) {
    vector<int> lps(pattern.length(), 0);
    int length = 0;
    int i = 1;
    
    while (i < pattern.length()) {
        if (pattern[i] == pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length != 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

// 6. Intersection of Two Linked Lists - Two Pointers
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    if (!headA || !headB) return nullptr;
    
    ListNode* pointerA = headA;
    ListNode* pointerB = headB;
    
    while (pointerA != pointerB) {
        pointerA = pointerA ? pointerA->next : headB;
        pointerB = pointerB ? pointerB->next : headA;
    }
    
    return pointerA;
}

// 7. Container with Most Water
int maxArea(vector<int>& height) {
    int left = 0;
    int right = height.size() - 1;
    int maxWater = 0;
    
    while (left < right) {
        int width = right - left;
        int minHeight = min(height[left], height[right]);
        int currentWater = width * minHeight;
        
        maxWater = max(maxWater, currentWater);
        
        // Move pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// 8. Three Sum
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    
    for (int i = 0; i < nums.size() - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue;
        }
        
        int left = i + 1;
        int right = nums.size() - 1;
        
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                
                // Skip duplicates
                while (left < right && nums[left] == nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] == nums[right - 1]) {
                    right--;
                }
                
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
}

// 9. Trapping Rain Water
int trap(vector<int>& height) {
    if (height.size() < 3) return 0;
    
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }
    
    return totalWater;
}

// 10. Longest Substring Without Repeating Characters
int lengthOfLongestSubstring(string s) {
    unordered_set<char> charSet;
    int left = 0;
    int maxLength = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (charSet.count(s[right])) {
            charSet.erase(s[left]);
            left++;
        }
        
        charSet.insert(s[right]);
        maxLength = max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// 11. Longest Repeating Character Replacement
int characterReplacement(string s, int k) {
    unordered_map<char, int> charCount;
    int left = 0;
    int maxCount = 0;
    int maxLength = 0;
    
    for (int right = 0; right < s.length(); right++) {
        charCount[s[right]]++;
        maxCount = max(maxCount, charCount[s[right]]);
        
        // If window size - max frequency > k, shrink window
        if (right - left + 1 - maxCount > k) {
            charCount[s[left]]--;
            left++;
        }
        
        maxLength = max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// 12. Permutation in String
bool checkInclusion(string s1, string s2) {
    if (s1.length() > s2.length()) return false;
    
    unordered_map<char, int> s1Count, windowCount;
    
    // Count characters in s1
    for (char c : s1) {
        s1Count[c]++;
    }
    
    int left = 0;
    for (int right = 0; right < s2.length(); right++) {
        // Expand window
        windowCount[s2[right]]++;
        
        // Shrink window if too large
        if (right - left + 1 > s1.length()) {
            windowCount[s2[left]]--;
            if (windowCount[s2[left]] == 0) {
                windowCount.erase(s2[left]);
            }
            left++;
        }
        
        // Check if window matches
        if (right - left + 1 == s1.length() && windowCount == s1Count) {
            return true;
        }
    }
    
    return false;
}

// 13. Sliding Window Maximum
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq; // Store indices
    
    for (int i = 0; i < nums.size(); i++) {
        // Remove elements outside current window
        while (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        
        // Remove smaller elements from back
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // Add maximum to result when window is full
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}

// Additional utility functions

// Remove Duplicates from Sorted Array
int removeDuplicates(vector<int>& nums) {
    if (nums.size() <= 1) return nums.size();
    
    int slow = 0;
    
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}

// Valid Palindrome (Two Pointers)
bool isPalindrome(string s) {
    string cleaned = "";
    for (char c : s) {
        if (isalnum(c)) {
            cleaned += tolower(c);
        }
    }
    
    int left = 0;
    int right = cleaned.length() - 1;
    
    while (left < right) {
        if (cleaned[left] != cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Move Zeroes (Two Pointers)
void moveZeroes(vector<int>& nums) {
    int slow = 0;
    
    for (int fast = 0; fast < nums.size(); fast++) {
        if (nums[fast] != 0) {
            swap(nums[slow], nums[fast]);
            slow++;
        }
    }
}

// Reverse String (Two Pointers)
void reverseString(vector<char>& s) {
    int left = 0;
    int right = s.size() - 1;
    
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
}

// Test function
int main() {
    vector<int> nums1 = {2, 7, 11, 15};
    cout << "Two Sum: ";
    auto result1 = twoSum(nums1, 9);
    for (int x : result1) cout << x << " ";
    cout << endl; // [0, 1]
    
    vector<int> nums2 = {2, 7, 11, 15};
    cout << "Two Sum Sorted: ";
    auto result2 = twoSumSorted(nums2, 9);
    for (int x : result2) cout << x << " ";
    cout << endl; // [1, 2]
    
    cout << "Is Subsequence: " << isSubsequence("abc", "aebdc") << endl; // 1 (true)
    
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << "Max Area: " << maxArea(height) << endl; // 49
    
    vector<int> threeSumNums = {-1, 0, 1, 2, -1, -4};
    cout << "Three Sum: ";
    auto threeSumResult = threeSum(threeSumNums);
    for (auto& triplet : threeSumResult) {
        cout << "[";
        for (int x : triplet) cout << x << " ";
        cout << "] ";
    }
    cout << endl; // [[-1,-1,2],[-1,0,1]]
    
    vector<int> trapHeight = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    cout << "Trap Rain Water: " << trap(trapHeight) << endl; // 6
    
    cout << "Longest Substring: " << lengthOfLongestSubstring("abcabcbb") << endl; // 3
    cout << "Character Replacement: " << characterReplacement("ABAB", 2) << endl; // 4
    cout << "Check Inclusion: " << checkInclusion("ab", "eidbaooo") << endl; // 1 (true)
    
    vector<int> slidingNums = {1, 3, -1, -3, 5, 3, 6, 7};
    cout << "Sliding Window Maximum: ";
    auto slidingResult = maxSlidingWindow(slidingNums, 3);
    for (int x : slidingResult) cout << x << " ";
    cout << endl; // [3,3,5,5,6,7]
    
    return 0;
}`
    }
};