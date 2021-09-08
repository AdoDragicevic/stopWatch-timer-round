const title = document.querySelector("h1");
const buttons = document.querySelectorAll(".buttons button");
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
        }
    }, 
    {
        name: "tin",
        btnLeft(){
            console.log(`${this.name} left`)
        }
    }, 
    {
        name: 
        "hrvoje",
        btnLeft(){
            console.log(`${this.name} left`)
        }
    },
];

//Setup
/*
const time = func();
const stopWatch = func();
const timer = func();
const clock = func();
*/


const changingApps = new SwitchBetweenApps(title, apps, switchBtn, btnLeft, btnRight);