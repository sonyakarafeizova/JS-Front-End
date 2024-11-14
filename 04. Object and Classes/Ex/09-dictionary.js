function solve(input) {
    const dictionary = {};

    input.forEach(entry => {
        const termObject = JSON.parse(entry);
        const term = Object.keys(termObject)[0];
        dictionary[term] = termObject[term];
    });

    Object.keys(dictionary)
        .sort()
        .forEach(term => {
            console.log(`Term: ${term} => Definition: ${dictionary[term]}`);
        });
}