//SELECTORS
const inputs    = document.querySelectorAll(".display input"),
      buttons   = document.querySelectorAll(".buttons .btn"),
      switchBtn = document.querySelector("#btn-switch");

//SETUP
new SwitchBetweenApps( [ new StopWatch(true), new Timer() , new Round() ] );