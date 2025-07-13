import React from "react";
import "../shared-styles.css";
import "./ObjectiveC.css";

const ObjectiveC = () => {
    const objcFeatures = [
        {
            name: "Dynamic Runtime",
            description: "Powerful runtime system that allows for method swizzling, dynamic class creation, and runtime introspection.",
            icon: "⚡",
            features: ["Method Swizzling", "Runtime Introspection", "Dynamic Dispatch", "Categories"]
        },
        {
            name: "Message Passing",
            description: "Unique messaging syntax that provides flexibility and enables dynamic behavior at runtime.",
            icon: "📨",
            features: ["Bracket Syntax", "Nil Messaging", "Selector Methods", "Target-Action Pattern"]
        },
        {
            name: "Memory Management",
            description: "Manual and automatic reference counting for precise memory control in iOS applications.",
            icon: "🧠",
            features: ["ARC", "Manual Retain/Release", "Weak References", "Autorelease Pools"]
        },
        {
            name: "C Compatibility",
            description: "Full compatibility with C and C++ code, allowing integration with existing libraries and systems.",
            icon: "🔗",
            features: ["C Interoperability", "C++ Integration", "Pointer Arithmetic", "Low-level Access"]
        }
    ];

    const codeExamples = [
        {
            title: "Class Definition and Implementation",
            code: `// Person.h - Header file
#import <Foundation/Foundation.h>

@interface Person : NSObject

@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) NSInteger age;
@property (nonatomic, strong) NSString *email;

- (instancetype)initWithName:(NSString *)name age:(NSInteger)age;
- (void)displayInfo;
- (BOOL)isAdult;
+ (Person *)personWithName:(NSString *)name age:(NSInteger)age;

@end

// Person.m - Implementation file
#import "Person.h"

@implementation Person

- (instancetype)initWithName:(NSString *)name age:(NSInteger)age {
    self = [super init];
    if (self) {
        _name = name;
        _age = age;
    }
    return self;
}

- (void)displayInfo {
    NSLog(@"Name: %@, Age: %ld", self.name, (long)self.age);
}

- (BOOL)isAdult {
    return self.age >= 18;
}

+ (Person *)personWithName:(NSString *)name age:(NSInteger)age {
    return [[Person alloc] initWithName:name age:age];
}

@end

// Usage
Person *person = [[Person alloc] initWithName:@"John Doe" age:25];
[person displayInfo];

// Factory method
Person *anotherPerson = [Person personWithName:@"Jane Smith" age:30];`
        },
        {
            title: "Protocols and Categories",
            code: `// Protocol definition
@protocol Drawable <NSObject>
- (void)draw;
- (CGFloat)area;
@optional
- (void)setColor:(UIColor *)color;
@end

// Category on existing class
@interface NSString (StringUtils)
- (BOOL)isPalindrome;
- (NSString *)reverseString;
- (NSInteger)wordCount;
@end

@implementation NSString (StringUtils)

- (BOOL)isPalindrome {
    NSString *cleaned = [[self lowercaseString] 
                        stringByReplacingOccurrencesOfString:@" " withString:@""];
    NSString *reversed = [self reverseString];
    return [cleaned isEqualToString:reversed];
}

- (NSString *)reverseString {
    NSMutableString *reversedString = [NSMutableString string];
    for (NSInteger i = self.length - 1; i >= 0; i--) {
        [reversedString appendString:[NSString stringWithFormat:@"%C", [self characterAtIndex:i]]];
    }
    return [reversedString copy];
}

- (NSInteger)wordCount {
    NSArray *words = [self componentsSeparatedByCharactersInSet:
                     [NSCharacterSet whitespaceAndNewlineCharacterSet]];
    return words.count;
}

@end

// Class conforming to protocol
@interface Circle : NSObject <Drawable>
@property (nonatomic, assign) CGFloat radius;
@end

@implementation Circle

- (void)draw {
    NSLog(@"Drawing circle with radius: %.2f", self.radius);
}

- (CGFloat)area {
    return M_PI * self.radius * self.radius;
}

- (void)setColor:(UIColor *)color {
    NSLog(@"Setting circle color");
}

@end`
        },
        {
            title: "Memory Management and ARC",
            code: `// Pre-ARC Manual Memory Management (Legacy)
- (void)legacyMemoryManagement {
    NSString *string = [[NSString alloc] initWithString:@"Hello"];
    // Manual retain/release required
    [string retain];  // Increase reference count
    [string release]; // Decrease reference count
    [string release]; // Final release
}

// Modern ARC (Automatic Reference Counting)
@interface ViewController : UIViewController
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, weak) id<SomeDelegate> delegate;  // Weak to avoid retain cycles
@property (nonatomic, copy) NSString *title;            // Copy for immutable objects
@end

// Handling retain cycles with weak references
@interface ParentObject : NSObject
@property (nonatomic, strong) ChildObject *child;
@end

@interface ChildObject : NSObject
@property (nonatomic, weak) ParentObject *parent;  // Weak to break retain cycle
@end

// Block retain cycles
@implementation SomeClass

- (void)setupTimer {
    // Potential retain cycle - self retains timer, timer retains block, block captures self
    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.0
                                                  target:self
                                                selector:@selector(timerFired:)
                                                userInfo:nil
                                                 repeats:YES];
}

- (void)setupBlockWithWeakSelf {
    __weak typeof(self) weakSelf = self;
    
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (strongSelf) {
            // Safe to use strongSelf here
            [strongSelf doSomething];
        }
    });
}

@end

// Autorelease pools for memory optimization
- (void)processLargeDataset {
    for (NSInteger i = 0; i < 1000000; i++) {
        @autoreleasepool {
            NSString *tempString = [NSString stringWithFormat:@"Item %ld", (long)i];
            // Process tempString
            // tempString will be released at end of autoreleasepool
        }
    }
}`
        },
        {
            title: "Runtime and Dynamic Features",
            code: `#import <objc/runtime.h>

// Method swizzling
@implementation UIViewController (Analytics)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];
        
        SEL originalSelector = @selector(viewDidLoad);
        SEL swizzledSelector = @selector(analytics_viewDidLoad);
        
        Method originalMethod = class_getInstanceMethod(class, originalSelector);
        Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
        
        BOOL didAddMethod = class_addMethod(class,
                                          originalSelector,
                                          method_getImplementation(swizzledMethod),
                                          method_getTypeEncoding(swizzledMethod));
        
        if (didAddMethod) {
            class_replaceMethod(class,
                              swizzledSelector,
                              method_getImplementation(originalMethod),
                              method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
    });
}

- (void)analytics_viewDidLoad {
    [self analytics_viewDidLoad]; // This calls the original viewDidLoad
    
    // Add analytics tracking
    NSLog(@"Analytics: %@ loaded", NSStringFromClass([self class]));
}

@end

// Runtime introspection
- (void)runtimeIntrospection {
    Class personClass = [Person class];
    
    // Get class name
    const char *className = class_getName(personClass);
    NSLog(@"Class name: %s", className);
    
    // Get methods
    unsigned int methodCount;
    Method *methods = class_copyMethodList(personClass, &methodCount);
    
    for (unsigned int i = 0; i < methodCount; i++) {
        Method method = methods[i];
        SEL selector = method_getName(method);
        NSLog(@"Method: %@", NSStringFromSelector(selector));
    }
    
    free(methods);
    
    // Get properties
    unsigned int propertyCount;
    objc_property_t *properties = class_copyPropertyList(personClass, &propertyCount);
    
    for (unsigned int i = 0; i < propertyCount; i++) {
        objc_property_t property = properties[i];
        const char *propertyName = property_getName(property);
        NSLog(@"Property: %s", propertyName);
    }
    
    free(properties);
}

// Dynamic method creation
void dynamicMethodImplementation(id self, SEL _cmd) {
    NSLog(@"Dynamic method called on %@", self);
}

+ (BOOL)resolveInstanceMethod:(SEL)sel {
    if (sel == @selector(dynamicMethod)) {
        class_addMethod([self class], sel, (IMP)dynamicMethodImplementation, "v@:");
        return YES;
    }
    return [super resolveInstanceMethod:sel];
}`
        }
    ];

    const objcHistory = [
        { version: "Objective-C 1.0", year: "1980s", features: ["Brad Cox development", "Smalltalk messaging", "C extension"] },
        { version: "NeXTSTEP", year: "1988", features: ["NeXT adoption", "Foundation framework", "AppKit development"] },
        { version: "Mac OS X", year: "2001", features: ["Cocoa framework", "Carbon bridge", "POSIX compliance"] },
        { version: "iOS SDK", year: "2008", features: ["Mobile development", "Touch frameworks", "Core Animation"] },
        { version: "ARC Introduction", year: "2011", features: ["Automatic Reference Counting", "Memory safety", "Simplified development"] },
        { version: "Modern Objective-C", year: "2012", features: ["Literals", "Subscripting", "Collection literals"] }
    ];

    const frameworks = [
        { name: "Foundation", icon: "🏗️", description: "Core classes and utilities" },
        { name: "UIKit", icon: "📱", description: "iOS user interface framework" },
        { name: "AppKit", icon: "🖥️", description: "macOS user interface framework" },
        { name: "Core Data", icon: "💾", description: "Object-relational mapping" },
        { name: "Core Animation", icon: "🎬", description: "Animation and graphics" },
        { name: "Core Graphics", icon: "🎨", description: "2D graphics rendering" },
        { name: "AVFoundation", icon: "🎵", description: "Audio and video processing" },
        { name: "MapKit", icon: "🗺️", description: "Maps and location services" }
    ];

    const skills = [
        { name: "Objective-C Syntax", level: 85 },
        { name: "Memory Management", level: 90 },
        { name: "Runtime Programming", level: 80 },
        { name: "Foundation Framework", level: 88 },
        { name: "UIKit Development", level: 85 },
        { name: "Legacy Code Maintenance", level: 92 },
        { name: "C/C++ Integration", level: 75 },
        { name: "Migration to Swift", level: 88 }
    ];

    const bestPractices = [
        "Use ARC instead of manual memory management",
        "Follow proper naming conventions (NS prefix for classes)",
        "Use weak references to break retain cycles",
        "Prefer properties over direct instance variable access",
        "Use categories to extend existing classes functionality",
        "Implement proper error handling with NSError",
        "Use modern Objective-C literals and subscripting",
        "Consider migration path to Swift for new features"
    ];

    return (
        <div className="leftbrain-container objc-section">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Objective-C Programming</h1>
                <p>Dynamic, object-oriented language that powered iOS and macOS development for decades</p>
            </div>

            {/* Legacy Warning */}
            <div className="legacy-warning">
                <h4>⚠️ Legacy Language Notice</h4>
                <p>While Objective-C is still supported and widely used in existing codebases, Apple recommends Swift for new development. This section covers Objective-C for maintenance, legacy projects, and understanding iOS development history.</p>
            </div>

            {/* Objective-C Features */}
            <div className="cards-container">
                {objcFeatures.map((feature, index) => (
                    <div key={index} className="leftbrain-card objc-feature-card">
                        <div className="tech-icon">{feature.icon}</div>
                        <h3>{feature.name}</h3>
                        <p>{feature.description}</p>
                        <div className="tech-stack">
                            {feature.features.map((item, idx) => (
                                <span key={idx} className="tech-tag">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Memory Management Deep Dive */}
            <div className="memory-management-card">
                <h4>Memory Management Evolution</h4>
                <div className="syntax-comparison">
                    <div>
                        <h5>Pre-ARC (Manual)</h5>
                        <div className="objc-code-block">
                            <pre><code>{`NSString *str = [[NSString alloc] init];
[str retain];  // +1
[str release]; // -1
[str release]; // -1 (deallocated)`}</code></pre>
                        </div>
                    </div>
                    <div>
                        <h5>ARC (Automatic)</h5>
                        <div className="objc-code-block">
                            <pre><code>{`@property (strong) NSString *str;
// Compiler handles retain/release
// No manual memory management needed`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>Objective-C Code Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="objc-code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Framework Ecosystem */}
            <div className="section">
                <h2>Objective-C Frameworks</h2>
                <div className="framework-grid">
                    {frameworks.map((framework, index) => (
                        <div key={index} className="framework-card">
                            <span className="framework-icon">{framework.icon}</span>
                            <h4>{framework.name}</h4>
                            <p>{framework.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Historical Timeline */}
            <div className="section">
                <h2>Objective-C History</h2>
                <div className="objc-timeline">
                    {objcHistory.map((period, index) => (
                        <div key={index} className="objc-timeline-item">
                            <h4>{period.version} ({period.year})</h4>
                            <ul>
                                {period.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Objective-C Development Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #007AFF, #5856D6)',
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
                <h2>Objective-C Best Practices</h2>
                <ul className="feature-list">
                    {bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ObjectiveC;