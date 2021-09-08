class Time {
    constructor(inputsArr, name) {
        this.inputs = inputsArr;
        this.inputs.forEach( (input, i) => this["v" + (i+1)] = parseInt(input.value));
        this.name = name;
        this.isRunning = false;
    }
}