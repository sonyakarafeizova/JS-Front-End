function solve(input) {
    const heroes = [];
  
    for (let heroData of input) {
    
        let [name, level, items] = heroData.split(' / ');
        level = Number(level);
        items = items.split(', ');

        heroes.push({ name, level, items });
    }

    heroes.sort((a, b) => a.level - b.level);

    for (let hero of heroes) {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items.join(', ')}`);
    }
}


solve([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]);