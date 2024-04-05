class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;

    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    //prepend(value)
    prepend(value) {
        this.head = new Node(value, this.head);
        this.size++
    }

    //append(value)
    append(value) {
        let node = new Node(value);
        let current;

        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;
            while (current.nextNode) {
                current = current.nextNode
            }
            current.nextNode = node;
            
        }
        this.size++
    }
    
    insertAt(value, index) {

        let node = new Node(value);
        let current, previous;
        let l = 0;

        if (index === 0) {
            node.nextNode = this.head;
            this.head = node;
            this.size++
            return;
        }

        if (index > this.size) {
            console.error(`Can't insert value, index exceeds size. index: ${index}, size: ${this.size}`)
            return;
        }

        current = this.head;
        while(l < index) {
            previous = current
            current = current.nextNode
            l++
        }

        previous.nextNode = node;
        node.nextNode = current;
        this.size++;

    }

    removeAt(index) {

        if (this.size === 0) {
            console.error("Linked List is empty, cannot remove any Nodes")
            return;
        }
        if (index === 0) { 
            this.head = this.head.nextNode
            this.size--
            return;
        }
        if (index >= this.size) {
            console.error("Index out of bounds")
            return;
        }

        let current, previous;
        let l = 0;

        current=this.head;
        while (l < index) {
            previous = current
            current = current.nextNode
            l++
        }

        previous.nextNode = current.nextNode;
        this.size--;



    }


    //tail() to get the last node in the list
    tail() {

        if (this.size === 0) {
            console.error("list is empty")
            return;
        };
        if (this.size === 1) return this.head;

        let current = this.head;
        while (current.nextNode) {
            current = current.nextNode;
        }

        return current;

    }

    //at(index) to returns the node at a particular index
    at(index) {

        if (this.size === 0) {
            console.error("empty linked list");
            return
        }

        if (index === 0) {
            return this.head;
        }

        // initiate current, loop while iterator is less than index
        let current = this.head;
        let l = 0
        while (l < index) {
            current = current.nextNode
            l++
        }
        return current
    }

    //pop() to remove the last element from the list
    pop() {

        if (this.size === 0) {
            console.error("List is empty")
            return
        }
        if (this.size === 1) {
            this.head = null
            return
        }

        let current = this.head;
        let previous;

        while (current.nextNode) {
            previous = current;
            current = current.nextNode;
        }
        previous.nextNode = null;
        this.size--;
    }

    //contains(value) - true/false if the value is/isn't in the list
    contains(value) {

        if (this.size === 0) {return false}

        let current = this.head;
        while (current) {

            if (current.value === value) {return true}
            current = current.nextNode;

        }

        return false;

    }


    //find(value)
    find(value) {
        //if this.size === 0 - console.error(Empty list) + return

        if (this.size === 0){
            console.error("List is empty")
            return
        }
        // initiate index at zero
        // initiate current at this.head

        let index = 0;
        let current = this.head;
        while(current){
            if (current.value === value) {return index}

            current = current.nextNode;
            index++;
        }
        return null
    }


    //print list values
    printListData() {
        let current = this.head;

        while (current) {
            console.log(current.value);
            current = current.nextNode;
        }
    }    
}

export {LinkedList, Node};