//Helper for constructing apps
function construct(prototype, name, disabledInputs) {
    const obj = Object.create(prototype);
    obj.name = name;
    obj.disableInputs = disabledInputs;
    obj.isRunning = false;        
    obj.currApp = false;
    return obj;
}