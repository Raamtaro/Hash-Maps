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

    get(key){
        //Returns the `value` associated with the key if it exists
        const index = this.hash(key) % this.capacity
        const bucket = this.map[index]

        //If the bucket doesn't contain anything at all....
        if (!bucket) {
            console.error(`${key} not found, try set(key, value) first`)
            return
        }
        //If it passes, then we can assume that the bucket has SOMETHING in it

        //If the bucket contains more than 1 thing...
        if (bucket.size > 1) {
            let current = bucket.head
            let i = 0
            while (i < bucket.size) {
                if (current.value.key === key) {
                    return current.value.value
                }
                current = current.nextNode
                i++
            }
            console.error(`${key} not found, try set(key, value) first`)
            return
        }

        //If it doesn't go through the above block of code, then we can assume that the bucket has only got 1 item in it

        if (bucket.head.value.key != key) {
            console.error(`${key} not found, try set(key, value) first`)
            return
        }

        //And if it passes the final check above, then we can assume that the given key is equal to the one key that already exists in the bucket

        return bucket.head.value.value
    }

    has(key){
        const index = this.hash(key) % this.capacity
        const bucket = this.map[index]

        //similar checks to the get(key) method
        //does the bucket contain anything at all? If not, then return false

        if (!bucket) {return false}

        //If it passes the above check, then it probably has something

        //If the bucket contains more than one item, we've got to parse through keys to find a match
        if (bucket.size > 1) {
            let current = bucket.head
            let i = 0
            while (i < bucket.size) {
                if (current.value.key === key) {
                    return true
                }
                current = current.nextNode
                i++
            }
            return false //if it completes the loop without returning, then the key doesn't exist
        }

        if (bucket.head.value.key != key) {return false} //If it's gotten this far, then we can assume that there is only one item

        //If it passes the above checks, we can assume that the single item in the bucket contains a key which matches the one given as the arg

        return true

    }

    remove(key){ }

    length() {}

    clear(){}

    keys(){}

    values(){}

    entries(){}

}

export default HashMap;