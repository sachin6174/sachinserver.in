export const linkedListData = {
    title: 'Linked List',
    description: 'Complete guide to linked lists - from fundamentals to advanced problems',
    explanation: `
## What is a Linked List?
A linked list is a linear data structure where elements (nodes) are stored in a sequence, but unlike arrays, elements are not stored in contiguous memory locations. Each node contains data and a reference (or link) to the next node in the sequence.

## Key Characteristics
- **Dynamic Size**: Size can grow or shrink during runtime
- **Non-contiguous Memory**: Nodes can be stored anywhere in memory
- **Sequential Access**: Must traverse from head to reach any element
- **Efficient Insertion/Deletion**: O(1) at known positions
- **Extra Memory**: Requires additional memory for storing pointers

## Time Complexity
| Operation | Time Complexity |
|-----------|----------------|
| Access    | O(n)          |
| Search    | O(n)          |
| Insertion | O(1)*         |
| Deletion  | O(1)*         |
*At known position. O(n) if position needs to be found.

## Types of Linked Lists
1. **Singly Linked List**: Each node points to the next node
2. **Doubly Linked List**: Each node has pointers to both next and previous nodes
3. **Circular Linked List**: Last node points back to the first node

## Linked List Syntax in Swift

### Node Structure
\`\`\`swift
// Singly Linked List Node
class ListNode {
    var val: Int
    var next: ListNode?
    
    init(_ val: Int) {
        self.val = val
        self.next = nil
    }
}

// Doubly Linked List Node
class DoublyListNode {
    var val: Int
    var next: DoublyListNode?
    var prev: DoublyListNode?
    
    init(_ val: Int) {
        self.val = val
        self.next = nil
        self.prev = nil
    }
}
\`\`\`

### Basic Linked List Operations
\`\`\`swift
class LinkedList {
    private var head: ListNode?
    private var size: Int = 0
    
    // Add at head (beginning)
    func addAtHead(_ val: Int) {
        let newNode = ListNode(val)
        newNode.next = head
        head = newNode
        size += 1
    }
    
    // Add at tail (end)
    func addAtTail(_ val: Int) {
        let newNode = ListNode(val)
        
        guard let head = head else {
            self.head = newNode
            size += 1
            return
        }
        
        var current = head
        while current.next != nil {
            current = current.next!
        }
        current.next = newNode
        size += 1
    }
    
    // Add at specific index
    func addAtIndex(_ index: Int, _ val: Int) {
        if index < 0 || index > size { return }
        
        if index == 0 {
            addAtHead(val)
            return
        }
        
        let newNode = ListNode(val)
        var current = head
        
        for _ in 0..<(index - 1) {
            current = current?.next
        }
        
        newNode.next = current?.next
        current?.next = newNode
        size += 1
    }
    
    // Delete at specific index
    func deleteAtIndex(_ index: Int) {
        if index < 0 || index >= size { return }
        
        if index == 0 {
            head = head?.next
            size -= 1
            return
        }
        
        var current = head
        for _ in 0..<(index - 1) {
            current = current?.next
        }
        
        current?.next = current?.next?.next
        size -= 1
    }
    
    // Get value at index
    func get(_ index: Int) -> Int {
        if index < 0 || index >= size { return -1 }
        
        var current = head
        for _ in 0..<index {
            current = current?.next
        }
        
        return current?.val ?? -1
    }
}
\`\`\`

### Common Linked List Algorithms
\`\`\`swift
// Reverse a linked list
func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var current = head
    
    while current != nil {
        let nextTemp = current?.next
        current?.next = prev
        prev = current
        current = nextTemp
    }
    
    return prev
}

// Find middle of linked list (Floyd's slow-fast pointer)
func findMiddle(_ head: ListNode?) -> ListNode? {
    var slow = head
    var fast = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
    }
    
    return slow
}

// Detect cycle in linked list
func hasCycle(_ head: ListNode?) -> Bool {
    var slow = head
    var fast = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
        
        if slow === fast {
            return true
        }
    }
    
    return false
}

// Merge two sorted linked lists
func mergeTwoLists(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
    let dummy = ListNode(0)
    var current = dummy
    var list1 = l1
    var list2 = l2
    
    while list1 != nil && list2 != nil {
        if list1!.val <= list2!.val {
            current.next = list1
            list1 = list1?.next
        } else {
            current.next = list2
            list2 = list2?.next
        }
        current = current.next!
    }
    
    // Attach remaining nodes
    current.next = list1 ?? list2
    
    return dummy.next
}
\`\`\`

## Linked List vs Array
| Aspect | Linked List | Array |
|--------|-------------|-------|
| Memory | Non-contiguous | Contiguous |
| Access Time | O(n) | O(1) |
| Insertion/Deletion | O(1) at known position | O(n) |
| Memory Overhead | Extra pointer storage | No extra overhead |
| Cache Performance | Poor | Good |

## When to Use Linked Lists
✅ **Use when:**
- Frequent insertions/deletions at arbitrary positions
- Size varies significantly during runtime
- Memory is not allocated contiguously
- Don't need random access to elements

❌ **Avoid when:**
- Need frequent random access to elements
- Memory usage is critical
- Cache performance is important
- Working with numerical computations
`,
    questions: [
        // Easy Problems
        'Design Linked List - https://leetcode.com/problems/design-linked-list/',
        'Adding Nodes to Linked List (addAtHead, addAtTail, addAtIndex) - https://leetcode.com/problems/design-linked-list/',
        'Deleting Nodes in Linked List (deleteAtIndex) - https://leetcode.com/problems/design-linked-list/',
        'Middle of Linked List - https://leetcode.com/problems/middle-of-the-linked-list/',
        'Reverse Linked List - https://leetcode.com/problems/reverse-linked-list/',
        'Linked List Cycle – Hash Table - https://leetcode.com/problems/linked-list-cycle/',
        'Linked List Cycle – Floyd\'s Algorithm - https://leetcode.com/problems/linked-list-cycle/',
        'Palindrome Linked List - https://leetcode.com/problems/palindrome-linked-list/',
        'Intersection of Two Linked Lists - https://leetcode.com/problems/intersection-of-two-linked-lists/',
        'Remove Linked List Elements - https://leetcode.com/problems/remove-linked-list-elements/',
        
        // Medium Problems
        'Remove Nth Node from End of List (Two‐Pass & One‐Pass) - https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
        'Remove Duplicates from Sorted List - https://leetcode.com/problems/remove-duplicates-from-sorted-list/',
        'Odd Even Linked List - https://leetcode.com/problems/odd-even-linked-list/',
        'Add Two Numbers - https://leetcode.com/problems/add-two-numbers/',
        'Merge Two Sorted Lists - https://leetcode.com/problems/merge-two-sorted-lists/',
        'Rotate List - https://leetcode.com/problems/rotate-list/',
        'Swap Nodes in Pairs (iterative or recursive) - https://leetcode.com/problems/swap-nodes-in-pairs/'
    ]
};