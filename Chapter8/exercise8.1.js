class MultiplicatorUnitFailure extends error {}

function primitiveMultiply(a,b){
    if (Math.random() < 0.2){
        return a*b;
    } else {
        throw new MultiplicatorUnitFailure("klunk");
    }
}

function realibleMultiply(a,b){
    for (;;){
        try{
            return primitiveMultiply(a,b);
        } catch (e){
            if (!(e instanceof MultiplicatorUnitFailure))
            throw e;
        }
    }
}

console.log(reliableMultiply(8 , 8));
// 64

console.log(realibleMultiply(5 , 6));
// 30