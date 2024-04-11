import { LinkedList, Node } from "./linkedList.js";

class HashMap {

    constructor() {

        this.capacity = 25;
        this.load_factor = .75;
        this.map = [];

    }

    hash(key){

        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity; 
        }
        
        return hashCode;
    }

    set(key, value){
        
        const index = this.hash(key) % this.capacity;

        if (this.map[index]) { 

            if (this.map[index].size === 1) {
                if (this.map[index].head.value.key === key) { 
                    this.map[index].head.value.value = value
                    return
                }
                this.map[index].append({ 
                    key: key,
                    value: value
                })
                return
            }

            let current = this.map[index].head
            let i = 0;

            while (i < this.map[index].size) {
                if (current.value.key === key) {
                    current.value.value = value
                    return
                }
                current = current.nextNode
                i++
            }
            
            this.map[index].append({
                key: key,
                value: value
            })

            return
        }

        const bucketContents = new LinkedList()
        this.map[index] = bucketContents

        bucketContents.prepend({
            key: key,
            value: value
        })

        return
    }

    get(key){
       
        const index = this.hash(key) % this.capacity
        const bucket = this.map[index]

        if (!bucket) {
            console.error(`${key} not found, try set(key, value) first`)
            return
        }

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

        if (bucket.head.value.key != key) {
            console.error(`${key} not found, try set(key, value) first`)
            return
        }

        return bucket.head.value.value
    }

    has(key){
        const index = this.hash(key) % this.capacity
        const bucket = this.map[index]



        if (!bucket) {return false}


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
            return false 
        }

        if (bucket.head.value.key != key) {return false} 
        return true
    }

    remove(key){
        const index = this.hash(key) % this.capacity
        const bucket = this.map[index]

    
        if (!bucket) {
            console.error(`Cannot remove key: ${key} - does not exist`)
            return false
        }

        if (bucket.size > 1) {
            let current = bucket.head
            let i = 0

            while (i < bucket.size) {
                if (current.value.key === key) {
                    
                    console.log(`Removing key:value pair ${key} : ${current.value.value} from the bucket...`)
                    bucket.removeAt(i)
                    console.log(`Successfully removed ${key} from bucket!`)
                    return true
                }
                
                current = current.nextNode
                i++
            }
            
            console.error(`Cannot remove key: ${key} - does not exist`)
            return false
        }
        
        if (bucket.head.value.key != key) {
            console.error(`Cannot remove key: ${key} - does not exist`)
            return false
        }

        bucket.pop()
        console.log(`Removed key:value pair associated with: ${key}`)
        return true
    }

    length() {

        let totalKeys = 0;
        if (!this.map) {return totalKeys}

        for (const bucket of this.map) {
            if (!bucket) continue

            totalKeys += bucket.size
        }

        return totalKeys
    }

    clear(){
        this.map.fill(null);
    }

    keys(){
        if (!this.map){
            return []
        }
        //If the code gets to this point, then our hashMap contains something.

        const keys = []

        //Let's loop through each bucket
        for (const bucket of this.map) {
            //Is the bucket empty? Then skip!
            if (!bucket) continue
            //At this point in the script, the bucket is not empty
            //Does the bucket have more than one item? KEEP IN MIND THAT EACH BUCKET IS A LINKED LIST
            
            if (bucket.size > 1) {
                let current = bucket.head
                let i = 0

                while (i < bucket.size) {
                    keys.push(current.value.key)
                    current = current.nextNode
                    i++
                }
                continue
            }

            //at this point, if the script is running without getting caught in the above checks, the bucket only has one item

            keys.push(bucket.head.value.key)
        }

        return keys

    }

    values(){
        //Very similar to the keys() function
        if (!this.map){
            return []
        }
        //If the code gets to this point, then our hashMap contains something.

        const values = []

        //Let's loop through each bucket
        for (const bucket of this.map) {
            //Is the bucket empty? Then skip!
            if (!bucket) continue
            //At this point in the script, the bucket is not empty
            //Does the bucket have more than one item? KEEP IN MIND THAT EACH BUCKET IS A LINKED LIST
            
            if (bucket.size > 1) {
                let current = bucket.head
                let i = 0

                while (i < bucket.size) {
                    values.push(current.value.value)
                    current = current.nextNode
                    i++
                }
                continue
            }

            //at this point, if the script is running without getting caught in the above checks, the bucket only has one item

            values.push(bucket.head.value.value)
        }

        return values

    }

    entries(){

        let entries = []

        if (!this.map) {return entries} //If caught in this check, the method will return an empty array

        //If the code runs at this point, then there is something in the HashMap
        for (const bucket of this.map) {
            
            if (!bucket) continue
            
            if (bucket.size > 1) {

                let current = bucket.head
                let i = 0

                while (i < bucket.size) {

                    entries.push(current.value)
                    current = current.nextNode
                    i++
                }

                continue
            }

            entries.push(bucket.head.value)
        }

        return entries
    }
}

export default HashMap;