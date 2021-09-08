const title = document.querySelector("h1");
const buttons = document.querySelectorAll(".buttons button");
const timeDisplay = document.querySelectorAll(".display input");
const [btnLeft, btnRight, switchBtn] = buttons;
/*
//prototype obj
const time = makeProto(title, buttons);
const stopWatch = makeStopWatch();
const timer = makeTimer();
//initiate app
time.init();
*/

const apps = [
    {
        name: "ado", 
        btnLeft(){
            console.log(`${this.name} left`)
        },
        t1: 23,
        t2: 4,
        t3: 1,
        disabledInputs: true
    }, 
    {
        name: "tin",
        btnLeft(){
            console.log(`${this.name} left`)
        },
        t1: 3,
        t2: 14,
        t3: 11
    }, 
    {
        name: 
        "hrvoje",
        btnLeft(){
            console.log(`${this.name} left`)
        },
        t1: 33,
        t2: 44,
        t3: 55
    },
];

//Setup
/*
const time = func();
const stopWatch = func();
const timer = func();
const clock = func();
*/


const changingApps = new SwitchBetweenApps(title, timeDisplay, apps, switchBtn, btnLeft, btnRight);