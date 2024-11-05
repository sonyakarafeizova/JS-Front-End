function revealWords(words, sentence) {
    const wordsArray = words.split(', ');
    
    for (let word of wordsArray) {
        
        const template = '*'.repeat(word.length);
        sentence = sentence.replace(template, word);
    }
    return sentence;
}