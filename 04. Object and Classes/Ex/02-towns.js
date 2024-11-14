function towns(input) {
    let townInfo = {};

    for (let entry of input) {
        let [name, latitude, longitude] = entry.split('|').map(part => part.trim());//remove the intervals
        let townInfo = {
            town: name,
            latitude: Number(latitude).toFixed(2),
            longitude: Number(longitude).toFixed(2)

        };
        console.log(townInfo);

    }

}

towns([
    'Sofia | 42.696552 | 23.32601',
    'Beijing | 39.913818 | 116.363625'
]);