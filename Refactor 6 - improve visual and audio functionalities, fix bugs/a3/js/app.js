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
    new Round(),
    new Timer(),
    new StopWatch(false)
];

new SwitchBetweenApps(apps);