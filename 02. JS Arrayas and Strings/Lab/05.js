function solve(text,word){
    console.log(text.replaceAll(word, '*'.repeat(word.length)));
}