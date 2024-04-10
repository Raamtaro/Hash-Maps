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
        console.log(index) 

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
            return
        }

        if (bucket.size > 1) {
            let current = bucket.head
            let i = 0

            while (i < bucket.size) {
                if (current.value.key === key) {
                    
                    console.log(`Removing key:value pair ${key} : ${current.value.value} from the bucket...`)
                    bucket.removeAt(i)
                    console.log(`Successfully removed ${key} from bucket!`)
                    return
                }
                
                current = current.nextNode
                i++
            }
            
            console.error(`Cannot remove key: ${key} - does not exist`)
            return
        }
        


        
        if (bucket.head.value.key != key) {
            console.error(`Cannot remove key: ${key} - does not exist`)
            return
        }

        

        bucket.pop()
        console.log(`Removed key:value pair associated with: ${key}`)
        return


    }

    length() {}

    clear(){}

    keys(){}

    values(){}

    entries(){}

}

export default HashMap;