function addAndSubtract(numOne,numTwo,numThree){

    const sum=(a,b)=>a+b;
    const subtract=(sumResult,c)=>sumResult-c;

    const result=subtract(sum(numOne,numTwo),numThree);
    return result;
}

console.log(addAndSubtract(23, 6, 10)); // Output: 19
console.log(addAndSubtract(1, 17, 30)); // Output: -12
console.log(addAndSubtract(42, 58, 100)); // Output: 0