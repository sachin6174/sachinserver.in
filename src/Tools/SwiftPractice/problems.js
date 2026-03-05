// ── NEW problems added from iOS/macOS interview research ──────────────────
// Appended to the existing 15. IDs start at 16.

export const NEW_PROBLEMS = [
    // ── Class vs Struct ───────────────────────────────────────────────────────
    {
        id: 16,
        title: 'Class vs Struct — Value Semantics',
        category: 'Swift Fundamentals',
        difficulty: 'Medium',
        tags: ['Class', 'Struct', 'Value Types', 'Reference Types'],
        description: `A common interview question: explain and demonstrate the difference between class and struct.

Implement both a \`PointClass\` (reference type) and \`PointStruct\` (value type) with \`x\` and \`y\` properties.
Then write \`demonstrateDifference()\` that shows:
- Changing a copy of a **class** instance affects the original
- Changing a copy of a **struct** instance does NOT affect the original

Return a tuple \`(classChanged: Bool, structChanged: Bool)\` where \`classChanged\` is true if original was mutated.

\`\`\`swift
demonstrateDifference()
// → (classChanged: true, structChanged: false)
\`\`\``,
        starterCode: `class PointClass {
    var x: Int
    var y: Int
    init(x: Int, y: Int) { self.x = x; self.y = y }
}

struct PointStruct {
    var x: Int
    var y: Int
}

func demonstrateDifference() -> (classChanged: Bool, structChanged: Bool) {
    // TODO: show that class copies share state, struct copies are independent
    
}`,
        solution: `class PointClass {
    var x: Int
    var y: Int
    init(x: Int, y: Int) { self.x = x; self.y = y }
}

struct PointStruct {
    var x: Int
    var y: Int
}

func demonstrateDifference() -> (classChanged: Bool, structChanged: Bool) {
    // Class: reference type — copy shares the same object
    let original = PointClass(x: 0, y: 0)
    let classCopy = original
    classCopy.x = 99           // mutates the shared instance
    let classChanged = original.x == 99   // true

    // Struct: value type — copy is independent
    var structOriginal = PointStruct(x: 0, y: 0)
    var structCopy = structOriginal
    structCopy.x = 99           // only mutates the copy
    let structChanged = structOriginal.x == 99  // false

    return (classChanged: classChanged, structChanged: structChanged)
}`,
        testCases: [
            { input: 'demonstrateDifference()', expected: '(classChanged: true, structChanged: false)' },
        ],
        hints: [
            'Class instances are reference types — assignment copies the reference, not the data.',
            'Struct instances are value types — assignment gives a completely independent copy.',
            'Mutate the copy and check if the original changed.',
        ],
        concepts: ['Value types vs Reference types', 'Stack vs Heap', 'Copy semantics', 'ARC'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── Delegation Pattern ────────────────────────────────────────────────────
    {
        id: 17,
        title: 'Delegation Pattern',
        category: 'Design Patterns',
        difficulty: 'Medium',
        tags: ['Delegation', 'Protocol', 'Design Patterns'],
        description: `Implement the **Delegation pattern** — the most frequently asked design pattern in iOS interviews.

Create a \`DownloadManager\` class that uses a \`DownloadDelegate\` protocol to report progress.

\`\`\`swift
protocol DownloadDelegate: AnyObject {
    func downloadDidFinish(url: String)
    func downloadDidFail(url: String, error: String)
}
\`\`\`

The \`DownloadManager\` should have a \`weak var delegate\` and \`simulate(url:, shouldFail:)\` method that calls the appropriate delegate method.`,
        starterCode: `protocol DownloadDelegate: AnyObject {
    func downloadDidFinish(url: String)
    func downloadDidFail(url: String, error: String)
}

class DownloadManager {
    // TODO: add weak delegate property
    
    func simulate(url: String, shouldFail: Bool) {
        // TODO: call delegate methods
    }
}

// Example conforming class
class ViewController: DownloadDelegate {
    var lastEvent: String = ""
    
    func downloadDidFinish(url: String) {
        lastEvent = "finished: \\(url)"
    }
    func downloadDidFail(url: String, error: String) {
        lastEvent = "failed: \\(url) - \\(error)"
    }
}`,
        solution: `protocol DownloadDelegate: AnyObject {
    func downloadDidFinish(url: String)
    func downloadDidFail(url: String, error: String)
}

class DownloadManager {
    weak var delegate: DownloadDelegate?
    
    func simulate(url: String, shouldFail: Bool) {
        if shouldFail {
            delegate?.downloadDidFail(url: url, error: "Network timeout")
        } else {
            delegate?.downloadDidFinish(url: url)
        }
    }
}

class ViewController: DownloadDelegate {
    var lastEvent: String = ""
    
    func downloadDidFinish(url: String) {
        lastEvent = "finished: \\(url)"
    }
    func downloadDidFail(url: String, error: String) {
        lastEvent = "failed: \\(url) - \\(error)"
    }
}`,
        testCases: [
            { input: 'simulate(url:"test", shouldFail: false)', expected: 'delegate?.downloadDidFinish called' },
            { input: 'simulate(url:"test", shouldFail: true)', expected: 'delegate?.downloadDidFail called' },
            { input: 'delegate is weak', expected: 'No retain cycle' },
        ],
        hints: [
            'Use `weak var delegate: DownloadDelegate?` to avoid retain cycles.',
            'The protocol must inherit from AnyObject to allow weak references.',
            'Use optional chaining `delegate?.method()` to safely call delegate methods.',
        ],
        concepts: ['Delegation pattern', 'weak references', 'AnyObject protocol', 'Protocol-oriented design'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── MVVM ─────────────────────────────────────────────────────────────────
    {
        id: 18,
        title: 'MVVM with ObservableObject',
        category: 'Architecture',
        difficulty: 'Medium',
        tags: ['MVVM', 'SwiftUI', 'ObservableObject', 'Combine'],
        description: `Implement a simple **MVVM** pattern for a counter using SwiftUI + Combine.

Create a \`CounterViewModel\` that:
- Conforms to \`ObservableObject\`
- Has \`@Published var count: Int = 0\`
- Has \`increment()\`, \`decrement()\`, and \`reset()\` methods
- Has a computed property \`displayText: String\` returning "Count: \\(count)"

\`\`\`swift
let vm = CounterViewModel()
vm.increment()
vm.increment()
vm.displayText  // "Count: 2"
\`\`\``,
        starterCode: `import Combine
import SwiftUI

class CounterViewModel: ObservableObject {
    // TODO: add @Published count property
    
    // TODO: add increment(), decrement(), reset()
    
    // TODO: add displayText computed property
}`,
        solution: `import Combine
import SwiftUI

class CounterViewModel: ObservableObject {
    @Published var count: Int = 0
    
    func increment() { count += 1 }
    func decrement() { count -= 1 }
    func reset()     { count = 0  }
    
    var displayText: String { "Count: \\(count)" }
}`,
        testCases: [
            { input: 'increment() x2 → displayText', expected: '"Count: 2"' },
            { input: 'decrement() on 0', expected: 'count = -1' },
            { input: 'reset() after increment()', expected: 'count = 0' },
        ],
        hints: [
            'ObservableObject + @Published automatically notifies SwiftUI views.',
            '@Published var triggers objectWillChange before each mutation.',
            'The ViewModel should contain business logic; the View just renders.',
        ],
        concepts: ['MVVM architecture', 'ObservableObject', '@Published', 'Combine publishers'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── Result Type ───────────────────────────────────────────────────────────
    {
        id: 19,
        title: 'Result Type for Network Calls',
        category: 'Error Handling',
        difficulty: 'Medium',
        tags: ['Result', 'Error Handling', 'Networking'],
        description: `Use Swift's \`Result<Success, Failure>\` type to model a network response.

Write \`fetchData(shouldSucceed: Bool, completion: @escaping (Result<String, NetworkError>) -> Void)\`.

Define \`NetworkError\` with cases \`serverError(Int)\` and \`noInternet\`.

\`\`\`swift
fetchData(shouldSucceed: true) { result in
    switch result {
    case .success(let data): print(data)    // "Response OK"
    case .failure(let err):  print(err)
    }
}
\`\`\``,
        starterCode: `enum NetworkError: Error {
    case serverError(Int)
    case noInternet
}

func fetchData(shouldSucceed: Bool,
               completion: @escaping (Result<String, NetworkError>) -> Void) {
    // TODO: call completion with .success or .failure
    
}`,
        solution: `enum NetworkError: Error {
    case serverError(Int)
    case noInternet
}

func fetchData(shouldSucceed: Bool,
               completion: @escaping (Result<String, NetworkError>) -> Void) {
    if shouldSucceed {
        completion(.success("Response OK"))
    } else {
        completion(.failure(.serverError(500)))
    }
}`,
        testCases: [
            { input: 'shouldSucceed: true', expected: '.success("Response OK")' },
            { input: 'shouldSucceed: false', expected: '.failure(.serverError(500))' },
        ],
        hints: [
            'Result<Success, Failure> where Failure: Error.',
            'Call completion(.success(value)) or completion(.failure(error)).',
            '@escaping is needed since the closure outlives the function.',
        ],
        concepts: ['Result type', '@escaping closures', 'Enum associated values', 'Completion handlers'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── GCD ──────────────────────────────────────────────────────────────────
    {
        id: 20,
        title: 'GCD — Background Task & UI Update',
        category: 'Concurrency',
        difficulty: 'Medium',
        tags: ['GCD', 'DispatchQueue', 'Threading'],
        description: `**Grand Central Dispatch** is heavily tested in iOS interviews.

Write \`processImageAndUpdateUI(completion: @escaping (String) -> Void)\` that:
1. Dispatches heavy work to a **global background queue** (\`.userInitiated\`)
2. Does "processing" (simulate with a description string)
3. Dispatches the result back to the **main queue**
4. Calls \`completion\` with \`"Processed on main thread"\`

\`\`\`swift
processImageAndUpdateUI { result in
    // This closure always runs on main thread
    label.text = result
}
\`\`\``,
        starterCode: `import Foundation

func processImageAndUpdateUI(completion: @escaping (String) -> Void) {
    // TODO: 1. dispatch to background queue
    //        2. do work
    //        3. dispatch result to main queue
    //        4. call completion
    
}`,
        solution: `import Foundation

func processImageAndUpdateUI(completion: @escaping (String) -> Void) {
    DispatchQueue.global(qos: .userInitiated).async {
        // Simulate heavy work on background thread
        let result = "Processed on main thread"
        
        DispatchQueue.main.async {
            completion(result)  // Always update UI on main thread
        }
    }
}`,
        testCases: [
            { input: 'processImageAndUpdateUI { result in ... }', expected: 'completion called on main thread' },
            { input: 'heavy work runs on background', expected: 'DispatchQueue.global used' },
        ],
        hints: [
            'Use DispatchQueue.global(qos: .userInitiated).async for background work.',
            'Always dispatch UI updates to DispatchQueue.main.async.',
            'Never update UIKit/SwiftUI from a background thread.',
        ],
        concepts: ['Grand Central Dispatch', 'Serial vs Concurrent queues', 'QoS levels', 'Main thread UI rule'],
        timeComplexity: 'O(1) dispatch',
        spaceComplexity: 'O(1)',
    },

    // ── Combine ───────────────────────────────────────────────────────────────
    {
        id: 21,
        title: 'Combine — PassthroughSubject Pipeline',
        category: 'Combine',
        difficulty: 'Hard',
        tags: ['Combine', 'Publisher', 'Subscriber', 'Reactive'],
        description: `Build a Combine pipeline that:
1. Creates a \`PassthroughSubject<Int, Never>\`
2. Filters out even numbers
3. Maps remaining values to their squares
4. Collects results via \`sink\`

\`\`\`swift
let subject = PassthroughSubject<Int, Never>()
// After piping [1,2,3,4,5] through → [1, 9, 25]
\`\`\``,
        starterCode: `import Combine

func buildPipeline() -> ([Int], AnyCancellable) {
    let subject = PassthroughSubject<Int, Never>()
    var results: [Int] = []
    
    // TODO: filter evens, map to square, collect in results
    let cancellable: AnyCancellable = subject
        .sink { _ in }            // replace this
    
    return (results, cancellable)
}`,
        solution: `import Combine

func buildPipeline() -> ([Int], AnyCancellable) {
    let subject = PassthroughSubject<Int, Never>()
    var results: [Int] = []
    
    let cancellable = subject
        .filter { $0 % 2 != 0 }   // keep odd numbers
        .map    { $0 * $0 }        // square them
        .sink   { results.append($0) }
    
    // Feed values
    [1, 2, 3, 4, 5].forEach { subject.send($0) }
    
    return (results, cancellable)
}`,
        testCases: [
            { input: 'send [1,2,3,4,5]', expected: '[1, 9, 25]' },
            { input: 'AnyCancellable stored', expected: 'subscription alive' },
        ],
        hints: [
            'PassthroughSubject<Output, Failure> is both a Publisher and can receive values via send(_:).',
            'Chain .filter{} then .map{} then .sink{}.',
            'Store the AnyCancellable or the subscription cancels immediately.',
        ],
        concepts: ['PassthroughSubject', 'filter operator', 'map operator', 'sink subscriber', 'AnyCancellable'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },

    // ── SwiftUI State ─────────────────────────────────────────────────────────
    {
        id: 22,
        title: 'SwiftUI @State vs @Binding',
        category: 'SwiftUI',
        difficulty: 'Medium',
        tags: ['SwiftUI', '@State', '@Binding', 'State Management'],
        description: `Explain and implement \`@State\` vs \`@Binding\` — one of the most asked SwiftUI questions.

Create:
- A parent \`ToggleParentView\` that owns a \`@State var isOn: Bool\`
- A child \`ToggleChildView\` that receives \`@Binding var isOn: Bool\` and shows a Toggle
- The parent displays "ON" or "OFF" based on the state

\`\`\`swift
// Child uses $isOn to create a binding
ToggleChildView(isOn: $isOn)
\`\`\``,
        starterCode: `import SwiftUI

struct ToggleChildView: View {
    // TODO: declare @Binding var isOn: Bool
    
    var body: some View {
        Toggle("Enable", isOn: isOn) // fix this
    }
}

struct ToggleParentView: View {
    // TODO: declare @State var isOn = false
    
    var body: some View {
        VStack {
            Text("Status: \\(isOn ? "ON" : "OFF")") // fix this
            ToggleChildView(isOn: isOn) // fix this — pass binding
        }
    }
}`,
        solution: `import SwiftUI

struct ToggleChildView: View {
    @Binding var isOn: Bool   // receives reference to parent's state
    
    var body: some View {
        Toggle("Enable", isOn: $isOn)
    }
}

struct ToggleParentView: View {
    @State private var isOn = false   // owns the truth
    
    var body: some View {
        VStack {
            Text("Status: \\(isOn ? "ON" : "OFF")")
            ToggleChildView(isOn: $isOn)  // $ creates a Binding<Bool>
        }
    }
}`,
        testCases: [
            { input: 'Toggle in child flips', expected: 'Parent text updates too' },
            { input: '@State lives in parent', expected: 'Single source of truth' },
            { input: '@Binding in child', expected: 'Two-way connection' },
        ],
        hints: [
            '@State owns the data — use it in the view that creates the value.',
            '@Binding is a two-way reference — prefix the @State var with $ to get a Binding.',
            'Child views should never own state they receive from outside — use @Binding.',
        ],
        concepts: ['@State', '@Binding', 'Two-way data binding', 'Source of truth', 'SwiftUI state management'],
        timeComplexity: 'N/A – UI',
        spaceComplexity: 'N/A – UI',
    },

    // ── Actor ─────────────────────────────────────────────────────────────────
    {
        id: 23,
        title: 'Swift Actor — Thread-Safe Counter',
        category: 'Concurrency',
        difficulty: 'Hard',
        tags: ['Actor', 'Swift Concurrency', 'Thread Safety'],
        description: `**Actors** are Swift's modern solution for protecting shared mutable state — asked at senior iOS interviews.

Implement a thread-safe \`Counter\` actor with:
- \`private(set) var value: Int = 0\`
- \`func increment()\`  
- \`func reset()\`
- \`func getValue() -> Int\`

\`\`\`swift
let counter = Counter()
await counter.increment()
await counter.increment()
await counter.getValue()  // 2
\`\`\``,
        starterCode: `// TODO: define Counter as an actor (not class/struct)
// Actors automatically serialize access to their state

actor Counter {
    // TODO: add value property and methods
}`,
        solution: `actor Counter {
    private(set) var value: Int = 0
    
    func increment() { value += 1 }
    func reset()     { value = 0  }
    func getValue()  -> Int { value }
}

// Usage:
// Task {
//     let c = Counter()
//     await c.increment()
//     await c.increment()
//     let v = await c.getValue()  // 2
// }`,
        testCases: [
            { input: 'await increment() x2 → getValue()', expected: '2' },
            { input: 'concurrent increments', expected: 'No data race (actor serializes)' },
            { input: 'await reset()', expected: 'value = 0' },
        ],
        hints: [
            'Replace `class` with `actor` keyword.',
            'Actor methods are automatically isolated — callers must `await` them.',
            'Actors prevent data races by ensuring only one task accesses state at a time.',
        ],
        concepts: ['Actor isolation', 'Data race prevention', 'Structured concurrency', 'await keyword'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── Codable ───────────────────────────────────────────────────────────────
    {
        id: 24,
        title: 'Codable — JSON Parsing',
        category: 'Networking',
        difficulty: 'Easy',
        tags: ['Codable', 'JSON', 'Networking', 'Decodable'],
        description: `Parse JSON into Swift structs using \`Codable\` — asked in almost every iOS interview.

Given this JSON:
\`\`\`json
{
  "id": 1,
  "full_name": "Sachin Kumar",
  "score": 9.8
}
\`\`\`

Create a \`Player\` struct that decodes it. Map \`full_name\` → \`fullName\` using \`CodingKeys\`.

\`\`\`swift
let player = try JSONDecoder().decode(Player.self, from: jsonData)
player.fullName  // "Sachin Kumar"
\`\`\``,
        starterCode: `import Foundation

struct Player: Codable {
    let id: Int
    let fullName: String  // maps from "full_name" in JSON
    let score: Double
    
    // TODO: add CodingKeys enum to map snake_case to camelCase
}

func decodePlayer(from jsonString: String) throws -> Player {
    // TODO: decode using JSONDecoder
    
}`,
        solution: `import Foundation

struct Player: Codable {
    let id: Int
    let fullName: String
    let score: Double
    
    enum CodingKeys: String, CodingKey {
        case id
        case fullName = "full_name"
        case score
    }
}

func decodePlayer(from jsonString: String) throws -> Player {
    let data = Data(jsonString.utf8)
    return try JSONDecoder().decode(Player.self, from: data)
}`,
        testCases: [
            { input: '{"id":1,"full_name":"Sachin","score":9.8}', expected: 'Player(id:1, fullName:"Sachin", score:9.8)' },
            { input: 'Missing field', expected: 'throws DecodingError' },
        ],
        hints: [
            'CodingKeys is a nested enum conforming to String, CodingKey.',
            'The raw value of each case is the JSON key name.',
            'Use JSONDecoder().decode(Type.self, from: data).',
        ],
        concepts: ['Codable', 'CodingKeys', 'JSONDecoder', 'Snake case mapping'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },

    // ── Escaping Closure ──────────────────────────────────────────────────────
    {
        id: 25,
        title: '@escaping vs Non-escaping Closures',
        category: 'Closures',
        difficulty: 'Medium',
        tags: ['Closures', '@escaping', 'Memory'],
        description: `A frequently asked closure question: what is the difference between escaping and non-escaping closures?

Implement:
1. \`runImmediately(_ action: () -> Void)\` — non-escaping, runs sync
2. \`runAfterDelay(_ action: @escaping () -> Void)\` — escaping, stored and called later
3. \`storeAndReturn(_ action: @escaping () -> String) -> () -> String\` — escaping, returns it

\`\`\`swift
runImmediately { print("sync") }          // runs immediately
runAfterDelay  { print("async later") }   // stored, called later
\`\`\``,
        starterCode: `import Foundation

// Non-escaping: closure must be called before function returns
func runImmediately(_ action: () -> Void) {
    // TODO
}

// Escaping: closure may outlive the function (async, stored)
func runAfterDelay(_ action: @escaping () -> Void) {
    // TODO: dispatch async after 0.1s
}

// Returns the closure — must escape
func storeAndReturn(_ action: @escaping () -> String) -> () -> String {
    // TODO: return the closure
}`,
        solution: `import Foundation

func runImmediately(_ action: () -> Void) {
    action()   // called before function returns — non-escaping
}

func runAfterDelay(_ action: @escaping () -> Void) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
        action()   // called after function returns — must @escape
    }
}

func storeAndReturn(_ action: @escaping () -> String) -> () -> String {
    return action   // returning it means it outlives the function
}`,
        testCases: [
            { input: 'runImmediately {} — no @escaping needed', expected: 'Compiler accepts ()' },
            { input: 'store closure for later', expected: '@escaping required' },
            { input: 'return closure', expected: '@escaping required' },
        ],
        hints: [
            'Non-escaping closures are called within the function scope — safer, no retain cycle risk.',
            '@escaping means the closure can outlive the function (stored, async, returned).',
            'Swift defaults to non-escaping — add @escaping only when needed.',
        ],
        concepts: ['@escaping closures', 'Non-escaping (default)', 'Closure capture lists', 'Memory implications'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── Protocol Extension ────────────────────────────────────────────────────
    {
        id: 26,
        title: 'Protocol Extensions — Default Implementation',
        category: 'Protocols',
        difficulty: 'Medium',
        tags: ['Protocols', 'Protocol Extensions', 'POP'],
        description: `**Protocol-Oriented Programming** is Apple's recommended paradigm for Swift.

Create a \`Greetable\` protocol with a default \`greet()\` implementation via protocol extension.
Types can override it or use the default.

\`\`\`swift
protocol Greetable {
    var name: String { get }
    func greet() -> String
}
// Default: "Hello, I'm <name>"
// Dog overrides: "Woof! I'm <name>"
\`\`\``,
        starterCode: `protocol Greetable {
    var name: String { get }
    func greet() -> String
}

// TODO: Add protocol extension with default greet() implementation

struct Person: Greetable {
    let name: String
    // uses default implementation
}

struct Dog: Greetable {
    let name: String
    // TODO: override greet() to return "Woof! I'm <name>"
}`,
        solution: `protocol Greetable {
    var name: String { get }
    func greet() -> String
}

extension Greetable {
    func greet() -> String {
        return "Hello, I'm \\(name)"
    }
}

struct Person: Greetable {
    let name: String
    // inherits default greet()
}

struct Dog: Greetable {
    let name: String
    func greet() -> String {
        return "Woof! I'm \\(name)"
    }
}`,
        testCases: [
            { input: 'Person(name:"Alice").greet()', expected: '"Hello, I\'m Alice"' },
            { input: 'Dog(name:"Rex").greet()', expected: '"Woof! I\'m Rex"' },
        ],
        hints: [
            'Use `extension ProtocolName { func method() { ... } }` for default implementation.',
            'Types can override the default by implementing the method themselves.',
            'This is the core of Protocol-Oriented Programming — compose via protocols, not inheritance.',
        ],
        concepts: ['Protocol extensions', 'Default implementations', 'Protocol-Oriented Programming', 'Overriding'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── Property Wrappers ──────────────────────────────────────────────────────
    {
        id: 27,
        title: 'Custom Property Wrapper — @Clamped',
        category: 'Swift Fundamentals',
        difficulty: 'Hard',
        tags: ['Property Wrappers', 'Advanced Swift'],
        description: `Property wrappers are a senior-level Swift topic. Create a \`@Clamped\` property wrapper that clamps a numeric value to a given range.

\`\`\`swift
struct Slider {
    @Clamped(0...100) var value: Int = 50
}

var s = Slider()
s.value = 150   // clamped to 100
s.value = -10   // clamped to 0
s.value = 75    // stays 75
\`\`\``,
        starterCode: `@propertyWrapper
struct Clamped<T: Comparable> {
    // TODO: store value and range, clamp on set
    
    var wrappedValue: T {
        get { /* TODO */ fatalError() }
        set { /* TODO: clamp newValue to range */ }
    }
    
    init(wrappedValue: T, _ range: ClosedRange<T>) {
        // TODO
    }
}

struct Slider {
    @Clamped(0...100) var value: Int = 50
}`,
        solution: `@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    private let range: ClosedRange<T>
    
    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
    
    init(wrappedValue: T, _ range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Slider {
    @Clamped(0...100) var value: Int = 50
}`,
        testCases: [
            { input: 'value = 150', expected: 'value == 100' },
            { input: 'value = -10', expected: 'value == 0' },
            { input: 'value = 75', expected: 'value == 75' },
        ],
        hints: [
            '@propertyWrapper struct needs a `wrappedValue` computed property.',
            'Use `min(max(newValue, lower), upper)` to clamp.',
            'The init receives `wrappedValue:` as the initial value.',
        ],
        concepts: ['@propertyWrapper', 'Generic constraints (Comparable)', 'ClosedRange', 'Custom setters'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── UIViewRepresentable ───────────────────────────────────────────────────
    {
        id: 28,
        title: 'UIViewRepresentable — Wrap UIKit in SwiftUI',
        category: 'SwiftUI',
        difficulty: 'Hard',
        tags: ['UIViewRepresentable', 'SwiftUI', 'UIKit', 'Bridging'],
        description: `**UIViewRepresentable** lets you use UIKit views inside SwiftUI — an important bridging skill.

Wrap a \`UIActivityIndicatorView\` in SwiftUI so you can use it like:

\`\`\`swift
ActivityIndicator(isAnimating: $loading)
\`\`\`

Implement \`makeUIView\` and \`updateUIView\`.`,
        starterCode: `import SwiftUI
import UIKit

struct ActivityIndicator: UIViewRepresentable {
    @Binding var isAnimating: Bool
    
    // TODO: implement makeUIView
    func makeUIView(context: Context) -> UIActivityIndicatorView {
        // return a new indicator
    }
    
    // TODO: implement updateUIView — start/stop based on isAnimating
    func updateUIView(_ uiView: UIActivityIndicatorView, context: Context) {
        // start or stop animating
    }
}`,
        solution: `import SwiftUI
import UIKit

struct ActivityIndicator: UIViewRepresentable {
    @Binding var isAnimating: Bool
    
    func makeUIView(context: Context) -> UIActivityIndicatorView {
        let indicator = UIActivityIndicatorView(style: .large)
        indicator.hidesWhenStopped = true
        return indicator
    }
    
    func updateUIView(_ uiView: UIActivityIndicatorView, context: Context) {
        if isAnimating {
            uiView.startAnimating()
        } else {
            uiView.stopAnimating()
        }
    }
}`,
        testCases: [
            { input: 'isAnimating = true', expected: 'indicator.startAnimating() called' },
            { input: 'isAnimating = false', expected: 'indicator.stopAnimating() called' },
            { input: 'makeUIView', expected: 'returns UIActivityIndicatorView' },
        ],
        hints: [
            'makeUIView creates the UIKit view once.',
            'updateUIView is called whenever SwiftUI state changes.',
            'Use @Binding to receive state from the SwiftUI parent.',
        ],
        concepts: ['UIViewRepresentable', 'SwiftUI ↔ UIKit bridge', 'makeUIView / updateUIView', 'Coordinator pattern'],
        timeComplexity: 'N/A – UI',
        spaceComplexity: 'N/A – UI',
    },

    // ── Dependency Injection ──────────────────────────────────────────────────
    {
        id: 29,
        title: 'Dependency Injection via Protocol',
        category: 'Architecture',
        difficulty: 'Medium',
        tags: ['Dependency Injection', 'Testability', 'SOLID'],
        description: `**Dependency Injection** makes classes testable — essential for senior iOS roles.

Create a \`NetworkService\` protocol, a real \`URLSessionNetworkService\` and a \`MockNetworkService\` for tests.
Inject the dependency into \`UserRepository\`.

\`\`\`swift
// Production
let repo = UserRepository(service: URLSessionNetworkService())
// Testing
let repo = UserRepository(service: MockNetworkService())
\`\`\``,
        starterCode: `protocol NetworkService {
    func fetch(url: String) -> String
}

// Real implementation
struct URLSessionNetworkService: NetworkService {
    func fetch(url: String) -> String {
        return "Real data from \\(url)"
    }
}

// TODO: Create MockNetworkService that returns "Mock data"

class UserRepository {
    // TODO: inject NetworkService via init
    
    func getUser(id: Int) -> String {
        // TODO: use injected service to fetch
        return ""
    }
}`,
        solution: `protocol NetworkService {
    func fetch(url: String) -> String
}

struct URLSessionNetworkService: NetworkService {
    func fetch(url: String) -> String {
        return "Real data from \\(url)"
    }
}

struct MockNetworkService: NetworkService {
    func fetch(url: String) -> String {
        return "Mock data"
    }
}

class UserRepository {
    private let service: NetworkService
    
    init(service: NetworkService) {
        self.service = service
    }
    
    func getUser(id: Int) -> String {
        return service.fetch(url: "users/\\(id)")
    }
}`,
        testCases: [
            { input: 'UserRepository(service: MockNetworkService())', expected: 'getUser → "Mock data"' },
            { input: 'UserRepository(service: URLSessionNetworkService())', expected: 'getUser → "Real data..."' },
        ],
        hints: [
            'Define a protocol instead of depending on a concrete class.',
            'Pass the dependency through init — this is "constructor injection".',
            'Tests use a Mock; production uses the real implementation.',
        ],
        concepts: ['Dependency Injection', 'Protocol as interface', 'Testability', 'SOLID — Dependency Inversion'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── Linked List ───────────────────────────────────────────────────────────
    {
        id: 30,
        title: 'Linked List — Detect Cycle',
        category: 'Algorithms',
        difficulty: 'Hard',
        tags: ['Linked List', 'DSA', 'Two Pointers'],
        description: `A common iOS interview DSA problem: detect if a linked list has a cycle using Floyd's algorithm.

\`\`\`swift
class ListNode {
    var val: Int
    var next: ListNode?
    init(_ val: Int) { self.val = val }
}

hasCycle(head)  // true if cycle exists, false otherwise
\`\`\`

Use the **fast & slow pointer** technique — O(1) space.`,
        starterCode: `class ListNode {
    var val: Int
    var next: ListNode?
    init(_ val: Int) { self.val = val }
}

func hasCycle(_ head: ListNode?) -> Bool {
    // TODO: Floyd's cycle detection — fast & slow pointers
    
}`,
        solution: `class ListNode {
    var val: Int
    var next: ListNode?
    init(_ val: Int) { self.val = val }
}

func hasCycle(_ head: ListNode?) -> Bool {
    var slow = head
    var fast = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
        if slow === fast { return true }  // === compares identity
    }
    return false
}`,
        testCases: [
            { input: '1→2→3→(back to 2)', expected: 'true' },
            { input: '1→2→3→nil', expected: 'false' },
            { input: 'nil', expected: 'false' },
        ],
        hints: [
            'Slow pointer moves 1 step, fast moves 2 steps.',
            'If they meet, there\'s a cycle.',
            'Use === (identity) not == (equality) to compare object references.',
        ],
        concepts: ["Floyd's cycle detection", 'Fast & slow pointers', 'Object identity (===)', 'Linked list traversal'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },

    // ── View Controller Lifecycle ──────────────────────────────────────────────
    {
        id: 31,
        title: 'UIViewController Lifecycle',
        category: 'UIKit',
        difficulty: 'Medium',
        tags: ['UIKit', 'ViewController', 'Lifecycle'],
        description: `A critical UIKit interview topic: the **ViewController lifecycle**.

Implement a \`LifecycleTracker\` class that simulates a UIViewController and records which lifecycle methods were called in order.

The correct order is:
\`init → loadView → viewDidLoad → viewWillAppear → viewDidAppear\`

And for dismissal:
\`viewWillDisappear → viewDidDisappear → deinit\``,
        starterCode: `class LifecycleTracker {
    var events: [String] = []
    
    // TODO: implement each method to append its name to events
    func simulateLoad() {
        // call: loadView, viewDidLoad, viewWillAppear(true), viewDidAppear(true)
    }
    
    func simulateDismiss() {
        // call: viewWillDisappear(true), viewDidDisappear(true)
    }
    
    func loadView()               { }
    func viewDidLoad()            { }
    func viewWillAppear(_ animated: Bool) { }
    func viewDidAppear(_ animated: Bool)  { }
    func viewWillDisappear(_ animated: Bool) { }
    func viewDidDisappear(_ animated: Bool)  { }
}`,
        solution: `class LifecycleTracker {
    var events: [String] = []
    
    func simulateLoad() {
        loadView()
        viewDidLoad()
        viewWillAppear(true)
        viewDidAppear(true)
    }
    
    func simulateDismiss() {
        viewWillDisappear(true)
        viewDidDisappear(true)
    }
    
    func loadView()                          { events.append("loadView") }
    func viewDidLoad()                       { events.append("viewDidLoad") }
    func viewWillAppear(_ animated: Bool)    { events.append("viewWillAppear") }
    func viewDidAppear(_ animated: Bool)     { events.append("viewDidAppear") }
    func viewWillDisappear(_ animated: Bool) { events.append("viewWillDisappear") }
    func viewDidDisappear(_ animated: Bool)  { events.append("viewDidDisappear") }
}`,
        testCases: [
            { input: 'simulateLoad()', expected: '["loadView", "viewDidLoad", "viewWillAppear", "viewDidAppear"]' },
            { input: 'simulateDismiss()', expected: '["viewWillDisappear", "viewDidDisappear"]' },
        ],
        hints: [
            'viewDidLoad is called once after the view hierarchy is loaded into memory.',
            'viewWillAppear/viewDidAppear are called every time the view is shown.',
            'loadView is where the view is first created — override to provide a custom view.',
        ],
        concepts: ['UIViewController lifecycle', 'loadView vs viewDidLoad', 'Appearance callbacks', 'Memory management'],
        timeComplexity: 'N/A',
        spaceComplexity: 'O(1)',
    },

    // ── Enum with Associated Values ────────────────────────────────────────────
    {
        id: 32,
        title: 'Enum with Associated Values — State Machine',
        category: 'Swift Fundamentals',
        difficulty: 'Medium',
        tags: ['Enum', 'Associated Values', 'State Machine'],
        description: `Model a network request **state machine** using Swift enums with associated values — a classic interview question.

\`\`\`swift
enum RequestState {
    case idle
    case loading
    case success(data: String)
    case failure(error: String, code: Int)
}
\`\`\`

Write \`describe(_ state: RequestState) -> String\` using a switch.`,
        starterCode: `enum RequestState {
    case idle
    case loading
    case success(data: String)
    case failure(error: String, code: Int)
}

func describe(_ state: RequestState) -> String {
    // TODO: switch over all cases, extract associated values
    
}`,
        solution: `enum RequestState {
    case idle
    case loading
    case success(data: String)
    case failure(error: String, code: Int)
}

func describe(_ state: RequestState) -> String {
    switch state {
    case .idle:
        return "Idle — no request"
    case .loading:
        return "Loading…"
    case .success(let data):
        return "Success: \\(data)"
    case .failure(let error, let code):
        return "Failed (\\(code)): \\(error)"
    }
}`,
        testCases: [
            { input: '.idle', expected: '"Idle — no request"' },
            { input: '.loading', expected: '"Loading…"' },
            { input: '.success(data: "OK")', expected: '"Success: OK"' },
            { input: '.failure(error: "Timeout", code: 408)', expected: '"Failed (408): Timeout"' },
        ],
        hints: [
            'Use `case .success(let data):` to extract associated values.',
            'Switch must be exhaustive — cover all cases.',
            'Associated values make enums more powerful than just integers.',
        ],
        concepts: ['Enum associated values', 'Exhaustive switch', 'State machine pattern', 'Pattern matching'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    // ── Core Data ─────────────────────────────────────────────────────────────
    {
        id: 33,
        title: 'Core Data — NSFetchRequest Pattern',
        category: 'Data Persistence',
        difficulty: 'Hard',
        tags: ['Core Data', 'NSFetchRequest', 'Persistence'],
        description: `Core Data is iOS's ORM framework. Demonstrate the **fetch pattern**.

Write a function that constructs an \`NSFetchRequest\` for a \`Task\` entity filtered by \`isCompleted == false\` and sorted by \`createdAt\` ascending.

\`\`\`swift
let request = buildTaskFetchRequest()
// Equivalent to SQL: SELECT * FROM Task WHERE isCompleted = 0 ORDER BY createdAt ASC
\`\`\``,
        starterCode: `import CoreData

func buildTaskFetchRequest() -> NSFetchRequest<NSManagedObject> {
    // TODO:
    // 1. Create NSFetchRequest for entity "Task"
    // 2. Add predicate: isCompleted == false
    // 3. Add sort descriptor: createdAt ascending
    // 4. Return the request
    
}`,
        solution: `import CoreData

func buildTaskFetchRequest() -> NSFetchRequest<NSManagedObject> {
    let request = NSFetchRequest<NSManagedObject>(entityName: "Task")
    
    // Filter: only incomplete tasks
    request.predicate = NSPredicate(format: "isCompleted == %@",
                                    NSNumber(value: false))
    
    // Sort: oldest first
    request.sortDescriptors = [
        NSSortDescriptor(key: "createdAt", ascending: true)
    ]
    
    return request
}`,
        testCases: [
            { input: 'buildTaskFetchRequest()', expected: 'entityName == "Task"' },
            { input: 'predicate check', expected: 'isCompleted == false' },
            { input: 'sort descriptor', expected: 'createdAt ascending' },
        ],
        hints: [
            'NSFetchRequest<NSManagedObject>(entityName:) creates the request.',
            'NSPredicate(format:) filters results — use %@ for values.',
            'NSSortDescriptor(key:ascending:) controls ordering.',
        ],
        concepts: ['NSFetchRequest', 'NSPredicate', 'NSSortDescriptor', 'NSManagedObject'],
        timeComplexity: 'O(n log n) — DB sort',
        spaceComplexity: 'O(n)',
    },

    // ── Lazy Properties ────────────────────────────────────────────────────────
    {
        id: 34,
        title: 'Lazy Properties & Computed Properties',
        category: 'Swift Fundamentals',
        difficulty: 'Easy',
        tags: ['lazy', 'Computed Properties', 'Performance'],
        description: `Explain and implement **lazy** vs **computed** properties — a common Swift interview concept.

Create a \`DataProcessor\` struct with:
- A **lazy** property \`processedData\` — expensive setup, computed once
- A **computed** property \`summary\` — recalculated every time
- Show the difference in behaviour

\`\`\`swift
var dp = DataProcessor(data: [1,2,3,4,5])
dp.summary        // recalculated each call
dp.processedData  // computed once, cached
\`\`\``,
        starterCode: `struct DataProcessor {
    let data: [Int]
    
    // TODO: lazy var processedData — filter evens, map to string, expensive
    
    // TODO: computed var summary — returns "Count: <data.count>" every call
}`,
        solution: `struct DataProcessor {
    let data: [Int]
    
    // Computed once on first access, then cached
    lazy var processedData: [String] = {
        print("Processing...")  // only prints once
        return data.filter { $0 % 2 == 0 }.map { "Item \\($0)" }
    }()
    
    // Recalculated every single access
    var summary: String {
        return "Count: \\(data.count)"
    }
}`,
        testCases: [
            { input: 'processedData on [1,2,3,4,5]', expected: '["Item 2", "Item 4"]' },
            { input: 'summary', expected: '"Count: 5"' },
            { input: 'processedData called twice', expected: 'computed only once (lazy)' },
        ],
        hints: [
            '`lazy var` is computed once on first access, then cached. Must use `var`, not `let`.',
            '`var computedProp: T { ... }` re-runs every time it\'s accessed.',
            'lazy requires the struct to be declared as `var` (not `let`).',
        ],
        concepts: ['lazy var', 'Computed properties', 'Performance optimization', 'Property initialization'],
        timeComplexity: 'O(n) first call, O(1) after (lazy)',
        spaceComplexity: 'O(n)',
    },

    // ── Observer Pattern ──────────────────────────────────────────────────────
    {
        id: 35,
        title: 'Observer Pattern — NotificationCenter',
        category: 'Design Patterns',
        difficulty: 'Medium',
        tags: ['Observer', 'NotificationCenter', 'Design Patterns'],
        description: `The **Observer pattern** in iOS is implemented via \`NotificationCenter\`.

Write code that:
1. Defines a custom notification name \`didUpdateScore\`
2. Posts the notification with \`userInfo: ["score": 100]\`
3. Observes it and extracts the score

\`\`\`swift
NotificationCenter.default.post(name: .didUpdateScore, object: nil,
                                userInfo: ["score": 100])
\`\`\``,
        starterCode: `import Foundation

extension Notification.Name {
    // TODO: define didUpdateScore notification name
}

class ScoreBoard {
    var lastScore: Int = 0
    
    func startObserving() {
        // TODO: add observer for didUpdateScore
        // extract score from userInfo and set lastScore
    }
    
    func postScore(_ score: Int) {
        // TODO: post notification with score in userInfo
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}`,
        solution: `import Foundation

extension Notification.Name {
    static let didUpdateScore = Notification.Name("didUpdateScore")
}

class ScoreBoard {
    var lastScore: Int = 0
    
    func startObserving() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleScoreUpdate(_:)),
            name: .didUpdateScore,
            object: nil)
    }
    
    @objc private func handleScoreUpdate(_ notification: Notification) {
        if let score = notification.userInfo?["score"] as? Int {
            lastScore = score
        }
    }
    
    func postScore(_ score: Int) {
        NotificationCenter.default.post(
            name: .didUpdateScore,
            object: nil,
            userInfo: ["score": score])
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}`,
        testCases: [
            { input: 'postScore(100)', expected: 'lastScore == 100' },
            { input: 'observer registered', expected: 'addObserver called' },
            { input: 'deinit', expected: 'removeObserver called' },
        ],
        hints: [
            'Extend Notification.Name with a static let for type safety.',
            'addObserver(self, selector:name:object:) registers the handler.',
            'Always removeObserver in deinit to prevent crashes.',
        ],
        concepts: ['Observer pattern', 'NotificationCenter', '@objc / selector', 'Notification.Name extension'],
        timeComplexity: 'O(1) post, O(n) observers',
        spaceComplexity: 'O(n) observers',
    },
];
