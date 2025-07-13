import React from "react";
import "../shared-styles.css";
import "./SwiftTesting.css";

const SwiftTesting = () => {
    const testingFrameworks = [
        {
            name: "XCTest",
            description: "Apple's built-in testing framework for unit tests, performance tests, and UI tests.",
            icon: "🧪",
            features: ["Unit Testing", "Performance Testing", "UI Testing", "Test Expectations"]
        },
        {
            name: "Swift Testing",
            description: "Modern testing framework introduced in Swift 5.9 with improved syntax and capabilities.",
            icon: "⚡",
            features: ["Parameterized Tests", "Async Testing", "Better Assertions", "Trait System"]
        },
        {
            name: "Quick & Nimble",
            description: "BDD-style testing framework with expressive matchers and readable test descriptions.",
            icon: "🎯",
            features: ["BDD Syntax", "Expressive Matchers", "Shared Examples", "Async Expectations"]
        },
        {
            name: "Snapshot Testing",
            description: "Visual regression testing to ensure UI components render consistently.",
            icon: "📸",
            features: ["UI Snapshots", "Regression Testing", "Multiple Devices", "Accessibility Testing"]
        }
    ];

    const testingTypes = [
        {
            type: "Unit Tests",
            description: "Test individual components in isolation",
            icon: "🔬",
            examples: ["Model validation", "Business logic", "Utility functions", "Data transformations"]
        },
        {
            type: "Integration Tests", 
            description: "Test component interactions and data flow",
            icon: "🔗",
            examples: ["API integration", "Database operations", "Service communication", "Module interactions"]
        },
        {
            type: "UI Tests",
            description: "Test user interface behavior and interactions",
            icon: "📱",
            examples: ["User flows", "Screen navigation", "Button interactions", "Form validation"]
        },
        {
            type: "Performance Tests",
            description: "Measure and validate app performance",
            icon: "⚡",
            examples: ["Method execution time", "Memory usage", "CPU performance", "Network latency"]
        }
    ];

    const codeExamples = [
        {
            title: "XCTest Unit Testing",
            code: `import XCTest
@testable import MyApp

class UserValidatorTests: XCTestCase {
    
    var validator: UserValidator!
    
    override func setUp() {
        super.setUp()
        validator = UserValidator()
    }
    
    override func tearDown() {
        validator = nil
        super.tearDown()
    }
    
    func testValidEmail() {
        // Given
        let email = "user@example.com"
        
        // When
        let result = validator.isValidEmail(email)
        
        // Then
        XCTAssertTrue(result, "Valid email should return true")
    }
    
    func testInvalidEmail() {
        // Given
        let invalidEmails = ["invalid", "@example.com", "user@", ""]
        
        // When & Then
        for email in invalidEmails {
            XCTAssertFalse(validator.isValidEmail(email), 
                          "Invalid email '\\(email)' should return false")
        }
    }
    
    func testPasswordStrength() {
        // Given
        let weakPassword = "123"
        let strongPassword = "StrongPass123!"
        
        // When
        let weakResult = validator.passwordStrength(weakPassword)
        let strongResult = validator.passwordStrength(strongPassword)
        
        // Then
        XCTAssertEqual(weakResult, .weak)
        XCTAssertEqual(strongResult, .strong)
    }
}`
        },
        {
            title: "Modern Swift Testing Framework",
            code: `import Testing
@testable import MyApp

struct UserValidatorTests {
    
    let validator = UserValidator()
    
    @Test("Valid email formats should pass validation")
    func validEmail() {
        let email = "user@example.com"
        #expect(validator.isValidEmail(email))
    }
    
    @Test("Invalid email formats should fail validation", 
          arguments: ["invalid", "@example.com", "user@", ""])
    func invalidEmail(email: String) {
        #expect(!validator.isValidEmail(email))
    }
    
    @Test("Password strength evaluation")
    func passwordStrength() async throws {
        let testCases = [
            ("123", PasswordStrength.weak),
            ("password", PasswordStrength.medium),
            ("StrongPass123!", PasswordStrength.strong)
        ]
        
        for (password, expectedStrength) in testCases {
            let result = await validator.evaluatePassword(password)
            #expect(result == expectedStrength)
        }
    }
    
    @Test("User creation with valid data")
    func createUser() throws {
        let userData = UserData(
            name: "John Doe",
            email: "john@example.com",
            age: 25
        )
        
        let user = try validator.createUser(from: userData)
        
        #expect(user.name == "John Doe")
        #expect(user.email == "john@example.com")
        #expect(user.age == 25)
    }
}`
        },
        {
            title: "Async Testing with Expectations",
            code: `import XCTest
@testable import MyApp

class NetworkManagerTests: XCTestCase {
    
    var networkManager: NetworkManager!
    
    override func setUp() {
        super.setUp()
        networkManager = NetworkManager()
    }
    
    func testFetchUserData() async throws {
        // Given
        let userID = "123"
        
        // When
        let user = try await networkManager.fetchUser(id: userID)
        
        // Then
        XCTAssertEqual(user.id, userID)
        XCTAssertFalse(user.name.isEmpty)
    }
    
    func testNetworkError() async {
        // Given
        let invalidURL = "invalid-url"
        
        // When & Then
        do {
            _ = try await networkManager.fetchData(from: invalidURL)
            XCTFail("Should have thrown an error")
        } catch {
            XCTAssertTrue(error is NetworkError)
        }
    }
    
    func testConcurrentRequests() async throws {
        // Given
        let userIDs = ["1", "2", "3", "4", "5"]
        
        // When
        let users = try await withThrowingTaskGroup(of: User.self) { group in
            for id in userIDs {
                group.addTask {
                    try await self.networkManager.fetchUser(id: id)
                }
            }
            
            var results: [User] = []
            for try await user in group {
                results.append(user)
            }
            return results
        }
        
        // Then
        XCTAssertEqual(users.count, userIDs.count)
    }
    
    func testTimeout() {
        // Given
        let expectation = expectation(description: "Network timeout")
        
        // When
        networkManager.fetchUserWithCallback(id: "123") { result in
            switch result {
            case .success:
                XCTFail("Should not succeed")
            case .failure(let error):
                XCTAssertTrue(error is TimeoutError)
                expectation.fulfill()
            }
        }
        
        // Then
        wait(for: [expectation], timeout: 5.0)
    }
}`
        },
        {
            title: "UI Testing with XCUITest",
            code: `import XCTest

class LoginUITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()
    }
    
    func testSuccessfulLogin() {
        // Given - Navigate to login screen
        let loginButton = app.buttons["Get Started"]
        XCTAssertTrue(loginButton.exists)
        loginButton.tap()
        
        // When - Enter valid credentials
        let emailField = app.textFields["Email"]
        let passwordField = app.secureTextFields["Password"]
        let submitButton = app.buttons["Sign In"]
        
        XCTAssertTrue(emailField.exists)
        XCTAssertTrue(passwordField.exists)
        
        emailField.tap()
        emailField.typeText("test@example.com")
        
        passwordField.tap()
        passwordField.typeText("password123")
        
        submitButton.tap()
        
        // Then - Verify successful login
        let welcomeText = app.staticTexts["Welcome back!"]
        XCTAssertTrue(welcomeText.waitForExistence(timeout: 5))
    }
    
    func testInvalidLoginCredentials() {
        // Navigate to login
        app.buttons["Get Started"].tap()
        
        // Enter invalid credentials
        let emailField = app.textFields["Email"]
        let passwordField = app.secureTextFields["Password"]
        
        emailField.tap()
        emailField.typeText("invalid@email")
        
        passwordField.tap()
        passwordField.typeText("123")
        
        app.buttons["Sign In"].tap()
        
        // Verify error message
        let errorAlert = app.alerts["Error"]
        XCTAssertTrue(errorAlert.waitForExistence(timeout: 3))
        
        let errorMessage = errorAlert.staticTexts["Invalid credentials"]
        XCTAssertTrue(errorMessage.exists)
        
        errorAlert.buttons["OK"].tap()
    }
    
    func testAccessibility() {
        // Test accessibility labels and hints
        let loginButton = app.buttons["Get Started"]
        XCTAssertEqual(loginButton.label, "Get Started")
        
        loginButton.tap()
        
        let emailField = app.textFields["Email"]
        XCTAssertEqual(emailField.placeholderValue, "Enter your email")
        
        let passwordField = app.secureTextFields["Password"]
        XCTAssertEqual(passwordField.placeholderValue, "Enter your password")
    }
}`
        }
    ];

    const testingBestPractices = [
        "Write tests before or alongside your code (TDD/BDD)",
        "Keep tests small, focused, and independent",
        "Use descriptive test names that explain the scenario",
        "Follow the Arrange-Act-Assert (AAA) pattern",
        "Mock external dependencies to isolate units under test",
        "Test both happy paths and edge cases",
        "Maintain good test coverage but focus on critical paths",
        "Use continuous integration to run tests automatically",
        "Keep tests fast and deterministic",
        "Regular refactoring of test code to maintain quality"
    ];

    const testingTools = [
        { name: "Xcode Test Navigator", description: "Built-in test management and execution", icon: "🧭" },
        { name: "Code Coverage", description: "Measure test coverage in Xcode", icon: "📊" },
        { name: "Test Plans", description: "Organize and configure test suites", icon: "📋" },
        { name: "Continuous Integration", description: "Automated testing with Xcode Cloud/GitHub Actions", icon: "🔄" },
        { name: "Device Testing", description: "Test on simulators and physical devices", icon: "📱" },
        { name: "Performance Testing", description: "Measure and track performance metrics", icon: "⚡" }
    ];

    const skills = [
        { name: "XCTest Framework", level: 92 },
        { name: "Unit Testing", level: 90 },
        { name: "UI Testing", level: 85 },
        { name: "Async Testing", level: 88 },
        { name: "Mock & Stub Creation", level: 87 },
        { name: "Test-Driven Development", level: 83 },
        { name: "Performance Testing", level: 80 },
        { name: "Snapshot Testing", level: 78 }
    ];

    return (
        <div className="leftbrain-container swift-testing-theme">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Swift Testing</h1>
                <p>Comprehensive testing strategies and frameworks for reliable Swift applications</p>
            </div>

            {/* Testing Frameworks */}
            <div className="cards-container">
                {testingFrameworks.map((framework, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{framework.icon}</div>
                        <h3>{framework.name}</h3>
                        <p>{framework.description}</p>
                        <div className="tech-stack">
                            {framework.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Testing Types */}
            <div className="section">
                <h2>Types of Testing</h2>
                <div className="grid-2">
                    {testingTypes.map((type, index) => (
                        <div key={index} className="content-card">
                            <div className="tech-icon">{type.icon}</div>
                            <h4>{type.type}</h4>
                            <p>{type.description}</p>
                            <ul>
                                {type.examples.map((example, idx) => (
                                    <li key={idx}>{example}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>Testing Code Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Testing Tools */}
            <div className="section">
                <h2>Testing Tools & Environment</h2>
                <div className="highlight-section">
                    {testingTools.map((tool, index) => (
                        <div key={index} className="interactive-card">
                            <div className="tech-icon">{tool.icon}</div>
                            <h4>{tool.name}</h4>
                            <p>{tool.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Swift Testing Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, var(--current-theme), var(--current-theme-dark))',
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

            {/* Best Practices */}
            <div className="section">
                <h2>Testing Best Practices</h2>
                <ul className="feature-list">
                    {testingBestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SwiftTesting;