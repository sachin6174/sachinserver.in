export const matrixData = {
    title: 'Matrix / 2D Array',
    description: 'Master 2D array operations, matrix traversal patterns, and advanced matrix algorithms',
    questions: [
        // Easy Level (0-4)
        'Set Matrix Zeroes - https://leetcode.com/problems/set-matrix-zeroes/',
        'Spiral Matrix - https://leetcode.com/problems/spiral-matrix/',
        'Transpose Matrix - https://leetcode.com/problems/transpose-matrix/',
        'Flood Fill - https://leetcode.com/problems/flood-fill/',
        'Island Perimeter - https://leetcode.com/problems/island-perimeter/',

        // Medium Level (5-9)
        'Rotate Image - https://leetcode.com/problems/rotate-image/',
        'Word Search - https://leetcode.com/problems/word-search/',
        'Number of Islands - https://leetcode.com/problems/number-islands/',
        'Search a 2D Matrix - https://leetcode.com/problems/search-a-2d-matrix/',
        'Rotting Oranges - https://leetcode.com/problems/rotting-oranges/',
        'Spiral Matrix II - https://leetcode.com/problems/spiral-matrix-ii/',

        // Hard Level (10+)
        'Word Search II - https://leetcode.com/problems/word-search-ii/',
        'Sudoku Solver - https://leetcode.com/problems/sudoku-solver/',
        'Valid Sudoku - https://leetcode.com/problems/valid-sudoku/',
        'Maximal Rectangle - https://leetcode.com/problems/maximal-rectangle/',
        'Largest Rectangle in Histogram - https://leetcode.com/problems/largest-rectangle-histogram/'
    ],
    explanation: `## Matrix Fundamentals

### What is a Matrix?
A **matrix** is a 2D array that stores data in rows and columns. It's one of the most common data structures for representing grids, images, game boards, and mathematical computations.

### Common Matrix Patterns
- **Traversal**: Row-wise, column-wise, diagonal, spiral
- **Search**: Binary search in sorted matrix
- **Transformation**: Rotation, transpose, reflection
- **Path Finding**: BFS/DFS for connected components
- **Dynamic Programming**: 2D DP problems

### Matrix Operations Complexity

| Operation | Time Complexity | Space Complexity |
|------|----------|----------|
| Access Element | O(1) | O(1) |
| Row/Column Traversal | O(n) or O(m) | O(1) |
| Full Matrix Traversal | O(m × n) | O(1) |
| Matrix Multiplication | O(m × n × p) | O(m × p) |
| Transpose | O(m × n) | O(1) in-place |

### Key Algorithms
- **Spiral Traversal**: Navigate matrix in spiral pattern
- **Matrix Rotation**: 90° rotation techniques
- **Flood Fill**: DFS/BFS for connected regions  
- **Binary Search**: Search in row/column sorted matrices
- **Dynamic Programming**: 2D DP state transitions

✅ **Pro Tips**
- Use direction arrays for 4/8-directional movement
- Consider in-place transformations to save space
- Matrix problems often involve multiple traversal patterns
- Boundary checking is crucial to prevent index errors

❌ **Common Pitfalls**  
- Forgetting to validate matrix bounds
- Confusing row vs column indices
- Not handling empty matrices
- Inefficient nested loops for simple operations`,
    javascript: {
        title: 'Matrix Operations in JavaScript',
        code: `// Matrix Creation and Basic Operations
function createMatrix(rows, cols, defaultValue = 0) {
    return Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => defaultValue)
    );
}

// Matrix Traversal Patterns
function traverseMatrix(matrix) {
    const m = matrix.length, n = matrix[0].length;
    
    // 1. Row-wise traversal
    console.log("Row-wise:");
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            console.log(matrix[i][j]);
        }
    }
    
    // 2. Column-wise traversal
    console.log("Column-wise:");
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            console.log(matrix[i][j]);
        }
    }
    
    // 3. Diagonal traversal
    console.log("Main diagonal:");
    for (let i = 0; i < Math.min(m, n); i++) {
        console.log(matrix[i][i]);
    }
}

// Spiral Matrix Traversal
function spiralOrder(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let j = left; j <= right; j++) {
            result.push(matrix[top][j]);
        }
        top++;
        
        // Traverse down
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;
        
        // Traverse left
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                result.push(matrix[bottom][j]);
            }
            bottom--;
        }
        
        // Traverse up
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}

// Matrix Rotation (90 degrees clockwise)
function rotate(matrix) {
    const n = matrix.length;
    
    // Step 1: Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

// Set Matrix Zeroes
function setZeroes(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;
    
    // Check if first row should be zero
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
            break;
        }
    }
    
    // Check if first column should be zero
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }
    
    // Use first row and column as markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Set zeroes based on markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Handle first row and column
    if (firstRowZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    
    if (firstColZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
}

// Search in 2D Matrix (sorted)
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0) return false;
    
    const m = matrix.length, n = matrix[0].length;
    let left = 0, right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = matrix[Math.floor(mid / n)][mid % n];
        
        if (midValue === target) return true;
        else if (midValue < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return false;
}

// Number of Islands (DFS approach)
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const m = grid.length, n = grid[0].length;
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
            return;
        }
        
        grid[i][j] = '0'; // Mark as visited
        
        // Visit all 4 directions
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    
    return count;
}

// Example usage
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Original matrix:", matrix);
console.log("Spiral order:", spiralOrder(matrix));

// Create a copy for rotation
const rotationMatrix = matrix.map(row => [...row]);
rotate(rotationMatrix);
console.log("Rotated matrix:", rotationMatrix);`
    },
    swift: {
        title: 'Matrix Operations in Swift',
        code: `// Matrix Creation and Basic Operations
func createMatrix(rows: Int, cols: Int, defaultValue: Int = 0) -> [[Int]] {
    return Array(repeating: Array(repeating: defaultValue, count: cols), count: rows)
}

// Matrix Traversal Patterns
func traverseMatrix(_ matrix: [[Int]]) {
    let m = matrix.count
    let n = matrix[0].count
    
    // 1. Row-wise traversal
    print("Row-wise:")
    for i in 0..<m {
        for j in 0..<n {
            print(matrix[i][j])
        }
    }
    
    // 2. Column-wise traversal
    print("Column-wise:")
    for j in 0..<n {
        for i in 0..<m {
            print(matrix[i][j])
        }
    }
    
    // 3. Diagonal traversal
    print("Main diagonal:")
    for i in 0..<min(m, n) {
        print(matrix[i][i])
    }
}

// Spiral Matrix Traversal
func spiralOrder(_ matrix: [[Int]]) -> [Int] {
    guard !matrix.isEmpty else { return [] }
    
    var result: [Int] = []
    var top = 0, bottom = matrix.count - 1
    var left = 0, right = matrix[0].count - 1
    
    while top <= bottom && left <= right {
        // Traverse right
        for j in left...right {
            result.append(matrix[top][j])
        }
        top += 1
        
        // Traverse down
        for i in top...bottom {
            result.append(matrix[i][right])
        }
        right -= 1
        
        // Traverse left
        if top <= bottom {
            for j in stride(from: right, through: left, by: -1) {
                result.append(matrix[bottom][j])
            }
            bottom -= 1
        }
        
        // Traverse up
        if left <= right {
            for i in stride(from: bottom, through: top, by: -1) {
                result.append(matrix[i][left])
            }
            left += 1
        }
    }
    
    return result
}

// Matrix Rotation (90 degrees clockwise)
func rotate(_ matrix: inout [[Int]]) {
    let n = matrix.count
    
    // Step 1: Transpose the matrix
    for i in 0..<n {
        for j in i..<n {
            let temp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = temp
        }
    }
    
    // Step 2: Reverse each row
    for i in 0..<n {
        matrix[i].reverse()
    }
}

// Set Matrix Zeroes
func setZeroes(_ matrix: inout [[Int]]) {
    let m = matrix.count
    let n = matrix[0].count
    var firstRowZero = false
    var firstColZero = false
    
    // Check if first row should be zero
    for j in 0..<n {
        if matrix[0][j] == 0 {
            firstRowZero = true
            break
        }
    }
    
    // Check if first column should be zero
    for i in 0..<m {
        if matrix[i][0] == 0 {
            firstColZero = true
            break
        }
    }
    
    // Use first row and column as markers
    for i in 1..<m {
        for j in 1..<n {
            if matrix[i][j] == 0 {
                matrix[i][0] = 0
                matrix[0][j] = 0
            }
        }
    }
    
    // Set zeroes based on markers
    for i in 1..<m {
        for j in 1..<n {
            if matrix[i][0] == 0 || matrix[0][j] == 0 {
                matrix[i][j] = 0
            }
        }
    }
    
    // Handle first row and column
    if firstRowZero {
        for j in 0..<n {
            matrix[0][j] = 0
        }
    }
    
    if firstColZero {
        for i in 0..<m {
            matrix[i][0] = 0
        }
    }
}

// Search in 2D Matrix (sorted)
func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {
    guard !matrix.isEmpty else { return false }
    
    let m = matrix.count
    let n = matrix[0].count
    var left = 0
    var right = m * n - 1
    
    while left <= right {
        let mid = (left + right) / 2
        let midValue = matrix[mid / n][mid % n]
        
        if midValue == target {
            return true
        } else if midValue < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    
    return false
}

// Number of Islands (DFS approach)
func numIslands(_ grid: inout [[Character]]) -> Int {
    guard !grid.isEmpty else { return 0 }
    
    let m = grid.count
    let n = grid[0].count
    var count = 0
    
    func dfs(_ i: Int, _ j: Int) {
        if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == "0" {
            return
        }
        
        grid[i][j] = "0" // Mark as visited
        
        // Visit all 4 directions
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)
    }
    
    for i in 0..<m {
        for j in 0..<n {
            if grid[i][j] == "1" {
                count += 1
                dfs(i, j)
            }
        }
    }
    
    return count
}

// Word Search
func exist(_ board: [[Character]], _ word: String) -> Bool {
    let chars = Array(word)
    let m = board.count
    let n = board[0].count
    var board = board
    
    func dfs(_ i: Int, _ j: Int, _ index: Int) -> Bool {
        if index == chars.count { return true }
        if i < 0 || i >= m || j < 0 || j >= n || board[i][j] != chars[index] {
            return false
        }
        
        let temp = board[i][j]
        board[i][j] = "#" // Mark as visited
        
        let found = dfs(i + 1, j, index + 1) ||
                   dfs(i - 1, j, index + 1) ||
                   dfs(i, j + 1, index + 1) ||
                   dfs(i, j - 1, index + 1)
        
        board[i][j] = temp // Restore
        return found
    }
    
    for i in 0..<m {
        for j in 0..<n {
            if dfs(i, j, 0) {
                return true
            }
        }
    }
    
    return false
}

// Example usage
var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("Original matrix:", matrix)
print("Spiral order:", spiralOrder(matrix))

// Create a copy for rotation
var rotationMatrix = matrix
rotate(&rotationMatrix)
print("Rotated matrix:", rotationMatrix)

// Test search
let found = searchMatrix(matrix, 5)
print("Found 5:", found)`
    },
    cpp: {
        title: 'Matrix Operations in C++',
        code: `#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

// Matrix Creation and Basic Operations
vector<vector<int>> createMatrix(int rows, int cols, int defaultValue = 0) {
    return vector<vector<int>>(rows, vector<int>(cols, defaultValue));
}

// Matrix Traversal Patterns
void traverseMatrix(const vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    
    // 1. Row-wise traversal
    cout << "Row-wise:" << endl;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    
    // 2. Column-wise traversal
    cout << "Column-wise:" << endl;
    for (int j = 0; j < n; j++) {
        for (int i = 0; i < m; i++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    
    // 3. Diagonal traversal
    cout << "Main diagonal:" << endl;
    for (int i = 0; i < min(m, n); i++) {
        cout << matrix[i][i] << " ";
    }
    cout << endl;
}

// Spiral Matrix Traversal
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    if (matrix.empty()) return {};
    
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (int j = left; j <= right; j++) {
            result.push_back(matrix[top][j]);
        }
        top++;
        
        // Traverse down
        for (int i = top; i <= bottom; i++) {
            result.push_back(matrix[i][right]);
        }
        right--;
        
        // Traverse left
        if (top <= bottom) {
            for (int j = right; j >= left; j--) {
                result.push_back(matrix[bottom][j]);
            }
            bottom--;
        }
        
        // Traverse up
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                result.push_back(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}

// Matrix Rotation (90 degrees clockwise)
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Step 1: Transpose the matrix
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    
    // Step 2: Reverse each row
    for (int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}

// Set Matrix Zeroes
void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;
    
    // Check if first row should be zero
    for (int j = 0; j < n; j++) {
        if (matrix[0][j] == 0) {
            firstRowZero = true;
            break;
        }
    }
    
    // Check if first column should be zero
    for (int i = 0; i < m; i++) {
        if (matrix[i][0] == 0) {
            firstColZero = true;
            break;
        }
    }
    
    // Use first row and column as markers
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Set zeroes based on markers
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Handle first row and column
    if (firstRowZero) {
        for (int j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    
    if (firstColZero) {
        for (int i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
}

// Search in 2D Matrix (sorted)
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    if (matrix.empty()) return false;
    
    int m = matrix.size(), n = matrix[0].size();
    int left = 0, right = m * n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int midValue = matrix[mid / n][mid % n];
        
        if (midValue == target) return true;
        else if (midValue < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return false;
}

// Number of Islands (DFS approach)
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        
        int m = grid.size(), n = grid[0].size();
        int count = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return count;
    }
    
private:
    void dfs(vector<vector<char>>& grid, int i, int j) {
        int m = grid.size(), n = grid[0].size();
        
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0') {
            return;
        }
        
        grid[i][j] = '0'; // Mark as visited
        
        // Visit all 4 directions
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
};

// Example usage
int main() {
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    cout << "Original matrix:" << endl;
    traverseMatrix(matrix);
    
    vector<int> spiral = spiralOrder(matrix);
    cout << "Spiral order: ";
    for (int num : spiral) {
        cout << num << " ";
    }
    cout << endl;
    
    // Test rotation
    vector<vector<int>> rotationMatrix = matrix;
    rotate(rotationMatrix);
    cout << "Rotated matrix:" << endl;
    traverseMatrix(rotationMatrix);
    
    return 0;
}`
    }
};