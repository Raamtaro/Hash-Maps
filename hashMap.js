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
     
        return hashCode;
    }

    /**
     * set(key, value) {} - will
     */

    set(key, value){
        //define an index for the given key
        const index = this.hash(key) % this.capacity;
        const preExisting = this.has(key)
        //if the key already exists, update the old value with the given argument
        //Otherwise, 
        //set the key with a value in the appropriate bucket

        if (preExisting) {
            //Check if the key is the same as the one that's already in the bucket
            //If so - overwrite the old value with the new one

            //Else, set the nextNode to new Node({key: value}) because there is a collision

        }

        const bucketContents = new LinkedList()
        this.map[index] = bucketContents

        bucketContents.prepend([key,value])

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