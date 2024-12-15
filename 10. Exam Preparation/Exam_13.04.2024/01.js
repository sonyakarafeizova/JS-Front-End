function solve(input) {
    const n = parseInt(input[0]);
    const posse = {};

    
    for (let i = 1; i <= n; i++) {
        const [name, hp, bullets] = input[i].split(" ");
        posse[name] = { HP: parseInt(hp), Bullets: parseInt(bullets) };
    }

    
    const commands = input.slice(n + 1);
    const MAX_HP = 100;
    const MAX_BULLETS = 6;

    for (let command of commands) {
        if (command === "Ride Off Into Sunset") {
            break;
        }

        const [action, name, ...args] = command.split(" - ");

        switch (action) {
            case "FireShot": {
                const target = args[0];
                if (posse[name].Bullets > 0) {
                    posse[name].Bullets--;
                    console.log(`${name} has successfully hit ${target} and now has ${posse[name].Bullets} bullets!`);
                } else {
                    console.log(`${name} doesn't have enough bullets to shoot at ${target}!`);
                }
                break;
            }

            case "TakeHit": {
                const damage = parseInt(args[0]);
                const attacker = args[1];
                posse[name].HP -= damage;

                if (posse[name].HP > 0) {
                    console.log(`${name} took a hit for ${damage} HP from ${attacker} and now has ${posse[name].HP} HP!`);
                } else {
                    console.log(`${name} was gunned down by ${attacker}!`);
                    delete posse[name];
                }
                break;
            }

            case "Reload": {
                const bulletsToReload = Math.min(MAX_BULLETS - posse[name].Bullets, MAX_BULLETS);

                if (bulletsToReload > 0) {
                    posse[name].Bullets += bulletsToReload;
                    console.log(`${name} reloaded ${bulletsToReload} bullets!`);
                } else {
                    console.log(`${name}'s pistol is fully loaded!`);
                }
                break;
            }

            case "PatchUp": {
                const amount = parseInt(args[0]);
                const currentHP = posse[name].HP;

                if (currentHP < MAX_HP) {
                    const hpToRecover = Math.min(amount, MAX_HP - currentHP);
                    posse[name].HP += hpToRecover;
                    console.log(`${name} patched up and recovered ${hpToRecover} HP!`);
                } else {
                    console.log(`${name} is in full health!`);
                }
                break;
            }
        }
    }

    
    for (const [name, stats] of Object.entries(posse)) {
        console.log(`${name}\n HP: ${stats.HP}\n Bullets: ${stats.Bullets}`);
    }
}

solve (["2",
    "Jesse 100 4",
    "Walt 100 5",
    "FireShot - Jesse - Bandit",
     "TakeHit - Walt - 30 - Bandit",
     "PatchUp - Walt - 20" ,
     "Reload - Jesse",
     "Ride Off Into Sunset"])
    ;
 
