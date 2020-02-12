
  //CHAPTER 5//
  //flattening
  let arrays = [[1,2,3],[4,5],[6]];
  console.log(arrays.reduce((flat,current)=> flat.concat(current),[]));
  //[1,2,3,4,5,6]
