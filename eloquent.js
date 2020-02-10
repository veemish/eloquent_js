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
