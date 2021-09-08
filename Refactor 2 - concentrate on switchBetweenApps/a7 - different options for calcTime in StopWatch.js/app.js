const title = document.querySelector("h1");
const switchBtn = document.querySelector("#btn-switch");
const buttons = document.querySelectorAll(".buttons .btn");
const inputs = document.querySelectorAll(".display input");

/*
//prototype obj
const time = makeProto(title, buttons);
const stopWatch = makeStopWatch();
const timer = makeTimer();
//initiate app
time.init();
*/


const apps = [
    new StopWatch(inputs, "StopWatch"),
    {
        name: "tin",
        btnRight() {
            console.log("tin right");
        },
        t1: 3,
        t2: 14,
        t3: 11,
        numOfBtn: 2,
        setBtnTxt() {
            return "no";
        }
    }, 
    {
        name: 
        "hrvoje",
        btn(){
            console.log(`${this.name} left`)
        },
        t1: 33,
        t2: 44,
        t3: 55,
        numOfBtn: 1,
        setBtnTxt() {
            return "only one btn!";
        }
    },
];

//Setup
/*
// methods & properties shared by all 3 apps
const prototype = Time();
// array of apps
const apps = [stopwatch(), timer(), clock()];
// switch between apps, add/redirect event listeners, change tile/input/btn text...
*/
const setup = new SwitchBetweenApps(inputs, apps, buttons, switchBtn, title);