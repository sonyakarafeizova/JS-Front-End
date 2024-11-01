function reverse(num,input){

    let newArray=[];
    for(let i=0;i<num;i++){
        newArray.push(input[i]);
    }
    console.log(newArray.reverse().join(' '));

}
reverse(3, [10, 20, 30, 40, 50]);