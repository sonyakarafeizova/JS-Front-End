function solve(input) {
    const words = input.match(/\w+/g) || []; // Match words only
    const upperCaseWords = words.map(word => word.toUpperCase());
    console.log(upperCaseWords.join(', '));
}

// Example usage:
solve('Hi, how are you?');  // Output: HI, HOW, ARE, YOU
solve('hello');             // Output: HELLO