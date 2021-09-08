//SELECTORS
const inputs    = document.querySelectorAll(".display input"),
      btns      = document.querySelectorAll(".buttons .btn"),
      switchBtn = document.querySelector("#btn-switch"),
      h1        = document.querySelector("h1");



//SETUP
//Switch between apps functionality; prototype of time
const setup = switchBetweenApps(inputs, btns, switchBtn, h1);
//Prototype of apps
const time = time(setup);
//create & add apps to setup (for redirecting events to current app)
setup.apps.push( stopWatch(time), timer(time), rounds(time) );