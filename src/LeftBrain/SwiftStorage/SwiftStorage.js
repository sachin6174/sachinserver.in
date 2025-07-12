import React from "react";
import "../shared-styles.css";
import "./SwiftStorage.css";

const SwiftStorage = () => {
    const storageSolutions = [
        {
            name: "Core Data",
            description: "Apple's object graph and persistence framework with automatic change tracking and iCloud sync.",
            icon: "🗄️",
            features: ["Object-Relational Mapping", "Automatic Change Tracking", "iCloud Sync", "Migration Support"]
        },
        {
            name: "SQLite",
            description: "Lightweight, embedded SQL database engine for complex queries and relationships.",
            icon: "🔗",
            features: ["SQL Queries", "ACID Transactions", "Foreign Keys", "Triggers & Views"]
        },
        {
            name: "UserDefaults",
            description: "Simple key-value storage for user preferences and small configuration data.",
            icon: "⚙️",
            features: ["Key-Value Storage", "Type Safety", "Automatic Synchronization", "Property Wrappers"]
        },
        {
            name: "Keychain",
            description: "Secure storage for sensitive data like passwords, tokens, and cryptographic keys.",
            icon: "🔐",
            features: ["Encrypted Storage", "Biometric Access", "Cross-App Sharing", "Secure Enclave"]
        }
    ];

    const persistenceOptions = [
        {
            name: "SwiftData (iOS 17+)",
            icon: "📊",
            description: "Modern declarative data persistence framework",
            pros: ["SwiftUI integration", "Type-safe queries", "Automatic relationships"],
            cons: ["iOS 17+ requirement", "Limited migration tools"],
            use: "New projects targeting latest iOS"
        },
        {
            name: "Core Data",
            icon: "🗄️", 
            description: "Mature object graph management framework",
            pros: ["Feature-rich", "iCloud sync", "Proven stability"],
            cons: ["Learning curve", "Complex setup", "Threading complexity"],
            use: "Complex data models with relationships"
        },
        {
            name: "SQLite + FMDB/SQLite.swift",
            icon: "🔗",
            description: "Direct SQL database access with Swift wrappers",
            pros: ["Full SQL control", "High performance", "Cross-platform"],
            cons: ["Manual relationship management", "More boilerplate"],
            use: "High-performance apps with complex queries"
        },
        {
            name: "File-based Storage",
            icon: "📁",
            description: "Direct file system access for custom formats",
            pros: ["Full control", "Simple implementation", "No frameworks"],
            cons: ["Manual management", "No automatic features", "Error-prone"],
            use: "Simple data structures or custom formats"
        }
    ];

    const codeExamples = [
        {
            title: "Core Data - Complete Implementation",
            code: `import CoreData
import UIKit

// MARK: - Core Data Model
@objc(User)
public class User: NSManagedObject {
    @NSManaged public var id: UUID
    @NSManaged public var name: String
    @NSManaged public var email: String
    @NSManaged public var createdAt: Date
    @NSManaged public var posts: NSSet?
}

@objc(Post)
public class Post: NSManagedObject {
    @NSManaged public var id: UUID
    @NSManaged public var title: String
    @NSManaged public var content: String
    @NSManaged public var publishedAt: Date
    @NSManaged public var author: User?
}

// MARK: - Core Data Stack
class CoreDataStack {
    static let shared = CoreDataStack()
    
    private init() {}
    
    lazy var persistentContainer: NSPersistentContainer = {
        let container = NSPersistentContainer(name: "DataModel")
        container.loadPersistentStores { _, error in
            if let error = error {
                fatalError("Core Data error: \\(error)")
            }
        }
        container.viewContext.automaticallyMergesChangesFromParent = true
        return container
    }()
    
    var context: NSManagedObjectContext {
        return persistentContainer.viewContext
    }
    
    func save() {
        guard context.hasChanges else { return }
        
        do {
            try context.save()
        } catch {
            print("Save error: \\(error)")
        }
    }
    
    // Background context for heavy operations
    func performBackgroundTask(_ block: @escaping (NSManagedObjectContext) -> Void) {
        persistentContainer.performBackgroundTask(block)
    }
}

// MARK: - Repository Pattern
protocol UserRepositoryProtocol {
    func createUser(name: String, email: String) -> User
    func fetchAllUsers() -> [User]
    func fetchUser(by id: UUID) -> User?
    func deleteUser(_ user: User)
}

class CoreDataUserRepository: UserRepositoryProtocol {
    private let context = CoreDataStack.shared.context
    
    func createUser(name: String, email: String) -> User {
        let user = User(context: context)
        user.id = UUID()
        user.name = name
        user.email = email
        user.createdAt = Date()
        
        CoreDataStack.shared.save()
        return user
    }
    
    func fetchAllUsers() -> [User] {
        let request: NSFetchRequest<User> = User.fetchRequest()
        request.sortDescriptors = [NSSortDescriptor(keyPath: \\User.name, ascending: true)]
        
        do {
            return try context.fetch(request)
        } catch {
            print("Fetch error: \\(error)")
            return []
        }
    }
    
    func fetchUser(by id: UUID) -> User? {
        let request: NSFetchRequest<User> = User.fetchRequest()
        request.predicate = NSPredicate(format: "id == %@", id as CVarArg)
        request.fetchLimit = 1
        
        do {
            return try context.fetch(request).first
        } catch {
            print("Fetch error: \\(error)")
            return nil
        }
    }
    
    func deleteUser(_ user: User) {
        context.delete(user)
        CoreDataStack.shared.save()
    }
}

// MARK: - Advanced Queries
extension CoreDataUserRepository {
    func fetchUsers(createdAfter date: Date) -> [User] {
        let request: NSFetchRequest<User> = User.fetchRequest()
        request.predicate = NSPredicate(format: "createdAt > %@", date as NSDate)
        
        do {
            return try context.fetch(request)
        } catch {
            print("Fetch error: \\(error)")
            return []
        }
    }
    
    func fetchUsersWithPosts() -> [User] {
        let request: NSFetchRequest<User> = User.fetchRequest()
        request.predicate = NSPredicate(format: "posts.@count > 0")
        request.relationshipKeyPathsForPrefetching = ["posts"]
        
        do {
            return try context.fetch(request)
        } catch {
            print("Fetch error: \\(error)")
            return []
        }
    }
}`
        },
        {
            title: "SwiftData - Modern Data Persistence (iOS 17+)",
            code: `import SwiftData
import SwiftUI

// MARK: - SwiftData Models
@Model
final class User {
    @Attribute(.unique) var id: UUID
    var name: String
    var email: String
    var createdAt: Date
    
    @Relationship(deleteRule: .cascade, inverse: \\Post.author)
    var posts: [Post] = []
    
    init(name: String, email: String) {
        self.id = UUID()
        self.name = name
        self.email = email
        self.createdAt = Date()
    }
}

@Model
final class Post {
    @Attribute(.unique) var id: UUID
    var title: String
    var content: String
    var publishedAt: Date
    
    var author: User?
    
    init(title: String, content: String, author: User) {
        self.id = UUID()
        self.title = title
        self.content = content
        self.publishedAt = Date()
        self.author = author
    }
}

// MARK: - SwiftUI Integration
struct ContentView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query private var users: [User]
    @Query(sort: \\Post.publishedAt, order: .reverse) private var recentPosts: [Post]
    
    @State private var showingAddUser = false
    
    var body: some View {
        NavigationView {
            List {
                Section("Users") {
                    ForEach(users) { user in
                        UserRowView(user: user)
                    }
                    .onDelete(perform: deleteUsers)
                }
                
                Section("Recent Posts") {
                    ForEach(recentPosts.prefix(5)) { post in
                        PostRowView(post: post)
                    }
                }
            }
            .navigationTitle("SwiftData Demo")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Add User") {
                        showingAddUser = true
                    }
                }
            }
            .sheet(isPresented: $showingAddUser) {
                AddUserView()
            }
        }
    }
    
    func deleteUsers(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(users[index])
            }
        }
    }
}

struct AddUserView: View {
    @Environment(\\.modelContext) private var modelContext
    @Environment(\\.dismiss) private var dismiss
    
    @State private var name = ""
    @State private var email = ""
    
    var body: some View {
        NavigationView {
            Form {
                TextField("Name", text: $name)
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
            }
            .navigationTitle("Add User")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Save") {
                        let user = User(name: name, email: email)
                        modelContext.insert(user)
                        dismiss()
                    }
                    .disabled(name.isEmpty || email.isEmpty)
                }
            }
        }
    }
}

// MARK: - Advanced Queries with @Query
struct UsersWithPostsView: View {
    @Query(filter: #Predicate<User> { user in
        !user.posts.isEmpty
    }) private var usersWithPosts: [User]
    
    @Query(
        filter: #Predicate<Post> { post in
            post.publishedAt > Calendar.current.date(byAdding: .day, value: -7, to: Date())!
        },
        sort: \\Post.publishedAt,
        order: .reverse
    ) private var recentPosts: [Post]
    
    var body: some View {
        List {
            Section("Active Users") {
                ForEach(usersWithPosts) { user in
                    Text("\\(user.name) - \\(user.posts.count) posts")
                }
            }
            
            Section("This Week's Posts") {
                ForEach(recentPosts) { post in
                    VStack(alignment: .leading) {
                        Text(post.title).font(.headline)
                        Text(post.author?.name ?? "Unknown")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
            }
        }
    }
}`
        },
        {
            title: "File System & UserDefaults Management",
            code: `import Foundation

// MARK: - File Manager Utilities
class FileSystemManager {
    static let shared = FileSystemManager()
    private init() {}
    
    // Document directory for user files
    var documentsDirectory: URL {
        FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    }
    
    // Caches directory for temporary files
    var cachesDirectory: URL {
        FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
    }
    
    // Application Support for app data
    var applicationSupportDirectory: URL {
        let url = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        let appURL = url.appendingPathComponent(Bundle.main.bundleIdentifier!)
        
        // Create directory if it doesn't exist
        try? FileManager.default.createDirectory(at: appURL, withIntermediateDirectories: true)
        return appURL
    }
    
    func save<T: Codable>(_ object: T, to fileName: String, in directory: URL = FileSystemManager.shared.documentsDirectory) throws {
        let url = directory.appendingPathComponent(fileName)
        let data = try JSONEncoder().encode(object)
        try data.write(to: url)
    }
    
    func load<T: Codable>(_ type: T.Type, from fileName: String, in directory: URL = FileSystemManager.shared.documentsDirectory) throws -> T {
        let url = directory.appendingPathComponent(fileName)
        let data = try Data(contentsOf: url)
        return try JSONDecoder().decode(type, from: data)
    }
    
    func delete(fileName: String, in directory: URL = FileSystemManager.shared.documentsDirectory) throws {
        let url = directory.appendingPathComponent(fileName)
        try FileManager.default.removeItem(at: url)
    }
    
    func fileExists(fileName: String, in directory: URL = FileSystemManager.shared.documentsDirectory) -> Bool {
        let url = directory.appendingPathComponent(fileName)
        return FileManager.default.fileExists(atPath: url.path)
    }
}

// MARK: - UserDefaults with Property Wrappers
@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T
    
    var wrappedValue: T {
        get {
            UserDefaults.standard.object(forKey: key) as? T ?? defaultValue
        }
        set {
            UserDefaults.standard.set(newValue, forKey: key)
        }
    }
}

@propertyWrapper
struct UserDefaultOptional<T> {
    let key: String
    
    var wrappedValue: T? {
        get {
            UserDefaults.standard.object(forKey: key) as? T
        }
        set {
            UserDefaults.standard.set(newValue, forKey: key)
        }
    }
}

// MARK: - Settings Manager
class SettingsManager: ObservableObject {
    static let shared = SettingsManager()
    private init() {}
    
    @UserDefault(key: "user_name", defaultValue: "")
    var userName: String
    
    @UserDefault(key: "is_dark_mode", defaultValue: false)
    var isDarkMode: Bool
    
    @UserDefault(key: "notification_enabled", defaultValue: true)
    var notificationsEnabled: Bool
    
    @UserDefault(key: "app_launch_count", defaultValue: 0)
    var appLaunchCount: Int
    
    @UserDefaultOptional(key: "last_sync_date")
    var lastSyncDate: Date?
    
    // Complex object storage
    @UserDefault(key: "user_preferences", defaultValue: UserPreferences())
    var userPreferences: UserPreferences
    
    func incrementLaunchCount() {
        appLaunchCount += 1
    }
    
    func updateSyncDate() {
        lastSyncDate = Date()
    }
}

struct UserPreferences: Codable {
    var theme: String = "system"
    var language: String = "en"
    var fontSize: Double = 16.0
    var autoSave: Bool = true
}

// MARK: - Keychain Manager for Secure Storage
import Security

class KeychainManager {
    static let shared = KeychainManager()
    private init() {}
    
    func save(_ data: Data, for key: String) -> Bool {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]
        
        // Delete existing item first
        SecItemDelete(query as CFDictionary)
        
        // Add new item
        let status = SecItemAdd(query as CFDictionary, nil)
        return status == errSecSuccess
    }
    
    func load(for key: String) -> Data? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        
        return status == errSecSuccess ? result as? Data : nil
    }
    
    func delete(for key: String) -> Bool {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key
        ]
        
        let status = SecItemDelete(query as CFDictionary)
        return status == errSecSuccess
    }
    
    // Convenience methods for strings
    func saveString(_ string: String, for key: String) -> Bool {
        guard let data = string.data(using: .utf8) else { return false }
        return save(data, for: key)
    }
    
    func loadString(for key: String) -> String? {
        guard let data = load(for: key) else { return nil }
        return String(data: data, encoding: .utf8)
    }
}

// MARK: - Usage Examples
struct StorageExamples {
    func demonstrateStorage() {
        // UserDefaults example
        let settings = SettingsManager.shared
        settings.userName = "John Doe"
        settings.isDarkMode = true
        settings.incrementLaunchCount()
        
        // File system example
        let user = User(name: "Jane", email: "jane@example.com")
        do {
            try FileSystemManager.shared.save(user, to: "current_user.json")
            let loadedUser = try FileSystemManager.shared.load(User.self, from: "current_user.json")
            print("Loaded user: \\(loadedUser.name)")
        } catch {
            print("File operation failed: \\(error)")
        }
        
        // Keychain example
        let token = "secret_auth_token_12345"
        if KeychainManager.shared.saveString(token, for: "auth_token") {
            if let retrievedToken = KeychainManager.shared.loadString(for: "auth_token") {
                print("Retrieved token: \\(retrievedToken)")
            }
        }
    }
}`
        }
    ];

    const performanceMetrics = [
        { name: "Core Data", read: "High", write: "Medium", memory: "Low", use: "Complex relationships" },
        { name: "SQLite", read: "Very High", write: "High", memory: "Very Low", use: "Performance critical" },
        { name: "UserDefaults", read: "Medium", write: "Medium", memory: "Medium", use: "Settings & preferences" },
        { name: "File System", read: "High", write: "High", memory: "Variable", use: "Large data sets" },
        { name: "Keychain", read: "Low", write: "Low", memory: "Very Low", use: "Sensitive data" }
    ];

    const dataMigrationSteps = [
        {
            step: "Version Detection",
            description: "Check current data model version and compare with app requirements",
            code: "Implement version checking logic"
        },
        {
            step: "Backup Creation",
            description: "Create backup of existing data before migration starts",
            code: "Copy existing database/files to backup location"
        },
        {
            step: "Schema Migration",
            description: "Update database schema or data structure to new format",
            code: "Run migration scripts or Core Data mapping models"
        },
        {
            step: "Data Transformation",
            description: "Transform existing data to match new schema requirements",
            code: "Convert data types, merge fields, split entities"
        },
        {
            step: "Validation",
            description: "Verify migration completed successfully and data integrity",
            code: "Run validation queries and integrity checks"
        },
        {
            step: "Cleanup",
            description: "Remove old data formats and temporary migration files",
            code: "Delete old schema versions and migration artifacts"
        }
    ];

    const storagePatterns = [
        {
            name: "Repository Pattern",
            description: "Abstract data access layer for testability",
            use: "Clean architecture and unit testing"
        },
        {
            name: "Data Access Object (DAO)",
            description: "Encapsulate database operations in dedicated objects",
            use: "Separation of concerns"
        },
        {
            name: "Active Record",
            description: "Objects handle their own persistence operations",
            use: "Simple CRUD operations"
        },
        {
            name: "Unit of Work",
            description: "Track changes and commit them as a single transaction",
            use: "Complex business operations"
        },
        {
            name: "Lazy Loading",
            description: "Load related data only when needed",
            use: "Memory optimization"
        },
        {
            name: "Caching Strategy",
            description: "Store frequently accessed data in memory",
            use: "Performance optimization"
        }
    ];

    const syncStrategies = [
        {
            name: "CloudKit Sync",
            description: "Apple's native cloud synchronization service",
            pros: ["Native integration", "Automatic conflict resolution", "Privacy focused"],
            cons: ["Apple ecosystem only", "Limited customization"]
        },
        {
            name: "Custom REST API",
            description: "Custom backend with RESTful API endpoints",
            pros: ["Full control", "Cross-platform", "Custom business logic"],
            cons: ["Development overhead", "Infrastructure management"]
        },
        {
            name: "Firebase/Backend-as-a-Service",
            description: "Third-party cloud backend services",
            pros: ["Quick setup", "Real-time updates", "Built-in features"],
            cons: ["Vendor lock-in", "Pricing concerns", "Limited customization"]
        }
    ];

    const optimizationTips = [
        "Use batch operations for multiple database changes",
        "Implement pagination for large data sets",
        "Cache frequently accessed data in memory",
        "Use background queues for heavy data operations",
        "Implement lazy loading for related entities",
        "Optimize Core Data fetch requests with predicates",
        "Use NSFetchedResultsController for table views",
        "Implement proper indexing for database queries",
        "Monitor memory usage with Instruments",
        "Use SQLite ANALYZE for query optimization"
    ];

    const skills = [
        { name: "Core Data", level: 90 },
        { name: "SQLite", level: 85 },
        { name: "File System", level: 88 },
        { name: "UserDefaults", level: 95 },
        { name: "Keychain Services", level: 82 },
        { name: "CloudKit", level: 78 },
        { name: "Data Migration", level: 85 },
        { name: "Performance Optimization", level: 87 }
    ];

    const securityBestPractices = [
        "Use Keychain for storing sensitive data like passwords and tokens",
        "Implement data encryption for sensitive files stored locally",
        "Validate and sanitize all data before storage operations",
        "Use App Transport Security (ATS) for network communications",
        "Implement proper access controls and user authentication",
        "Regularly audit and rotate security keys and certificates",
        "Use biometric authentication for accessing sensitive data",
        "Implement secure backup and recovery procedures"
    ];

    return (
        <div className="leftbrain-container swift-storage-section">
            {/* Header Section */}
            <div className="hero-section">
                <h1 className="section-title">Swift Storage Solutions</h1>
                <p>Comprehensive data persistence, file management, and storage optimization for iOS applications</p>
                <div className="tech-stack">
                    <span className="storage-type-badge">Core Data</span>
                    <span className="storage-type-badge">SwiftData</span>
                    <span className="storage-type-badge">SQLite</span>
                    <span className="storage-type-badge">CloudKit</span>
                </div>
            </div>

            {/* Storage Solutions */}
            <div className="cards-container">
                {storageSolutions.map((solution, index) => (
                    <div key={index} className="leftbrain-card storage-solution-card">
                        <div className="tech-icon">{solution.icon}</div>
                        <h3>{solution.name}</h3>
                        <p>{solution.description}</p>
                        <div className="tech-stack">
                            {solution.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Persistence Options Comparison */}
            <div className="section">
                <h2>Data Persistence Options</h2>
                <div className="data-persistence-comparison">
                    {persistenceOptions.map((option, index) => (
                        <div key={index} className="persistence-option">
                            <h4>{option.icon} {option.name}</h4>
                            <p>{option.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <div><strong>✅ Pros:</strong></div>
                                <ul>
                                    {option.pros.map((pro, idx) => (
                                        <li key={idx}>{pro}</li>
                                    ))}
                                </ul>
                                <div><strong>⚠️ Cons:</strong></div>
                                <ul>
                                    {option.cons.map((con, idx) => (
                                        <li key={idx}>{con}</li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    <strong>Best for:</strong> {option.use}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Core Data Stack */}
            <div className="core-data-stack">
                <h4>🗄️ Core Data Architecture</h4>
                <p>Understanding the Core Data stack components and their relationships:</p>
                <ul>
                    <li><strong>NSPersistentContainer:</strong> Manages the entire Core Data stack</li>
                    <li><strong>NSManagedObjectContext:</strong> Scratch pad for working with managed objects</li>
                    <li><strong>NSPersistentStoreCoordinator:</strong> Mediates between contexts and stores</li>
                    <li><strong>NSManagedObjectModel:</strong> Describes the data model structure</li>
                    <li><strong>NSPersistentStore:</strong> Maps between data store and coordinator</li>
                </ul>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>Storage Implementation Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="swift-storage-code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Performance Comparison */}
            <div className="section">
                <h2>Storage Performance Comparison</h2>
                <div className="storage-performance-grid">
                    {performanceMetrics.map((metric, index) => (
                        <div key={index} className="performance-metric">
                            <h5>{metric.name}</h5>
                            <div>Read: <span className="metric-value">{metric.read}</span></div>
                            <div>Write: <span className="metric-value">{metric.write}</span></div>
                            <div>Memory: <span className="metric-value">{metric.memory}</span></div>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {metric.use}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* File System Hierarchy */}
            <div className="file-system-hierarchy">
                <h4>📁 iOS App File System Structure</h4>
                <pre>{`App Sandbox/
├── Bundle/ (Read-only)
│   ├── Info.plist
│   ├── Assets/
│   └── Main.storyboard
│
├── Documents/ (User data, backed up)
│   ├── user_files.json
│   └── exported_data.pdf
│
├── Library/
│   ├── Caches/ (Temporary, not backed up)
│   │   ├── images/
│   │   └── network_cache/
│   │
│   ├── Application Support/ (App data, backed up)
│   │   ├── database.sqlite
│   │   └── settings.plist
│   │
│   └── Preferences/ (UserDefaults)
│       └── com.company.app.plist
│
└── tmp/ (Temporary, auto-purged)
    ├── temp_image.jpg
    └── processing_data.tmp`}</pre>
            </div>

            {/* Storage Patterns */}
            <div className="section">
                <h2>Storage Design Patterns</h2>
                <div className="storage-patterns-grid">
                    {storagePatterns.map((pattern, index) => (
                        <div key={index} className="storage-pattern-card">
                            <h5>{pattern.name}</h5>
                            <p>{pattern.description}</p>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <strong>Use case:</strong> {pattern.use}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Data Migration Process */}
            <div className="section">
                <h2>Data Migration Strategy</h2>
                <div className="data-migration-timeline">
                    {dataMigrationSteps.map((step, index) => (
                        <div key={index} className="migration-step">
                            <h4>Step {index + 1}: {step.step}</h4>
                            <p>{step.description}</p>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <strong>Implementation:</strong> {step.code}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cloud Sync Strategies */}
            <div className="section">
                <h2>Cloud Synchronization Strategies</h2>
                <div className="sync-strategies">
                    {syncStrategies.map((strategy, index) => (
                        <div key={index} className="sync-strategy-card">
                            <h5>{strategy.name}</h5>
                            <p>{strategy.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <div><strong>✅ Pros:</strong></div>
                                <ul>
                                    {strategy.pros.map((pro, idx) => (
                                        <li key={idx}>{pro}</li>
                                    ))}
                                </ul>
                                <div><strong>⚠️ Cons:</strong></div>
                                <ul>
                                    {strategy.cons.map((con, idx) => (
                                        <li key={idx}>{con}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* iCloud Integration */}
            <div className="icloud-integration">
                <h4>☁️ iCloud Integration Best Practices</h4>
                <ul>
                    <li>Enable CloudKit capability in your app's entitlements</li>
                    <li>Use NSUbiquitousKeyValueStore for small settings sync</li>
                    <li>Implement CloudKit for custom data synchronization</li>
                    <li>Handle iCloud account status changes gracefully</li>
                    <li>Provide offline functionality when iCloud is unavailable</li>
                    <li>Use NSMetadataQuery to monitor iCloud document status</li>
                    <li>Implement conflict resolution for concurrent edits</li>
                    <li>Test with multiple devices and iCloud account scenarios</li>
                </ul>
            </div>

            {/* Security Best Practices */}
            <div className="storage-security">
                <h4>🔐 Storage Security Best Practices</h4>
                <ul>
                    {securityBestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>

            {/* Data Backup & Recovery */}
            <div className="data-backup-recovery">
                <h4>💾 Backup & Recovery Strategy</h4>
                <ul>
                    <li><strong>iCloud Backup:</strong> Documents and Application Support folders</li>
                    <li><strong>iTunes Backup:</strong> App data excluding Caches directory</li>
                    <li><strong>Manual Export:</strong> User-initiated data export functionality</li>
                    <li><strong>Recovery Testing:</strong> Regular verification of backup integrity</li>
                    <li><strong>Version Control:</strong> Track data schema versions for migration</li>
                    <li><strong>Incremental Backups:</strong> Only backup changed data to minimize overhead</li>
                </ul>
            </div>

            {/* Storage Architecture */}
            <div className="storage-architecture-diagram">
                <h4>🏗️ Storage Architecture Layers</h4>
                <div className="architecture-layers">
                    <div className="architecture-layer app-layer">
                        <strong>Application Layer</strong><br/>
                        ViewModels, Business Logic, UI Components
                    </div>
                    <div className="architecture-layer framework-layer">
                        <strong>Storage Framework Layer</strong><br/>
                        Repository Pattern, Data Access Objects, Caching
                    </div>
                    <div className="architecture-layer system-layer">
                        <strong>System Storage Layer</strong><br/>
                        Core Data, SQLite, File System, Keychain, UserDefaults
                    </div>
                </div>
            </div>

            {/* Optimization Tips */}
            <div className="storage-optimization-tips">
                <h4>⚡ Storage Performance Optimization</h4>
                <div className="optimization-checklist">
                    {optimizationTips.map((tip, index) => (
                        <div key={index} className="optimization-item">
                            <span className="optimization-check">✓</span>
                            <span>{tip}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Storage Development Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #7C3AED, #8B5CF6)',
                                        height: '100%',
                                        borderRadius: 'inherit'
                                    }}
                                ></div>
                            </div>
                            <span>{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SwiftStorage;