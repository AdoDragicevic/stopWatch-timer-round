function makeStopWatch(){
    const obj = Object.create(time);
    obj.btnL = function(){
        console.log("from makeStopWatch");
    }
    return obj; 
}