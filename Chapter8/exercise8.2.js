const box = {
    locked: true,
    unlock(){
        this.locked = false;
    },
    lock(){ this.locked = true;},
    _content: [],
    get content(){
        if (this.locked) throw new Error("LOCKED!");
        return this._content;
    }
};

function withBoxUnlocked(body){
    let locked = box.locked;
    if (!locked){
        return body();
    }

    box.unlock();
    try {
        return body();
    } finally {
        box.lock();
    }
}

withBoxUnlocked(function(){
    box.content.push("gold flower");
});

 try {
     withBoxUnlocked(function(){
         throw new Error("Pirate on the horizon! Abort! ")
     });
 } catch (e){
     console.log("Error raised:", e);
 }

 console.log(box.locked);
 // true