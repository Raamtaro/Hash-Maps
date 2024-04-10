import { LinkedList, Node } from "./linkedList.js";
import HashMap from "./hashMap.js";


const hasheesh = new HashMap

hasheesh.set("Carlos", "yo yo yo")
hasheesh.set("Carla", "Hey hey hey")

console.log(hasheesh.map[22].head)
console.log(hasheesh.map[8].head)

// hasheesh.set("Carlos", "I actually don't like to say yo that much")
// hasheesh.set("Carla", "I actually love saying Hey :)")

// console.log("******* VALUES HAVE BEEN CHANGED*******")

// console.log(hasheesh.map[22].head)
// console.log(hasheesh.map[8].head)

console.log(hasheesh.get("Carlos"))
console.log(hasheesh.get("Carla"))

console.log(hasheesh.has("Romando"))
console.log(hasheesh.has("Carlos"))