export const stringsData = {
    title: 'Strings - Easy/Medium',
    description: 'Master string manipulation, pattern matching, and text processing algorithms with comprehensive problems covering character operations, palindromes, and string transformations.',
    questions: [
        'Length of Last Word - Approach 1 - Two Loops - https://leetcode.com/problems/length-of-last-word/',
        'Length of Last Word - Approach 2 - One Loop - https://leetcode.com/problems/length-of-last-word/',
        'Find Words Containing Character - https://leetcode.com/problems/find-words-containing-character/',
        'Jewels and Stones - https://leetcode.com/problems/jewels-and-stones/',
        'Find Most Frequent Vowel and Consonant - https://leetcode.com/problems/most-common-word/',
        'Split a String in Balanced Strings - https://leetcode.com/problems/split-a-string-in-balanced-strings/',
        'Reverse String II - https://leetcode.com/problems/reverse-string-ii/',
        'Valid Palindrome - Approach 1 - Extra Space - https://leetcode.com/problems/valid-palindrome/',
        'Valid Palindrome - Approach 2 - Two Pointers - https://leetcode.com/problems/valid-palindrome/',
        'Largest Odd Number in a String - https://leetcode.com/problems/largest-odd-number-in-string/',
        'Longest Common Prefix - https://leetcode.com/problems/longest-common-prefix/',
        'Valid Anagram - https://leetcode.com/problems/valid-anagram/',
        'Isomorphic Strings - https://leetcode.com/problems/isomorphic-strings/',
        'Group Anagrams - Approach 1 - Sorted Key - https://leetcode.com/problems/group-anagrams/',
        'Group Anagrams - Approach 2 - Hashed Key - https://leetcode.com/problems/group-anagrams/'
    ],
    explanation: `## String Fundamentals

### Core String Operations
**Strings** are sequences of characters that require specialized algorithms for efficient manipulation, searching, and transformation.

### Key String Patterns
- **Two Pointers**: Compare characters from both ends
- **Sliding Window**: Process substrings efficiently  
- **Character Frequency**: Count and compare character occurrences
- **Pattern Matching**: Find substrings and patterns

### Common String Techniques

#### 1. Character Manipulation
\`\`\`swift
// Swift string character access
let str = "Hello"
let firstChar = str.first // 'H'
let lastChar = str.last   // 'o'
let reversed = String(str.reversed()) // "olleH"
\`\`\`

#### 2. Two Pointer Technique
\`\`\`swift
func isPalindrome(_ s: String) -> Bool {
    let chars = Array(s.lowercased().filter { $0.isLetter || $0.isNumber })
    var left = 0, right = chars.count - 1
    
    while left < right {
        if chars[left] != chars[right] { return false }
        left += 1
        right -= 1
    }
    return true
}
\`\`\`

#### 3. Character Frequency Counting
\`\`\`swift
func characterFrequency(_ s: String) -> [Character: Int] {
    var freq: [Character: Int] = [:]
    for char in s {
        freq[char, default: 0] += 1
    }
    return freq
}
\`\`\`

### String Complexity Analysis

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Access | O(1) | O(1) | Direct index access |
| Search | O(n) | O(1) | Linear scan |
| Insertion | O(n) | O(1) | Shift required |
| Deletion | O(n) | O(1) | Shift required |
| Concatenation | O(m+n) | O(m+n) | New string creation |

### Advanced String Algorithms

#### KMP Pattern Matching
- **Time**: O(n + m) for text length n, pattern length m
- **Use Case**: Efficient substring search

#### Rolling Hash
- **Time**: O(1) for hash updates
- **Use Case**: Fast string comparison

#### Trie (Prefix Tree)
- **Time**: O(m) for operations on string length m
- **Use Case**: Autocomplete, prefix matching

### String Problem Categories

#### Easy Problems (1-5)
- Length calculations
- Character finding
- Basic transformations

#### Medium Problems (6-10)
- Pattern matching
- Palindrome validation
- String reversal with constraints

#### Advanced Problems (11-15)
- Anagram grouping
- Longest common subsequences
- Complex string transformations

✅ **Pro Tips**:
- Always consider edge cases (empty strings, single characters)
- Use appropriate data structures (Set for lookups, Array for ordering)
- Consider space-time tradeoffs (in-place vs extra space)
- Master two-pointer technique for palindromes and comparisons

❌ **Common Pitfalls**:
- String immutability in many languages
- Unicode and encoding considerations
- Case sensitivity requirements
- Whitespace and special character handling`,
    javascript: {
        title: 'String Algorithms in JavaScript',
        code: `// 1. Length of Last Word - Two Approaches
function lengthOfLastWordTwoLoops(s) {
    // Approach 1: Two loops
    s = s.trim();
    let words = s.split(' ');
    return words[words.length - 1].length;
}

function lengthOfLastWordOneLoop(s) {
    // Approach 2: One loop from end
    let length = 0;
    let i = s.length - 1;
    
    // Skip trailing spaces
    while (i >= 0 && s[i] === ' ') i--;
    
    // Count characters of last word
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }
    return length;
}

// 2. Find Words Containing Character
function findWordsContaining(words, x) {
    return words.filter((word, index) => 
        word.includes(x) ? index : -1
    ).map((word, originalIndex) => 
        words.indexOf(word)
    );
}

// 3. Jewels and Stones
function numJewelsInStones(jewels, stones) {
    const jewelSet = new Set(jewels);
    return stones.split('').filter(stone => jewelSet.has(stone)).length;
}

// 4. Most Frequent Vowel and Consonant
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

// 5. Split Balanced Strings
function balancedStringSplit(s) {
    let balance = 0;
    let count = 0;
    
    for (let char of s) {
        balance += char === 'R' ? 1 : -1;
        if (balance === 0) count++;
    }
    return count;
}

// 6. Reverse String II
function reverseStr(s, k) {
    let arr = s.split('');
    
    for (let i = 0; i < arr.length; i += 2 * k) {
        let left = i;
        let right = Math.min(i + k - 1, arr.length - 1);
        
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    return arr.join('');
}

// 7. Valid Palindrome - Extra Space
function isPalindromeExtraSpace(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// 8. Valid Palindrome - Two Pointers
function isPalindromeTwoPointers(s) {
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

// 9. Largest Odd Number in String
function largestOddNumber(num) {
    for (let i = num.length - 1; i >= 0; i--) {
        if (parseInt(num[i]) % 2 === 1) {
            return num.substring(0, i + 1);
        }
    }
    return '';
}

// 10. Longest Common Prefix
function longestCommonPrefix(strs) {
    if (!strs.length) return '';
    
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (!prefix) return '';
        }
    }
    return prefix;
}

// 11. Valid Anagram
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

// 12. Isomorphic Strings
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

// 13. Group Anagrams - Sorted Key
function groupAnagramsSorted(strs) {
    const map = {};
    
    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map[sorted]) map[sorted] = [];
        map[sorted].push(str);
    }
    
    return Object.values(map);
}

// 14. Group Anagrams - Hashed Key
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

// Test cases
console.log(lengthOfLastWordOneLoop("Hello World")); // 5
console.log(numJewelsInStones("aA", "aAAbbbb")); // 3
console.log(balancedStringSplit("RLRRLLRLRL")); // 4
console.log(isPalindromeTwoPointers("A man, a plan, a canal: Panama")); // true
console.log(largestOddNumber("52")); // "5"
console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(isAnagram("anagram", "nagaram")); // true
console.log(groupAnagramsSorted(["eat","tea","tan","ate","nat","bat"]));`
    },
    swift: {
        title: 'String Algorithms in Swift',
        code: `// 1. Length of Last Word - Two Approaches
func lengthOfLastWordTwoLoops(_ s: String) -> Int {
    // Approach 1: Using components
    let words = s.trimmingCharacters(in: .whitespaces).components(separatedBy: " ")
    return words.last?.count ?? 0
}

func lengthOfLastWordOneLoop(_ s: String) -> Int {
    // Approach 2: One loop from end
    let chars = Array(s)
    var length = 0
    var i = chars.count - 1
    
    // Skip trailing spaces
    while i >= 0 && chars[i] == " " { i -= 1 }
    
    // Count characters of last word
    while i >= 0 && chars[i] != " " {
        length += 1
        i -= 1
    }
    return length
}

// 2. Find Words Containing Character
func findWordsContaining(_ words: [String], _ x: Character) -> [Int] {
    return words.enumerated().compactMap { index, word in
        word.contains(x) ? index : nil
    }
}

// 3. Jewels and Stones
func numJewelsInStones(_ jewels: String, _ stones: String) -> Int {
    let jewelSet = Set(jewels)
    return stones.filter { jewelSet.contains($0) }.count
}

// 4. Most Frequent Vowel and Consonant
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

// 5. Split Balanced Strings
func balancedStringSplit(_ s: String) -> Int {
    var balance = 0
    var count = 0
    
    for char in s {
        balance += char == "R" ? 1 : -1
        if balance == 0 { count += 1 }
    }
    return count
}

// 6. Reverse String II
func reverseStr(_ s: String, _ k: Int) -> String {
    var chars = Array(s)
    
    for i in stride(from: 0, to: chars.count, by: 2 * k) {
        let left = i
        let right = min(i + k - 1, chars.count - 1)
        
        var l = left, r = right
        while l < r {
            chars.swapAt(l, r)
            l += 1
            r -= 1
        }
    }
    return String(chars)
}

// 7. Valid Palindrome - Extra Space
func isPalindromeExtraSpace(_ s: String) -> Bool {
    let cleaned = s.lowercased().filter { $0.isLetter || $0.isNumber }
    return cleaned == cleaned.reversed()
}

// 8. Valid Palindrome - Two Pointers
func isPalindromeTwoPointers(_ s: String) -> Bool {
    let chars = Array(s.lowercased())
    var left = 0, right = chars.count - 1
    
    while left < right {
        while left < right && !chars[left].isAlphanumeric { left += 1 }
        while left < right && !chars[right].isAlphanumeric { right -= 1 }
        
        if chars[left] != chars[right] { return false }
        left += 1
        right -= 1
    }
    return true
}

extension Character {
    var isAlphanumeric: Bool {
        return isLetter || isNumber
    }
}

// 9. Largest Odd Number in String
func largestOddNumber(_ num: String) -> String {
    let chars = Array(num)
    
    for i in stride(from: chars.count - 1, through: 0, by: -1) {
        if let digit = chars[i].wholeNumberValue, digit % 2 == 1 {
            return String(chars[0...i])
        }
    }
    return ""
}

// 10. Longest Common Prefix
func longestCommonPrefix(_ strs: [String]) -> String {
    guard !strs.isEmpty else { return "" }
    
    var prefix = strs[0]
    for str in strs[1...] {
        while !str.hasPrefix(prefix) {
            prefix = String(prefix.dropLast())
            if prefix.isEmpty { return "" }
        }
    }
    return prefix
}

// 11. Valid Anagram
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

// 12. Isomorphic Strings
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

// 13. Group Anagrams - Sorted Key
func groupAnagramsSorted(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]
    
    for str in strs {
        let sorted = String(str.sorted())
        groups[sorted, default: []].append(str)
    }
    
    return Array(groups.values)
}

// 14. Group Anagrams - Hashed Key
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

// Test cases
print(lengthOfLastWordOneLoop("Hello World")) // 5
print(numJewelsInStones("aA", "aAAbbbb")) // 3
print(balancedStringSplit("RLRRLLRLRL")) // 4
print(isPalindromeTwoPointers("A man, a plan, a canal: Panama")) // true
print(largestOddNumber("52")) // "5"
print(longestCommonPrefix(["flower","flow","flight"])) // "fl"
print(isAnagram("anagram", "nagaram")) // true
print(groupAnagramsSorted(["eat","tea","tan","ate","nat","bat"]))`
    },
    cpp: {
        title: 'String Algorithms in C++',
        code: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <cctype>

using namespace std;

// 1. Length of Last Word - Two Approaches
int lengthOfLastWordTwoLoops(string s) {
    // Approach 1: Using stringstream
    stringstream ss(s);
    string word;
    while (ss >> word) {
        // Keep updating word until last one
    }
    return word.length();
}

int lengthOfLastWordOneLoop(string s) {
    // Approach 2: One loop from end
    int length = 0;
    int i = s.length() - 1;
    
    // Skip trailing spaces
    while (i >= 0 && s[i] == ' ') i--;
    
    // Count characters of last word
    while (i >= 0 && s[i] != ' ') {
        length++;
        i--;
    }
    return length;
}

// 2. Find Words Containing Character
vector<int> findWordsContaining(vector<string>& words, char x) {
    vector<int> result;
    for (int i = 0; i < words.size(); i++) {
        if (words[i].find(x) != string::npos) {
            result.push_back(i);
        }
    }
    return result;
}

// 3. Jewels and Stones
int numJewelsInStones(string jewels, string stones) {
    unordered_set<char> jewelSet(jewels.begin(), jewels.end());
    int count = 0;
    for (char stone : stones) {
        if (jewelSet.count(stone)) count++;
    }
    return count;
}

// 4. Most Frequent Vowel and Consonant
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
    
    for (auto& p : vowelCount) {
        if (p.second > maxVowelCount) {
            maxVowelCount = p.second;
            maxVowel = p.first;
        }
    }
    
    for (auto& p : consonantCount) {
        if (p.second > maxConsonantCount) {
            maxConsonantCount = p.second;
            maxConsonant = p.first;
        }
    }
    
    return {maxVowel, maxConsonant};
}

// 5. Split Balanced Strings
int balancedStringSplit(string s) {
    int balance = 0, count = 0;
    
    for (char c : s) {
        balance += (c == 'R') ? 1 : -1;
        if (balance == 0) count++;
    }
    return count;
}

// 6. Reverse String II
string reverseStr(string s, int k) {
    for (int i = 0; i < s.length(); i += 2 * k) {
        int left = i;
        int right = min(i + k - 1, (int)s.length() - 1);
        
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
    return s;
}

// 7. Valid Palindrome - Extra Space
bool isPalindromeExtraSpace(string s) {
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

// 8. Valid Palindrome - Two Pointers
bool isPalindromeTwoPointers(string s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        
        if (tolower(s[left]) != tolower(s[right])) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// 9. Largest Odd Number in String
string largestOddNumber(string num) {
    for (int i = num.length() - 1; i >= 0; i--) {
        if ((num[i] - '0') % 2 == 1) {
            return num.substr(0, i + 1);
        }
    }
    return "";
}

// 10. Longest Common Prefix
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.length() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}

// 11. Valid Anagram
bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    
    unordered_map<char, int> count;
    for (char c : s) count[c]++;
    
    for (char c : t) {
        if (count[c] == 0) return false;
        count[c]--;
    }
    return true;
}

// 12. Isomorphic Strings
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

// 13. Group Anagrams - Sorted Key
vector<vector<string>> groupAnagramsSorted(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    
    for (string str : strs) {
        string sorted = str;
        sort(sorted.begin(), sorted.end());
        groups[sorted].push_back(str);
    }
    
    vector<vector<string>> result;
    for (auto& group : groups) {
        result.push_back(group.second);
    }
    return result;
}

// 14. Group Anagrams - Hashed Key
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
    for (auto& group : groups) {
        result.push_back(group.second);
    }
    return result;
}

// Test function
int main() {
    cout << lengthOfLastWordOneLoop("Hello World") << endl; // 5
    cout << numJewelsInStones("aA", "aAAbbbb") << endl; // 3
    cout << balancedStringSplit("RLRRLLRLRL") << endl; // 4
    cout << isPalindromeTwoPointers("A man, a plan, a canal: Panama") << endl; // 1 (true)
    cout << largestOddNumber("52") << endl; // "5"
    
    vector<string> prefixTest = {"flower","flow","flight"};
    cout << longestCommonPrefix(prefixTest) << endl; // "fl"
    
    cout << isAnagram("anagram", "nagaram") << endl; // 1 (true)
    
    return 0;
}`
    }
};