//SELECTORS
const inputs    = document.querySelectorAll(".input"),
      buttons   = document.querySelectorAll("#reset, #start"),
      switchBtn = document.querySelector("#switch");

//SETUP
const apps = new SwitchBetweenApps( [ new StopWatch(true), new Timer() , new Round() ] );