function signCheck(numOne, numTwo, numThree) {

    const negative = [numOne, numTwo, numThree].filter(num => num < 0).length;
    console.log(negative % 2 === 0 ? "Positive" : "Negative");
}
signCheck(5,12,-15);
signCheck(-6, -12, 14);    
signCheck(-1, -2, -3);     
signCheck(-5, 1, 1);