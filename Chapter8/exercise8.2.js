const box = {
    locked: true,
    unlock(){
        this.locked = false;
    },
    lock(){ this.locked = true;},
    _
}