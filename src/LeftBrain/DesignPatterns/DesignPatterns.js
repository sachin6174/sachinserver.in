import React from "react";
import "../shared-styles.css";
import "./DesignPatterns.css";

const DesignPatterns = () => {
    const patternCategories = [
        {
            name: "Creational Patterns",
            description: "Patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.",
            icon: "🏗️",
            patterns: ["Singleton", "Factory Method", "Abstract Factory", "Builder", "Prototype"]
        },
        {
            name: "Structural Patterns",
            description: "Patterns that deal with object composition and typically identify simple ways to realize relationships between entities.",
            icon: "🏛️",
            patterns: ["Adapter", "Bridge", "Composite", "Decorator", "Facade", "Flyweight", "Proxy"]
        },
        {
            name: "Behavioral Patterns",
            description: "Patterns that focus on communication between objects and the assignment of responsibilities between objects.",
            icon: "🔄",
            patterns: ["Observer", "Strategy", "Command", "State", "Template Method", "Visitor", "Chain of Responsibility"]
        }
    ];

    const architecturalPatterns = [
        {
            name: "Model-View-Controller (MVC)",
            description: "Separates application logic into three interconnected components",
            use: "Web applications, desktop applications",
            benefits: ["Separation of concerns", "Testability", "Reusability"]
        },
        {
            name: "Model-View-ViewModel (MVVM)",
            description: "Binds the view to the view model using data binding",
            use: "WPF, Angular, Vue.js applications",
            benefits: ["Data binding", "Testable view logic", "Designer-developer workflow"]
        },
        {
            name: "Microservices Architecture",
            description: "Structures application as a collection of loosely coupled services",
            use: "Large-scale distributed systems",
            benefits: ["Scalability", "Technology diversity", "Fault isolation"]
        },
        {
            name: "Layered Architecture",
            description: "Organizes code into horizontal layers with specific responsibilities",
            use: "Enterprise applications",
            benefits: ["Separation of concerns", "Maintainability", "Team organization"]
        },
        {
            name: "Event-Driven Architecture",
            description: "Uses events to trigger and communicate between services",
            use: "Real-time systems, microservices",
            benefits: ["Loose coupling", "Scalability", "Real-time processing"]
        },
        {
            name: "Hexagonal Architecture",
            description: "Isolates core logic from external concerns using ports and adapters",
            use: "Domain-driven design applications",
            benefits: ["Testability", "Technology independence", "Clean boundaries"]
        }
    ];

    const codeExamples = [
        {
            title: "Singleton Pattern - Thread-Safe Implementation",
            code: `// Java Implementation
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private static final Object lock = new Object();
    
    private DatabaseConnection() {
        // Private constructor to prevent instantiation
    }
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (lock) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
    
    public void connect() {
        System.out.println("Connecting to database...");
    }
}

// Swift Implementation
class DatabaseConnection {
    static let shared = DatabaseConnection()
    
    private init() {
        // Private initializer to ensure singleton
    }
    
    func connect() {
        print("Connecting to database...")
    }
}

// Usage
let db = DatabaseConnection.shared
db.connect()

// JavaScript Implementation
class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        DatabaseConnection.instance = this;
        return this;
    }
    
    connect() {
        console.log('Connecting to database...');
    }
}

// Modern JavaScript with Symbol
const DatabaseConnection = (() => {
    const _instance = Symbol('instance');
    
    class DatabaseConnection {
        constructor() {
            if (this.constructor[_instance]) {
                return this.constructor[_instance];
            }
            
            this.constructor[_instance] = this;
        }
        
        connect() {
            console.log('Connecting to database...');
        }
    }
    
    return DatabaseConnection;
})();`
        },
        {
            title: "Observer Pattern - Event System Implementation",
            code: `// TypeScript Implementation
interface Observer {
    update(data: any): void;
}

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(data: any): void;
}

class EventManager implements Subject {
    private observers: Observer[] = [];
    
    attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Observer has been attached already.');
        }
        
        console.log('Attached an observer.');
        this.observers.push(observer);
    }
    
    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }
        
        this.observers.splice(observerIndex, 1);
        console.log('Detached an observer.');
    }
    
    notify(data: any): void {
        console.log('Notifying all observers...');
        for (const observer of this.observers) {
            observer.update(data);
        }
    }
}

class ConcreteObserver implements Observer {
    constructor(private name: string) {}
    
    update(data: any): void {
        console.log(\`\${this.name} received update: \${JSON.stringify(data)}\`);
    }
}

// Usage
const eventManager = new EventManager();
const observer1 = new ConcreteObserver('Observer 1');
const observer2 = new ConcreteObserver('Observer 2');

eventManager.attach(observer1);
eventManager.attach(observer2);

eventManager.notify({ message: 'Hello Observers!' });

// React Hook Implementation
import { useState, useEffect, useCallback } from 'react';

class EventBus {
    private events: { [key: string]: Function[] } = {};
    
    subscribe(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        
        return () => {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        };
    }
    
    emit(event: string, data?: any) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

const eventBus = new EventBus();

// Custom Hook
function useEventBus(event: string, callback: Function) {
    useEffect(() => {
        const unsubscribe = eventBus.subscribe(event, callback);
        return unsubscribe;
    }, [event, callback]);
}

// Component Usage
function NotificationComponent() {
    const [notifications, setNotifications] = useState([]);
    
    const handleNotification = useCallback((notification) => {
        setNotifications(prev => [...prev, notification]);
    }, []);
    
    useEventBus('notification', handleNotification);
    
    return (
        <div>
            {notifications.map((notif, index) => (
                <div key={index}>{notif.message}</div>
            ))}
        </div>
    );
}`
        },
        {
            title: "Factory Pattern - Cross-Platform Implementation",
            code: `// Abstract Factory Pattern Implementation
// TypeScript
abstract class UIFactory {
    abstract createButton(): Button;
    abstract createTextField(): TextField;
}

interface Button {
    render(): void;
    onClick(callback: () => void): void;
}

interface TextField {
    render(): void;
    setValue(value: string): void;
    getValue(): string;
}

// iOS Implementation
class IOSButton implements Button {
    render(): void {
        console.log('Rendering iOS button with Cupertino design');
    }
    
    onClick(callback: () => void): void {
        console.log('iOS button click handler attached');
        callback();
    }
}

class IOSTextField implements TextField {
    private value: string = '';
    
    render(): void {
        console.log('Rendering iOS text field with rounded corners');
    }
    
    setValue(value: string): void {
        this.value = value;
        console.log(\`iOS text field value set to: \${value}\`);
    }
    
    getValue(): string {
        return this.value;
    }
}

class IOSUIFactory extends UIFactory {
    createButton(): Button {
        return new IOSButton();
    }
    
    createTextField(): TextField {
        return new IOSTextField();
    }
}

// Android Implementation
class AndroidButton implements Button {
    render(): void {
        console.log('Rendering Android button with Material Design');
    }
    
    onClick(callback: () => void): void {
        console.log('Android button click handler attached');
        callback();
    }
}

class AndroidTextField implements TextField {
    private value: string = '';
    
    render(): void {
        console.log('Rendering Android text field with Material Design');
    }
    
    setValue(value: string): void {
        this.value = value;
        console.log(\`Android text field value set to: \${value}\`);
    }
    
    getValue(): string {
        return this.value;
    }
}

class AndroidUIFactory extends UIFactory {
    createButton(): Button {
        return new AndroidButton();
    }
    
    createTextField(): TextField {
        return new AndroidTextField();
    }
}

// Factory Creator
class UIFactoryCreator {
    static createFactory(platform: 'ios' | 'android'): UIFactory {
        switch (platform) {
            case 'ios':
                return new IOSUIFactory();
            case 'android':
                return new AndroidUIFactory();
            default:
                throw new Error(\`Unsupported platform: \${platform}\`);
        }
    }
}

// Usage
function createUI(platform: 'ios' | 'android') {
    const factory = UIFactoryCreator.createFactory(platform);
    
    const button = factory.createButton();
    const textField = factory.createTextField();
    
    button.render();
    textField.render();
    
    button.onClick(() => {
        textField.setValue('Button clicked!');
        console.log('Value:', textField.getValue());
    });
}

// Swift Implementation
protocol UIComponentFactory {
    func createButton() -> ButtonProtocol
    func createTextField() -> TextFieldProtocol
}

protocol ButtonProtocol {
    func render()
    func addTarget(_ target: Any?, action: Selector)
}

protocol TextFieldProtocol {
    func render()
    func setText(_ text: String)
    func getText() -> String
}

class IOSComponentFactory: UIComponentFactory {
    func createButton() -> ButtonProtocol {
        return IOSButton()
    }
    
    func createTextField() -> TextFieldProtocol {
        return IOSTextField()
    }
}

class IOSButton: ButtonProtocol {
    func render() {
        print("Rendering iOS UIButton")
    }
    
    func addTarget(_ target: Any?, action: Selector) {
        print("iOS button target-action added")
    }
}

class IOSTextField: TextFieldProtocol {
    private var text: String = ""
    
    func render() {
        print("Rendering iOS UITextField")
    }
    
    func setText(_ text: String) {
        self.text = text
        print("iOS text field text set to: \\(text)")
    }
    
    func getText() -> String {
        return text
    }
}`
        },
        {
            title: "Dependency Injection - Modern Implementation",
            code: `// TypeScript Dependency Injection Container
interface ServiceContainer {
    register<T>(token: string, implementation: new (...args: any[]) => T): void;
    registerSingleton<T>(token: string, implementation: new (...args: any[]) => T): void;
    resolve<T>(token: string): T;
}

class DIContainer implements ServiceContainer {
    private services = new Map<string, any>();
    private singletons = new Map<string, any>();
    
    register<T>(token: string, implementation: new (...args: any[]) => T): void {
        this.services.set(token, implementation);
    }
    
    registerSingleton<T>(token: string, implementation: new (...args: any[]) => T): void {
        this.services.set(token, implementation);
        this.singletons.set(token, null);
    }
    
    resolve<T>(token: string): T {
        const serviceImplementation = this.services.get(token);
        
        if (!serviceImplementation) {
            throw new Error(\`Service \${token} not found\`);
        }
        
        if (this.singletons.has(token)) {
            let instance = this.singletons.get(token);
            if (!instance) {
                instance = new serviceImplementation();
                this.singletons.set(token, instance);
            }
            return instance;
        }
        
        return new serviceImplementation();
    }
}

// Service Interfaces
interface ILogger {
    log(message: string): void;
}

interface IEmailService {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}

interface IUserRepository {
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<void>;
}

// Service Implementations
class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(\`[LOG] \${new Date().toISOString()}: \${message}\`);
    }
}

class EmailService implements IEmailService {
    constructor(private logger: ILogger) {}
    
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        this.logger.log(\`Sending email to \${to}\`);
        // Simulate email sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.logger.log(\`Email sent successfully to \${to}\`);
    }
}

class UserRepository implements IUserRepository {
    constructor(private logger: ILogger) {}
    
    async findById(id: string): Promise<User | null> {
        this.logger.log(\`Finding user with ID: \${id}\`);
        // Simulate database query
        return new User(id, 'John Doe', 'john@example.com');
    }
    
    async save(user: User): Promise<void> {
        this.logger.log(\`Saving user: \${user.name}\`);
        // Simulate database save
    }
}

class User {
    constructor(
        public id: string,
        public name: string,
        public email: string
    ) {}
}

// Service Registration
const container = new DIContainer();

container.registerSingleton('ILogger', ConsoleLogger);
container.register('IEmailService', EmailService);
container.register('IUserRepository', UserRepository);

// Decorator-based Dependency Injection (TypeScript)
const Injectable = (token: string) => {
    return function <T extends new (...args: any[]) => {}>(constructor: T) {
        container.register(token, constructor);
        return constructor;
    };
};

const Inject = (token: string) => {
    return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
        // Metadata for parameter injection
    };
};

// Usage with decorators
@Injectable('UserService')
class UserService {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        @Inject('IEmailService') private emailService: IEmailService,
        @Inject('ILogger') private logger: ILogger
    ) {}
    
    async createUser(name: string, email: string): Promise<void> {
        this.logger.log(\`Creating user: \${name}\`);
        
        const user = new User(
            Math.random().toString(36).substr(2, 9),
            name,
            email
        );
        
        await this.userRepository.save(user);
        await this.emailService.sendEmail(
            email,
            'Welcome!',
            \`Hello \${name}, welcome to our platform!\`
        );
        
        this.logger.log(\`User created successfully: \${user.id}\`);
    }
}

// Manual Resolution
function createUserService(): UserService {
    const logger = container.resolve<ILogger>('ILogger');
    const emailService = new EmailService(logger);
    const userRepository = new UserRepository(logger);
    
    return new UserService(userRepository, emailService, logger);
}

// React Hook for Dependency Injection
function useService<T>(token: string): T {
    return container.resolve<T>(token);
}

// React Component with DI
function UserComponent() {
    const userService = useService<UserService>('UserService');
    
    const handleCreateUser = async () => {
        await userService.createUser('Jane Doe', 'jane@example.com');
    };
    
    return (
        <button onClick={handleCreateUser}>
            Create User
        </button>
    );
}`
        }
    ];

    const solidPrinciples = [
        {
            letter: "S",
            name: "Single Responsibility Principle",
            description: "A class should have only one reason to change",
            example: "Separate user validation from user persistence"
        },
        {
            letter: "O",
            name: "Open/Closed Principle", 
            description: "Software entities should be open for extension but closed for modification",
            example: "Use interfaces and inheritance to extend functionality"
        },
        {
            letter: "L",
            name: "Liskov Substitution Principle",
            description: "Objects should be replaceable with instances of their subtypes",
            example: "Derived classes must be substitutable for their base classes"
        },
        {
            letter: "I",
            name: "Interface Segregation Principle",
            description: "Clients should not be forced to depend on interfaces they don't use",
            example: "Create specific interfaces rather than one general-purpose interface"
        },
        {
            letter: "D",
            name: "Dependency Inversion Principle",
            description: "Depend on abstractions, not concretions",
            example: "High-level modules should not depend on low-level modules"
        }
    ];

    const antiPatterns = [
        {
            name: "God Object",
            description: "A class that knows too much or does too much",
            solution: "Break into smaller, focused classes"
        },
        {
            name: "Spaghetti Code",
            description: "Code with complex and tangled control structures",
            solution: "Refactor using clear structure and design patterns"
        },
        {
            name: "Magic Numbers",
            description: "Hard-coded numeric values without explanation",
            solution: "Use named constants or configuration"
        },
        {
            name: "Copy-Paste Programming",
            description: "Duplicating code instead of creating reusable components",
            solution: "Extract common functionality into methods or classes"
        },
        {
            name: "Premature Optimization",
            description: "Optimizing code before identifying actual performance bottlenecks",
            solution: "Profile first, then optimize based on data"
        },
        {
            name: "Feature Envy",
            description: "A class that uses methods of another class excessively",
            solution: "Move functionality to the appropriate class"
        }
    ];

    const designMetrics = [
        { name: "Cohesion", value: "High", description: "Elements work together" },
        { name: "Coupling", value: "Low", description: "Minimal dependencies" },
        { name: "Complexity", value: "Managed", description: "Controlled complexity" },
        { name: "Maintainability", value: "High", description: "Easy to modify" },
        { name: "Testability", value: "High", description: "Easy to test" },
        { name: "Reusability", value: "High", description: "Components can be reused" }
    ];

    const evolutionTimeline = [
        {
            era: "1960s-1970s",
            title: "Structured Programming",
            description: "Introduction of functions, procedures, and control structures"
        },
        {
            era: "1980s",
            title: "Object-Oriented Programming",
            description: "Encapsulation, inheritance, and polymorphism concepts"
        },
        {
            era: "1990s",
            title: "Design Patterns",
            description: "Gang of Four patterns and reusable design solutions"
        },
        {
            era: "2000s",
            title: "Service-Oriented Architecture",
            description: "Distributed systems and web services architecture"
        },
        {
            era: "2010s",
            title: "Microservices & Cloud",
            description: "Containerization, microservices, and cloud-native patterns"
        },
        {
            era: "2020s",
            title: "Event-Driven & Reactive",
            description: "Event sourcing, CQRS, and reactive programming patterns"
        }
    ];

    const bestPractices = [
        "Favor composition over inheritance",
        "Program to interfaces, not implementations",
        "Keep It Simple, Stupid (KISS principle)",
        "Don't Repeat Yourself (DRY principle)",
        "You Aren't Gonna Need It (YAGNI principle)",
        "Principle of Least Astonishment",
        "Separation of Concerns",
        "Loose coupling and high cohesion",
        "Fail fast and fail safely",
        "Code for readability and maintainability"
    ];

    const frameworkComparison = [
        {
            name: "Spring Framework",
            type: "Java",
            patterns: "Dependency Injection, AOP, MVC",
            strengths: "Enterprise features, extensive ecosystem"
        },
        {
            name: "Angular",
            type: "TypeScript",
            patterns: "Component-based, Dependency Injection, Observable",
            strengths: "Full framework, TypeScript support"
        },
        {
            name: "React",
            type: "JavaScript",
            patterns: "Component-based, Unidirectional data flow, HOC",
            strengths: "Virtual DOM, large ecosystem, flexibility"
        },
        {
            name: "Express.js",
            type: "Node.js",
            patterns: "Middleware, Router, MVC",
            strengths: "Lightweight, minimalist, flexible"
        }
    ];

    const skills = [
        { name: "Design Patterns", level: 92 },
        { name: "SOLID Principles", level: 90 },
        { name: "Architecture Design", level: 88 },
        { name: "Refactoring", level: 85 },
        { name: "Code Review", level: 87 },
        { name: "System Design", level: 84 },
        { name: "Clean Code", level: 91 },
        { name: "Domain Modeling", level: 82 }
    ];

    return (
        <div className="leftbrain-container design-patterns-section">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Design Patterns & Architecture</h1>
                <p>Software design principles, architectural patterns, and best practices for building maintainable and scalable applications</p>
            </div>

            {/* Pattern Categories */}
            <div className="pattern-categories">
                {patternCategories.map((category, index) => (
                    <div key={index} className="pattern-category">
                        <h4>{category.icon} {category.name}</h4>
                        <p>{category.description}</p>
                        <div className="tech-stack">
                            {category.patterns.map((pattern, idx) => (
                                <span key={idx} className="tech-tag">{pattern}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Architecture Layers Diagram */}
            <div className="architecture-diagram">
                <h4>🏗️ Layered Architecture Structure</h4>
                <div className="architecture-layers">
                    <div className="architecture-layer presentation">
                        <strong>Presentation Layer</strong><br/>
                        UI Components, Controllers, View Models
                    </div>
                    <div className="architecture-layer business">
                        <strong>Business Logic Layer</strong><br/>
                        Services, Domain Logic, Business Rules
                    </div>
                    <div className="architecture-layer data">
                        <strong>Data Access Layer</strong><br/>
                        Repositories, Data Mappers, Database
                    </div>
                </div>
            </div>

            {/* SOLID Principles */}
            <div className="solid-principles">
                <h4>🎯 SOLID Design Principles</h4>
                <div className="design-principles-grid">
                    {solidPrinciples.map((principle, index) => (
                        <div key={index} className="design-principle-card">
                            <h5>{principle.letter} - {principle.name}</h5>
                            <p>{principle.description}</p>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <strong>Example:</strong> {principle.example}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>Design Pattern Implementations</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="design-patterns-code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Architectural Patterns */}
            <div className="section">
                <h2>Architectural Patterns</h2>
                <div className="architectural-patterns-grid">
                    {architecturalPatterns.map((pattern, index) => (
                        <div key={index} className="architectural-pattern-card">
                            <h5>{pattern.name}</h5>
                            <p>{pattern.description}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <div><strong>Use case:</strong> {pattern.use}</div>
                                <div style={{ marginTop: '0.5rem' }}>
                                    <strong>Benefits:</strong>
                                    <ul>
                                        {pattern.benefits.map((benefit, idx) => (
                                            <li key={idx}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Architectural Styles */}
            <div className="architectural-styles">
                <h4>🏛️ Architectural Styles Overview</h4>
                <ul>
                    <li><strong>Monolithic:</strong> Single deployable unit with all functionality</li>
                    <li><strong>Microservices:</strong> Distributed system of small, independent services</li>
                    <li><strong>Serverless:</strong> Event-driven, function-based architecture</li>
                    <li><strong>Event-Driven:</strong> Components communicate through events</li>
                    <li><strong>Pipeline:</strong> Data flows through a series of processing stages</li>
                    <li><strong>Client-Server:</strong> Separation between client and server responsibilities</li>
                </ul>
            </div>

            {/* Design Quality Metrics */}
            <div className="section">
                <h2>Design Quality Metrics</h2>
                <div className="design-metrics">
                    {designMetrics.map((metric, index) => (
                        <div key={index} className="design-metric">
                            <h5>{metric.name}</h5>
                            <span className="metric-value">{metric.value}</span>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {metric.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Anti-Patterns */}
            <div className="anti-patterns">
                <h4>🚫 Common Anti-Patterns to Avoid</h4>
                {antiPatterns.map((antiPattern, index) => (
                    <div key={index} className="anti-pattern-item">
                        <h6>{antiPattern.name}</h6>
                        <p>{antiPattern.description}</p>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            <strong>Solution:</strong> {antiPattern.solution}
                        </div>
                    </div>
                ))}
            </div>

            {/* Evolution Timeline */}
            <div className="section">
                <h2>Software Design Evolution</h2>
                <div className="pattern-timeline">
                    {evolutionTimeline.map((era, index) => (
                        <div key={index} className="timeline-item">
                            <h4>{era.era}: {era.title}</h4>
                            <p>{era.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Framework Pattern Comparison */}
            <div className="framework-comparison">
                <h4>🔧 Framework Design Pattern Usage</h4>
                <div className="comparison-grid">
                    {frameworkComparison.map((framework, index) => (
                        <div key={index} className="framework-card">
                            <h5>{framework.name}</h5>
                            <div><strong>Type:</strong> {framework.type}</div>
                            <div><strong>Patterns:</strong> {framework.patterns}</div>
                            <div><strong>Strengths:</strong> {framework.strengths}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Practices */}
            <div className="best-practices">
                <h4>⭐ Design Best Practices</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '0.5rem' }}>
                    {bestPractices.map((practice, index) => (
                        <div key={index} className="best-practice-item">
                            <span className="best-practice-check">✓</span>
                            <span>{practice}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modern Architecture Trends */}
            <div className="architectural-styles">
                <h4>🚀 Modern Architecture Trends</h4>
                <ul>
                    <li><strong>Domain-Driven Design (DDD):</strong> Focus on business domain and ubiquitous language</li>
                    <li><strong>CQRS:</strong> Command Query Responsibility Segregation for read/write optimization</li>
                    <li><strong>Event Sourcing:</strong> Store events rather than current state</li>
                    <li><strong>Clean Architecture:</strong> Dependency inversion and framework independence</li>
                    <li><strong>Hexagonal Architecture:</strong> Ports and adapters for external dependencies</li>
                    <li><strong>Reactive Architecture:</strong> Responsive, resilient, elastic, and message-driven</li>
                </ul>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Design & Architecture Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #059669, #10B981)',
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

export default DesignPatterns;