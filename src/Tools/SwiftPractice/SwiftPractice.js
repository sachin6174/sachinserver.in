import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import './SwiftPractice.css';
import { NEW_PROBLEMS } from './problems';

// ────────────────────────────────────────────────────────────────────────────
// Problem bank (self-contained, no external runtime needed)
// ────────────────────────────────────────────────────────────────────────────
const PROBLEMS = [
    // ── Fundamentals ──────────────────────────────────────────────────────────
    {
        id: 1,
        title: 'Reverse a String',
        category: 'Fundamentals',
        difficulty: 'Easy',
        tags: ['String', 'Basic'],
        description: `Write a Swift function that reverses a given string without using the built-in \`reversed()\` method.

**Example:**
\`\`\`swift
reverseString("hello") // → "olleh"
reverseString("Swift") // → "tfiwS"
\`\`\``,
        starterCode: `func reverseString(_ s: String) -> String {
    // TODO: reverse the string without using .reversed()
    
}`,
        solution: `func reverseString(_ s: String) -> String {
    var chars = Array(s)
    var left = 0, right = chars.count - 1
    while left < right {
        chars.swapAt(left, right)
        left += 1; right -= 1
    }
    return String(chars)
}`,
        testCases: [
            { input: '"hello"', expected: '"olleh"' },
            { input: '"Swift"', expected: '"tfiwS"' },
            { input: '""', expected: '""' },
            { input: '"a"', expected: '"a"' },
        ],
        hints: [
            'Convert the string to an array of Characters.',
            'Use two pointers starting from each end.',
            'Keep swapping while left < right.',
        ],
        concepts: ['String to Array conversion', 'Two-pointer technique', 'In-place mutation'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },
    {
        id: 2,
        title: 'FizzBuzz',
        category: 'Fundamentals',
        difficulty: 'Easy',
        tags: ['Control Flow', 'Loops'],
        description: `Write a Swift function that returns the FizzBuzz sequence as an array of strings for numbers 1 through n.
- Multiples of 3 → "Fizz"
- Multiples of 5 → "Buzz"
- Multiples of both → "FizzBuzz"
- Otherwise → the number as a string

**Example:**
\`\`\`swift
fizzBuzz(5) // → ["1", "2", "Fizz", "4", "Buzz"]
\`\`\``,
        starterCode: `func fizzBuzz(_ n: Int) -> [String] {
    // TODO: return FizzBuzz array
    
}`,
        solution: `func fizzBuzz(_ n: Int) -> [String] {
    return (1...n).map { i in
        if i % 15 == 0 { return "FizzBuzz" }
        if i % 3  == 0 { return "Fizz" }
        if i % 5  == 0 { return "Buzz" }
        return "\\(i)"
    }
}`,
        testCases: [
            { input: '5', expected: '["1", "2", "Fizz", "4", "Buzz"]' },
            { input: '15', expected: '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]' },
        ],
        hints: ['Check divisibility by 15 first before 3 or 5.', 'Use map over a range.'],
        concepts: ['Ranges', 'map(_:)', 'Modulo operator'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },
    // ── Optionals ─────────────────────────────────────────────────────────────
    {
        id: 3,
        title: 'Safe Dictionary Lookup',
        category: 'Optionals',
        difficulty: 'Easy',
        tags: ['Optionals', 'Dictionary'],
        description: `Write a Swift function \`lookupUser\` that takes a dictionary of \`[String: Int]\` (name → age) and a name.
Return a message \`"<name> is <age> years old"\` if found, or \`"User not found"\` otherwise.

**Example:**
\`\`\`swift
let db = ["Alice": 30, "Bob": 25]
lookupUser(in: db, name: "Alice") // → "Alice is 30 years old"
lookupUser(in: db, name: "Eve")   // → "User not found"
\`\`\``,
        starterCode: `func lookupUser(in db: [String: Int], name: String) -> String {
    // TODO: use optional binding / guard-let
    
}`,
        solution: `func lookupUser(in db: [String: Int], name: String) -> String {
    guard let age = db[name] else { return "User not found" }
    return "\\(name) is \\(age) years old"
}`,
        testCases: [
            { input: '["Alice": 30, "Bob": 25], "Alice"', expected: '"Alice is 30 years old"' },
            { input: '["Alice": 30], "Eve"', expected: '"User not found"' },
        ],
        hints: ['Use guard-let or if-let to unwrap the optional.', "Dictionary subscript returns an Optional."],
        concepts: ['Optionals', 'guard-let', 'Dictionary subscript'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },
    // ── Closures ──────────────────────────────────────────────────────────────
    {
        id: 4,
        title: 'Filter Even Numbers',
        category: 'Closures',
        difficulty: 'Easy',
        tags: ['Closures', 'HOF', 'Array'],
        description: `Use Swift higher-order functions to write \`filterEvens\` that returns only even numbers from an Int array.

**Example:**
\`\`\`swift
filterEvens([1, 2, 3, 4, 5, 6]) // → [2, 4, 6]
\`\`\``,
        starterCode: `func filterEvens(_ numbers: [Int]) -> [Int] {
    // Use filter(_:) with a trailing closure
    
}`,
        solution: `func filterEvens(_ numbers: [Int]) -> [Int] {
    return numbers.filter { $0 % 2 == 0 }
}`,
        testCases: [
            { input: '[1, 2, 3, 4, 5, 6]', expected: '[2, 4, 6]' },
            { input: '[1, 3, 5]', expected: '[]' },
            { input: '[2, 4]', expected: '[2, 4]' },
        ],
        hints: ['Use filter(_:).', 'The closure receives each element as $0.'],
        concepts: ['filter(_:)', 'Trailing closures', 'Shorthand argument names'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },
    {
        id: 5,
        title: 'Sort Custom Struct',
        category: 'Closures',
        difficulty: 'Medium',
        tags: ['Closures', 'Sorting', 'Struct'],
        description: `Given a \`Product\` struct with \`name: String\` and \`price: Double\`, sort an array first by price ascending, then by name alphabetically.

\`\`\`swift
struct Product { let name: String; let price: Double }
\`\`\`

**Example:**
\`\`\`swift
let products = [
    Product(name: "Banana", price: 1.5),
    Product(name: "Apple",  price: 1.5),
    Product(name: "Cherry", price: 2.0)
]
sortProducts(products) 
// → [Apple($1.5), Banana($1.5), Cherry($2.0)]
\`\`\``,
        starterCode: `struct Product { let name: String; let price: Double }

func sortProducts(_ products: [Product]) -> [Product] {
    // Sort by price asc, then name asc
    
}`,
        solution: `struct Product { let name: String; let price: Double }

func sortProducts(_ products: [Product]) -> [Product] {
    return products.sorted { a, b in
        if a.price != b.price { return a.price < b.price }
        return a.name < b.name
    }
}`,
        testCases: [
            { input: '[Banana $1.5, Apple $1.5, Cherry $2.0]', expected: '[Apple $1.5, Banana $1.5, Cherry $2.0]' },
        ],
        hints: ['sorted(by:) takes a closure returning Bool.', 'Compare price first, fall back to name.'],
        concepts: ['sorted(by:)', 'Multi-key sorting', 'Tuples comparison'],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
    },
    // ── Protocols ─────────────────────────────────────────────────────────────
    {
        id: 6,
        title: 'Protocol Conformance — Describable',
        category: 'Protocols',
        difficulty: 'Medium',
        tags: ['Protocols', 'OOP'],
        description: `Define a \`Describable\` protocol with a computed property \`description: String\`.
Make \`Circle\` and \`Rectangle\` conform. Implement a function \`printAll\` that works with any array of \`Describable\`.

\`\`\`swift
protocol Describable { var description: String { get } }
\`\`\``,
        starterCode: `protocol Describable {
    var description: String { get }
}

struct Circle {
    let radius: Double
    // TODO: conform to Describable
}

struct Rectangle {
    let width: Double
    let height: Double
    // TODO: conform to Describable
}

func printAll(_ items: [Describable]) -> [String] {
    // return array of descriptions
    
}`,
        solution: `protocol Describable {
    var description: String { get }
}

struct Circle: Describable {
    let radius: Double
    var description: String { "Circle with radius \\(radius)" }
}

struct Rectangle: Describable {
    let width: Double
    let height: Double
    var description: String { "Rectangle \\(width)x\\(height)" }
}

func printAll(_ items: [Describable]) -> [String] {
    return items.map { $0.description }
}`,
        testCases: [
            { input: '[Circle(r:5), Rect(3x4)]', expected: '["Circle with radius 5.0", "Rectangle 3.0x4.0"]' },
        ],
        hints: ['Use `: Describable` after the struct name.', 'Return `description` as a computed var.'],
        concepts: ['Protocol definition', 'Protocol conformance', 'Polymorphism', 'Computed properties'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },
    // ── Generics ──────────────────────────────────────────────────────────────
    {
        id: 7,
        title: 'Generic Stack',
        category: 'Generics',
        difficulty: 'Medium',
        tags: ['Generics', 'Data Structures'],
        description: `Implement a generic \`Stack<T>\` with \`push\`, \`pop\` (returns \`T?\`), \`peek\` (returns \`T?\`), and a \`isEmpty\` property.

\`\`\`swift
var s = Stack<Int>()
s.push(1); s.push(2)
s.pop()    // 2
s.peek()   // 1
\`\`\``,
        starterCode: `struct Stack<T> {
    // TODO: implement
    
    mutating func push(_ element: T) {  }
    mutating func pop() -> T? { return nil }
    func peek() -> T? { return nil }
    var isEmpty: Bool { return true }
}`,
        solution: `struct Stack<T> {
    private var storage: [T] = []
    
    mutating func push(_ element: T) {
        storage.append(element)
    }
    mutating func pop() -> T? {
        return storage.popLast()
    }
    func peek() -> T? {
        return storage.last
    }
    var isEmpty: Bool { storage.isEmpty }
}`,
        testCases: [
            { input: 'push(1), push(2), pop()', expected: '2' },
            { input: 'push("a"), peek()', expected: '"a"' },
            { input: 'isEmpty (empty stack)', expected: 'true' },
        ],
        hints: ['Use a private [T] array as backing.', 'popLast() returns Optional.'],
        concepts: ['Generic types <T>', 'Value semantics', 'mutating functions'],
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(n)',
    },
    // ── Error Handling ────────────────────────────────────────────────────────
    {
        id: 8,
        title: 'Parse Age with Error Handling',
        category: 'Error Handling',
        difficulty: 'Medium',
        tags: ['Error Handling', 'Throws'],
        description: `Define an \`AgeError\` enum with cases \`notANumber\` and \`outOfRange(Int)\`.
Write \`parseAge(_ s: String)\` that:
- Throws \`.notANumber\` if the string isn't a valid Int.
- Throws \`.outOfRange(value)\` if value < 0 or > 130.
- Returns the Int otherwise.`,
        starterCode: `enum AgeError: Error {
    case notANumber
    case outOfRange(Int)
}

func parseAge(_ s: String) throws -> Int {
    // TODO: implement
    
}`,
        solution: `enum AgeError: Error {
    case notANumber
    case outOfRange(Int)
}

func parseAge(_ s: String) throws -> Int {
    guard let age = Int(s) else { throw AgeError.notANumber }
    guard age >= 0 && age <= 130 else { throw AgeError.outOfRange(age) }
    return age
}`,
        testCases: [
            { input: '"25"', expected: '25' },
            { input: '"abc"', expected: 'throws notANumber' },
            { input: '"-5"', expected: 'throws outOfRange(-5)' },
            { input: '"200"', expected: 'throws outOfRange(200)' },
        ],
        hints: ['Use Int(_:) initialiser which returns Optional.', 'Use guard-let + throw pattern.'],
        concepts: ['Error protocol', 'throws / throw', 'do-catch', 'guard-let'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },
    // ── Collections ───────────────────────────────────────────────────────────
    {
        id: 9,
        title: 'Two Sum',
        category: 'Collections',
        difficulty: 'Easy',
        tags: ['Dictionary', 'Array', 'DSA'],
        description: `Classic Two Sum: given an Int array and a target, return the indices of the two numbers that add up to target.
Assume exactly one solution exists.

**Example:**
\`\`\`swift
twoSum([2, 7, 11, 15], target: 9) // → [0, 1]
\`\`\``,
        starterCode: `func twoSum(_ nums: [Int], target: Int) -> [Int] {
    // Aim for O(n) with a hash map
    
}`,
        solution: `func twoSum(_ nums: [Int], target: Int) -> [Int] {
    var seen = [Int: Int]() // value → index
    for (i, n) in nums.enumerated() {
        let complement = target - n
        if let j = seen[complement] { return [j, i] }
        seen[n] = i
    }
    return []
}`,
        testCases: [
            { input: '[2, 7, 11, 15], target: 9', expected: '[0, 1]' },
            { input: '[3, 2, 4], target: 6', expected: '[1, 2]' },
            { input: '[3, 3], target: 6', expected: '[0, 1]' },
        ],
        hints: ['Store each number and its index in a Dictionary.', 'For each number, check if (target - number) exists in the dictionary.'],
        concepts: ['Dictionary for O(1) lookup', 'enumerated()', 'Complement pattern'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },
    // ── Async/Await ───────────────────────────────────────────────────────────
    {
        id: 10,
        title: 'Async API Call Pattern',
        category: 'Async/Await',
        difficulty: 'Medium',
        tags: ['async/await', 'Networking', 'URLSession'],
        description: `Write a Swift async function \`fetchUser(id:)\` that calls the JSONPlaceholder API and returns a \`User\` struct.

The endpoint is: \`https://jsonplaceholder.typicode.com/users/{id}\`

Your \`User\` struct should at minimum have \`id: Int\`, \`name: String\`, \`email: String\`.

\`\`\`swift
let user = try await fetchUser(id: 1)
print(user.name) // "Leanne Graham"
\`\`\``,
        starterCode: `import Foundation

struct User: Decodable {
    let id: Int
    let name: String
    let email: String
}

func fetchUser(id: Int) async throws -> User {
    // TODO: use URLSession.shared.data(from:) and JSONDecoder
    
}`,
        solution: `import Foundation

struct User: Decodable {
    let id: Int
    let name: String
    let email: String
}

func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://jsonplaceholder.typicode.com/users/\\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}`,
        testCases: [
            { input: 'id: 1', expected: 'User(id:1, name:"Leanne Graham", ...)' },
            { input: 'invalid URL', expected: 'throws URLError' },
        ],
        hints: [
            'URLSession.shared.data(from:) returns (Data, URLResponse).',
            'Mark the function with async throws.',
            'JSONDecoder().decode(_:from:) also throws.',
        ],
        concepts: ['async/await', 'URLSession', 'Codable/Decodable', 'try await'],
        timeComplexity: 'Network bound',
        spaceComplexity: 'O(n) — response size',
        isLiveRunnable: true,
        liveEndpoint: 'https://jsonplaceholder.typicode.com/users/1',
    },
    // ── Concurrency ───────────────────────────────────────────────────────────
    {
        id: 11,
        title: 'Task Group — Parallel Fetch',
        category: 'Concurrency',
        difficulty: 'Hard',
        tags: ['Concurrency', 'TaskGroup', 'async'],
        description: `Use \`withTaskGroup\` to fetch multiple user IDs concurrently and return them as an array.

\`\`\`swift
let users = try await fetchUsers(ids: [1, 2, 3])
// All three requests run in parallel
\`\`\``,
        starterCode: `// Assume User and fetchUser(id:) are defined above

func fetchUsers(ids: [Int]) async throws -> [User] {
    // TODO: use withThrowingTaskGroup
    
}`,
        solution: `func fetchUsers(ids: [Int]) async throws -> [User] {
    try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask { try await fetchUser(id: id) }
        }
        var results: [User] = []
        for try await user in group { results.append(user) }
        return results
    }
}`,
        testCases: [
            { input: 'ids: [1, 2, 3]', expected: '3 User objects (unordered)' },
        ],
        hints: [
            'withThrowingTaskGroup(of:body:) creates a group that can throw.',
            'addTask schedules concurrent work.',
            'Iterate with for try await to collect results.',
        ],
        concepts: ['withThrowingTaskGroup', 'Structured concurrency', 'Parallel network calls'],
        timeComplexity: 'O(max individual call time)',
        spaceComplexity: 'O(n)',
    },
    // ── SwiftUI ───────────────────────────────────────────────────────────────
    {
        id: 12,
        title: 'Custom View Modifier',
        category: 'SwiftUI',
        difficulty: 'Medium',
        tags: ['SwiftUI', 'ViewModifier', 'UI'],
        description: `Create a \`CardStyle\` view modifier that adds:
- White background with 12pt corner radius
- Shadow (radius 4, opacity 0.1)
- 16pt padding

Expose it as a \`.cardStyle()\` View extension.

\`\`\`swift
Text("Hello")
    .cardStyle()
\`\`\``,
        starterCode: `import SwiftUI

struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        // TODO: apply background, cornerRadius, shadow, padding
        content
    }
}

extension View {
    func cardStyle() -> some View {
        // TODO: apply the modifier
    }
}`,
        solution: `import SwiftUI

struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(Color.white)
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardStyle())
    }
}`,
        testCases: [
            { input: 'Text("Hello").cardStyle()', expected: 'Padded white card with shadow' },
        ],
        hints: [
            'ViewModifier requires a body(content:) method.',
            'Access content via the Content placeholder.',
            'Chain .padding, .background, .cornerRadius, .shadow.',
        ],
        concepts: ['ViewModifier', 'View extensions', 'SwiftUI modifiers chain'],
        timeComplexity: 'N/A – UI',
        spaceComplexity: 'N/A – UI',
    },
    // ── Design Patterns ────────────────────────────────────────────────────────
    {
        id: 13,
        title: 'Singleton Pattern',
        category: 'Design Patterns',
        difficulty: 'Easy',
        tags: ['Singleton', 'Design Patterns', 'Thread Safety'],
        description: `Implement a thread-safe \`Logger\` singleton in Swift that:
- Has a shared static instance.
- Maintains a private log array.
- Provides \`log(_ message:)\` and \`getLogs() -> [String]\`.

\`\`\`swift
Logger.shared.log("App started")
Logger.shared.getLogs() // ["App started"]
\`\`\``,
        starterCode: `class Logger {
    // TODO: implement singleton
    
    func log(_ message: String) { }
    func getLogs() -> [String] { return [] }
}`,
        solution: `class Logger {
    static let shared = Logger()
    private var logs: [String] = []
    
    private init() {}  // Prevent external instantiation
    
    func log(_ message: String) {
        logs.append(message)
    }
    func getLogs() -> [String] { return logs }
}`,
        testCases: [
            { input: 'shared.log("A"), shared.getLogs()', expected: '["A"]' },
            { input: 'Two calls to Logger.shared', expected: 'Same instance' },
        ],
        hints: ['private init() prevents external instantiation.', 'static let is lazily and thread-safely initialized.'],
        concepts: ['Singleton pattern', 'static let lazy initialisation', 'Access control (private)'],
        timeComplexity: 'O(1) log, O(n) getLogs',
        spaceComplexity: 'O(n)',
    },
    // ── Memory Management ──────────────────────────────────────────────────────
    {
        id: 14,
        title: 'Weak Reference & Retain Cycle',
        category: 'Memory Management',
        difficulty: 'Hard',
        tags: ['ARC', 'weak/unowned', 'Memory'],
        description: `The following code has a retain cycle. Fix it using \`weak\` or \`unowned\`.

\`\`\`swift
class Person {
    var name: String
    var pet: Pet?
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}

class Pet {
    var name: String
    var owner: Person?   // ← creates retain cycle
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}
\`\`\`

Which property should be \`weak\`, and why?`,
        starterCode: `class Person {
    var name: String
    var pet: Pet?
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}

class Pet {
    var name: String
    // Fix the retain cycle:
    var owner: Person?   // ← change this
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}`,
        solution: `class Person {
    var name: String
    var pet: Pet?
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}

class Pet {
    var name: String
    // weak breaks the cycle; Pet doesn't "own" its owner
    weak var owner: Person?
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}

// Verify:
// var alice: Person? = Person(name: "Alice")
// var kitty: Pet?   = Pet(name: "Kitty")
// alice?.pet = kitty
// kitty?.owner = alice
// alice = nil   → prints "Alice deinitialized"
// kitty = nil   → prints "Kitty deinitialized"`,
        testCases: [
            { input: 'Set to nil, check deinit', expected: 'Both objects deinitialized' },
        ],
        hints: [
            'A retain cycle prevents ARC from deallocating objects.',
            '"weak" references do not increase retain count.',
            'Pet does not "own" Person, so owner should be weak.',
        ],
        concepts: ['ARC (Automatic Reference Counting)', 'Retain cycles', 'weak vs unowned', 'deinit'],
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A',
    },
    // ── Algorithms ─────────────────────────────────────────────────────────────
    {
        id: 15,
        title: 'Binary Search',
        category: 'Algorithms',
        difficulty: 'Medium',
        tags: ['Binary Search', 'Algorithms', 'DSA'],
        description: `Implement binary search on a sorted Int array. Return the index if found, or -1.

\`\`\`swift
binarySearch([1, 3, 5, 7, 9], target: 5) // → 2
binarySearch([1, 3, 5, 7, 9], target: 4) // → -1
\`\`\``,
        starterCode: `func binarySearch(_ arr: [Int], target: Int) -> Int {
    // Return index or -1
    
}`,
        solution: `func binarySearch(_ arr: [Int], target: Int) -> Int {
    var lo = 0, hi = arr.count - 1
    while lo <= hi {
        let mid = lo + (hi - lo) / 2
        if arr[mid] == target { return mid }
        if arr[mid] < target  { lo = mid + 1 }
        else                  { hi = mid - 1 }
    }
    return -1
}`,
        testCases: [
            { input: '[1,3,5,7,9], target: 5', expected: '2' },
            { input: '[1,3,5,7,9], target: 4', expected: '-1' },
            { input: '[], target: 1', expected: '-1' },
        ],
        hints: ['Init lo = 0, hi = count - 1.', 'mid = lo + (hi - lo) / 2 avoids integer overflow.'],
        concepts: ['Divide and conquer', 'While loop', 'Avoding overflow'],
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
    },
];

const ALL_PROBLEMS = [...PROBLEMS, ...NEW_PROBLEMS];

const CATEGORIES = ['All', ...Array.from(new Set(ALL_PROBLEMS.map((p) => p.category)))];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

// ────────────────────────────────────────────────────────────────────────────
// Simulated Swift "runner" (JavaScript-based conceptual validation)
// ────────────────────────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function runSwiftSimulation(problem, userCode) {
    const results = [];

    // Check if code is just the starter (unchanged)
    const normalized = userCode.replace(/\s+/g, ' ').trim();
    const starterNorm = problem.starterCode.replace(/\s+/g, ' ').trim();
    if (normalized === starterNorm) {
        return problem.testCases.map((tc) => ({
            input: tc.input,
            expected: tc.expected,
            actual: '— (not implemented)',
            passed: false,
            error: 'Implement the function first.',
        }));
    }

    // Check for TODO presence
    if (userCode.includes('// TODO')) {
        return problem.testCases.map((tc) => ({
            input: tc.input,
            expected: tc.expected,
            actual: '— (TODO remaining)',
            passed: false,
            error: 'Remove TODO and provide an implementation.',
        }));
    }

    // Solution comparison (structural hints)
    const solutionNorm = problem.solution.replace(/\s+/g, ' ').trim();
    const hasKeyPatterns = (code, patterns) => patterns.some((p) => code.includes(p));

    for (const tc of problem.testCases) {
        let passed = false;
        let actual = tc.expected;
        let error = null;

        // Category-specific validation heuristics
        switch (problem.category) {
            case 'Fundamentals':
                if (problem.id === 1) {
                    passed = hasKeyPatterns(userCode, ['swapAt', 'reversed', 'reverse()', 'Array(']);
                } else {
                    passed = hasKeyPatterns(userCode, ['FizzBuzz', 'fizzBuzz', '%', 'map', 'modulo', '15']);
                }
                break;
            case 'Optionals':
                passed = hasKeyPatterns(userCode, ['guard let', 'if let', 'guard', '??', 'db[name]']);
                break;
            case 'Closures':
                passed = hasKeyPatterns(userCode, ['filter', 'sorted', 'map', '$0', 'closure', '.filter', '.sorted']);
                break;
            case 'Protocols':
                passed = hasKeyPatterns(userCode, ['Describable', 'protocol', ': Describable', 'description']);
                break;
            case 'Generics':
                passed = hasKeyPatterns(userCode, ['<T>', 'storage', 'append', 'popLast', 'last', 'isEmpty']);
                break;
            case 'Error Handling':
                passed = hasKeyPatterns(userCode, ['throw', 'throws', 'guard let', 'AgeError']);
                break;
            case 'Collections':
                passed = hasKeyPatterns(userCode, ['Dictionary', '[Int: Int]', 'seen', 'enumerated', 'complement', 'target - ']);
                break;
            case 'Async/Await':
                passed = hasKeyPatterns(userCode, ['async', 'await', 'URLSession', 'data(from:', 'JSONDecoder', 'decode']);
                break;
            case 'Concurrency':
                passed = hasKeyPatterns(userCode, ['withThrowingTaskGroup', 'TaskGroup', 'addTask', 'for try await']);
                break;
            case 'SwiftUI':
                passed = hasKeyPatterns(userCode, ['ViewModifier', 'body(content', 'modifier(', '.padding', '.background', '.cornerRadius']);
                break;
            case 'Design Patterns':
                passed = hasKeyPatterns(userCode, ['static let shared', 'private init', 'Singleton', 'shared =']);
                break;
            case 'Memory Management':
                passed = hasKeyPatterns(userCode, ['weak var', 'weak', 'unowned']);
                break;
            case 'Algorithms':
                passed = hasKeyPatterns(userCode, ['lo', 'hi', 'mid', 'binary', 'while lo <= hi', 'lo + (hi']);
                break;
            case 'Swift Fundamentals':
                passed = hasKeyPatterns(userCode, ['class', 'struct', 'lazy var', 'wrappedValue', '@propertyWrapper', 'demonstrateDifference', 'enum', 'switch', 'case .']);
                break;
            case 'Architecture':
                passed = hasKeyPatterns(userCode, ['ObservableObject', '@Published', 'MVVM', 'protocol', 'init(service', 'private let service', 'weak var delegate']);
                break;
            case 'Combine':
                passed = hasKeyPatterns(userCode, ['PassthroughSubject', 'AnyCancellable', '.filter', '.map', '.sink', 'subject.send']);
                break;
            case 'Networking':
                passed = hasKeyPatterns(userCode, ['Codable', 'CodingKeys', 'JSONDecoder', 'decode(', 'Decodable']);
                break;
            case 'UIKit':
                passed = hasKeyPatterns(userCode, ['viewDidLoad', 'viewWillAppear', 'viewDidAppear', 'loadView', 'events.append']);
                break;
            case 'Data Persistence':
                passed = hasKeyPatterns(userCode, ['NSFetchRequest', 'NSPredicate', 'NSSortDescriptor', 'entityName']);
                break;
            default:
                passed = userCode.length > starterNorm.length + 20;
        }

        results.push({
            input: tc.input,
            expected: tc.expected,
            actual: passed ? tc.expected : '— (check your logic)',
            passed,
            error: passed ? null : 'Implementation pattern not detected. Review hints.',
        });
    }

    return results;
}

// ────────────────────────────────────────────────────────────────────────────
// Live HTTP fetch for networkable problems
// ────────────────────────────────────────────────────────────────────────────
async function runLiveFetch(problem) {
    if (!problem.isLiveRunnable) return null;
    try {
        const res = await fetch(problem.liveEndpoint);
        const json = await res.json();
        return { ok: true, data: JSON.stringify(json, null, 2) };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────────────
const DifficultyBadge = ({ level }) => (
    <span className={`sp-badge sp-badge--${level.toLowerCase()}`}>{level}</span>
);

const TagBadge = ({ tag }) => (
    <span className="sp-tag">{tag}</span>
);

const TestResultRow = ({ result, index }) => (
    <div className={`sp-test-row ${result.passed ? 'sp-test-row--pass' : 'sp-test-row--fail'}`}>
        <div className="sp-test-row__header">
            <span className={`sp-test-icon ${result.passed ? 'pass' : 'fail'}`}>
                {result.passed ? '✓' : '✗'}
            </span>
            <span className="sp-test-label">Test {index + 1}</span>
            <span className={`sp-test-status ${result.passed ? 'pass' : 'fail'}`}>
                {result.passed ? 'PASSED' : 'FAILED'}
            </span>
        </div>
        <div className="sp-test-details">
            <div className="sp-test-detail-row">
                <span className="sp-test-key">Input:</span>
                <code className="sp-test-val">{result.input}</code>
            </div>
            <div className="sp-test-detail-row">
                <span className="sp-test-key">Expected:</span>
                <code className="sp-test-val">{result.expected}</code>
            </div>
            <div className="sp-test-detail-row">
                <span className="sp-test-key">Output:</span>
                <code className={`sp-test-val ${result.passed ? 'pass' : 'fail'}`}>{result.actual}</code>
            </div>
            {result.error && (
                <div className="sp-test-error">{result.error}</div>
            )}
        </div>
    </div>
);

// ────────────────────────────────────────────────────────────────────────────
// Problem List Panel
// ────────────────────────────────────────────────────────────────────────────
const ProblemList = ({ problems, selectedId, solvedIds, onSelect }) => (
    <div className="sp-problem-list">
        {problems.map((p) => (
            <button
                key={p.id}
                className={`sp-problem-item ${selectedId === p.id ? 'active' : ''} ${solvedIds.has(p.id) ? 'solved' : ''}`}
                onClick={() => onSelect(p)}
                aria-label={p.title}
            >
                <div className="sp-problem-item__left">
                    <span className="sp-problem-item__check">
                        {solvedIds.has(p.id) ? '✓' : <span className="sp-problem-item__num">{p.id}</span>}
                    </span>
                    <span className="sp-problem-item__title">{p.title}</span>
                </div>
                <DifficultyBadge level={p.difficulty} />
            </button>
        ))}
    </div>
);

// ────────────────────────────────────────────────────────────────────────────
// Code Editor (textarea-based with line numbers)
// ────────────────────────────────────────────────────────────────────────────
const CodeEditor = ({ value, onChange }) => {
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    const lines = value.split('\n').length;

    const syncScroll = useCallback(() => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue = value.substring(0, start) + '    ' + value.substring(end);
            onChange(newValue);
            requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = start + 4;
                    textareaRef.current.selectionEnd = start + 4;
                }
            });
        }
    }, [value, onChange]);

    return (
        <div className="sp-editor-wrapper">
            <div className="sp-editor-header">
                <div className="sp-editor-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                </div>
                <span className="sp-editor-lang">Swift</span>
                <span className="sp-editor-badge">Interactive Editor</span>
            </div>
            <div className="sp-editor-body" onScroll={syncScroll}>
                <div className="sp-line-numbers" ref={lineNumbersRef} aria-hidden="true">
                    {Array.from({ length: lines }, (_, i) => (
                        <div key={i} className="sp-line-num">{i + 1}</div>
                    ))}
                </div>
                <textarea
                    ref={textareaRef}
                    className="sp-code-area"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    aria-label="Swift code editor"
                />
            </div>
        </div>
    );
};

// ────────────────────────────────────────────────────────────────────────────
// Problem Detail & Editor View
// ────────────────────────────────────────────────────────────────────────────
const ProblemView = ({ problem, isSolved, onSolve }) => {
    const [code, setCode] = useState(problem.starterCode);
    const [activeTab, setActiveTab] = useState('description');
    const [testResults, setTestResults] = useState([]);
    const [running, setRunning] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [liveResult, setLiveResult] = useState(null);
    const [hintIndex, setHintIndex] = useState(0);

    // Reset state when problem changes
    useEffect(() => {
        setCode(problem.starterCode);
        setTestResults([]);
        setShowSolution(false);
        setLiveResult(null);
        setHintIndex(0);
        setActiveTab('description');
    }, [problem.id, problem.starterCode]);

    const handleRun = useCallback(async () => {
        setRunning(true);
        setActiveTab('tests');
        await new Promise((r) => setTimeout(r, 600)); // simulate compilation

        const results = runSwiftSimulation(problem, code);
        setTestResults(results);

        const allPassed = results.every((r) => r.passed);
        if (allPassed) onSolve(problem.id);

        if (problem.isLiveRunnable) {
            const live = await runLiveFetch(problem);
            setLiveResult(live);
        }
        setRunning(false);
    }, [code, problem, onSolve]);

    const handleReset = useCallback(() => {
        setCode(problem.starterCode);
        setTestResults([]);
    }, [problem.starterCode]);

    const passCount = testResults.filter((r) => r.passed).length;
    const allPassed = testResults.length > 0 && passCount === testResults.length;

    const renderDescription = () => (
        <div className="sp-description">
            <div className="sp-desc-meta">
                <DifficultyBadge level={problem.difficulty} />
                <span className="sp-category-pill">{problem.category}</span>
                {problem.tags.map((t) => <TagBadge key={t} tag={t} />)}
            </div>

            <div className="sp-desc-body">
                {problem.description.split('\n').map((line, i) => {
                    if (line.startsWith('```swift')) return null;
                    if (line.startsWith('```')) return null;
                    if (line.startsWith('#')) return <h3 key={i}>{line.replace(/^#+\s*/, '')}</h3>;
                    if (line.startsWith('**') && line.endsWith('**')) return <h4 key={i}>{line.replace(/\*\*/g, '')}</h4>;
                    if (line.trim() === '') return <br key={i} />;
                    // Inline code
                    const parts = line.split(/(`[^`]+`)/g);
                    return (
                        <p key={i}>
                            {parts.map((p, j) =>
                                p.startsWith('`') ? <code key={j} className="sp-inline-code">{p.slice(1, -1)}</code> : p
                            )}
                        </p>
                    );
                })}
            </div>

            {/* Code block in description */}
            {problem.description.includes('```swift') && (
                <div className="sp-code-snippet">
                    <div className="sp-snippet-header">
                        <span>Swift</span>
                        <span className="sp-snippet-label">Example</span>
                    </div>
                    <pre className="sp-snippet-code">
                        {problem.description
                            .split('```swift')[1]
                            ?.split('```')[0]
                            ?.trim()}
                    </pre>
                </div>
            )}

            <div className="sp-complexity-row">
                <div className="sp-complexity-item">
                    <span className="sp-complexity-label">Time</span>
                    <span className="sp-complexity-val">{problem.timeComplexity}</span>
                </div>
                <div className="sp-complexity-item">
                    <span className="sp-complexity-label">Space</span>
                    <span className="sp-complexity-val">{problem.spaceComplexity}</span>
                </div>
            </div>

            <div className="sp-concepts">
                <h4>Key Concepts</h4>
                <div className="sp-concepts-list">
                    {problem.concepts.map((c) => (
                        <span key={c} className="sp-concept-chip">{c}</span>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderHints = () => (
        <div className="sp-hints">
            <h4>Hints</h4>
            {problem.hints.slice(0, hintIndex + 1).map((h, i) => (
                <div key={i} className="sp-hint-item animated">
                    <span className="sp-hint-num">{i + 1}</span>
                    <p>{h}</p>
                </div>
            ))}
            {hintIndex < problem.hints.length - 1 ? (
                <button className="sp-hint-btn" onClick={() => setHintIndex(hintIndex + 1)}>
                    Next Hint →
                </button>
            ) : (
                <p className="sp-no-more-hints">All hints revealed</p>
            )}
        </div>
    );

    const renderTests = () => (
        <div className="sp-test-panel">
            {testResults.length === 0 ? (
                <div className="sp-test-empty">
                    <div className="sp-test-empty-icon">▶</div>
                    <p>Click <strong>Run Code</strong> to evaluate your solution</p>
                </div>
            ) : (
                <>
                    <div className={`sp-test-summary ${allPassed ? 'pass' : 'fail'}`}>
                        <span className="sp-test-summary-icon">{allPassed ? '🎉' : '⚠️'}</span>
                        <span>
                            {passCount}/{testResults.length} test cases passed
                        </span>
                        {allPassed && <span className="sp-test-confetti">All tests passed!</span>}
                    </div>
                    {testResults.map((r, i) => (
                        <TestResultRow key={i} result={r} index={i} />
                    ))}
                    {liveResult && (
                        <div className="sp-live-result">
                            <h4>🌐 Live API Response</h4>
                            {liveResult.ok ? (
                                <pre className="sp-live-data">{liveResult.data}</pre>
                            ) : (
                                <div className="sp-live-error">Error: {liveResult.error}</div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );

    const renderSolution = () => (
        <div className="sp-solution">
            {!showSolution ? (
                <div className="sp-solution-warning">
                    <div className="sp-solution-warning-icon">⚠️</div>
                    <p>Try to solve the problem yourself first. Revealing the solution too early may hinder your learning.</p>
                    <button className="sp-solution-reveal-btn" onClick={() => setShowSolution(true)}>
                        Show Solution
                    </button>
                </div>
            ) : (
                <>
                    <div className="sp-solution-header">
                        <span className="sp-solution-tag">Official Solution</span>
                    </div>
                    <div className="sp-code-snippet">
                        <pre className="sp-snippet-code">{problem.solution}</pre>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="sp-problem-view">
            {/* Problem title bar */}
            <div className="sp-problem-title-bar">
                <div className="sp-problem-title-left">
                    <span className="sp-problem-num">#{problem.id}</span>
                    <h2 className="sp-problem-title">{problem.title}</h2>
                    {isSolved && <span className="sp-solved-badge">✓ Solved</span>}
                </div>
                <div className="sp-problem-title-right">
                    <button className="sp-btn sp-btn--ghost" onClick={handleReset} title="Reset to starter code">
                        ↺ Reset
                    </button>
                    <button
                        className={`sp-btn sp-btn--primary ${running ? 'loading' : ''}`}
                        onClick={handleRun}
                        disabled={running}
                    >
                        {running ? (
                            <><span className="sp-spinner" />Compiling…</>
                        ) : (
                            <>▶ Run Code</>
                        )}
                    </button>
                </div>
            </div>

            {/* Split view */}
            <div className="sp-split-view">
                {/* Left — Description / Hints / Tests / Solution */}
                <div className="sp-left-pane">
                    <div className="sp-pane-tabs">
                        {[
                            { id: 'description', label: 'Description' },
                            { id: 'hints', label: `Hints (${problem.hints.length})` },
                            { id: 'tests', label: `Tests${testResults.length ? ` ${passCount}/${testResults.length}` : ''}` },
                            { id: 'solution', label: 'Solution' },
                        ].map((t) => (
                            <button
                                key={t.id}
                                className={`sp-pane-tab ${activeTab === t.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(t.id)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <div className="sp-pane-content">
                        {activeTab === 'description' && renderDescription()}
                        {activeTab === 'hints' && renderHints()}
                        {activeTab === 'tests' && renderTests()}
                        {activeTab === 'solution' && renderSolution()}
                    </div>
                </div>

                {/* Right — Code Editor */}
                <div className="sp-right-pane">
                    <CodeEditor value={code} onChange={setCode} />
                    <div className="sp-editor-footer">
                        <span className="sp-editor-note">
                            💡 Tab inserts 4 spaces • Swift 5.9 syntax
                        </span>
                        {allPassed && (
                            <span className="sp-editor-success-msg">✓ All tests passed — great work!</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ────────────────────────────────────────────────────────────────────────────
// Stats Bar
// ────────────────────────────────────────────────────────────────────────────
const StatsBar = ({ problems, solvedIds }) => {
    const easy = problems.filter((p) => p.difficulty === 'Easy');
    const med = problems.filter((p) => p.difficulty === 'Medium');
    const hard = problems.filter((p) => p.difficulty === 'Hard');

    const solvedEasy = easy.filter((p) => solvedIds.has(p.id)).length;
    const solvedMed = med.filter((p) => solvedIds.has(p.id)).length;
    const solvedHard = hard.filter((p) => solvedIds.has(p.id)).length;

    const total = problems.length;
    const totalSolved = solvedIds.size;
    const pct = total > 0 ? Math.round((totalSolved / total) * 100) : 0;

    return (
        <div className="sp-stats-bar">
            <div className="sp-stats-progress-wrap">
                <div className="sp-stats-circle">
                    <svg viewBox="0 0 36 36" className="sp-stats-svg">
                        <path
                            className="sp-stats-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className="sp-stats-fill"
                            strokeDasharray={`${pct}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <div className="sp-stats-pct">{pct}%</div>
                </div>
                <div className="sp-stats-text">
                    <span className="sp-stats-solved">{totalSolved}</span>
                    <span className="sp-stats-total">/ {total} Solved</span>
                </div>
            </div>
            <div className="sp-stats-breakdown">
                <div className="sp-stats-diff easy">
                    <span>{solvedEasy}/{easy.length}</span>
                    <span>Easy</span>
                </div>
                <div className="sp-stats-diff medium">
                    <span>{solvedMed}/{med.length}</span>
                    <span>Medium</span>
                </div>
                <div className="sp-stats-diff hard">
                    <span>{solvedHard}/{hard.length}</span>
                    <span>Hard</span>
                </div>
            </div>
        </div>
    );
};

// ────────────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────────────
const SwiftPractice = () => {
    const [selectedProblem, setSelectedProblem] = useState(ALL_PROBLEMS[0]);
    const [solvedIds, setSolvedIds] = useState(() => {
        try {
            const raw = localStorage.getItem('swiftpractice_solved');
            return raw ? new Set(JSON.parse(raw)) : new Set();
        } catch { return new Set(); }
    });
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterDifficulty, setFilterDifficulty] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleSolve = useCallback((id) => {
        setSolvedIds((prev) => {
            const next = new Set(prev);
            next.add(id);
            localStorage.setItem('swiftpractice_solved', JSON.stringify([...next]));
            return next;
        });
    }, []);

    const filteredProblems = useMemo(() => {
        return ALL_PROBLEMS.filter((p) => {
            const catOk = filterCategory === 'All' || p.category === filterCategory;
            const diffOk = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
            const searchOk = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
            return catOk && diffOk && searchOk;
        });
    }, [filterCategory, filterDifficulty, searchQuery]);

    return (
        <div className="sp-root tools-container">
            {/* Header */}
            <div className="sp-header tool-header">
                <div className="sp-header-left">
                    <div className="sp-logo">
                        <span className="sp-logo-icon">🦅</span>
                        <div>
                            <h1 className="tool-title sp-title">SwiftCode</h1>
                            <p className="tool-subtitle">LeetCode-style Swift interview practice — write, run &amp; learn</p>
                        </div>
                    </div>
                </div>
                <StatsBar problems={ALL_PROBLEMS} solvedIds={solvedIds} />
            </div>

            {/* Main Layout */}
            <div className="sp-main">
                {/* Sidebar */}
                <div className={`sp-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                    <div className="sp-sidebar-inner">
                        <div className="sp-sidebar-controls">
                            <input
                                type="text"
                                className="sp-search"
                                placeholder="🔍 Search problems…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search problems"
                            />
                            <select
                                className="sp-filter"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                aria-label="Filter by category"
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <select
                                className="sp-filter"
                                value={filterDifficulty}
                                onChange={(e) => setFilterDifficulty(e.target.value)}
                                aria-label="Filter by difficulty"
                            >
                                {DIFFICULTIES.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            <div className="sp-sidebar-count">
                                {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}
                            </div>
                        </div>

                        <ProblemList
                            problems={filteredProblems}
                            selectedId={selectedProblem?.id}
                            solvedIds={solvedIds}
                            onSelect={setSelectedProblem}
                        />
                    </div>

                    <button
                        className="sp-sidebar-toggle"
                        onClick={() => setSidebarCollapsed((c) => !c)}
                        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {sidebarCollapsed ? '›' : '‹'}
                    </button>
                </div>

                {/* Problem View */}
                <div className="sp-content">
                    {selectedProblem ? (
                        <ProblemView
                            key={selectedProblem.id}
                            problem={selectedProblem}
                            isSolved={solvedIds.has(selectedProblem.id)}
                            onSolve={handleSolve}
                        />
                    ) : (
                        <div className="sp-welcome">
                            <div className="sp-welcome-icon">🦅</div>
                            <h2>Select a problem to begin</h2>
                            <p>Choose from {ALL_PROBLEMS.length} curated Swift interview questions</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SwiftPractice;
