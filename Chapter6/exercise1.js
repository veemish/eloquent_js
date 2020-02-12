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
