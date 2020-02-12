/* Chapter 7 */
/* First Excercse  Measuring a Robot*/

function countSteps(state, robot, memory) {
    for (let steps = 0;; steps++) {
      if (state.parcels.length == 0) return steps;
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  
  function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0, total2 = 0;
    for (let i = 0; i < 100; i++) {
      let state = VillageState.random();
      total1 += countSteps(state, robot1, memory1);
      total2 += countSteps(state, robot2, memory2);
    }
    console.log(`Robot 1 needed ${total1 / 100} steps per task`)
    console.log(`Robot 2 needed ${total2 / 100}`)
  }
  
  compareRobots(routeRobot, [], goalOrientedRobot, []);

  /*  Exercise 2 robot effeciency*/

  function lazyRobot({place, parcels}, route) {
    if (route.length == 0) {
      // Describe a route for every parcel
      let routes = parcels.map(parcel => {
        if (parcel.place != place) {
          return {route: findRoute(roadGraph, place, parcel.place),
                  pickUp: true};
        } else {
          return {route: findRoute(roadGraph, place, parcel.address),
                  pickUp: false};
        }
      });
  
      // This determines the precedence a route gets when choosing.
      // Route length counts negatively, routes that pick up a package
      // get a small bonus.
      function score({route, pickUp}) {
        return (pickUp ? 0.5 : 0) - route.length;
      }
      route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }
  
    return {direction: route[0], memory: route.slice(1)};
  }
  
  runRobotAnimation(VillageState.random(), lazyRobot, []);

  /* Exercise 3 Persistent group*/

  class PGroup {
    constructor(members) {
      this.members = members;
    }
    add(value){
      if (this.has(value)) return this;
      return new PGroup(this.members.concat([value]))
    }
    delete(value){
      if(!this.has(value))return this;
      return new PGroup(this.members.filter(m => m !== value));
    }
    has(value){
      return this.members.includes(value)
    }
  }

  PGroup.empty = new PGroup.empty.add("a");
  let ab = a.add("b");
  let b = ab.delete("b");

  console.log(b.has("b"));
  //-> true

  console.log(a.has("b"));
  // -> false

  console.log(b.has("a"));
  // -> false


  //Chapter 6
  //Exercise 1 A vector type

  class Vec{
    constructor(x,y){
      this.x = x;
      this.y = y;
    }
    plus(other){
      return new Vec(this.x + other.x , this.y + other.y );
    }
    minus(other) {
      return new Vec(this.x + other.x , this.y - other.y);
    }
    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }

  console.log(new Vec(1 , 2).plus(new Vec(2 , 3)));
  //Vec{X:3 , y:5}
  console.log(new Vec(1,2).minus(new Vec(2,3)));
  //Vec{x: -1 , Y: -1}
  console.log(new Vec(3,4).length);
  //5

  //exercise 2 Groups:
  class Group {
    constructor(){
      this.members = [];
    }
    add(value){
      if(!this.has(value)){
        this.members.push(value);
      }
    }
    delete(value){
      this.members = this.members.filter(v => v !== value);
    }
    has(value){
      return this.members.includes(value);
    }
    static from(collection){
      let group = new Group;
      for (let value of collection){
        group.add(value);
      }
      return group;
    }
  }

  let group = Group.from([10, 20]);
  console.log(group.has(10));
  //true
  console.log(group.has(30));
  // false

  group.add(10);
  group.delete(10);
  console.log(group.has(10)); 

  //Exercise 3 Iterable groups

  class Group {
    constructor() {
      this.members = [];
    }
    add(value) {
      if (!this.has(value)){
        this.members.push(value);
      }
    }
    delete(value){
      this.members = this.members.filter( v => v !== value)
    }
    has(value){
      return this.members.includes(value);
    }
    static form(collection){
      let group = new Group;
      for (let value of collection){
        group.add(value);
      }
      return group;
    }
    [Symbol.iterator]() {
      return new GroupIterator(this);
    }
  }

  class GroupIterator {
    constructor(group){
      this.group = group;
      this.position = 0;
    }

    next() {
      if(this.position >= this.group.members.length){
        return {done: true};
      } else {
        let result = {value : this.group.members[this.position],
        done:false};
        this.position++;
        return result;
      }
     
    }
  
  }

  for (let value of Group.from(["a" ,"b" , "c"])){
    console.log(value);
  }
  // a
  //b
  //c

  //BORROWING  A METHOD
  let map = {
    one: true, two: true, hasOwnProperty: true
  };

  log(Object.prototype.hasOwnProperty.call(map, "one"));
  //true


  //CHAPTER 5//
  //flattening
  let arrays = [[1,2,3],[4,5],[6]];
  console.log(arrays.reduce((flat,current)=> flat.concat(current),[]));
  //[1,2,3,4,5,6]



  //exercise 2
  //your own loop
  function loop(start, test, update,body){
    for(let value = start; test(value); value = update(value)){
      body(value);
    }
  }

  loop(3, n => n > 0, n=> n-1, console.log);
  //3
  //2
  //1


// exercise 3
//everything

function every(array , test){
  for(let element of array){
    if(!test(element)) return false;
  }
  return true;
}

function every2(array , test){
  return !array.some(element => !test(element));
}

console.log(every([1,3,5] , n => n < 10 ));
// true
console.log(every([2, 4, 16], n => n < 10 ));
// false
console.log(every([], n => n < 10));
//true

//Dominant writing Direction
function dominantDirection(text){
  let counted = countBy(text , char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");
  if (counted.length == 0) return "ltr";
  return counted.reduce((a,b) => a.count > b.count ? a:b).name;
}
console.log(dominationDirection("HEy!!!"));
//ltr
console.log(dominationDirection("Heyy yooooo!!"));
//ltr


//CHAPTER 4
// THE SUM OF A RANGE:
function range(start, end, step = start < end ? 1 : -1){
  let array = [];

  if (step > 0){
    for (let i = start; i <= end; i += step) array.push(i);
  } else { array.push(i);
    for (let i = start; i>= end; i += step) array.push(i);
  } return array;
     
}

function sum(array){
  let total = 0;
  for (let value of array){
    total += value;
  } return total;
}

console.log(range(1,10))
//[1,2,3,4,5,6,7,8,9,10]
console.log(range(5 ,2 -1));
//[5,4,3,2]
console.log(sum(range(1,10)));
//55


// exercise 4.2 Reversing an array
function reverseArray(array){
  let output = [];
  for (let i = array.length - 1; 1 >= 0; i--){
    output.push(array[i]);
  }
  return output;
}

function reverseArrayInPlace(array){
  for (let i = 0; i < Math>floor(array.length/2); i++){
    let old = array[i];
    array[i] = array[array.length -1 -i];
    array[array.length -1 - i] = old;
  }
  return array;
}

console.log(reverseArray(["A" , "B" , "C"]));
// ["c" , "B" , "A"]

let arrayValue = [1,2,3,4,5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
//[5,4,3,2,1]


// exercise 4.3  A list

function arrayToList(array){
  let
}

