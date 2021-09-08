function makeTimer(){
    const obj = Object.create(time);
    obj.btnL = function(){
        console.log("I come from the time obj");
    }
    return obj;
}