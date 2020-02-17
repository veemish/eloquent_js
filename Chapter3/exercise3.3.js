function countChar(string, ch){
    let counted = 0;
    for (let i = 0; i < string.length; i++){
        if (string[i] == ch) {
            counted += 1;
        }
    }
    return counted;
}

function countBS(string){
    return countChar(string,"b");
}

console.log(countBS("BBC"));
// 2

console.log(countChar("Kakkerlak", "K"));