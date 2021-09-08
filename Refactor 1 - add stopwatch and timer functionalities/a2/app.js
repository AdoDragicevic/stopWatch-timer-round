const time1 = document.querySelector(".time__display-1");
const time2 = document.querySelector(".time__display-2");
const time3 = document.querySelector(".time__display-3");

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");



class StopWatch {
    
    constructor(time1, time2, time3, btnLeft, btnRight, callbacks) {
        // time display (min, sec, milSec)
        this.d1 = time1;
        this.d2 = time2;
        this.d3 = time3;
        // time in numbers (min, sec, milSec)
        this.t1 = 0;
        this.t2 = 0;
        this.t3 = 0;
        // is time running vs. frozen
        this.isRunning = false;
        // start, stop, lap, reset btns
        this.btnLeft = btnLeft;
        this.btnRight = btnRight;
        this.btnLeft.addEventListener("click", this.toggleLeft);
        this.btnRight.addEventListener("click", this.toggleRight);
        
        if(callbacks) {
            this.clockHand = callbacks.clockHand; 
        }
        
    }
    
    // functionality of the buttons changes depending on isRunning
    toggleRight = () => {
        this.isRunning ? this.stop() : this.start();
    };
    toggleLeft = () => {
        this.isRunning ? this.lap() : this.reset();
    };
    // change btn innerText
    changeBtnText = () => {
        // left btn: Lap / Reset
        btnLeft.innerText = this.isRunning ? "Lap" : "Reset";
        // right btn: Start / Stop
        btnRight.innerText = this.isRunning ? "Stop" : "Start";
    };
    // functionalities
    start = () => {
        this.isRunning = true;
        this.tick();
        this.changeBtnText();
    };
    tick = () => {
        this.interval = setInterval(() => {
            this.calcTime();
            this.displayTime();            
        }, 10);
    };
    // every 100msc add 1 sec, every 60 sec add 1 min
    calcTime = () => {
        this.t3 += 1;
        // for every 100 msec, add 1 sec
        if(this.t3 > 99){
            this.t3 = 0;
            this.t2 += 1;
            if(this.clockHand) this.clockHand("on");
            // for every 60 sec, add 1 min
            if(this.t2 > 59) {
                this.t2 = 0;
                this.t1 +=1;
                // stop when we reach 99 min
                if(this.t1 === 99) {
                    this.stop();
                }
            }
        }
    };
    stop = () => {
        this.isRunning = false;
        clearInterval(this.interval);
        this.changeBtnText();
    };
    lap = () => {
        const n1 = this.twoDigitNum(this.t1);
        const n2 = this.twoDigitNum(this.t2);
        const n3 = this.twoDigitNum(this.t3); 
        const str = `${n1}: ${n2}: ${n3}`;
        this.displayLap(str);
    };
    reset = () => {
        this.isRunning = false;
        this.t1 = 0;
        this.t2 = 0;
        this.t3 = 0;
        this.displayTime();
        if(this.clockHand) this.clockHand();
        this.displayLap();
    };
    displayTime = () => {
        // in HTML, display nums as two digit (e.g. 1 as "01")
        this.d1.value = this.twoDigitNum(this.t1);
        this.d2.value = this.twoDigitNum(this.t2);
        this.d3.value = this.twoDigitNum(this.t3);
    };
    displayLap = (text) => {
        let ul = document.querySelector(".time__laps-list");
        // add new lap
        if(text){
            let li = document.createElement("li");
            li.innerText = text;
            ul.appendChild(li);
        // or delete all laps if no argument is passed
        }else{
            let laps = document.querySelectorAll(".time__laps-list li");
            for(let li of laps) ul.removeChild(li);
        }
    };
    twoDigitNum = (num) => {
        let n = num.toString();
        return n.length === 1 ? `0${n}`: n;
    };
}


const newStopWatch = new StopWatch(time1, time2, time3, btnLeft, btnRight, {
    
    clockHand(str) {
        let clockArrow = document.querySelector(".svg__line");
        if(str){
            // else, move arrow
            // get first num from transform="rotate(0 200 200)" & mutate it
            let rotate = clockArrow.getAttribute("transform");
            // we got "rotate(n 200 200)" => now slice it from "(" to " "
            let rotateDeg = rotate.slice(rotate.indexOf("(") + 1, rotate.indexOf(" "));
            let deg = parseInt(rotateDeg);
            deg += 6;
            clockArrow.setAttribute("transform", `rotate(${deg} 200 200)`); 
        }else{
            // if no argument is passed, reset arrow
            clockArrow.setAttribute("transform", "rotate(0 200 200)");
        } 
    }
    
});



/*
const btnChange = document.querySelector(".btn-change");
const inputs = document.querySelectorAll(".time__display input");

btnChange.addEventListener("click", disableInput);

function disableInput(){
    for(let input of inputs){
        input.disabled = input.disabled === true ? false : true;
    }
}

for(let input of inputs){
    input.addEventListener("keypress", allowOnlyNum);
}
*/