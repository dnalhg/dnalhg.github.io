var curr = "";
var previous = [];
var currIdx = -1;

var commandbox = document.getElementById('console');

function focusEnd() {
    var len = commandbox.value.length;
    commandbox.focus();
    commandbox.setSelectionRange(len, len);
}

function displayText(text) {
    commandbox.value = text;
    commandbox.scrollTop = commandbox.scrollHeight;
}

function handleTextInput(e) {
    if(e.which == 13) {
        // Handling ENTER key
        if (previous.length == 50) {
            previous.shift();
        }
        previous.push(curr.trim());
        currIdx = previous.length;
        var result = processText(curr.trim());
        displayText(commandbox.value + "\n" + result + "\n> ");
        e.preventDefault();
        curr = "";
    } else if(e.which == 8) {
        // Handling BACKSPACE
        if (curr === "") {
            e.preventDefault();
        } else {
            curr = curr.slice(0,-1);
        }
    } else if(e.which == 38) {
        // Handling UP key
        e.preventDefault();
        if (currIdx > 0) {
            currIdx -= 1
            var displayedText = commandbox.value.slice(0,-1-curr.length);
            curr = previous[currIdx];
            displayedText += " " + curr;
            displayText(displayedText);
        }
    } else if(e.which == 40) {
        // Handling DOWN key
        e.preventDefault();
        if (currIdx < previous.length) {
            currIdx += 1
            var displayedText = commandbox.value.slice(0,-1-curr.length);
            if (currIdx === previous.length) {
                curr = ""
            } else {
                curr = previous[currIdx];
            }
            displayedText += " " + curr;
            displayText(displayedText);
        }
    } else {
        if ((e.which >= 48 && e.which <= 90) || (e.which >= 96 && e.which <= 105) || e.which == 32) {
            curr = curr + String.fromCharCode(e.which);
        }
        
    }
}

function isValidSlot(slot) {
    if (slot == "A1" || slot == "A2" || slot == "A3" ||
        slot == "B1" || slot == "B2" || slot == "B3" ||
        slot == "C1" || slot == "C2" || slot == "C3") {
            return true;
        }
    return false;
}

function processText(command) {
    console.info("Command received: " + command);
    var splitted = command.split(" ").filter(e1 => {
        return e1 != null && e1 != "";
    });
    var func = commandToFunc[splitted[0]];
    if (func == null) {
        return "Unkown command: " + command;
    }
    if (splitted[0] == "HELP") {
        if (splitted.length != 1) {
            return "Invalid use of HELP";
        }
        return func();
    } else if (splitted[0] == "REST") {
        if (splitted.length != 1) {
            return "Invalid use of REST";
        }
        func();
        return "A new day has begun";
    } else {
        return execute(func, splitted);
    }
}

function execute(func, splitted) {
    var commandName = splitted[0];
    if (splitted.length != 2) {
        return "Invalid use of " + commandName + " command";
    }

    if (!isValidSlot(splitted[1])) {
        return "Invalid slot to " + commandName;
    }

    var result = func(splitted[1]);
    if (commandName == "INSPECT") {
        return result;
    }

    if (result == 2) {
        return "Not enough stamina!"
    } else if (result) {
        return commandName + "ED " + splitted[1];
    } else {
        return "Could not " + commandName + " " + splitted[1];
    }
}