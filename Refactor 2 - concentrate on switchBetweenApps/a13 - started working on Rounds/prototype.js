class Time {
    constructor(name, inputsArr, disabledInputs) {
        this.name = name;
        this.inputs = inputsArr;
        this.inputs.forEach( (input, i) => this["v" + (i+1)] = parseInt(input.value) );
        this.disableInputs = disabledInputs;
        this.isRunning = false;
        this.currApp = false;
    }
}