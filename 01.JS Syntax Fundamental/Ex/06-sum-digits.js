function solve(number){
    const stringFromNumber=number.toString();
    let sum=0;
    for(let i=0;i<stringFromNumber.length;i++){
        sum+=Number(stringFromNumber[i]);
    }
    console.log(sum);

}

solve(543);