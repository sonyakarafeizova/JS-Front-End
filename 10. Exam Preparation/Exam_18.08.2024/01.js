function solve(input) {
    
    const numberOfSuperheroes = parseInt(input.shift());
    const superheroes = {};

    
    for (let i = 0; i < numberOfSuperheroes; i++) {
        const [name, powers, energy] = input.shift().split('-');
        superheroes[name] = {
            powers: powers.split(','),
            energy: parseInt(energy)
        };
    }

   
    const usePower = (name, power, energyRequired) => {
        const hero = superheroes[name];
        if (hero.powers.includes(power) && hero.energy >= energyRequired) {
            hero.energy -= energyRequired;
            console.log(`${name} has used ${power} and now has ${hero.energy} energy!`);
        } else {
            console.log(`${name} is unable to use ${power} or lacks energy!`);
        }
    };

    
    const train = (name, trainingEnergy) => {
        const hero = superheroes[name];
        if (hero.energy === 100) {
            console.log(`${name} is already at full energy!`);
        } else {
            const energyGained = Math.min(100 - hero.energy, trainingEnergy);
            hero.energy += energyGained;
            console.log(`${name} has trained and gained ${energyGained} energy!`);
        }
    };

   
    const learn = (name, newSuperpower) => {
        const hero = superheroes[name];
        if (hero.powers.includes(newSuperpower)) {
            console.log(`${name} already knows ${newSuperpower}.`);
        } else {
            hero.powers.push(newSuperpower);
            console.log(`${name} has learned ${newSuperpower}!`);
        }
    };

    
    let command = input.shift();
    while (command !== "Evil Defeated!") {
        const [action, name, detail, amount] = command.split(' * ');

        if (!superheroes[name]) {
            console.log(`Hero ${name} not found!`);
            command = input.shift();
            continue;
        }

        switch (action) {
            case "Use Power":
                usePower(name, detail, parseInt(amount));
                break;
            case "Train":
                train(name, parseInt(detail));
                break;
            case "Learn":
                learn(name, detail);
                break;
        }

        command = input.shift();
    }

   
    for (const [name, { powers, energy }] of Object.entries(superheroes)) {
        console.log(`Superhero: ${name}`);
        console.log(`- Superpowers: ${powers.join(', ')}`);
        console.log(`- Energy: ${energy}`);
    }
}

solve( [
    "3",
    "Iron Man-Repulsor Beams,Flight-80",
    "Thor-Lightning Strike,Hammer Throw-10",
    "Hulk-Super Strength-60",
    "Use Power * Iron Man * Flight * 30",
    "Train * Thor * 20",
    "Train * Hulk * 50",
    "Learn * Hulk * Thunderclap",
    "Use Power * Hulk * Thunderclap * 70",
    "Evil Defeated!"
]);

