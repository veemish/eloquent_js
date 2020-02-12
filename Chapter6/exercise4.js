
  //BORROWING  A METHOD
  let map = {
    one: true, two: true, hasOwnProperty: true
  };

  log(Object.prototype.hasOwnProperty.call(map, "one"));
  //true
