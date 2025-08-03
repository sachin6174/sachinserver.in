export const hashingData = {
    title: 'Hashing',
    description: 'Master hash tables and hashing algorithms with problems covering hash maps, hash sets, collision handling, and efficient lookup operations for optimal data retrieval and storage.',
    questions: [
        'Linked List Cycle - Hash Table - https://leetcode.com/problems/linked-list-cycle/',
        'Palindrome Linked List - https://leetcode.com/problems/palindrome-linked-list/',
        'Intersection of Two Linked Lists - Two Pointers - https://leetcode.com/problems/intersection-of-two-linked-lists/',
        'Remove Duplicates from Sorted List - https://leetcode.com/problems/remove-duplicates-from-sorted-list/',
        'Find Words Containing Character - https://leetcode.com/problems/find-words-containing-character/',
        'Jewels and Stones - https://leetcode.com/problems/jewels-and-stones/',
        'Find Most Frequent Vowel and Consonant - https://leetcode.com/problems/most-common-word/',
        'Valid Palindrome - Approach 1 - Extra Space - https://leetcode.com/problems/valid-palindrome/',
        'Valid Anagram - https://leetcode.com/problems/valid-anagram/',
        'Isomorphic Strings - https://leetcode.com/problems/isomorphic-strings/',
        'Group Anagrams - Approach 1 - Sorted Key - https://leetcode.com/problems/group-anagrams/',
        'Group Anagrams - Approach 2 - Hashed Key - https://leetcode.com/problems/group-anagrams/',
        'Next Greater Element - https://leetcode.com/problems/next-greater-element-i/',
        'Two Sum II - Input Array Is Sorted - https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        'Find Index of First Occurrence in String - https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
        'KMP (Knuth-Morris-Pratt) Algorithm - https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
        'Permutation in String - https://leetcode.com/problems/permutation-in-string/',
        'Longest Substring Without Repeating Characters - https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        'Sliding Window Maximum - https://leetcode.com/problems/sliding-window-maximum/'
    ],
    explanation: `## Hashing Fundamentals

### Core Hash Table Concepts
**Hash Table**: A data structure that implements an associative array abstract data type, mapping keys to values using a hash function.
- **Hash Function**: Converts keys into array indices
- **Collision Handling**: Manages cases where multiple keys hash to same index
- **Load Factor**: Ratio of stored elements to table size

### Essential Hashing Operations

#### Time Complexity Analysis
- **Insert**: O(1) average, O(n) worst case
- **Search**: O(1) average, O(n) worst case  
- **Delete**: O(1) average, O(n) worst case
- **Space**: O(n) for storing key-value pairs

### Hash Function Design

#### 1. Simple Hash Functions
\`\`\`swift
// Division Method
func simpleHash(_ key: Int, _ tableSize: Int) -> Int {
    return key % tableSize
}

// Multiplication Method
func multiplicationHash(_ key: Int, _ tableSize: Int) -> Int {
    let A = 0.6180339887  // Golden ratio - 1
    let fractionalPart = Double(key) * A - floor(Double(key) * A)
    return Int(Double(tableSize) * fractionalPart)
}

// String Hash Function
func stringHash(_ key: String, _ tableSize: Int) -> Int {
    var hash = 0
    for char in key {
        hash = (hash * 31 + Int(char.asciiValue ?? 0)) % tableSize
    }
    return hash
}
\`\`\`

### Collision Resolution Techniques

#### 1. Separate Chaining
\`\`\`swift
class HashTableChaining<Key: Hashable, Value> {
    private var buckets: [[KeyValuePair<Key, Value>]]
    private let capacity: Int
    
    private struct KeyValuePair<K, V> {
        let key: K
        var value: V
    }
    
    init(capacity: Int = 16) {
        self.capacity = capacity
        self.buckets = Array(repeating: [], count: capacity)
    }
    
    private func hash(_ key: Key) -> Int {
        return abs(key.hashValue) % capacity
    }
    
    func set(_ key: Key, _ value: Value) {
        let index = hash(key)
        
        // Check if key already exists
        for i in 0..<buckets[index].count {
            if buckets[index][i].key == key {
                buckets[index][i].value = value
                return
            }
        }
        
        // Add new key-value pair
        buckets[index].append(KeyValuePair(key: key, value: value))
    }
    
    func get(_ key: Key) -> Value? {
        let index = hash(key)
        
        for pair in buckets[index] {
            if pair.key == key {
                return pair.value
            }
        }
        
        return nil
    }
    
    func remove(_ key: Key) -> Value? {
        let index = hash(key)
        
        for i in 0..<buckets[index].count {
            if buckets[index][i].key == key {
                let removedValue = buckets[index][i].value
                buckets[index].remove(at: i)
                return removedValue
            }
        }
        
        return nil
    }
}
\`\`\`

#### 2. Open Addressing (Linear Probing)
\`\`\`swift
class HashTableLinearProbing<Key: Hashable, Value> {
    private var keys: [Key?]
    private var values: [Value?]
    private let capacity: Int
    private var size: Int = 0
    
    init(capacity: Int = 16) {
        self.capacity = capacity
        self.keys = Array(repeating: nil, count: capacity)
        self.values = Array(repeating: nil, count: capacity)
    }
    
    private func hash(_ key: Key) -> Int {
        return abs(key.hashValue) % capacity
    }
    
    func set(_ key: Key, _ value: Value) {
        var index = hash(key)
        
        while keys[index] != nil {
            if keys[index] == key {
                values[index] = value  // Update existing
                return
            }
            index = (index + 1) % capacity  // Linear probing
        }
        
        // Insert new key-value pair
        keys[index] = key
        values[index] = value
        size += 1
    }
    
    func get(_ key: Key) -> Value? {
        var index = hash(key)
        
        while keys[index] != nil {
            if keys[index] == key {
                return values[index]
            }
            index = (index + 1) % capacity
        }
        
        return nil
    }
}
\`\`\`

### Advanced Hashing Techniques

#### 1. Robin Hood Hashing
- Minimizes variance in probe distances
- Elements with longer probe distances take precedence

#### 2. Cuckoo Hashing  
- Guarantees O(1) worst-case lookup
- Uses two hash functions and two tables

#### 3. Consistent Hashing
- Distributes keys across changing number of servers
- Minimizes remapping when servers added/removed

### Hash-Based Algorithm Patterns

#### 1. Frequency Counting
\`\`\`swift
func characterFrequency(_ s: String) -> [Character: Int] {
    var frequency: [Character: Int] = [:]
    
    for char in s {
        frequency[char, default: 0] += 1
    }
    
    return frequency
}
\`\`\`

#### 2. Two Sum Pattern
\`\`\`swift
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
\`\`\`

#### 3. Group Anagrams Pattern
\`\`\`swift
func groupAnagrams(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]
    
    for str in strs {
        let sortedStr = String(str.sorted())
        groups[sortedStr, default: []].append(str)
    }
    
    return Array(groups.values)
}
\`\`\`

### Sliding Window with Hashing

#### 1. Longest Substring Without Repeating Characters
\`\`\`swift
func lengthOfLongestSubstring(_ s: String) -> Int {
    var charIndex: [Character: Int] = [:]
    var maxLength = 0
    var start = 0
    
    for (end, char) in s.enumerated() {
        if let prevIndex = charIndex[char], prevIndex >= start {
            start = prevIndex + 1
        }
        
        charIndex[char] = end
        maxLength = max(maxLength, end - start + 1)
    }
    
    return maxLength
}
\`\`\`

#### 2. Sliding Window Maximum
\`\`\`swift
func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
    var result: [Int] = []
    var deque: [Int] = []  // Store indices
    
    for i in 0..<nums.count {
        // Remove elements outside window
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

### String Pattern Matching

#### KMP Algorithm Implementation
\`\`\`swift
func strStr(_ haystack: String, _ needle: String) -> Int {
    if needle.isEmpty { return 0 }
    
    let haystackArray = Array(haystack)
    let needleArray = Array(needle)
    
    // Build failure function (LPS array)
    let lps = buildLPS(needleArray)
    
    var i = 0  // haystack index
    var j = 0  // needle index
    
    while i < haystackArray.count {
        if haystackArray[i] == needleArray[j] {
            i += 1
            j += 1
        }
        
        if j == needleArray.count {
            return i - j  // Found match
        } else if i < haystackArray.count && haystackArray[i] != needleArray[j] {
            if j != 0 {
                j = lps[j - 1]
            } else {
                i += 1
            }
        }
    }
    
    return -1  // No match found
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

### Hash Table Applications

#### 1. Caching (LRU Cache)
- Use hash table + doubly linked list
- O(1) get and put operations

#### 2. Database Indexing
- Hash indexes for equality lookups
- Fast key-based retrieval

#### 3. Bloom Filters
- Probabilistic data structure
- Test set membership with possible false positives

#### 4. Distributed Systems
- Consistent hashing for load balancing
- Partition data across multiple servers

### Performance Considerations

#### Load Factor Management
- **Low Load Factor**: Wastes space but fewer collisions
- **High Load Factor**: Space efficient but more collisions
- **Optimal**: Usually around 0.7-0.75

#### Hash Function Quality
- **Uniform Distribution**: Keys spread evenly
- **Fast Computation**: Efficient hash calculation
- **Deterministic**: Same key always produces same hash

✅ **Pro Tips**:
- Choose appropriate hash function for data type
- Monitor load factor and resize when needed
- Use hash tables for O(1) lookup requirements
- Consider collision resolution strategy based on use case

❌ **Common Pitfalls**:
- Poor hash function causing clustering
- Not handling hash collisions properly
- Forgetting to resize hash table when load factor is high
- Using hash tables when order matters (use ordered data structures instead)`,
    javascript: {
        title: 'Hashing Algorithms in JavaScript',
        code: `// Hash Table Implementation with Separate Chaining
class HashTable {
    constructor(size = 16) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }
    
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size;
        }
        return hash;
    }
    
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        
        // Add new key-value pair
        bucket.push([key, value]);
    }
    
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        
        return undefined;
    }
    
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                const removedValue = bucket[i][1];
                bucket.splice(i, 1);
                return removedValue;
            }
        }
        
        return undefined;
    }
}

// 1. Linked List Cycle - Hash Table
function hasCycle(head) {
    const visited = new Set();
    
    while (head) {
        if (visited.has(head)) {
            return true;
        }
        visited.add(head);
        head = head.next;
    }
    
    return false;
}

// 2. Palindrome Linked List
function isPalindrome(head) {
    const values = [];
    
    // Collect all values
    while (head) {
        values.push(head.val);
        head = head.next;
    }
    
    // Check palindrome
    let left = 0, right = values.length - 1;
    while (left < right) {
        if (values[left] !== values[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// 3. Intersection of Two Linked Lists - Two Pointers
function getIntersectionNode(headA, headB) {
    const visited = new Set();
    
    // Add all nodes from list A to set
    while (headA) {
        visited.add(headA);
        headA = headA.next;
    }
    
    // Check if any node from list B is in set
    while (headB) {
        if (visited.has(headB)) {
            return headB;
        }
        headB = headB.next;
    }
    
    return null;
}

// 4. Remove Duplicates from Sorted List
function deleteDuplicates(head) {
    if (!head) return head;
    
    let current = head;
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return head;
}

// 5. Find Words Containing Character
function findWordsContaining(words, x) {
    return words.map((word, index) => word.includes(x) ? index : -1)
                .filter(index => index !== -1);
}

// 6. Jewels and Stones
function numJewelsInStones(jewels, stones) {
    const jewelSet = new Set(jewels);
    return stones.split('').filter(stone => jewelSet.has(stone)).length;
}

// 7. Find Most Frequent Vowel and Consonant
function findMostFrequentVowelConsonant(s) {
    const vowels = new Set('aeiouAEIOU');
    const vowelCount = {};
    const consonantCount = {};
    
    for (let char of s) {
        if (char.match(/[a-zA-Z]/)) {
            if (vowels.has(char)) {
                vowelCount[char] = (vowelCount[char] || 0) + 1;
            } else {
                consonantCount[char] = (consonantCount[char] || 0) + 1;
            }
        }
    }
    
    const maxVowel = Object.keys(vowelCount).reduce((a, b) => 
        vowelCount[a] > vowelCount[b] ? a : b, '');
    const maxConsonant = Object.keys(consonantCount).reduce((a, b) => 
        consonantCount[a] > consonantCount[b] ? a : b, '');
        
    return { vowel: maxVowel, consonant: maxConsonant };
}

// 8. Valid Palindrome - Approach 1 - Extra Space
function isPalindromeString(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// 9. Valid Anagram
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const count = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    
    return true;
}

// 10. Isomorphic Strings
function isIsomorphic(s, t) {
    if (s.length !== t.length) return false;
    
    const mapS = {}, mapT = {};
    
    for (let i = 0; i < s.length; i++) {
        if (mapS[s[i]] && mapS[s[i]] !== t[i]) return false;
        if (mapT[t[i]] && mapT[t[i]] !== s[i]) return false;
        
        mapS[s[i]] = t[i];
        mapT[t[i]] = s[i];
    }
    
    return true;
}

// 11. Group Anagrams - Approach 1 - Sorted Key
function groupAnagramsSorted(strs) {
    const map = {};
    
    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map[sorted]) map[sorted] = [];
        map[sorted].push(str);
    }
    
    return Object.values(map);
}

// 12. Group Anagrams - Approach 2 - Hashed Key
function groupAnagramsHashed(strs) {
    const map = {};
    
    for (let str of strs) {
        const count = new Array(26).fill(0);
        for (let char of str) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        const key = count.join(',');
        
        if (!map[key]) map[key] = [];
        map[key].push(str);
    }
    
    return Object.values(map);
}

// 13. Next Greater Element
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

// 14. Two Sum II - Input Array Is Sorted
function twoSum(numbers, target) {
    const map = new Map();
    
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        
        if (map.has(complement)) {
            return [map.get(complement) + 1, i + 1]; // 1-indexed
        }
        
        map.set(numbers[i], i);
    }
    
    return [];
}

// 15. Find Index of First Occurrence in String
function strStr(haystack, needle) {
    if (needle === '') return 0;
    
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.substring(i, i + needle.length) === needle) {
            return i;
        }
    }
    
    return -1;
}

// 16. KMP (Knuth-Morris-Pratt) Algorithm
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

// 17. Permutation in String
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

// 18. Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
    const charIndex = new Map();
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        if (charIndex.has(s[end]) && charIndex.get(s[end]) >= start) {
            start = charIndex.get(s[end]) + 1;
        }
        
        charIndex.set(s[end], end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

// 19. Sliding Window Maximum
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
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

// Test cases
const hashTable = new HashTable();
hashTable.set('key1', 'value1');
hashTable.set('key2', 'value2');
console.log(hashTable.get('key1')); // 'value1'

console.log(isAnagram('anagram', 'nagaram')); // true
console.log(groupAnagramsSorted(['eat','tea','tan','ate','nat','bat']));
console.log(lengthOfLongestSubstring('abcabcbb')); // 3
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]`
    },
    swift: {
        title: 'Hashing Algorithms in Swift',
        code: `import Foundation

// Hash Table Implementation with Separate Chaining
class HashTable<Key: Hashable, Value> {
    private var buckets: [[KeyValuePair<Key, Value>]]
    private let capacity: Int
    
    private struct KeyValuePair<K, V> {
        let key: K
        var value: V
    }
    
    init(capacity: Int = 16) {
        self.capacity = capacity
        self.buckets = Array(repeating: [], count: capacity)
    }
    
    private func hash(_ key: Key) -> Int {
        return abs(key.hashValue) % capacity
    }
    
    func set(_ key: Key, _ value: Value) {
        let index = hash(key)
        
        // Check if key already exists
        for i in 0..<buckets[index].count {
            if buckets[index][i].key == key {
                buckets[index][i].value = value
                return
            }
        }
        
        // Add new key-value pair
        buckets[index].append(KeyValuePair(key: key, value: value))
    }
    
    func get(_ key: Key) -> Value? {
        let index = hash(key)
        
        for pair in buckets[index] {
            if pair.key == key {
                return pair.value
            }
        }
        
        return nil
    }
    
    func remove(_ key: Key) -> Value? {
        let index = hash(key)
        
        for i in 0..<buckets[index].count {
            if buckets[index][i].key == key {
                let removedValue = buckets[index][i].value
                buckets[index].remove(at: i)
                return removedValue
            }
        }
        
        return nil
    }
}

// ListNode for linked list problems
class ListNode {
    var val: Int
    var next: ListNode?
    
    init(_ val: Int) {
        self.val = val
        self.next = nil
    }
}

// 1. Linked List Cycle - Hash Table
func hasCycle(_ head: ListNode?) -> Bool {
    var visited = Set<ObjectIdentifier>()
    var current = head
    
    while let node = current {
        let nodeId = ObjectIdentifier(node)
        if visited.contains(nodeId) {
            return true
        }
        visited.insert(nodeId)
        current = node.next
    }
    
    return false
}

// 2. Palindrome Linked List
func isPalindrome(_ head: ListNode?) -> Bool {
    var values: [Int] = []
    var current = head
    
    // Collect all values
    while let node = current {
        values.append(node.val)
        current = node.next
    }
    
    // Check palindrome
    var left = 0, right = values.count - 1
    while left < right {
        if values[left] != values[right] {
            return false
        }
        left += 1
        right -= 1
    }
    
    return true
}

// 3. Intersection of Two Linked Lists - Hash Table Approach
func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
    var visited = Set<ObjectIdentifier>()
    var current = headA
    
    // Add all nodes from list A to set
    while let node = current {
        visited.insert(ObjectIdentifier(node))
        current = node.next
    }
    
    current = headB
    // Check if any node from list B is in set
    while let node = current {
        if visited.contains(ObjectIdentifier(node)) {
            return node
        }
        current = node.next
    }
    
    return nil
}

// 4. Remove Duplicates from Sorted List
func deleteDuplicates(_ head: ListNode?) -> ListNode? {
    guard let head = head else { return nil }
    
    var current = head
    
    while let next = current.next {
        if current.val == next.val {
            current.next = next.next
        } else {
            current = next
        }
    }
    
    return head
}

// 5. Find Words Containing Character
func findWordsContaining(_ words: [String], _ x: Character) -> [Int] {
    return words.enumerated().compactMap { index, word in
        word.contains(x) ? index : nil
    }
}

// 6. Jewels and Stones
func numJewelsInStones(_ jewels: String, _ stones: String) -> Int {
    let jewelSet = Set(jewels)
    return stones.filter { jewelSet.contains($0) }.count
}

// 7. Find Most Frequent Vowel and Consonant
func findMostFrequentVowelConsonant(_ s: String) -> (vowel: Character?, consonant: Character?) {
    let vowels = Set("aeiouAEIOU")
    var vowelCount: [Character: Int] = [:]
    var consonantCount: [Character: Int] = [:]
    
    for char in s where char.isLetter {
        if vowels.contains(char) {
            vowelCount[char, default: 0] += 1
        } else {
            consonantCount[char, default: 0] += 1
        }
    }
    
    let maxVowel = vowelCount.max { $0.value < $1.value }?.key
    let maxConsonant = consonantCount.max { $0.value < $1.value }?.key
    
    return (maxVowel, maxConsonant)
}

// 8. Valid Palindrome - Approach 1 - Extra Space
func isPalindromeString(_ s: String) -> Bool {
    let cleaned = s.lowercased().filter { $0.isLetter || $0.isNumber }
    return cleaned == String(cleaned.reversed())
}

// 9. Valid Anagram
func isAnagram(_ s: String, _ t: String) -> Bool {
    guard s.count == t.count else { return false }
    
    var count: [Character: Int] = [:]
    
    for char in s {
        count[char, default: 0] += 1
    }
    
    for char in t {
        guard let charCount = count[char], charCount > 0 else { return false }
        count[char] = charCount - 1
    }
    
    return true
}

// 10. Isomorphic Strings
func isIsomorphic(_ s: String, _ t: String) -> Bool {
    guard s.count == t.count else { return false }
    
    var mapS: [Character: Character] = [:]
    var mapT: [Character: Character] = [:]
    
    for (charS, charT) in zip(s, t) {
        if let mappedT = mapS[charS], mappedT != charT { return false }
        if let mappedS = mapT[charT], mappedS != charS { return false }
        
        mapS[charS] = charT
        mapT[charT] = charS
    }
    
    return true
}

// 11. Group Anagrams - Approach 1 - Sorted Key
func groupAnagramsSorted(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]
    
    for str in strs {
        let sorted = String(str.sorted())
        groups[sorted, default: []].append(str)
    }
    
    return Array(groups.values)
}

// 12. Group Anagrams - Approach 2 - Hashed Key
func groupAnagramsHashed(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]
    
    for str in strs {
        var count = Array(repeating: 0, count: 26)
        for char in str {
            let index = Int(char.asciiValue! - Character("a").asciiValue!)
            count[index] += 1
        }
        let key = count.map(String.init).joined(separator: ",")
        groups[key, default: []].append(str)
    }
    
    return Array(groups.values)
}

// 13. Next Greater Element
func nextGreaterElement(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
    var stack: [Int] = []
    var map: [Int: Int] = [:]
    
    // Build next greater map for nums2
    for num in nums2 {
        while !stack.isEmpty && stack.last! < num {
            map[stack.removeLast()] = num
        }
        stack.append(num)
    }
    
    // Map results for nums1
    return nums1.map { map[$0] ?? -1 }
}

// 14. Two Sum II - Input Array Is Sorted
func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
    var numToIndex: [Int: Int] = [:]
    
    for (i, num) in numbers.enumerated() {
        let complement = target - num
        
        if let complementIndex = numToIndex[complement] {
            return [complementIndex + 1, i + 1] // 1-indexed
        }
        
        numToIndex[num] = i
    }
    
    return []
}

// 15. Find Index of First Occurrence in String
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

// 16. KMP (Knuth-Morris-Pratt) Algorithm
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

// 17. Permutation in String
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

// 18. Longest Substring Without Repeating Characters
func lengthOfLongestSubstring(_ s: String) -> Int {
    var charIndex: [Character: Int] = [:]
    var maxLength = 0
    var start = 0
    
    for (end, char) in s.enumerated() {
        if let prevIndex = charIndex[char], prevIndex >= start {
            start = prevIndex + 1
        }
        
        charIndex[char] = end
        maxLength = max(maxLength, end - start + 1)
    }
    
    return maxLength
}

// 19. Sliding Window Maximum
func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
    var result: [Int] = []
    var deque: [Int] = [] // Store indices
    
    for i in 0..<nums.count {
        // Remove elements outside window
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

// Test cases
let hashTable = HashTable<String, String>()
hashTable.set("key1", "value1")
hashTable.set("key2", "value2")
print(hashTable.get("key1") ?? "nil") // "value1"

print(isAnagram("anagram", "nagaram")) // true
print(groupAnagramsSorted(["eat","tea","tan","ate","nat","bat"]))
print(lengthOfLongestSubstring("abcabcbb")) // 3
print(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)) // [3,3,5,5,6,7]`
    },
    cpp: {
        title: 'Hashing Algorithms in C++',
        code: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <string>
#include <algorithm>
#include <queue>
#include <deque>

using namespace std;

// Hash Table Implementation with Separate Chaining
template<typename K, typename V>
class HashTable {
private:
    struct KeyValuePair {
        K key;
        V value;
        KeyValuePair(const K& k, const V& v) : key(k), value(v) {}
    };
    
    vector<vector<KeyValuePair>> buckets;
    int capacity;
    
    int hash(const K& key) {
        return std::hash<K>{}(key) % capacity;
    }
    
public:
    HashTable(int cap = 16) : capacity(cap) {
        buckets.resize(capacity);
    }
    
    void set(const K& key, const V& value) {
        int index = hash(key);
        
        // Check if key already exists
        for (auto& pair : buckets[index]) {
            if (pair.key == key) {
                pair.value = value;
                return;
            }
        }
        
        // Add new key-value pair
        buckets[index].emplace_back(key, value);
    }
    
    V* get(const K& key) {
        int index = hash(key);
        
        for (auto& pair : buckets[index]) {
            if (pair.key == key) {
                return &pair.value;
            }
        }
        
        return nullptr;
    }
    
    bool remove(const K& key) {
        int index = hash(key);
        
        for (auto it = buckets[index].begin(); it != buckets[index].end(); ++it) {
            if (it->key == key) {
                buckets[index].erase(it);
                return true;
            }
        }
        
        return false;
    }
};

// ListNode for linked list problems
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// 1. Linked List Cycle - Hash Table
bool hasCycle(ListNode* head) {
    unordered_set<ListNode*> visited;
    
    while (head) {
        if (visited.count(head)) {
            return true;
        }
        visited.insert(head);
        head = head->next;
    }
    
    return false;
}

// 2. Palindrome Linked List
bool isPalindrome(ListNode* head) {
    vector<int> values;
    
    // Collect all values
    while (head) {
        values.push_back(head->val);
        head = head->next;
    }
    
    // Check palindrome
    int left = 0, right = values.size() - 1;
    while (left < right) {
        if (values[left] != values[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// 3. Intersection of Two Linked Lists - Hash Table Approach
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    unordered_set<ListNode*> visited;
    
    // Add all nodes from list A to set
    while (headA) {
        visited.insert(headA);
        headA = headA->next;
    }
    
    // Check if any node from list B is in set
    while (headB) {
        if (visited.count(headB)) {
            return headB;
        }
        headB = headB->next;
    }
    
    return nullptr;
}

// 4. Remove Duplicates from Sorted List
ListNode* deleteDuplicates(ListNode* head) {
    if (!head) return head;
    
    ListNode* current = head;
    
    while (current && current->next) {
        if (current->val == current->next->val) {
            ListNode* temp = current->next;
            current->next = current->next->next;
            delete temp;
        } else {
            current = current->next;
        }
    }
    
    return head;
}

// 5. Find Words Containing Character
vector<int> findWordsContaining(vector<string>& words, char x) {
    vector<int> result;
    
    for (int i = 0; i < words.size(); i++) {
        if (words[i].find(x) != string::npos) {
            result.push_back(i);
        }
    }
    
    return result;
}

// 6. Jewels and Stones
int numJewelsInStones(string jewels, string stones) {
    unordered_set<char> jewelSet(jewels.begin(), jewels.end());
    int count = 0;
    
    for (char stone : stones) {
        if (jewelSet.count(stone)) {
            count++;
        }
    }
    
    return count;
}

// 7. Find Most Frequent Vowel and Consonant
pair<char, char> findMostFrequentVowelConsonant(string s) {
    unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'};
    unordered_map<char, int> vowelCount, consonantCount;
    
    for (char c : s) {
        if (isalpha(c)) {
            if (vowels.count(c)) {
                vowelCount[c]++;
            } else {
                consonantCount[c]++;
            }
        }
    }
    
    char maxVowel = 0, maxConsonant = 0;
    int maxVowelCount = 0, maxConsonantCount = 0;
    
    for (auto& [vowel, count] : vowelCount) {
        if (count > maxVowelCount) {
            maxVowelCount = count;
            maxVowel = vowel;
        }
    }
    
    for (auto& [consonant, count] : consonantCount) {
        if (count > maxConsonantCount) {
            maxConsonantCount = count;
            maxConsonant = consonant;
        }
    }
    
    return {maxVowel, maxConsonant};
}

// 8. Valid Palindrome - Approach 1 - Extra Space
bool isPalindromeString(string s) {
    string cleaned = "";
    for (char c : s) {
        if (isalnum(c)) {
            cleaned += tolower(c);
        }
    }
    
    string reversed = cleaned;
    reverse(reversed.begin(), reversed.end());
    return cleaned == reversed;
}

// 9. Valid Anagram
bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    
    unordered_map<char, int> count;
    
    for (char c : s) {
        count[c]++;
    }
    
    for (char c : t) {
        if (count[c] == 0) return false;
        count[c]--;
    }
    
    return true;
}

// 10. Isomorphic Strings
bool isIsomorphic(string s, string t) {
    if (s.length() != t.length()) return false;
    
    unordered_map<char, char> mapS, mapT;
    
    for (int i = 0; i < s.length(); i++) {
        if (mapS.count(s[i]) && mapS[s[i]] != t[i]) return false;
        if (mapT.count(t[i]) && mapT[t[i]] != s[i]) return false;
        
        mapS[s[i]] = t[i];
        mapT[t[i]] = s[i];
    }
    
    return true;
}

// 11. Group Anagrams - Approach 1 - Sorted Key
vector<vector<string>> groupAnagramsSorted(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    
    for (string str : strs) {
        string sorted = str;
        sort(sorted.begin(), sorted.end());
        groups[sorted].push_back(str);
    }
    
    vector<vector<string>> result;
    for (auto& [key, group] : groups) {
        result.push_back(group);
    }
    
    return result;
}

// 12. Group Anagrams - Approach 2 - Hashed Key
vector<vector<string>> groupAnagramsHashed(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    
    for (string str : strs) {
        vector<int> count(26, 0);
        for (char c : str) {
            count[c - 'a']++;
        }
        
        string key = "";
        for (int i = 0; i < 26; i++) {
            key += to_string(count[i]) + ",";
        }
        
        groups[key].push_back(str);
    }
    
    vector<vector<string>> result;
    for (auto& [key, group] : groups) {
        result.push_back(group);
    }
    
    return result;
}

// 13. Next Greater Element
vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    vector<int> stack;
    unordered_map<int, int> nextGreater;
    
    // Build next greater map for nums2
    for (int num : nums2) {
        while (!stack.empty() && stack.back() < num) {
            nextGreater[stack.back()] = num;
            stack.pop_back();
        }
        stack.push_back(num);
    }
    
    // Map results for nums1
    vector<int> result;
    for (int num : nums1) {
        result.push_back(nextGreater.count(num) ? nextGreater[num] : -1);
    }
    
    return result;
}

// 14. Two Sum II - Input Array Is Sorted
vector<int> twoSum(vector<int>& numbers, int target) {
    unordered_map<int, int> numToIndex;
    
    for (int i = 0; i < numbers.size(); i++) {
        int complement = target - numbers[i];
        
        if (numToIndex.count(complement)) {
            return {numToIndex[complement] + 1, i + 1}; // 1-indexed
        }
        
        numToIndex[numbers[i]] = i;
    }
    
    return {};
}

// 15. Find Index of First Occurrence in String
int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    
    for (int i = 0; i <= (int)haystack.length() - (int)needle.length(); i++) {
        if (haystack.substr(i, needle.length()) == needle) {
            return i;
        }
    }
    
    return -1;
}

// 16. KMP (Knuth-Morris-Pratt) Algorithm
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

// 17. Permutation in String
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

// 18. Longest Substring Without Repeating Characters
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> charIndex;
    int maxLength = 0;
    int start = 0;
    
    for (int end = 0; end < s.length(); end++) {
        if (charIndex.count(s[end]) && charIndex[s[end]] >= start) {
            start = charIndex[s[end]] + 1;
        }
        
        charIndex[s[end]] = end;
        maxLength = max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

// 19. Sliding Window Maximum
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq; // Store indices
    
    for (int i = 0; i < nums.size(); i++) {
        // Remove elements outside window
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

// Test function
int main() {
    HashTable<string, string> hashTable;
    hashTable.set("key1", "value1");
    hashTable.set("key2", "value2");
    
    string* value = hashTable.get("key1");
    cout << (value ? *value : "null") << endl; // "value1"
    
    cout << isAnagram("anagram", "nagaram") << endl; // 1 (true)
    
    vector<string> anagramTest = {"eat","tea","tan","ate","nat","bat"};
    auto grouped = groupAnagramsSorted(anagramTest);
    cout << "Grouped anagrams: " << grouped.size() << " groups" << endl;
    
    cout << lengthOfLongestSubstring("abcabcbb") << endl; // 3
    
    vector<int> slidingTest = {1,3,-1,-3,5,3,6,7};
    auto maxWindow = maxSlidingWindow(slidingTest, 3);
    cout << "Sliding window maximum: ";
    for (int x : maxWindow) cout << x << " ";
    cout << endl; // 3 3 5 5 6 7
    
    return 0;
}`
    }
};