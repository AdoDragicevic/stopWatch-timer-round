//SELECTORS
const inputs    = document.querySelectorAll(".input"),
      buttons   = document.querySelectorAll("#reset, #start"),
      switchBtn = document.querySelector("#switch");

//SETUP
const apps = new SwitchBetweenApps( [ new Timer(), new Round(), new StopWatch(true) ] );