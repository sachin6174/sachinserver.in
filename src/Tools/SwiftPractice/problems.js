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

// ── MORE problems (IDs 36-55) ─────────────────────────────────────────────
export const MORE_PROBLEMS = [
    {
        id: 36,
        title: 'map / flatMap / compactMap',
        category: 'Collections',
        difficulty: 'Easy',
        tags: ['HOF', 'map', 'flatMap', 'compactMap', 'Optionals'],
        description: `Three of Swift's most-asked HOF interview questions in one problem.

Given \`["1", "two", "3", "four", "5"]\`, use:
1. \`compactMap\` to extract valid Ints → \`[1, 3, 5]\`
2. \`map\` to double them → \`[2, 6, 10]\`
3. \`flatMap\` on a nested array \`[[1,2],[3,4]]\` to flatten → \`[1, 2, 3, 4]\`

\`\`\`swift
let strings = ["1", "two", "3", "four", "5"]
let ints = strings.compactMap { Int($0) }  // [1, 3, 5]
\`\`\``,
        starterCode: `func extractAndDouble(_ strings: [String]) -> [Int] {
    // Step 1: compactMap to parse valid Ints
    // Step 2: map to double each
    
}

func flatten(_ nested: [[Int]]) -> [Int] {
    // Use flatMap to flatten one level
    
}`,
        solution: `func extractAndDouble(_ strings: [String]) -> [Int] {
    return strings
        .compactMap { Int($0) }   // filters nils automatically
        .map { $0 * 2 }            // doubles each value
}

func flatten(_ nested: [[Int]]) -> [Int] {
    return nested.flatMap { $0 }   // flattens one level
}`,
        testCases: [
            { input: '["1","two","3","four","5"]', expected: '[2, 6, 10]' },
            { input: '[[1,2],[3,4],[5]]', expected: '[1, 2, 3, 4, 5]' },
        ],
        hints: [
            'compactMap = map + filter nils. Int("two") returns nil, Int("1") returns Optional(1).',
            'flatMap on a [[T]] returns [T] — flattens exactly one level.',
            'Chain map after compactMap in a single expression.',
        ],
        concepts: ['compactMap', 'flatMap', 'map', 'Optional chaining', 'Functional programming'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },

    {
        id: 37,
        title: 'reduce — Sum & Running Product',
        category: 'Collections',
        difficulty: 'Easy',
        tags: ['reduce', 'HOF', 'Functional'],
        description: `\`reduce\` is always asked alongside map/filter. Implement:
1. \`sum(_ numbers: [Int]) -> Int\` — using reduce
2. \`product(_ numbers: [Int]) -> Int\` — using reduce
3. \`joinStrings(_ words: [String], separator: String) -> String\` — using reduce

\`\`\`swift
sum([1, 2, 3, 4, 5])         // 15
product([1, 2, 3, 4, 5])     // 120
joinStrings(["a","b","c"], separator: "-")  // "a-b-c"
\`\`\``,
        starterCode: `func sum(_ numbers: [Int]) -> Int {
    // use reduce(0, +)  or  reduce(0) { ... }
}

func product(_ numbers: [Int]) -> Int {
    // use reduce starting with 1
}

func joinStrings(_ words: [String], separator: String) -> String {
    // use reduce — skip separator on first word
}`,
        solution: `func sum(_ numbers: [Int]) -> Int {
    return numbers.reduce(0, +)
}

func product(_ numbers: [Int]) -> Int {
    return numbers.reduce(1, *)
}

func joinStrings(_ words: [String], separator: String) -> String {
    return words.reduce("") { acc, word in
        acc.isEmpty ? word : acc + separator + word
    }
}`,
        testCases: [
            { input: 'sum([1,2,3,4,5])', expected: '15' },
            { input: 'product([1,2,3,4,5])', expected: '120' },
            { input: 'joinStrings(["a","b","c"], "-")', expected: '"a-b-c"' },
        ],
        hints: [
            'reduce(initialValue, operation) — operation takes (accumulator, element).',
            'reduce(0, +) is shorthand for reduce(0) { $0 + $1 }.',
            'For joinStrings, start with empty string and only add separator when accumulator is non-empty.',
        ],
        concepts: ['reduce(_:_:)', 'Accumulator pattern', 'Operator shorthand'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },

    {
        id: 38,
        title: 'Equatable & Hashable Conformance',
        category: 'Swift Fundamentals',
        difficulty: 'Medium',
        tags: ['Equatable', 'Hashable', 'Comparable', 'Protocol'],
        description: `Custom \`Equatable\`, \`Hashable\`, and \`Comparable\` are asked at most iOS interviews.

Create a \`Point\` struct with \`x\` and \`y\` that:
- Is \`Equatable\` — two points are equal if x and y match
- Is \`Hashable\` — so it can be used in Set/Dictionary  
- Is \`Comparable\` — ordered by x first, then y

\`\`\`swift
let a = Point(x: 1, y: 2), b = Point(x: 1, y: 2)
a == b          // true
Set([a, b])     // {Point(1,2)}  — deduplicated
a < Point(x:2, y:0)   // true
\`\`\``,
        starterCode: `struct Point {
    let x: Int
    let y: Int
    
    // TODO: conform to Equatable, Hashable, Comparable
}`,
        solution: `struct Point: Equatable, Hashable, Comparable {
    let x: Int
    let y: Int
    
    // Equatable — auto-synthesized since all stored properties are Equatable
    // (or manually:)
    static func == (lhs: Point, rhs: Point) -> Bool {
        return lhs.x == rhs.x && lhs.y == rhs.y
    }
    
    // Hashable — auto-synthesized, or manually:
    func hash(into hasher: inout Hasher) {
        hasher.combine(x)
        hasher.combine(y)
    }
    
    // Comparable — must implement manually
    static func < (lhs: Point, rhs: Point) -> Bool {
        if lhs.x != rhs.x { return lhs.x < rhs.x }
        return lhs.y < rhs.y
    }
}`,
        testCases: [
            { input: 'Point(1,2) == Point(1,2)', expected: 'true' },
            { input: 'Set([Point(1,2), Point(1,2)]).count', expected: '1' },
            { input: 'Point(1,5) < Point(2,0)', expected: 'true' },
        ],
        hints: [
            'Swift auto-synthesizes Equatable/Hashable for structs if all properties conform.',
            'Comparable requires implementing < operator explicitly.',
            'Hashable must combine all distinguishing properties into the hasher.',
        ],
        concepts: ['Equatable', 'Hashable', 'Comparable', 'Auto-synthesis', 'Hasher'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    {
        id: 39,
        title: 'Palindrome Check',
        category: 'Algorithms',
        difficulty: 'Easy',
        tags: ['String', 'Two Pointers', 'Algorithms'],
        description: `Check if a string is a palindrome — ignoring case and non-alphanumeric characters.

\`\`\`swift
isPalindrome("A man, a plan, a canal: Panama")  // true
isPalindrome("race a car")                       // false
isPalindrome("Was it a car or a cat I saw?")     // true
\`\`\``,
        starterCode: `func isPalindrome(_ s: String) -> Bool {
    // Strip non-alphanumeric, lowercase, then use two pointers
    
}`,
        solution: `func isPalindrome(_ s: String) -> Bool {
    let chars = s.lowercased().filter { $0.isLetter || $0.isNumber }
    var left = chars.startIndex
    var right = chars.index(before: chars.endIndex)
    
    while left < right {
        if chars[left] != chars[right] { return false }
        chars.formIndex(after: &left)
        chars.formIndex(before: &right)
    }
    return true
}`,
        testCases: [
            { input: '"A man, a plan, a canal: Panama"', expected: 'true' },
            { input: '"race a car"', expected: 'false' },
            { input: '"Was it a car or a cat I saw?"', expected: 'true' },
        ],
        hints: [
            'Filter with isLetter || isNumber, then lowercase.',
            'Use two indices from start and end, move inward comparing.',
            'Swift String.Index can be advanced with formIndex(after:) / formIndex(before:).',
        ],
        concepts: ['Two-pointer technique', 'String filtering', 'Character properties', 'String.Index'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },

    {
        id: 40,
        title: 'Anagram Detection',
        category: 'Algorithms',
        difficulty: 'Easy',
        tags: ['String', 'Dictionary', 'Algorithms'],
        description: `Determine if two strings are anagrams of each other (same characters, different order). Ignore spaces and case.

\`\`\`swift
isAnagram("listen", "silent")       // true
isAnagram("Hello", "World")         // false
isAnagram("Astronomer", "Moon starer")  // true
\`\`\``,
        starterCode: `func isAnagram(_ s1: String, _ s2: String) -> Bool {
    // Use a frequency dictionary or sorted comparison
    
}`,
        solution: `func isAnagram(_ s1: String, _ s2: String) -> Bool {
    let normalize: (String) -> [Character: Int] = { str in
        str.lowercased()
           .filter { $0.isLetter }
           .reduce(into: [Character: Int]()) { freq, char in
               freq[char, default: 0] += 1
           }
    }
    return normalize(s1) == normalize(s2)
}`,
        testCases: [
            { input: '"listen", "silent"', expected: 'true' },
            { input: '"Hello", "World"', expected: 'false' },
            { input: '"Astronomer", "Moon starer"', expected: 'true' },
        ],
        hints: [
            'Build a character frequency dictionary for each string.',
            'Normalize: lowercase + filter non-letters first.',
            'Two strings are anagrams if their frequency maps are equal.',
        ],
        concepts: ['Frequency counting', 'Dictionary', 'reduce(into:)', 'Normalize strings'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(k) — alphabet size',
    },

    {
        id: 41,
        title: 'UserDefaults — Persist Settings',
        category: 'Data Persistence',
        difficulty: 'Easy',
        tags: ['UserDefaults', 'Persistence', 'iOS'],
        description: `\`UserDefaults\` is used for lightweight persistent storage — asked in every iOS interview.

Create a \`SettingsManager\` with:
- \`save(theme: String)\` — saves to UserDefaults key "theme"
- \`loadTheme() -> String\` — loads it, defaults to "light"
- \`save(fontSize: Int)\` — saves as integer
- \`loadFontSize() -> Int\` — loads it, defaults to 14

\`\`\`swift
SettingsManager.save(theme: "dark")
SettingsManager.loadTheme()   // "dark"
\`\`\``,
        starterCode: `import Foundation

struct SettingsManager {
    private static let defaults = UserDefaults.standard
    
    static func save(theme: String) {
        // TODO: save to key "theme"
    }
    
    static func loadTheme() -> String {
        // TODO: load with default "light"
        return "light"
    }
    
    static func save(fontSize: Int) {
        // TODO: save to key "fontSize"
    }
    
    static func loadFontSize() -> Int {
        // TODO: load with default 14
        return 14
    }
}`,
        solution: `import Foundation

struct SettingsManager {
    private static let defaults = UserDefaults.standard
    
    static func save(theme: String) {
        defaults.set(theme, forKey: "theme")
    }
    
    static func loadTheme() -> String {
        return defaults.string(forKey: "theme") ?? "light"
    }
    
    static func save(fontSize: Int) {
        defaults.set(fontSize, forKey: "fontSize")
    }
    
    static func loadFontSize() -> Int {
        let stored = defaults.integer(forKey: "fontSize")
        return stored == 0 ? 14 : stored
    }
}`,
        testCases: [
            { input: 'save(theme:"dark"), loadTheme()', expected: '"dark"' },
            { input: 'loadTheme() without save', expected: '"light" (default)' },
            { input: 'save(fontSize:18), loadFontSize()', expected: '18' },
        ],
        hints: [
            'defaults.set(_:forKey:) saves any property-list type.',
            'defaults.string(forKey:) returns Optional — use ?? for fallback.',
            'defaults.integer(forKey:) returns 0 for missing keys — handle specially.',
        ],
        concepts: ['UserDefaults', 'Persistent storage', 'Optional coalescing', 'Lightweight persistence'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    {
        id: 42,
        title: '@StateObject vs @ObservedObject',
        category: 'SwiftUI',
        difficulty: 'Hard',
        tags: ['SwiftUI', '@StateObject', '@ObservedObject', 'Lifecycle'],
        description: `One of the most misunderstood SwiftUI questions — **when to use @StateObject vs @ObservedObject**.

Rule: Use \`@StateObject\` when a view **owns/creates** the ViewModel. Use \`@ObservedObject\` when the ViewModel is **passed in**.

Implement:
- \`TimerViewModel\` (ObservableObject) with \`@Published var seconds = 0\` and \`start()\`
- \`ParentView\` that **creates** the VM with \`@StateObject\`
- \`ChildView\` that **receives** the VM with \`@ObservedObject\``,
        starterCode: `import SwiftUI
import Combine

class TimerViewModel: ObservableObject {
    @Published var seconds = 0
    private var timer: AnyCancellable?
    
    func start() {
        timer = Timer.publish(every: 1, on: .main, in: .common)
            .autoconnect()
            .sink { [weak self] _ in self?.seconds += 1 }
    }
}

struct ChildView: View {
    // TODO: use @ObservedObject — VM passed from parent
    var body: some View { Text("\\(0)s") }
}

struct ParentView: View {
    // TODO: use @StateObject — this view OWNS the VM
    var body: some View {
        VStack {
            Text("Parent")
            ChildView() // TODO: pass vm
        }
    }
}`,
        solution: `import SwiftUI
import Combine

class TimerViewModel: ObservableObject {
    @Published var seconds = 0
    private var timer: AnyCancellable?
    
    func start() {
        timer = Timer.publish(every: 1, on: .main, in: .common)
            .autoconnect()
            .sink { [weak self] _ in self?.seconds += 1 }
    }
}

struct ChildView: View {
    @ObservedObject var vm: TimerViewModel  // RECEIVES vm
    var body: some View { Text("\\(vm.seconds)s") }
}

struct ParentView: View {
    @StateObject private var vm = TimerViewModel()  // OWNS vm
    
    var body: some View {
        VStack {
            Text("Parent: \\(vm.seconds)s")
            ChildView(vm: vm)
            Button("Start") { vm.start() }
        }
    }
}`,
        testCases: [
            { input: '@StateObject in creator view', expected: 'VM survives re-renders' },
            { input: '@ObservedObject in child view', expected: 'VM received, not owned' },
            { input: 'Using @ObservedObject to create VM', expected: 'Bug: VM recreated on re-render!' },
        ],
        hints: [
            '@StateObject: SwiftUI manages the lifecycle — VM is created once and survives re-renders.',
            '@ObservedObject: VM is external — do NOT create it here, just observe.',
            'Using @ObservedObject to create a VM = bug: it gets recreated on every parent re-render.',
        ],
        concepts: ['@StateObject', '@ObservedObject', 'ViewModel lifecycle', 'SwiftUI re-render behavior'],
        timeComplexity: 'N/A – UI',
        spaceComplexity: 'N/A – UI',
    },

    {
        id: 43,
        title: 'Generic Constraints — where Clause',
        category: 'Generics',
        difficulty: 'Hard',
        tags: ['Generics', 'where clause', 'Constraints'],
        description: `Advanced Generics — using \`where\` clauses to add type constraints.

Write these generic functions:
1. \`largestElement<T: Comparable>(_ arr: [T]) -> T?\` — returns max
2. \`mergeDicts<K, V>(_ d1: [K:V], _ d2: [K:V]) -> [K:V] where K: Hashable\` — merges, d2 wins
3. \`printIfEquatable<T: Equatable>(_ a: T, _ b: T)\` — prints "Equal" or "Not Equal"

\`\`\`swift
largestElement([3, 1, 4, 1, 5, 9])  // 9
largestElement(["apple", "banana"]) // "banana"
\`\`\``,
        starterCode: `func largestElement<T: Comparable>(_ arr: [T]) -> T? {
    // TODO: return max element or nil if empty
}

func mergeDicts<K, V>(_ d1: [K: V], _ d2: [K: V]) -> [K: V] where K: Hashable {
    // TODO: merge d1 and d2, d2 values win on conflict
}

func printIfEquatable<T: Equatable>(_ a: T, _ b: T) -> String {
    // TODO: return "Equal" or "Not Equal"
}`,
        solution: `func largestElement<T: Comparable>(_ arr: [T]) -> T? {
    return arr.max()
}

func mergeDicts<K, V>(_ d1: [K: V], _ d2: [K: V]) -> [K: V] where K: Hashable {
    return d1.merging(d2) { _, new in new }
}

func printIfEquatable<T: Equatable>(_ a: T, _ b: T) -> String {
    return a == b ? "Equal" : "Not Equal"
}`,
        testCases: [
            { input: 'largestElement([3,1,9,2])', expected: '9' },
            { input: 'mergeDicts(["a":1],["a":2,"b":3])', expected: '["a":2,"b":3]' },
            { input: 'printIfEquatable(5, 5)', expected: '"Equal"' },
        ],
        hints: [
            'T: Comparable gives access to < and >, enabling .max().',
            'merging(_:uniquingKeysWith:) resolves conflicts with a closure.',
            'where clause adds constraints beyond the angle brackets.',
        ],
        concepts: ['Generic type constraints', 'where clause', 'Comparable', 'Hashable'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },

    {
        id: 44,
        title: 'OperationQueue — Dependencies',
        category: 'Concurrency',
        difficulty: 'Hard',
        tags: ['OperationQueue', 'Operation', 'Concurrency', 'Dependencies'],
        description: `\`OperationQueue\` offers more control than GCD — asked at senior iOS interviews.

Create 3 operations where:
- \`parseOperation\` depends on \`downloadOperation\`
- \`saveOperation\` depends on \`parseOperation\`
- Add all to an \`OperationQueue\` with maxConcurrentOperations = 2

\`\`\`swift
// Execution order guaranteed by dependencies:
// download → parse → save
\`\`\``,
        starterCode: `import Foundation

class DownloadOperation: Operation {
    override func main() {
        guard !isCancelled else { return }
        print("Downloading...")
    }
}

class ParseOperation: Operation {
    override func main() {
        guard !isCancelled else { return }
        print("Parsing...")
    }
}

class SaveOperation: Operation {
    override func main() {
        guard !isCancelled else { return }
        print("Saving...")
    }
}

func createPipeline() -> OperationQueue {
    // TODO: wire dependencies and add to queue
    let queue = OperationQueue()
    return queue
}`,
        solution: `import Foundation

class DownloadOperation: Operation {
    override func main() {
        guard !isCancelled else { return }
        print("Downloading...")
    }
}

class ParseOperation: Operation {
    override func main() {
        guard !isCancelled else { return }
        print("Parsing...")
    }
}

class SaveOperation: Operation {
    override func main() {
        guard !isCancelled else { return }
        print("Saving...")
    }
}

func createPipeline() -> OperationQueue {
    let queue = OperationQueue()
    queue.maxConcurrentOperationCount = 2
    
    let download = DownloadOperation()
    let parse    = ParseOperation()
    let save     = SaveOperation()
    
    parse.addDependency(download)  // parse waits for download
    save.addDependency(parse)      // save waits for parse
    
    queue.addOperations([download, parse, save], waitUntilFinished: false)
    return queue
}`,
        testCases: [
            { input: 'createPipeline()', expected: 'download → parse → save order' },
            { input: 'maxConcurrentOperationCount = 2', expected: 'at most 2 ops at once' },
            { input: 'cancel check in main()', expected: 'graceful cancellation' },
        ],
        hints: [
            'addDependency(_:) ensures an operation only starts after its dependency finishes.',
            'Always check isCancelled inside main() for graceful cancellation.',
            'OperationQueue vs GCD: OperationQueue supports dependencies, priorities, and cancellation.',
        ],
        concepts: ['OperationQueue', 'Operation dependencies', 'maxConcurrentOperationCount', 'Cancellation'],
        timeComplexity: 'O(1) setup',
        spaceComplexity: 'O(n) operations',
    },

    {
        id: 45,
        title: 'Combine — Debounce Search',
        category: 'Combine',
        difficulty: 'Medium',
        tags: ['Combine', 'debounce', 'CurrentValueSubject', 'Search'],
        description: `**Debouncing search input** is one of the most practical Combine use cases asked in interviews.

Using Combine, build a \`SearchViewModel\` that:
- Has a \`@Published var query = ""\` (input)
- Uses \`$query.debounce(for: .milliseconds(300), scheduler: RunLoop.main)\`
- Maps to uppercase (simulating a search transform)
- Saves results to \`@Published var results: [String]\`

\`\`\`swift
vm.query = "swift"
// 300ms later → results = ["SWIFT"]
\`\`\``,
        starterCode: `import Combine
import Foundation

class SearchViewModel: ObservableObject {
    @Published var query: String = ""
    @Published var results: [String] = []
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        // TODO: debounce query, transform, assign to results
    }
    
    private func search(_ term: String) -> [String] {
        guard !term.isEmpty else { return [] }
        return [term.uppercased()]   // simulate search
    }
}`,
        solution: `import Combine
import Foundation

class SearchViewModel: ObservableObject {
    @Published var query: String = ""
    @Published var results: [String] = []
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        $query
            .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
            .removeDuplicates()
            .map { [weak self] term in self?.search(term) ?? [] }
            .assign(to: &$results)
    }
    
    private func search(_ term: String) -> [String] {
        guard !term.isEmpty else { return [] }
        return [term.uppercased()]
    }
}`,
        testCases: [
            { input: 'query = "swift" (wait 300ms)', expected: 'results = ["SWIFT"]' },
            { input: 'rapid typing', expected: 'only final value debounced' },
            { input: 'removeDuplicates()', expected: 'same query not re-searched' },
        ],
        hints: [
            '$query accesses the publisher of the @Published property.',
            '.debounce(for:scheduler:) waits for silence before emitting.',
            '.removeDuplicates() prevents re-searching identical queries.',
            '.assign(to: &$results) binds output to another @Published.',
        ],
        concepts: ['debounce', 'removeDuplicates', 'assign(to:)', '$query publisher', 'Set<AnyCancellable>'],
        timeComplexity: 'O(1) pipeline setup',
        spaceComplexity: 'O(1)',
    },

    {
        id: 46,
        title: 'Subscripts — Custom Collection',
        category: 'Swift Fundamentals',
        difficulty: 'Medium',
        tags: ['Subscript', 'Custom Collection', 'Advanced Swift'],
        description: `Swift **subscripts** let you access elements with bracket syntax — asked at senior interviews.

Create a \`Matrix\` struct storing a 2D grid. Implement subscripts for:
- Read/write: \`matrix[row, col]\`
- Safe read: \`matrix[safe: row, col]\` returns \`Int?\`

\`\`\`swift
var m = Matrix(rows: 2, cols: 2, defaultValue: 0)
m[0, 1] = 42
m[0, 1]             // 42
m[safe: 5, 0]       // nil (out of bounds)
\`\`\``,
        starterCode: `struct Matrix {
    private var data: [[Int]]
    let rows: Int
    let cols: Int
    
    init(rows: Int, cols: Int, defaultValue: Int = 0) {
        self.rows = rows
        self.cols = cols
        data = Array(repeating: Array(repeating: defaultValue, count: cols), count: rows)
    }
    
    // TODO: regular subscript [row, col]
    
    // TODO: safe subscript [safe: row, col] -> Int?
}`,
        solution: `struct Matrix {
    private var data: [[Int]]
    let rows: Int
    let cols: Int
    
    init(rows: Int, cols: Int, defaultValue: Int = 0) {
        self.rows = rows
        self.cols = cols
        data = Array(repeating: Array(repeating: defaultValue, count: cols), count: rows)
    }
    
    subscript(row: Int, col: Int) -> Int {
        get { data[row][col] }
        set { data[row][col] = newValue }
    }
    
    subscript(safe row: Int, col: Int) -> Int? {
        guard row >= 0, row < rows, col >= 0, col < cols else { return nil }
        return data[row][col]
    }
}`,
        testCases: [
            { input: 'm[0,1] = 42; m[0,1]', expected: '42' },
            { input: 'm[safe: 5, 0]', expected: 'nil' },
            { input: 'm[safe: 0, 1]', expected: 'Optional(42)' },
        ],
        hints: [
            'subscript(row: Int, col: Int) -> Int { get { } set { } }',
            'Use argument labels to differentiate overloads: subscript(safe row:, col:)',
            'Safe subscript returns Optional — check bounds before accessing.',
        ],
        concepts: ['Subscripts', 'Multiple parameters', 'Argument labels', 'Bounds checking'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(rows × cols)',
    },

    {
        id: 47,
        title: 'Fibonacci — Memoization',
        category: 'Algorithms',
        difficulty: 'Medium',
        tags: ['Dynamic Programming', 'Memoization', 'Recursion'],
        description: `Classic interview: Fibonacci with **memoization** (top-down DP).

Implement \`fibonacci(_ n: Int) -> Int\` that caches results in a dictionary to avoid recomputation.

\`\`\`swift
fibonacci(0)   // 0
fibonacci(1)   // 1
fibonacci(10)  // 55
fibonacci(40)  // 102334155 (fast with memoization!)
\`\`\``,
        starterCode: `func fibonacci(_ n: Int) -> Int {
    // TODO: implement with memoization (dictionary cache)
    // Naive recursion is O(2^n) — memoization makes it O(n)
    var memo = [Int: Int]()
    
    func fib(_ n: Int) -> Int {
        // TODO
        return 0
    }
    
    return fib(n)
}`,
        solution: `func fibonacci(_ n: Int) -> Int {
    var memo = [Int: Int]()
    
    func fib(_ n: Int) -> Int {
        if n <= 1 { return n }
        if let cached = memo[n] { return cached }
        let result = fib(n - 1) + fib(n - 2)
        memo[n] = result
        return result
    }
    
    return fib(n)
}`,
        testCases: [
            { input: 'fibonacci(0)', expected: '0' },
            { input: 'fibonacci(10)', expected: '55' },
            { input: 'fibonacci(40)', expected: '102334155' },
        ],
        hints: [
            'Check the memo dictionary before computing — if cached, return immediately.',
            'Store the result in memo[n] before returning.',
            'Base cases: n <= 1 → return n.',
        ],
        concepts: ['Memoization', 'Dynamic programming', 'Recursion', 'Dictionary as cache'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },

    {
        id: 48,
        title: 'Merge Intervals',
        category: 'Algorithms',
        difficulty: 'Medium',
        tags: ['Intervals', 'Sorting', 'DSA', 'Arrays'],
        description: `Classic array problem — merge overlapping intervals.

Given an array of \`[start, end]\` intervals, merge all overlapping ones and return the result sorted.

\`\`\`swift
mergeIntervals([[1,3],[2,6],[8,10],[15,18]])
// → [[1,6],[8,10],[15,18]]

mergeIntervals([[1,4],[4,5]])
// → [[1,5]]
\`\`\``,
        starterCode: `func mergeIntervals(_ intervals: [[Int]]) -> [[Int]] {
    guard !intervals.isEmpty else { return [] }
    // TODO: sort by start, then merge overlapping
    
}`,
        solution: `func mergeIntervals(_ intervals: [[Int]]) -> [[Int]] {
    guard !intervals.isEmpty else { return [] }
    
    let sorted = intervals.sorted { $0[0] < $1[0] }
    var merged = [sorted[0]]
    
    for interval in sorted.dropFirst() {
        let last = merged[merged.count - 1]
        if interval[0] <= last[1] {
            // Overlapping — extend the end if needed
            merged[merged.count - 1][1] = max(last[1], interval[1])
        } else {
            merged.append(interval)
        }
    }
    return merged
}`,
        testCases: [
            { input: '[[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
            { input: '[[1,4],[4,5]]', expected: '[[1,5]]' },
            { input: '[[1,4],[2,3]]', expected: '[[1,4]]' },
        ],
        hints: [
            'Sort by start time first.',
            'If current interval start ≤ previous end → they overlap, merge by taking max of ends.',
            'Otherwise the current interval is disjoint — append it.',
        ],
        concepts: ['Interval merging', 'Sorting by key', 'Greedy', 'Array manipulation'],
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
    },

    {
        id: 49,
        title: 'KVO — Key-Value Observing',
        category: 'UIKit',
        difficulty: 'Medium',
        tags: ['KVO', 'KVC', 'NSObject', 'Observation'],
        description: `**KVO (Key-Value Observing)** is an Objective-C pattern still used heavily in iOS/macOS.

Create an \`NSObject\` subclass \`Person\` with a \`@objc dynamic var name: String\`.
Observe \`name\` changes using \`observe(_:options:changeHandler:)\`.

\`\`\`swift
let person = Person(name: "Alice")
let obs = person.observe(\\.name, options: [.new]) { p, change in
    print("Changed to: \\(change.newValue!)")
}
person.name = "Bob"  // prints "Changed to: Bob"
\`\`\``,
        starterCode: `import Foundation

class Person: NSObject {
    // TODO: mark name as @objc dynamic so it supports KVO
    var name: String
    
    init(name: String) {
        self.name = name
    }
}

func demonstrateKVO() {
    let person = Person(name: "Alice")
    var observations: [NSKeyValueObservation] = []
    
    // TODO: observe name changes and print new value
    
    person.name = "Bob"
    person.name = "Charlie"
}`,
        solution: `import Foundation

class Person: NSObject {
    @objc dynamic var name: String   // @objc dynamic enables KVO
    
    init(name: String) {
        self.name = name
    }
}

func demonstrateKVO() {
    let person = Person(name: "Alice")
    
    let observation = person.observe(\\.name, options: [.new, .old]) { p, change in
        let new = change.newValue ?? ""
        let old = change.oldValue ?? ""
        print("name changed from \\(old) to \\(new)")
    }
    
    person.name = "Bob"     // triggers observer
    person.name = "Charlie" // triggers observer
    _ = observation  // keep alive
}`,
        testCases: [
            { input: 'name = "Bob"', expected: 'observer called with newValue "Bob"' },
            { input: '@objc dynamic required', expected: 'KVO enabled for Swift property' },
            { input: 'observation kept alive', expected: 'observers not prematurely deallocated' },
        ],
        hints: [
            'Properties must be @objc dynamic for KVO to work in Swift.',
            'observe(_:options:changeHandler:) returns NSKeyValueObservation — store it!',
            'If the observation object is deallocated, the observation stops.',
        ],
        concepts: ['KVO', '@objc dynamic', 'NSObject subclass', 'NSKeyValueObservation', 'options: [.new, .old]'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    {
        id: 50,
        title: 'Quick Sort Implementation',
        category: 'Algorithms',
        difficulty: 'Hard',
        tags: ['Sorting', 'Quick Sort', 'Recursion', 'DSA'],
        description: `Implement **Quick Sort** in Swift — a classic algorithm asked in iOS interviews.

\`\`\`swift
quickSort([3, 6, 8, 10, 1, 2, 1])
// → [1, 1, 2, 3, 6, 8, 10]
\`\`\`

Use the functional Swift approach (partition into less/equal/greater arrays around pivot).`,
        starterCode: `func quickSort<T: Comparable>(_ array: [T]) -> [T] {
    // TODO: base case + partition around pivot + recurse
    
}`,
        solution: `func quickSort<T: Comparable>(_ array: [T]) -> [T] {
    guard array.count > 1 else { return array }
    
    let pivot = array[array.count / 2]
    let less    = array.filter { $0 < pivot }
    let equal   = array.filter { $0 == pivot }
    let greater = array.filter { $0 > pivot }
    
    return quickSort(less) + equal + quickSort(greater)
}`,
        testCases: [
            { input: '[3,6,8,10,1,2,1]', expected: '[1,1,2,3,6,8,10]' },
            { input: '[]', expected: '[]' },
            { input: '[1]', expected: '[1]' },
            { input: '["banana","apple","cherry"]', expected: '["apple","banana","cherry"]' },
        ],
        hints: [
            'Choose a pivot (middle element is a common safe choice).',
            'Partition into: elements < pivot, == pivot, > pivot.',
            'Recursively sort less and greater, concatenate.',
            'Generic <T: Comparable> makes it work for any comparable type.',
        ],
        concepts: ['Quick Sort', 'Divide and conquer', 'Generic algorithms', 'Recursion'],
        timeComplexity: 'O(n log n) average, O(n²) worst',
        spaceComplexity: 'O(n)',
    },

    {
        id: 51,
        title: 'Capture Lists — [weak self] in Closures',
        category: 'Memory Management',
        difficulty: 'Medium',
        tags: ['Closures', 'Capture List', 'weak self', 'Memory'],
        description: `**Capture lists** in closures are a critical iOS memory management concept.

Fix the retain cycle in this \`NetworkManager\` class by adding the correct capture list.

\`\`\`swift
class ViewModel {
    var onDataReceived: ((String) -> Void)?
    
    func fetchData() {
        NetworkManager.fetch { data in
            self.process(data)   // ← strong capture — potential cycle!
        }
    }
}
\`\`\`

Implement \`ViewModel\` with a proper \`[weak self]\` capture and guard against nil.`,
        starterCode: `class NetworkManager {
    static func fetch(completion: @escaping (String) -> Void) {
        DispatchQueue.global().async {
            completion("API response")
        }
    }
}

class ViewModel {
    var title: String = "Loading..."
    
    func fetchData() {
        // TODO: use [weak self] to avoid retain cycle
        NetworkManager.fetch { data in
            // TODO: guard against nil self
            self.title = data  // fix this — strong capture!
        }
    }
    
    func process(_ data: String) {
        title = "Got: \\(data)"
    }
    
    deinit { print("ViewModel deallocated") }
}`,
        solution: `class NetworkManager {
    static func fetch(completion: @escaping (String) -> Void) {
        DispatchQueue.global().async {
            completion("API response")
        }
    }
}

class ViewModel {
    var title: String = "Loading..."
    
    func fetchData() {
        NetworkManager.fetch { [weak self] data in
            guard let self = self else { return }  // safely unwrap
            self.process(data)
        }
    }
    
    func process(_ data: String) {
        title = "Got: \\(data)"
    }
    
    deinit { print("ViewModel deallocated") }
}`,
        testCases: [
            { input: 'ViewModel set to nil after fetch', expected: 'deinit called — no cycle' },
            { input: '[weak self] in closure', expected: 'self is Optional inside closure' },
            { input: 'guard let self = self', expected: 'safely exits if VM deallocated' },
        ],
        hints: [
            '[weak self] makes self Optional inside the closure — prevents strong retention.',
            'guard let self = self else { return } re-strengthens the reference for the closure body.',
            'Without [weak self], the closure retains self strongly, forming a cycle.',
        ],
        concepts: ['Capture lists', '[weak self]', 'Retain cycle prevention', 'guard let rebinding'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    {
        id: 52,
        title: 'String Manipulation — Valid Parentheses',
        category: 'Algorithms',
        difficulty: 'Medium',
        tags: ['Stack', 'String', 'DSA'],
        description: `Valid Parentheses — a LeetCode classic, frequently asked in iOS/macOS interviews.

Given a string with only \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, \`]\`, determine if it's valid.

Rules:
- Open brackets must be closed by the same type
- Open brackets must be closed in correct order

\`\`\`swift
isValid("()")      // true
isValid("()[]{}")  // true
isValid("(]")      // false
isValid("{[]}")    // true
\`\`\``,
        starterCode: `func isValid(_ s: String) -> Bool {
    // Use a stack — push opens, pop and verify on close
    
}`,
        solution: `func isValid(_ s: String) -> Bool {
    var stack = [Character]()
    let pairs: [Character: Character] = [")": "(", "}": "{", "]": "["]
    
    for char in s {
        if "({[".contains(char) {
            stack.append(char)
        } else if let open = pairs[char] {
            guard stack.last == open else { return false }
            stack.removeLast()
        }
    }
    return stack.isEmpty
}`,
        testCases: [
            { input: '"()"', expected: 'true' },
            { input: '"()[]{}"', expected: 'true' },
            { input: '"(]"', expected: 'false' },
            { input: '"{[]}"', expected: 'true' },
        ],
        hints: [
            'Use a stack: push opening brackets, pop on closing brackets.',
            'For each closing bracket, check if top of stack is the matching opener.',
            'At the end, the stack should be empty.',
        ],
        concepts: ['Stack data structure', 'Dictionary for bracket matching', 'Character iteration'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },

    {
        id: 53,
        title: 'Trie — Autocomplete',
        category: 'Algorithms',
        difficulty: 'Hard',
        tags: ['Trie', 'Tree', 'DSA', 'String'],
        description: `A **Trie** (prefix tree) is used for autocomplete — asked at senior iOS interviews.

Implement a \`Trie\` with:
- \`insert(_ word: String)\`
- \`search(_ word: String) -> Bool\` — exact match
- \`startsWith(_ prefix: String) -> Bool\` — prefix match

\`\`\`swift
var trie = Trie()
trie.insert("apple")
trie.search("apple")    // true
trie.search("app")      // false (not inserted)
trie.startsWith("app")  // true
\`\`\``,
        starterCode: `class TrieNode {
    var children: [Character: TrieNode] = [:]
    var isEndOfWord = false
}

class Trie {
    private let root = TrieNode()
    
    func insert(_ word: String) {
        // TODO: traverse/create nodes for each char
    }
    
    func search(_ word: String) -> Bool {
        // TODO: return true only if full word inserted
        return false
    }
    
    func startsWith(_ prefix: String) -> Bool {
        // TODO: return true if any word starts with prefix
        return false
    }
}`,
        solution: `class TrieNode {
    var children: [Character: TrieNode] = [:]
    var isEndOfWord = false
}

class Trie {
    private let root = TrieNode()
    
    func insert(_ word: String) {
        var node = root
        for char in word {
            if node.children[char] == nil {
                node.children[char] = TrieNode()
            }
            node = node.children[char]!
        }
        node.isEndOfWord = true
    }
    
    private func findNode(for prefix: String) -> TrieNode? {
        var node = root
        for char in prefix {
            guard let next = node.children[char] else { return nil }
            node = next
        }
        return node
    }
    
    func search(_ word: String) -> Bool {
        return findNode(for: word)?.isEndOfWord == true
    }
    
    func startsWith(_ prefix: String) -> Bool {
        return findNode(for: prefix) != nil
    }
}`,
        testCases: [
            { input: 'insert("apple"), search("apple")', expected: 'true' },
            { input: 'search("app")', expected: 'false' },
            { input: 'startsWith("app")', expected: 'true' },
            { input: 'startsWith("xyz")', expected: 'false' },
        ],
        hints: [
            'Each TrieNode has children: [Character: TrieNode] and isEndOfWord flag.',
            'insert traverses/creates nodes for each character.',
            'search traverses and checks isEndOfWord at last node.',
            'startsWith just checks if the path exists (node not nil).',
        ],
        concepts: ['Trie data structure', 'Prefix matching', 'Dictionary as children map', 'isEndOfWord flag'],
        timeComplexity: 'O(L) — word length',
        spaceComplexity: 'O(N×L) — N words',
    },

    {
        id: 54,
        title: 'Custom Operator Overloading',
        category: 'Swift Fundamentals',
        difficulty: 'Hard',
        tags: ['Operator Overloading', 'Advanced Swift'],
        description: `**Operator overloading** is a senior Swift question. Overload operators for a \`Vector2D\` struct.

Implement:
- \`+\` operator: component-wise addition
- \`*\` operator: scalar multiplication
- \`==\` operator (Equatable): equality

\`\`\`swift
let a = Vector2D(x: 1, y: 2)
let b = Vector2D(x: 3, y: 4)
a + b        // Vector2D(x:4, y:6)
a * 3        // Vector2D(x:3, y:6)
a == a       // true
\`\`\``,
        starterCode: `struct Vector2D: Equatable {
    var x: Double
    var y: Double
    
    // TODO: overload + for Vector2D + Vector2D
    
    // TODO: overload * for Vector2D * Double (scalar)
    
    // Equatable == is auto-synthesized for structs
}`,
        solution: `struct Vector2D: Equatable {
    var x: Double
    var y: Double
    
    static func + (lhs: Vector2D, rhs: Vector2D) -> Vector2D {
        Vector2D(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }
    
    static func * (lhs: Vector2D, rhs: Double) -> Vector2D {
        Vector2D(x: lhs.x * rhs, y: lhs.y * rhs)
    }
    
    // == is auto-synthesized since x and y are Equatable
}`,
        testCases: [
            { input: 'Vector2D(1,2) + Vector2D(3,4)', expected: 'Vector2D(x:4, y:6)' },
            { input: 'Vector2D(1,2) * 3', expected: 'Vector2D(x:3, y:6)' },
            { input: 'Vector2D(1,2) == Vector2D(1,2)', expected: 'true' },
        ],
        hints: [
            'Define operators as static func inside the type.',
            'Operator functions take lhs and rhs parameters matching the types.',
            'For Equatable, == is auto-synthesized for structs when all properties are Equatable.',
        ],
        concepts: ['Operator overloading', 'static func operators', 'Infix operators', 'Equatable'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
    },

    {
        id: 55,
        title: 'LRU Cache',
        category: 'Algorithms',
        difficulty: 'Hard',
        tags: ['LRU Cache', 'Dictionary', 'Linked List', 'DSA'],
        description: `**Least Recently Used (LRU) Cache** — asked at senior iOS/macOS positions.

Implement an LRU cache with:
- \`get(_ key: Int) -> Int\` — return value or -1 if not found
- \`put(_ key: Int, _ value: Int)\` — insert/update, evict LRU if at capacity

\`\`\`swift
let cache = LRUCache(capacity: 2)
cache.put(1, 1)
cache.put(2, 2)
cache.get(1)    // 1 — now 1 is most recently used
cache.put(3, 3) // evicts key 2 (LRU)
cache.get(2)    // -1 (evicted)
\`\`\``,
        starterCode: `class LRUCache {
    // TODO: implement with Dictionary + order tracking
    // Hint: use [Int: Int] for values, [Int] array for order
    
    init(_ capacity: Int) {
        
    }
    
    func get(_ key: Int) -> Int {
        return -1
    }
    
    func put(_ key: Int, _ value: Int) {
        
    }
}`,
        solution: `class LRUCache {
    private var capacity: Int
    private var cache: [Int: Int] = [:]
    private var order: [Int] = []   // front = LRU, back = MRU
    
    init(_ capacity: Int) {
        self.capacity = capacity
    }
    
    func get(_ key: Int) -> Int {
        guard let value = cache[key] else { return -1 }
        // Move to most recently used (back)
        order.removeAll { $0 == key }
        order.append(key)
        return value
    }
    
    func put(_ key: Int, _ value: Int) {
        if cache[key] != nil {
            order.removeAll { $0 == key }
        } else if cache.count >= capacity {
            let lru = order.removeFirst()  // evict LRU
            cache.removeValue(forKey: lru)
        }
        cache[key] = value
        order.append(key)
    }
}`,
        testCases: [
            { input: 'put(1,1), put(2,2), get(1)', expected: '1' },
            { input: 'put(3,3) → evicts 2; get(2)', expected: '-1' },
            { input: 'get non-existent key', expected: '-1' },
        ],
        hints: [
            'Track insertion/access order — front is LRU, back is MRU.',
            'On get: move key to back (MRU position).',
            'On put: if at capacity, remove first element (LRU); then insert at back.',
            'A production impl uses a doubly linked list for O(1), but an array works for interviews.',
        ],
        concepts: ['LRU Cache', 'Dictionary + order tracking', 'Eviction policy', 'Cache design patterns'],
        timeComplexity: 'O(n) array removal — O(1) with linked list',
        spaceComplexity: 'O(capacity)',
    },
];
