function checkForPalindroms(numbers){

    const isPalidrom=(num)=>{
        const strNum=num.toString();
        const strNumreversed=strNum.split('').reverse().join('');

        return strNum===strNumreversed;
    }

    numbers.forEach(num=> console.log(isPalidrom(num)));
}