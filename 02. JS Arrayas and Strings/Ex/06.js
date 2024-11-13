function solve(sentance) {
    const words = sentance.split(' ');
    
    for (let w of words) {
        if (w.startsWith('#') && w.length > 1){
            const asciiCode = w.charCodeAt(1); 

            if( (asciiCode>=65 && asciiCode<=90) ||  (asciiCode>=97 && asciiCode<=122)){
                console.log(w.substring(1));
            }
        }
    }
}