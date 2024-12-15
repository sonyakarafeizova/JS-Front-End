function solve(input) {
    let message = input[0];

    for (let i = 1; i < input.length; i++) {
        let command = input[i];

        if (command === "Buy") {
            console.log(`The cryptocurrency is: ${message}`);
            break;
        }

        if (command === "TakeEven") {
           
            message = message.split('').filter((_, index) => index % 2 === 0).join('');
            console.log(message);
        } else if (command.startsWith("ChangeAll")) {
            let [_, substring, replacement] = command.split('?');
            message = message.split(substring).join(replacement);
            console.log(message);

        }
        else if (command.startsWith("Reverse")) {
            let substring = command.split('?')[1];
            if (message.includes(substring)) {
                let startIndex = message.indexOf(substring);
                let endIndex = startIndex + substring.length;
                let reversedSubstring = message.slice(startIndex, endIndex).split('').reverse().join('');
                message = message.slice(0, startIndex) + message.slice(endIndex) + reversedSubstring;
                console.log(message);
            } else {
                console.log("error");
            }

        }
    }
}

solve(["PZDfA2PkAsakhnefZ7aZ",
    "TakeEven",
    "TakeEven",
    "TakeEven",
    "ChangeAll?Z?X",
    "ChangeAll?A?R",
    "Reverse?PRX",
    "Buy"]);