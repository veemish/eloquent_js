for (let n = 1; n <= 100; n++ ){
    let output = " ";
    if ( n % 3 == 0 ) output += "Heeyy";
    if ( n % 5 == 0 ) output += " Yoooo! ";
    console.log(output || n );
}