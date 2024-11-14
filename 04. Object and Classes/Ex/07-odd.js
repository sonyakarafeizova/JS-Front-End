function oddOccurrences(input) {

    const words = input.toLowerCase().split(' ');
    const wordCount = {};


    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    
    const result = Object.keys(wordCount)
        .filter(word => wordCount[word] % 2 !== 0)
        .join(' ');

    console.log(result);
}

