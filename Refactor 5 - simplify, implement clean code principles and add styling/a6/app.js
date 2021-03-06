//SELECTORS
const inputs    = document.querySelectorAll(".input"),
      buttons   = document.querySelectorAll("#reset, #start"),
      switchBtn = document.querySelector("#switch");

//SETUP
const style = {
    timer: new StyleTimer(),
    stopwatch: new StyleStopWatch(),
    round: new StyleRound()
};

const apps = [
    new Timer(), 
    new Round(), 
    new StopWatch(true)
];

new SwitchBetweenApps(apps);