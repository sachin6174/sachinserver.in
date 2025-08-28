export const oneDDPData = {
    title: '1D Dynamic Programming',
    description: 'Master one-dimensional dynamic programming patterns including optimization problems, decision-making sequences, and state transition algorithms',
    questions: [
        // Easy Level (0-4)
        'Climbing Stairs - https://leetcode.com/problems/climbing-stairs/',
        'House Robber - https://leetcode.com/problems/house-robber/',
        'N-th Tribonacci Number - https://leetcode.com/problems/n-th-tribonacci-number/',
        'Min Cost Climbing Stairs - https://leetcode.com/problems/min-cost-climbing-stairs/',
        'Fibonacci Number - https://leetcode.com/problems/fibonacci-number/',

        // Medium Level (5-9)
        'Word Break - https://leetcode.com/problems/word-break/',
        'Coin Change - https://leetcode.com/problems/coin-change/',
        'Longest Increasing Subsequence - https://leetcode.com/problems/longest-increasing-subsequence/',
        'Partition Equal Subset Sum - https://leetcode.com/problems/partition-equal-subset-sum/',
        'Maximum Product Subarray - https://leetcode.com/problems/maximum-product-subarray/',

        // Hard Level (10+)
        'Decode Ways - https://leetcode.com/problems/decode-ways/',
        'Perfect Squares - https://leetcode.com/problems/perfect-squares/',
        'Combination Sum IV - https://leetcode.com/problems/combination-sum-iv/',
        'House Robber II - https://leetcode.com/problems/house-robber-ii/',
        'Palindromic Substrings - https://leetcode.com/problems/palindromic-substrings/',
        'Longest Palindromic Subsequence - https://leetcode.com/problems/longest-palindromic-subsequence/',
        'Russian Doll Envelopes - https://leetcode.com/problems/russian-doll-envelopes/',
        'Maximum Sum Circular Subarray - https://leetcode.com/problems/maximum-sum-circular-subarray/',
        'Best Time to Buy and Sell Stock with Transaction Fee - https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/',
        'Delete and Earn - https://leetcode.com/problems/delete-and-earn/'
    ],
    explanation: `## 1D Dynamic Programming Fundamentals

### What is 1D Dynamic Programming?
**One-dimensional DP** focuses on problems where the state can be represented using a single parameter (usually an index or position). These problems often involve making optimal decisions at each step based on previous states.

### Core DP Principles
1. **Overlapping Subproblems**: Same subproblems appear multiple times
2. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems  
3. **State Definition**: Define what dp[i] represents
4. **Transition Formula**: How current state relates to previous states
5. **Base Cases**: Initial values to start the computation

### Common 1D DP Patterns

#### 1. **Linear DP** (Climbing Stairs, Fibonacci)
- **State**: dp[i] = answer for position i
- **Transition**: dp[i] depends on dp[i-1], dp[i-2], etc.
- **Time**: O(n), **Space**: O(n) → O(1) optimized

#### 2. **Decision DP** (House Robber, Delete and Earn)
- **State**: dp[i] = maximum value considering elements up to index i
- **Choice**: Include current element or not
- **Transition**: dp[i] = max(include, exclude)

#### 3. **Subsequence DP** (LIS, Palindromic Subsequence)
- **State**: dp[i] = length/count of subsequence ending at index i
- **Transition**: Check all previous elements for extension
- **Time**: O(n²) or O(n log n) with optimization

#### 4. **Knapsack Variants** (Coin Change, Partition Equal Subset Sum)
- **State**: dp[i] = minimum/maximum way to achieve target i
- **Transition**: Try all possible choices for current decision
- **Space**: Often optimizable from 2D to 1D

#### 5. **String DP** (Word Break, Decode Ways)
- **State**: dp[i] = number of ways to decode/break string up to index i
- **Transition**: Try all valid splits ending at position i

### Problem Categories & Patterns

| Pattern | Problems | Key Insight |
|---------|----------|-------------|
| **Fibonacci-like** | Climbing Stairs, Tribonacci | dp[i] = dp[i-1] + dp[i-2] + ... |
| **Choice/Decision** | House Robber, Delete & Earn | max(take + dp[i-2], skip + dp[i-1]) |
| **Optimization** | Coin Change, Perfect Squares | min(dp[i-coin] + 1) for all coins |
| **Subsequence** | LIS, Palindromic Substrings | Check all previous elements |
| **Partition** | Subset Sum, Word Break | Can we partition/break optimally? |

### Time & Space Complexity

| Problem Type | Time | Space | Space Optimized |
|--------------|------|-------|-----------------|
| Linear DP | O(n) | O(n) | O(1) |
| Decision DP | O(n) | O(n) | O(1) |
| Subsequence DP | O(n²) | O(n) | O(n) |
| Knapsack 1D | O(n×target) | O(target) | O(target) |
| String DP | O(n²) | O(n) | O(n) |

### DP Optimization Techniques

#### 1. **Space Optimization**
- Use only necessary previous states
- Rolling array technique
- Constant space when possible

#### 2. **State Compression**
- Represent multiple states in single variable
- Bit manipulation for subset problems
- Coordinate compression for large ranges

#### 3. **Memoization vs Tabulation**
- **Top-down**: Recursive + memo (easier to write)
- **Bottom-up**: Iterative + table (better space usage)

### Problem-Solving Strategy

#### Step 1: **Identify DP Structure**
- Can the problem be broken into subproblems?
- Do subproblems overlap?
- Is there optimal substructure?

#### Step 2: **Define State**
- What does dp[i] represent?
- What parameters define a unique subproblem?

#### Step 3: **Find Recurrence**
- How does dp[i] relate to previous states?
- What choices/transitions are possible?

#### Step 4: **Determine Base Cases**
- What are the simplest subproblems?
- How to initialize the dp array?

#### Step 5: **Optimize**
- Can space be reduced?
- Are there mathematical optimizations?

### Advanced Techniques

#### Binary Search + DP (LIS Optimization)
\`\`\`
O(n²) → O(n log n) using patience sorting
\`\`\`

#### Rolling Array Optimization
\`\`\`
space: O(n) → O(1) for linear dependencies
\`\`\`

#### State Machine DP
\`\`\`
Multiple states per position (buy/sell/cooldown)
\`\`\`

✅ **Pro Tips**:
- Always define what dp[i] means clearly
- Draw small examples to understand the pattern
- Consider both recursive and iterative approaches  
- Look for space optimization opportunities
- Practice state transition formula derivation

❌ **Common Pitfalls**:
- Confusing dp[i] definition (ending at i vs considering up to i)
- Wrong base case initialization
- Off-by-one errors in transitions
- Missing edge cases (empty input, single element)
- Not considering all possible transitions`,
    javascript: {
        title: '1D DP Algorithms in JavaScript',
        code: `// 1D Dynamic Programming Problems in JavaScript

// 1. Climbing Stairs
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 2. House Robber
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0, prev1 = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 3. Word Break
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true; // Empty string can always be segmented
    
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

// 4. Coin Change
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}

// 5. Longest Increasing Subsequence
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// 6. Longest Increasing Subsequence (Optimized with Binary Search)
function lengthOfLISOptimized(nums) {
    if (nums.length === 0) return 0;
    
    const tails = [];
    
    for (const num of nums) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

// 7. Partition Equal Subset Sum
function canPartition(nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    if (sum % 2 !== 0) return false;
    
    const target = sum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    
    for (const num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}

// 8. Maximum Product Subarray
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [maxSoFar, minSoFar] = [minSoFar, maxSoFar];
        }
        
        maxSoFar = Math.max(nums[i], maxSoFar * nums[i]);
        minSoFar = Math.min(nums[i], minSoFar * nums[i]);
        
        result = Math.max(result, maxSoFar);
    }
    
    return result;
}

// 9. Decode Ways
function numDecodings(s) {
    if (s[0] === '0') return 0;
    
    let prev2 = 1, prev1 = 1;
    
    for (let i = 2; i <= s.length; i++) {
        let current = 0;
        
        // Single digit
        if (s[i - 1] !== '0') {
            current += prev1;
        }
        
        // Two digits
        const twoDigit = parseInt(s.substring(i - 2, i));
        if (twoDigit >= 10 && twoDigit <= 26) {
            current += prev2;
        }
        
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 10. Perfect Squares
function numSquares(n) {
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    
    return dp[n];
}

// 11. Combination Sum IV
function combinationSum4(nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    
    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (num <= i) {
                dp[i] += dp[i - num];
            }
        }
    }
    
    return dp[target];
}

// 12. House Robber II (Circular)
function robII(nums) {
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);
    
    function robLinear(houses) {
        let prev2 = 0, prev1 = 0;
        for (const house of houses) {
            const current = Math.max(prev1, prev2 + house);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
    
    // Case 1: Rob houses 0 to n-2 (exclude last)
    const withFirst = robLinear(nums.slice(0, -1));
    
    // Case 2: Rob houses 1 to n-1 (exclude first)
    const withoutFirst = robLinear(nums.slice(1));
    
    return Math.max(withFirst, withoutFirst);
}

// 13. Delete and Earn
function deleteAndEarn(nums) {
    if (nums.length === 0) return 0;
    
    const maxNum = Math.max(...nums);
    const points = new Array(maxNum + 1).fill(0);
    
    // Calculate total points for each number
    for (const num of nums) {
        points[num] += num;
    }
    
    // Apply House Robber logic
    let prev2 = 0, prev1 = points[0];
    
    for (let i = 1; i < points.length; i++) {
        const current = Math.max(prev1, prev2 + points[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Test cases
console.log("1D DP Examples:");
console.log("Climbing Stairs (n=5):", climbStairs(5)); // 8
console.log("House Robber ([2,7,9,3,1]):", rob([2,7,9,3,1])); // 12
console.log("Word Break ('leetcode', ['leet','code']):", wordBreak("leetcode", ["leet","code"])); // true
console.log("Coin Change ([1,3,4], 6):", coinChange([1,3,4], 6)); // 2
console.log("LIS ([10,9,2,5,3,7,101,18]):", lengthOfLIS([10,9,2,5,3,7,101,18])); // 4
console.log("Can Partition ([1,5,11,5]):", canPartition([1,5,11,5])); // true
console.log("Max Product ([2,3,-2,4]):", maxProduct([2,3,-2,4])); // 6
console.log("Decode Ways ('226'):", numDecodings("226")); // 3
console.log("Perfect Squares (12):", numSquares(12)); // 3
console.log("Combination Sum IV ([1,2,3], 4):", combinationSum4([1,2,3], 4)); // 7`
    },
    swift: {
        title: '1D DP Algorithms in Swift',
        code: `// 1D Dynamic Programming Problems in Swift

// 1. Climbing Stairs
func climbStairs(_ n: Int) -> Int {
    guard n > 2 else { return n }
    
    var prev2 = 1, prev1 = 2
    
    for _ in 3...n {
        let current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    }
    
    return prev1
}

// 2. House Robber
func rob(_ nums: [Int]) -> Int {
    guard !nums.isEmpty else { return 0 }
    guard nums.count > 1 else { return nums[0] }
    
    var prev2 = 0, prev1 = nums[0]
    
    for i in 1..<nums.count {
        let current = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = current
    }
    
    return prev1
}

// 3. Word Break
func wordBreak(_ s: String, _ wordDict: [String]) -> Bool {
    let wordSet = Set(wordDict)
    let chars = Array(s)
    var dp = Array(repeating: false, count: s.count + 1)
    dp[0] = true
    
    for i in 1...s.count {
        for j in 0..<i {
            if dp[j] && wordSet.contains(String(chars[j..<i])) {
                dp[i] = true
                break
            }
        }
    }
    
    return dp[s.count]
}

// 4. Coin Change
func coinChange(_ coins: [Int], _ amount: Int) -> Int {
    var dp = Array(repeating: amount + 1, count: amount + 1)
    dp[0] = 0
    
    for i in 1...amount {
        for coin in coins {
            if coin <= i {
                dp[i] = min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount]
}

// 5. Longest Increasing Subsequence
func lengthOfLIS(_ nums: [Int]) -> Int {
    guard !nums.isEmpty else { return 0 }
    
    var dp = Array(repeating: 1, count: nums.count)
    
    for i in 1..<nums.count {
        for j in 0..<i {
            if nums[j] < nums[i] {
                dp[i] = max(dp[i], dp[j] + 1)
            }
        }
    }
    
    return dp.max() ?? 1
}

// 6. Longest Increasing Subsequence (Optimized with Binary Search)
func lengthOfLISOptimized(_ nums: [Int]) -> Int {
    guard !nums.isEmpty else { return 0 }
    
    var tails: [Int] = []
    
    for num in nums {
        var left = 0, right = tails.count
        
        while left < right {
            let mid = (left + right) / 2
            if tails[mid] < num {
                left = mid + 1
            } else {
                right = mid
            }
        }
        
        if left == tails.count {
            tails.append(num)
        } else {
            tails[left] = num
        }
    }
    
    return tails.count
}

// 7. Partition Equal Subset Sum
func canPartition(_ nums: [Int]) -> Bool {
    let sum = nums.reduce(0, +)
    guard sum % 2 == 0 else { return false }
    
    let target = sum / 2
    var dp = Array(repeating: false, count: target + 1)
    dp[0] = true
    
    for num in nums {
        for j in stride(from: target, through: num, by: -1) {
            dp[j] = dp[j] || dp[j - num]
        }
    }
    
    return dp[target]
}

// 8. Maximum Product Subarray
func maxProduct(_ nums: [Int]) -> Int {
    var maxSoFar = nums[0]
    var minSoFar = nums[0]
    var result = nums[0]
    
    for i in 1..<nums.count {
        if nums[i] < 0 {
            swap(&maxSoFar, &minSoFar)
        }
        
        maxSoFar = max(nums[i], maxSoFar * nums[i])
        minSoFar = min(nums[i], minSoFar * nums[i])
        
        result = max(result, maxSoFar)
    }
    
    return result
}

// 9. Decode Ways
func numDecodings(_ s: String) -> Int {
    let chars = Array(s)
    guard chars[0] != "0" else { return 0 }
    
    var prev2 = 1, prev1 = 1
    
    for i in 2...s.count {
        var current = 0
        
        // Single digit
        if chars[i - 1] != "0" {
            current += prev1
        }
        
        // Two digits
        let twoDigitStr = String(chars[i-2..<i])
        if let twoDigit = Int(twoDigitStr), twoDigit >= 10 && twoDigit <= 26 {
            current += prev2
        }
        
        prev2 = prev1
        prev1 = current
    }
    
    return prev1
}

// 10. Perfect Squares
func numSquares(_ n: Int) -> Int {
    var dp = Array(repeating: Int.max, count: n + 1)
    dp[0] = 0
    
    for i in 1...n {
        var j = 1
        while j * j <= i {
            dp[i] = min(dp[i], dp[i - j * j] + 1)
            j += 1
        }
    }
    
    return dp[n]
}

// 11. Combination Sum IV
func combinationSum4(_ nums: [Int], _ target: Int) -> Int {
    var dp = Array(repeating: 0, count: target + 1)
    dp[0] = 1
    
    for i in 1...target {
        for num in nums {
            if num <= i {
                dp[i] += dp[i - num]
            }
        }
    }
    
    return dp[target]
}

// 12. House Robber II (Circular)
func robII(_ nums: [Int]) -> Int {
    guard nums.count > 1 else { return nums.first ?? 0 }
    guard nums.count > 2 else { return max(nums[0], nums[1]) }
    
    func robLinear(_ houses: [Int]) -> Int {
        var prev2 = 0, prev1 = 0
        for house in houses {
            let current = max(prev1, prev2 + house)
            prev2 = prev1
            prev1 = current
        }
        return prev1
    }
    
    // Case 1: Rob houses 0 to n-2 (exclude last)
    let withFirst = robLinear(Array(nums[0..<nums.count-1]))
    
    // Case 2: Rob houses 1 to n-1 (exclude first)
    let withoutFirst = robLinear(Array(nums[1..<nums.count]))
    
    return max(withFirst, withoutFirst)
}

// 13. Delete and Earn
func deleteAndEarn(_ nums: [Int]) -> Int {
    guard !nums.isEmpty else { return 0 }
    
    let maxNum = nums.max() ?? 0
    var points = Array(repeating: 0, count: maxNum + 1)
    
    // Calculate total points for each number
    for num in nums {
        points[num] += num
    }
    
    // Apply House Robber logic
    var prev2 = 0, prev1 = points[0]
    
    for i in 1..<points.count {
        let current = max(prev1, prev2 + points[i])
        prev2 = prev1
        prev1 = current
    }
    
    return prev1
}

// Test cases
print("1D DP Examples:")
print("Climbing Stairs (n=5):", climbStairs(5)) // 8
print("House Robber ([2,7,9,3,1]):", rob([2,7,9,3,1])) // 12
print("Word Break ('leetcode', ['leet','code']):", wordBreak("leetcode", ["leet","code"])) // true
print("Coin Change ([1,3,4], 6):", coinChange([1,3,4], 6)) // 2
print("LIS ([10,9,2,5,3,7,101,18]):", lengthOfLIS([10,9,2,5,3,7,101,18])) // 4
print("Can Partition ([1,5,11,5]):", canPartition([1,5,11,5])) // true
print("Max Product ([2,3,-2,4]):", maxProduct([2,3,-2,4])) // 6
print("Decode Ways ('226'):", numDecodings("226")) // 3
print("Perfect Squares (12):", numSquares(12)) // 3
print("Combination Sum IV ([1,2,3], 4):", combinationSum4([1,2,3], 4)) // 7`
    },
    cpp: {
        title: '1D DP Algorithms in C++',
        code: `#include <vector>
#include <string>
#include <unordered_set>
#include <algorithm>
#include <climits>
#include <iostream>

using namespace std;

// 1D Dynamic Programming Problems in C++

// 1. Climbing Stairs
int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev2 = 1, prev1 = 2;
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 2. House Robber
int rob(vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];
    
    int prev2 = 0, prev1 = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
        int current = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 3. Word Break
bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
    vector<bool> dp(s.length() + 1, false);
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

// 4. Coin Change
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}

// 5. Longest Increasing Subsequence
int lengthOfLIS(vector<int>& nums) {
    if (nums.empty()) return 0;
    
    vector<int> dp(nums.size(), 1);
    
    for (int i = 1; i < nums.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return *max_element(dp.begin(), dp.end());
}

// 6. Longest Increasing Subsequence (Optimized with Binary Search)
int lengthOfLISOptimized(vector<int>& nums) {
    if (nums.empty()) return 0;
    
    vector<int> tails;
    
    for (int num : nums) {
        int left = 0, right = tails.size();
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left == tails.size()) {
            tails.push_back(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.size();
}

// 7. Partition Equal Subset Sum
bool canPartition(vector<int>& nums) {
    int sum = 0;
    for (int num : nums) sum += num;
    if (sum % 2 != 0) return false;
    
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    
    for (int num : nums) {
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}

// 8. Maximum Product Subarray
int maxProduct(vector<int>& nums) {
    int maxSoFar = nums[0];
    int minSoFar = nums[0];
    int result = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] < 0) {
            swap(maxSoFar, minSoFar);
        }
        
        maxSoFar = max(nums[i], maxSoFar * nums[i]);
        minSoFar = min(nums[i], minSoFar * nums[i]);
        
        result = max(result, maxSoFar);
    }
    
    return result;
}

// 9. Decode Ways
int numDecodings(string s) {
    if (s[0] == '0') return 0;
    
    int prev2 = 1, prev1 = 1;
    
    for (int i = 2; i <= s.length(); i++) {
        int current = 0;
        
        // Single digit
        if (s[i - 1] != '0') {
            current += prev1;
        }
        
        // Two digits
        int twoDigit = stoi(s.substr(i - 2, 2));
        if (twoDigit >= 10 && twoDigit <= 26) {
            current += prev2;
        }
        
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// 10. Perfect Squares
int numSquares(int n) {
    vector<int> dp(n + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j * j <= i; j++) {
            dp[i] = min(dp[i], dp[i - j * j] + 1);
        }
    }
    
    return dp[n];
}

// 11. Combination Sum IV
int combinationSum4(vector<int>& nums, int target) {
    vector<unsigned int> dp(target + 1, 0);
    dp[0] = 1;
    
    for (int i = 1; i <= target; i++) {
        for (int num : nums) {
            if (num <= i) {
                dp[i] += dp[i - num];
            }
        }
    }
    
    return dp[target];
}

// 12. House Robber II (Circular)
int robII(vector<int>& nums) {
    if (nums.size() == 1) return nums[0];
    if (nums.size() == 2) return max(nums[0], nums[1]);
    
    auto robLinear = [](vector<int> houses) {
        int prev2 = 0, prev1 = 0;
        for (int house : houses) {
            int current = max(prev1, prev2 + house);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    };
    
    // Case 1: Rob houses 0 to n-2 (exclude last)
    vector<int> withFirst(nums.begin(), nums.end() - 1);
    int withFirstResult = robLinear(withFirst);
    
    // Case 2: Rob houses 1 to n-1 (exclude first)
    vector<int> withoutFirst(nums.begin() + 1, nums.end());
    int withoutFirstResult = robLinear(withoutFirst);
    
    return max(withFirstResult, withoutFirstResult);
}

// 13. Delete and Earn
int deleteAndEarn(vector<int>& nums) {
    if (nums.empty()) return 0;
    
    int maxNum = *max_element(nums.begin(), nums.end());
    vector<int> points(maxNum + 1, 0);
    
    // Calculate total points for each number
    for (int num : nums) {
        points[num] += num;
    }
    
    // Apply House Robber logic
    int prev2 = 0, prev1 = points[0];
    
    for (int i = 1; i < points.size(); i++) {
        int current = max(prev1, prev2 + points[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Test function
int main() {
    cout << "1D DP Examples:" << endl;
    
    cout << "Climbing Stairs (n=5): " << climbStairs(5) << endl; // 8
    
    vector<int> houses = {2,7,9,3,1};
    cout << "House Robber ([2,7,9,3,1]): " << rob(houses) << endl; // 12
    
    string s = "leetcode";
    vector<string> dict = {"leet", "code"};
    cout << "Word Break ('leetcode', ['leet','code']): " << wordBreak(s, dict) << endl; // 1 (true)
    
    vector<int> coins = {1,3,4};
    cout << "Coin Change ([1,3,4], 6): " << coinChange(coins, 6) << endl; // 2
    
    vector<int> lis = {10,9,2,5,3,7,101,18};
    cout << "LIS ([10,9,2,5,3,7,101,18]): " << lengthOfLIS(lis) << endl; // 4
    
    vector<int> partition = {1,5,11,5};
    cout << "Can Partition ([1,5,11,5]): " << canPartition(partition) << endl; // 1 (true)
    
    vector<int> product = {2,3,-2,4};
    cout << "Max Product ([2,3,-2,4]): " << maxProduct(product) << endl; // 6
    
    cout << "Decode Ways ('226'): " << numDecodings("226") << endl; // 3
    
    cout << "Perfect Squares (12): " << numSquares(12) << endl; // 3
    
    vector<int> combSum = {1,2,3};
    cout << "Combination Sum IV ([1,2,3], 4): " << combinationSum4(combSum, 4) << endl; // 7
    
    return 0;
}`
    }
};