function solve(inputData) {
    const n = parseInt(inputData[0]);  
    const baristas = {};

   
    for (let i = 1; i <= n; i++) {
        const [name, shift, coffeeTypes] = inputData[i].split(' ', 3);  
        const coffees = new Set(coffeeTypes.split(',')); 
        baristas[name] = { shift, coffees };
    }

    let idx = n + 1;
    while (inputData[idx] !== 'Closed') {
        const commandLine = inputData[idx];
        const [command, ...params] = commandLine.split(' / ');

        if (command === 'Prepare') {
            const [name, shift, coffeeType] = params;
            if (baristas[name].shift === shift && baristas[name].coffees.has(coffeeType)) {
                console.log(`${name} has prepared a ${coffeeType} for you!`);
            } else {
                console.log(`${name} is not available to prepare a ${coffeeType}.`);
            }
        } else if (command === 'Change Shift') {
            const [name, newShift] = params;
            baristas[name].shift = newShift;
            console.log(`${name} has updated his shift to: ${newShift}`);
        } else if (command === 'Learn') {
            const [name, newCoffeeType] = params;
            if (baristas[name].coffees.has(newCoffeeType)) {
                console.log(`${name} knows how to make ${newCoffeeType}.`);
            } else {
                baristas[name].coffees.add(newCoffeeType);
                console.log(`${name} has learned a new coffee type: ${newCoffeeType}.`);
            }
        }

        idx++;
    }

    
    for (const [name, details] of Object.entries(baristas)) {
        const sortedCoffees = Array.from(details.coffees);
        console.log(`Barista: ${name}, Shift: ${details.shift}, Drinks: ${sortedCoffees.join(', ')}`);
    }
}


const inputData = [
    '3',
    'Alice day Espresso,Cappuccino',
    'Bob night Latte,Mocha',
    'Carol day Americano,Mocha',
    'Prepare / Alice / day / Espresso',
    'Change Shift / Bob / day',
    'Learn / Carol / Latte',
    'Learn / Bob / Latte',
    'Prepare / Bob / night / Latte',
    'Closed'
];

solve(inputData);
