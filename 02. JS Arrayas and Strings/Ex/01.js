function solve(array,num){
    for(let i=0;i<num;i++){
        array.push(array.shift());
    }
    console.log(array.join(' '));
}