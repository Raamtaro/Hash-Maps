import { LinkedList, Node } from "./linkedList.js";

class HashMap {
    constructor() {
        this.capacity = 25;
        this.load_factor = .75;
        this.map = [];

    }

    /**
     * hash(key) {} should return a hashCode
     * We'll use the hashCode to create a bucket using the modulo operator against the number of open spots we've got in the array
     * Not exactly sure that this goes inside the hash(key) function or out just yet...
     */

    hash(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity; 
        }
        // console.log(hashCode)
        return hashCode;
    }

    /**
     * set(key, value) {} - will
     */

    set(key, value){
        //define an index for the given key
        const index = this.hash(key) % this.capacity;
        // console.log(index) 

        if (this.map[index]) { //Is there already something in the bucket? Passing this check implies that the size of the linkedList is at least one
            if (this.map[index].size === 1) {//is the bucket just the one item?
                if (this.map[index].head.value.key === key) { //If the keys are the same, update the value with the supplied arg, or create a value
                    this.map[index].head.value.value = value
                    return
                }
                this.map[index].append({ //If the list is 1, but the key is not the same, then append a new node to the list
                    key: key,
                    value: value
                })
                return
            }

            //else, the list is greater than 1
            let current = this.map[index].head
            let i = 0;

            //Iterate through the list until we find the existing key
            while (i < this.map[index].size) {
                if (current.value.key === key) {
                    current.value.value = value
                    return
                }
                current = current.nextNode
                i++
            }
            //if we haven't found an existing key, then create a new list Item
            this.map[index].append({
                key: key,
                value: value
            })

            return

        }

        //If there is nothing that is already in the bucket/index, then append a new LinkedList

        const bucketContents = new LinkedList()
        this.map[index] = bucketContents

        bucketContents.prepend({
            key: key,
            value: value
        })

        return
    }

    get(key){}

    has(key){
        return false //for now just to fail the check in set(key, value)
    }

    remove(key){ }

    length() {}

    clear(){}

    keys(){}

    values(){}

    entries(){}

}

export default HashMap;