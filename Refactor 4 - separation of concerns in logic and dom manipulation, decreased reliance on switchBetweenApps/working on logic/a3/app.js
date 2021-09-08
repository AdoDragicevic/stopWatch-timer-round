//SELECTORS
const inputs    = document.querySelectorAll(".display input"),
      buttons   = document.querySelectorAll(".buttons .btn"),
      switchBtn = document.querySelector("#btn-switch");

//SETUP
const app = new SwitchBetweenApps( [ new StopWatch(true), new Timer(), new Round() ] );