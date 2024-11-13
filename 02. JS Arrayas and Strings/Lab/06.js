function solve(text,word){

    const pattern=new RegExp(`\\b${word}\\b`, 'g');
    const result=text.match(pattern) || [];
    console.log(result.length);
}